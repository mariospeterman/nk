export type ConsentState = {
  necessary: true;
  analytics: boolean;
  externalMedia: boolean;
  decisionAt: string;
  version: string;
};

export const consentStorageKey = "ek_cookie_consent_2026_v1";

export const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  externalMedia: false,
  decisionAt: "",
  version: "2026-03",
};

export function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (
      typeof parsed.analytics === "boolean" &&
      typeof parsed.externalMedia === "boolean" &&
      typeof parsed.decisionAt === "string"
    ) {
      return {
        necessary: true,
        analytics: parsed.analytics,
        externalMedia: parsed.externalMedia,
        decisionAt: parsed.decisionAt,
        version: parsed.version ?? defaultConsent.version,
      };
    }
  } catch {
    return null;
  }

  return null;
}
