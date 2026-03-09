import { z } from "zod";

export const consentVersion = "2026-03-v1";

export const leadSchema = z.object({
  source: z.string().min(2).max(64).default("website"),
  serviceType: z.string().min(2).max(100),
  customerType: z.enum(["privat", "gewerbe", "verwaltung", "baustelle"]),
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  phone: z.string().min(5).max(32),
  email: z.string().email(),
  postcode: z.string().min(4).max(10),
  city: z.string().min(2).max(80),
  urgency: z.enum(["kurzfristig", "planbar", "beratung"]),
  preferredContact: z.enum(["telefon", "email", "beides"]),
  message: z.string().min(20).max(3000),
  consentPrivacy: z.literal("yes"),
  consentAiAssist: z.enum(["yes", "no"]).default("no"),
  consentVersion: z.string().default(consentVersion),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  gclid: z.string().max(120).optional(),
  ref: z.string().max(2048).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function parseLeadFormData(formData: FormData): {
  parsed: LeadInput;
  files: File[];
} {
  const values = {
    source: toValue(formData.get("source"), "website"),
    serviceType: toValue(formData.get("serviceType")),
    customerType: toValue(formData.get("customerType")),
    firstName: toValue(formData.get("firstName")),
    lastName: toValue(formData.get("lastName")),
    phone: toValue(formData.get("phone")),
    email: toValue(formData.get("email")),
    postcode: toValue(formData.get("postcode")),
    city: toValue(formData.get("city")),
    urgency: toValue(formData.get("urgency")),
    preferredContact: toValue(formData.get("preferredContact")),
    message: toValue(formData.get("message")),
    consentPrivacy: toValue(formData.get("consentPrivacy")),
    consentAiAssist: toValue(formData.get("consentAiAssist"), "no"),
    consentVersion: toValue(formData.get("consentVersion"), consentVersion),
    utmSource: nullableValue(formData.get("utmSource")),
    utmMedium: nullableValue(formData.get("utmMedium")),
    utmCampaign: nullableValue(formData.get("utmCampaign")),
    gclid: nullableValue(formData.get("gclid")),
    ref: nullableValue(formData.get("ref")),
  };

  const parsed = leadSchema.parse(values);

  const files = formData
    .getAll("assets")
    .filter((value): value is File => value instanceof File && value.size > 0);

  return { parsed, files };
}

export const intakeRouteMap: Record<
  string,
  { serviceType: string; bookingType: string }
> = {
  elektroinstallation: {
    serviceType: "Elektroinstallation",
    bookingType: "Rueckruf-10min",
  },
  sanierung: {
    serviceType: "Sanierung / Modernisierung",
    bookingType: "Rueckruf-10min",
  },
  licht: {
    serviceType: "Licht & Beleuchtung",
    bookingType: "Rueckruf-10min",
  },
  photovoltaik: {
    serviceType: "Photovoltaik",
    bookingType: "PV-Beratung-30min",
  },
  "smart-home": {
    serviceType: "Smart Home",
    bookingType: "Video-Erstgespraech-20min",
  },
  pruefung: {
    serviceType: "Pruefung / Reparatur",
    bookingType: "Rueckruf-10min",
  },
  baustrom: {
    serviceType: "Baustromverteiler",
    bookingType: "Rueckruf-10min",
  },
};

function toValue(value: FormDataEntryValue | null, fallback = "") {
  if (typeof value === "string") {
    return value.trim();
  }
  return fallback;
}

function nullableValue(value: FormDataEntryValue | null) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}
