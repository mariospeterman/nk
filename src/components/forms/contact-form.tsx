"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { consentVersion } from "@/lib/lead";

const defaultValues = {
  serviceType: "Elektroinstallation",
  customerType: "privat",
  urgency: "planbar",
  city: "Pulsnitz",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartedAt] = useState(() => Date.now().toString());
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const initial = useMemo(() => {
    const preferredFromParam = searchParams.get("preferredFrom");
    const legacyDate = searchParams.get("preferredDate") ?? "";
    const legacyTime = searchParams.get("preferredTime") ?? "";
    const preferredFromFromLegacy = legacyDate
      ? `${legacyDate}T${legacyTime || "09:00"}`
      : "";

    return {
      serviceType: searchParams.get("serviceType") ?? defaultValues.serviceType,
      customerType: searchParams.get("customerType") ?? defaultValues.customerType,
      urgency: searchParams.get("urgency") ?? defaultValues.urgency,
      city: searchParams.get("city") ?? defaultValues.city,
      preferredFrom: preferredFromParam ?? preferredFromFromLegacy,
      preferredTo: searchParams.get("preferredTo") ?? "",
    };
  }, [searchParams]);

  return (
    <form
      className="surface-default relative space-y-5 rounded-[20px] p-5 md:p-7"
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus({ type: "idle" });
        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        formData.set("source", "website-kontaktformular");
        formData.set("consentVersion", consentVersion);
        formData.set("ref", window.location.href);
        formData.set("formStartedAt", formStartedAt);

        const utmSource = searchParams.get("utm_source");
        const utmMedium = searchParams.get("utm_medium");
        const utmCampaign = searchParams.get("utm_campaign");
        const gclid = searchParams.get("gclid");

        if (utmSource) formData.set("utmSource", utmSource);
        if (utmMedium) formData.set("utmMedium", utmMedium);
        if (utmCampaign) formData.set("utmCampaign", utmCampaign);
        if (gclid) formData.set("gclid", gclid);

        const preferredFrom = String(formData.get("preferredFrom") ?? "").trim();
        const preferredTo = String(formData.get("preferredTo") ?? "").trim();
        if (preferredFrom || preferredTo) {
          const currentMessage = String(formData.get("message") ?? "").trim();
          const formatDateTime = (value: string) => {
            const parsed = new Date(value);
            if (Number.isNaN(parsed.getTime())) return value;
            return new Intl.DateTimeFormat("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
              .format(parsed)
              .replace(",", " ·");
          };

          const scheduleNote = preferredFrom && preferredTo
            ? `${formatDateTime(preferredFrom)} bis ${formatDateTime(preferredTo)}`
            : preferredFrom
              ? `ab ${formatDateTime(preferredFrom)}`
              : `bis ${formatDateTime(preferredTo)}`;

          formData.set("message", `${currentMessage}\n\nGewünschtes Zeitfenster: ${scheduleNote}`);
        }

        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const data = (await response.json().catch(() => null)) as
              | { error?: string }
              | null;
            throw new Error(data?.error ?? "Anfrage konnte nicht verarbeitet werden.");
          }

          const data = (await response.json()) as { reference: string };
          setStatus({
            type: "success",
            message: `Danke. Ihre Anfrage wurde übermittelt (Referenz: ${data.reference}).`,
          });
          trackEvent("lead_submit_success", {
            service: String(formData.get("serviceType") ?? ""),
            urgency: String(formData.get("urgency") ?? ""),
          });
          form.reset();
        } catch (error) {
          setStatus({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Ein Fehler ist aufgetreten. Bitte telefonisch melden.",
          });
          trackEvent("lead_submit_error");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <input type="hidden" name="formStartedAt" value={formStartedAt} readOnly />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="companyWebsite">Website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-sm text-text-body">
        Bitte nur die wichtigsten Eckdaten eintragen. Den Rest klären wir strukturiert im
        nächsten Schritt.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldSelect
          label="Leistungsbereich*"
          name="serviceType"
          defaultValue={initial.serviceType}
          options={[
            ["Elektroinstallation", "Elektroinstallation"],
            ["Sanierung / Modernisierung", "Sanierung / Modernisierung"],
            ["Licht & Beleuchtung", "Licht & Beleuchtung"],
            ["Photovoltaik", "Photovoltaik"],
            ["Smart Home", "Smart Home"],
            ["Prüfung / Reparatur", "Prüfung / Reparatur"],
            ["Baustromverteiler", "Baustromverteiler"],
          ]}
        />

        <FieldSelect
          label="Kundentyp*"
          name="customerType"
          defaultValue={initial.customerType}
          options={[
            ["privat", "Privat"],
            ["gewerbe", "Gewerbe"],
            ["verwaltung", "Vermietung / Verwaltung"],
            ["baustelle", "Baustelle"],
          ]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldInput label="Vorname*" name="firstName" required />
        <FieldInput label="Nachname*" name="lastName" required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldInput label="E-Mail*" name="email" type="email" required />
        <FieldInput label="Telefon*" name="phone" type="tel" required />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FieldInput label="PLZ*" name="postcode" required />
        <div className="md:col-span-2">
          <FieldInput label="Ort*" name="city" required defaultValue={initial.city} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldSelect
          label="Zeithorizont*"
          name="urgency"
          defaultValue={initial.urgency}
          options={[
            ["kurzfristig", "Kurzfristig"],
            ["planbar", "Planbar"],
            ["beratung", "Beratung gewünscht"],
          ]}
        />
        <FieldSelect
          label="Bevorzugter Kontakt*"
          name="preferredContact"
          defaultValue="telefon"
          options={[
            ["telefon", "Telefon"],
            ["email", "E-Mail"],
            ["beides", "Beides"],
          ]}
        />
      </div>

      <div className="surface-action grid gap-4 p-4 md:grid-cols-2">
        <FieldInput
          label="Zeitraum von (optional)"
          name="preferredFrom"
          type="datetime-local"
          lang="de-DE"
          defaultValue={initial.preferredFrom}
        />
        <FieldInput
          label="Zeitraum bis (optional)"
          name="preferredTo"
          type="datetime-local"
          lang="de-DE"
          defaultValue={initial.preferredTo}
        />
        <p className="md:col-span-2 text-xs text-text-muted">
          Format: TT.MM.JJJJ, HH:MM
        </p>
      </div>

      <label className="block text-sm font-medium text-foreground">
        <span className="mb-2 block">Kurzbeschreibung Ihres Anliegens*</span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={6}
          placeholder="Was soll umgesetzt oder geprüft werden? Gibt es ein gewünschtes Zeitfenster?"
          className="w-full rounded-[13px] border border-input bg-card px-3 py-2 text-foreground"
        />
      </label>

      <label className="block text-sm font-medium text-foreground">
        <span className="mb-2 block">Fotos / Pläne (optional)</span>
        <input
          type="file"
          name="assets"
          multiple
          accept="image/*,.pdf"
          className="h-11 w-full rounded-[13px] border border-input bg-card px-3 py-2 text-sm text-foreground"
        />
      </label>

      <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm text-text-body">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="consentPrivacy"
            value="yes"
            required
            className="mt-1 h-4 w-4 accent-action"
          />
          <span>
            Ich habe die Datenschutzhinweise gelesen und bin mit der Verarbeitung meiner
            Angaben zur Bearbeitung der Anfrage einverstanden.
          </span>
        </label>
        <label className="mt-3 flex items-start gap-2">
          <input
            type="checkbox"
            name="consentAiAssist"
            value="yes"
            className="mt-1 h-4 w-4 accent-action"
          />
          <span>
            Optional: Eine KI darf meine Anfrage intern vorstrukturieren. Die finale
            Bewertung erfolgt immer durch einen Menschen.
          </span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
        </Button>
        {status.type === "success" ? (
          <p className="text-sm font-medium text-brand-strong">{status.message}</p>
        ) : null}
        {status.type === "error" ? (
          <p className="text-sm font-medium text-destructive">{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}

function FieldInput(props: ComponentProps<"input"> & { label: string }) {
  const { label, className, ...inputProps } = props;

  return (
    <label className="block text-sm font-medium text-foreground">
      <span className="mb-2 block">{label}</span>
      <input
        {...inputProps}
        className={`light-form-control h-11 w-full rounded-[13px] border border-input bg-card px-3 text-foreground ${className ?? ""}`.trim()}
      />
    </label>
  );
}

function FieldSelect({
  label,
  options,
  ...props
}: ComponentProps<"select"> & {
  label: string;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block text-sm font-medium text-foreground">
      <span className="mb-2 block">{label}</span>
      <div className="relative">
        <select
          {...props}
          className="light-form-control h-11 w-full appearance-none rounded-[13px] border border-input bg-card px-3 pr-10 text-foreground shadow-[0_8px_20px_-20px_rgba(18,59,99,0.6)] transition-colors focus-visible:border-action/50"
        >
          {options.map(([value, optionLabel]) => (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
      </div>
    </label>
  );
}
