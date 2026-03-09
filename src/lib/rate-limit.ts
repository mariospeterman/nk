type RateLimitOptions = {
  windowMs: number;
  max: number;
  blockMs: number;
};

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
  blockedUntil: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSec: number;
  remaining: number;
};

type GlobalRateLimitStore = typeof globalThis & {
  ekRateLimitStore?: Map<string, RateLimitEntry>;
};

const globals = globalThis as GlobalRateLimitStore;
const inMemoryStore = globals.ekRateLimitStore ?? new Map<string, RateLimitEntry>();
globals.ekRateLimitStore = inMemoryStore;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

async function runUpstashCommand<T>(parts: string[]) {
  if (!upstashUrl || !upstashToken) {
    return null;
  }

  const encodedCommand = parts.map((part) => encodeURIComponent(part)).join("/");
  const response = await fetch(`${upstashUrl}/${encodedCommand}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${upstashToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Upstash command failed: ${response.status}`);
  }

  const data = (await response.json()) as { result?: T };
  return data.result ?? null;
}

async function checkRateLimitWithUpstash(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult | null> {
  if (!upstashUrl || !upstashToken) {
    return null;
  }

  const blockedKey = `ek:lead:block:${key}`;
  const counterKey = `ek:lead:count:${key}`;

  const blockedTtl = await runUpstashCommand<number>(["pttl", blockedKey]);
  if (typeof blockedTtl === "number" && blockedTtl > 0) {
    return {
      allowed: false,
      retryAfterSec: Math.max(Math.ceil(blockedTtl / 1000), 1),
      remaining: 0,
    };
  }

  const count = await runUpstashCommand<number>(["incr", counterKey]);
  if (typeof count !== "number") {
    return null;
  }

  if (count === 1) {
    await runUpstashCommand(["pexpire", counterKey, String(options.windowMs)]);
  }

  if (count > options.max) {
    const blockTtlMs = Math.max(options.blockMs, options.windowMs);
    await runUpstashCommand([
      "set",
      blockedKey,
      "1",
      "px",
      String(blockTtlMs),
    ]);

    return {
      allowed: false,
      retryAfterSec: Math.max(Math.ceil(blockTtlMs / 1000), 1),
      remaining: 0,
    };
  }

  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: Math.max(options.max - count, 0),
  };
}

function checkRateLimitInMemory(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const existing = inMemoryStore.get(key);

  if (!existing) {
    inMemoryStore.set(key, {
      count: 1,
      windowStartedAt: now,
      blockedUntil: 0,
    });

    return {
      allowed: true,
      retryAfterSec: 0,
      remaining: Math.max(options.max - 1, 0),
    };
  }

  if (existing.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.blockedUntil - now) / 1000),
      remaining: 0,
    };
  }

  if (now - existing.windowStartedAt > options.windowMs) {
    existing.count = 1;
    existing.windowStartedAt = now;
    existing.blockedUntil = 0;
    inMemoryStore.set(key, existing);

    return {
      allowed: true,
      retryAfterSec: 0,
      remaining: Math.max(options.max - 1, 0),
    };
  }

  existing.count += 1;

  if (existing.count > options.max) {
    existing.blockedUntil = now + options.blockMs;
    inMemoryStore.set(key, existing);

    return {
      allowed: false,
      retryAfterSec: Math.ceil(options.blockMs / 1000),
      remaining: 0,
    };
  }

  inMemoryStore.set(key, existing);

  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: Math.max(options.max - existing.count, 0),
  };
}

export async function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  try {
    const distributed = await checkRateLimitWithUpstash(key, options);
    if (distributed) {
      return distributed;
    }
  } catch {
    return checkRateLimitInMemory(key, options);
  }

  return checkRateLimitInMemory(key, options);
}

export function getRequestIp(request: Request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const [first] = xForwardedFor.split(",");
    if (first?.trim()) {
      return first.trim();
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) {
    return realIp.trim();
  }

  return "unknown";
}
