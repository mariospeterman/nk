import { randomUUID } from "node:crypto";

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { parseLeadFormData } from "@/lib/lead";
import { checkRateLimit, getRequestIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const maxFileSizeBytes = 10 * 1024 * 1024;
const maxTotalUploadBytes = 24 * 1024 * 1024;
const rateLimitWindowMs = getPositiveNumber(
  process.env.LEAD_RATE_LIMIT_WINDOW_MS,
  15 * 60 * 1000,
);
const rateLimitMax = getPositiveNumber(process.env.LEAD_RATE_LIMIT_MAX, 8);
const rateLimitBlockMs = getPositiveNumber(
  process.env.LEAD_RATE_LIMIT_BLOCK_MS,
  30 * 60 * 1000,
);
const minSubmitMs = getPositiveNumber(process.env.LEAD_MIN_SUBMIT_MS, 1800);
const maxFormAgeMs = 24 * 60 * 60 * 1000;

type InsertedLead = {
  id: string;
};

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const rateLimit = await checkRateLimit(`lead:${ip}`, {
      windowMs: rateLimitWindowMs,
      max: rateLimitMax,
      blockMs: rateLimitBlockMs,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSec),
          },
        },
      );
    }

    const formData = await request.formData();
    if (isSpamTrapTriggered(formData)) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    validateSubmissionTiming(formData);
    const { parsed, files } = parseLeadFormData(formData);

    validateFiles(files);

    const aiSummary = [
      `Service: ${parsed.serviceType}`,
      `Kundentyp: ${parsed.customerType}`,
      `Ort: ${parsed.postcode} ${parsed.city}`,
      `Dringlichkeit: ${parsed.urgency}`,
    ].join(" | ");

    const leadReference = `LEAD-${Date.now().toString(36).toUpperCase()}`;

    const insertedLead = await storeLead({
      ...parsed,
      aiSummary,
      leadReference,
    });

    if (insertedLead?.id) {
      await uploadAssets(insertedLead.id, files);
      await logAudit(insertedLead.id, "lead_created");
    }

    await sendNotificationEmail({
      leadReference,
      ...parsed,
      aiSummary,
    });

    return NextResponse.json(
      {
        ok: true,
        reference: leadReference,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Bitte prüfen Sie Ihre Eingaben.",
          details: error.issues,
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unbekannter Fehler bei der Anfrageverarbeitung." },
      { status: 500 },
    );
  }
}

async function storeLead(payload: {
  source: string;
  serviceType: string;
  customerType: "privat" | "gewerbe" | "verwaltung" | "baustelle";
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postcode: string;
  city: string;
  message: string;
  urgency: "kurzfristig" | "planbar" | "beratung";
  preferredContact: "telefon" | "email" | "beides";
  consentVersion: string;
  consentAiAssist: "yes" | "no";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  ref?: string;
  aiSummary: string;
  leadReference: string;
}): Promise<InsertedLead | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRole) {
    console.info("Lead received without Supabase persistence", payload);
    return { id: randomUUID() };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("leads")
    .insert({
      source: payload.source,
      service_type: payload.serviceType,
      customer_type: payload.customerType,
      first_name: payload.firstName,
      last_name: payload.lastName,
      phone: payload.phone,
      email: payload.email,
      postcode: payload.postcode,
      city: payload.city,
      message: payload.message,
      urgency: payload.urgency,
      preferred_contact: payload.preferredContact,
      consent_version: payload.consentVersion,
      consent_ai_assist: payload.consentAiAssist === "yes",
      ai_summary: payload.aiSummary,
      lead_reference: payload.leadReference,
      utm_source: payload.utmSource,
      utm_medium: payload.utmMedium,
      utm_campaign: payload.utmCampaign,
      gclid: payload.gclid,
      ref: payload.ref,
      status: "new",
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(`Lead konnte nicht gespeichert werden: ${error.message}`);
  }

  return data;
}

async function uploadAssets(leadId: string, files: File[]) {
  if (files.length === 0) {
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_LEAD_BUCKET;

  if (!supabaseUrl || !supabaseServiceRole || !bucket) {
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      persistSession: false,
    },
  });

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${leadId}/${Date.now()}-${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
    }

    const { error: assetError } = await supabase.from("lead_assets").insert({
      lead_id: leadId,
      file_path: path,
      mime_type: file.type || "application/octet-stream",
      size_bytes: file.size,
    });

    if (assetError) {
      throw new Error(`Asset-Metadaten fehlgeschlagen: ${assetError.message}`);
    }
  }
}

async function logAudit(leadId: string, action: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRole) {
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      persistSession: false,
    },
  });

  await supabase.from("audit_log").insert({
    entity_type: "lead",
    entity_id: leadId,
    action,
    actor: "website",
    metadata: {},
  });
}

async function sendNotificationEmail(payload: {
  leadReference: string;
  firstName: string;
  lastName: string;
  serviceType: string;
  urgency: string;
  message: string;
  email: string;
  phone: string;
  city: string;
  aiSummary: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendTo = process.env.LEAD_NOTIFICATION_TO;
  const resendFrom = process.env.LEAD_NOTIFICATION_FROM;

  if (!resendApiKey || !resendTo || !resendFrom) {
    return;
  }

  const text = [
    `Neue Anfrage (${payload.leadReference})`,
    `${payload.firstName} ${payload.lastName}`,
    `Service: ${payload.serviceType}`,
    `Dringlichkeit: ${payload.urgency}`,
    `Ort: ${payload.city}`,
    `E-Mail: ${payload.email}`,
    `Telefon: ${payload.phone}`,
    "",
    "Nachricht:",
    payload.message,
    "",
    `Interne Zusammenfassung: ${payload.aiSummary}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [resendTo],
      subject: `Neue Anfrage ${payload.leadReference}`,
      text,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`E-Mail Versand fehlgeschlagen: ${message}`);
  }
}

function validateFiles(files: File[]) {
  if (files.length > 6) {
    throw new Error("Maximal 6 Dateien sind erlaubt.");
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > maxTotalUploadBytes) {
    throw new Error("Die Gesamtuploadgröße ist zu hoch.");
  }

  for (const file of files) {
    if (file.size > maxFileSizeBytes) {
      throw new Error(`Datei ${file.name} ist größer als 10 MB.`);
    }

    const hasValidMimeType =
      file.type.startsWith("image/") || file.type === "application/pdf";

    const hasValidExtension = /\.(pdf|png|jpe?g|webp|heic|heif|gif)$/i.test(file.name);

    if (!hasValidMimeType && !hasValidExtension) {
      throw new Error(`Dateityp von ${file.name} ist nicht erlaubt.`);
    }
  }
}

function isSpamTrapTriggered(formData: FormData) {
  const companyWebsite = readString(formData.get("companyWebsite"));
  return companyWebsite.length > 0;
}

function validateSubmissionTiming(formData: FormData) {
  const startedRaw = readString(formData.get("formStartedAt"));
  const startedAt = Number(startedRaw);

  if (!Number.isFinite(startedAt)) {
    throw new Error("Formular ungültig. Bitte Seite neu laden und erneut senden.");
  }

  const elapsed = Date.now() - startedAt;
  if (elapsed < minSubmitMs) {
    throw new Error("Bitte prüfen Sie Ihre Angaben kurz und senden Sie dann erneut.");
  }

  if (elapsed > maxFormAgeMs) {
    throw new Error("Formular ist abgelaufen. Bitte Seite neu laden.");
  }
}

function readString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getPositiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
