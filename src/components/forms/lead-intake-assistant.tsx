"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { intakeRouteMap } from "@/lib/lead";

type CustomerType = "" | "privat" | "gewerbe" | "verwaltung" | "baustelle";
type Urgency = "kurzfristig" | "planbar";

const serviceGroups = [
  {
    id: "installation",
    title: "Installation & Modernisierung",
    values: [
      { value: "elektroinstallation", label: "Elektroinstallation" },
      { value: "sanierung", label: "Sanierung / Modernisierung" },
    ],
  },
  {
    id: "energie",
    title: "Licht, PV & Smart Home",
    values: [
      { value: "licht", label: "Licht & Beleuchtung" },
      { value: "photovoltaik", label: "Photovoltaik" },
      { value: "smart-home", label: "Smart Home" },
    ],
  },
  {
    id: "service",
    title: "Prüfung, Reparatur & Baustrom",
    values: [
      { value: "pruefung", label: "Prüfung / Reparatur" },
      { value: "baustrom", label: "Baustromverteiler" },
    ],
  },
] as const;

type ServiceGroupId = (typeof serviceGroups)[number]["id"];

export function LeadIntakeAssistant() {
  const [group, setGroup] = useState<ServiceGroupId>("installation");
  const [service, setService] = useState<string>("elektroinstallation");
  const [customerType, setCustomerType] = useState<CustomerType>("");
  const [city, setCity] = useState("");
  const [preferredFrom, setPreferredFrom] = useState("");
  const [preferredTo, setPreferredTo] = useState("");

  const activeGroup = useMemo(
    () => serviceGroups.find((entry) => entry.id === group) ?? serviceGroups[0],
    [group],
  );

  const progressPercent = useMemo(() => {
    let points = 1;
    if (customerType) points += 1;
    if (preferredFrom || preferredTo) points += 1;
    if (city.trim()) points += 1;
    return Math.round((points / 4) * 100);
  }, [city, customerType, preferredFrom, preferredTo]);

  const recommendation = useMemo(() => {
    const mapping = intakeRouteMap[service] ?? intakeRouteMap.elektroinstallation;
    const resolvedCustomerType = customerType || "privat";
    const resolvedUrgency: Urgency = (() => {
      if (!preferredFrom) return "planbar";
      const [datePart] = preferredFrom.split("T");
      if (!datePart) return "planbar";
      const targetDate = new Date(`${datePart}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffMs = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (Number.isNaN(diffDays)) return "planbar";
      return diffDays <= 7 ? "kurzfristig" : "planbar";
    })();
    const resolvedCity = city.trim() || "Pulsnitz";
    const params = new URLSearchParams({
      serviceType: mapping.serviceType,
      customerType: resolvedCustomerType,
      urgency: resolvedUrgency,
      city: resolvedCity,
    });

    if (preferredFrom) {
      params.set("preferredFrom", preferredFrom);
      const [datePart, timePart] = preferredFrom.split("T");
      if (datePart) params.set("preferredDate", datePart);
      if (timePart) params.set("preferredTime", timePart);
    }
    if (preferredTo) {
      params.set("preferredTo", preferredTo);
    }

    const bookingBase =
      process.env.NEXT_PUBLIC_CAL_BOOKING_URL ?? "https://cal.com/elektro-kunath";

    return {
      serviceType: mapping.serviceType,
      bookingType: mapping.bookingType,
      contactHref: `/kontakt?${params.toString()}`,
      bookingHref: `${bookingBase}?type=${mapping.bookingType}`,
    };
  }, [city, customerType, preferredFrom, preferredTo, service]);

  const preferredScheduleLabel = useMemo(() => {
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

    if (!preferredFrom && !preferredTo) return "Zeitfenster wird später geklärt";
    if (preferredFrom && preferredTo) {
      return `${formatDateTime(preferredFrom)} bis ${formatDateTime(preferredTo)}`;
    }
    if (preferredFrom) return `Ab ${formatDateTime(preferredFrom)}`;
    return `Bis ${formatDateTime(preferredTo)}`;
  }, [preferredFrom, preferredTo]);

  return (
    <div className="glass-phaser relative overflow-hidden rounded-[22px] p-4 md:p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2f8f4e_0%,#0e4a7b_80%)]" />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-kicker">Projektklärung in 4 Schritten</p>
          <h2 className="mt-1 font-heading text-lg md:text-[1.55rem]">
            Worum geht es bei Ihnen?
          </h2>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-brand/25 bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-brand-strong">
          {progressPercent}% fertig
        </span>
      </div>

      <p className="mt-1.5 text-sm text-text-body">
        In unter 30 Sekunden zur passenden Einordnung.
      </p>
      <p className="mt-0.5 text-xs text-text-muted">Schritt 1 von 4 · ohne Techniksprache</p>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#2f8f4e_0%,#0e4a7b_100%)] transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-kicker">1. Bereich</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {serviceGroups.map((entry) => {
              const isActive = group === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    setGroup(entry.id);
                    setService(entry.values[0]?.value ?? "elektroinstallation");
                  }}
                  className={`rounded-[13px] border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                    isActive
                      ? "border-brand/40 bg-brand-tint text-brand-strong"
                      : "border-border bg-card text-text-muted hover:border-brand/30"
                  }`}
                >
                  {entry.title}
                </button>
              );
            })}
          </div>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {activeGroup.values.map((option) => {
              const isActive = service === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setService(option.value)}
                  className={`rounded-[13px] border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-action/55 bg-action text-white"
                      : "border-border bg-card text-foreground hover:border-action/35"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-kicker">2. Kundensituation</span>
            <div className="relative mt-2">
              <select
                value={customerType}
                onChange={(event) => setCustomerType(event.target.value as CustomerType)}
                className="light-form-control h-11 w-full appearance-none rounded-[13px] border border-input bg-card px-3 pr-10 text-foreground shadow-[0_8px_20px_-20px_rgba(18,59,99,0.6)] transition-colors focus-visible:border-action/50"
              >
                <option value="">Privat oder Gewerbe?</option>
                <option value="privat">Privatkunde</option>
                <option value="gewerbe">Gewerbe</option>
                <option value="verwaltung">Vermietung / Verwaltung</option>
                <option value="baustelle">Baustelle</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />
            </div>
          </label>

          <div className="text-sm">
            <span className="text-kicker">3. Zeitfenster</span>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <input
                type="datetime-local"
                lang="de-DE"
                aria-label="Zeitfenster von"
                value={preferredFrom}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setPreferredFrom(nextValue);
                  if (preferredTo && nextValue && preferredTo < nextValue) {
                    setPreferredTo(nextValue);
                  }
                }}
                className="light-form-control h-11 w-full rounded-[13px] border border-input bg-card px-3 text-foreground"
              />
              <input
                type="datetime-local"
                lang="de-DE"
                aria-label="Zeitfenster bis"
                value={preferredTo}
                min={preferredFrom || undefined}
                onChange={(event) => setPreferredTo(event.target.value)}
                className="light-form-control h-11 w-full rounded-[13px] border border-input bg-card px-3 text-foreground"
              />
            </div>
          </div>
        </div>

        <label className="text-sm">
          <span className="text-kicker">4. Ort</span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="mt-2 h-11 w-full rounded-[13px] border border-input bg-card px-3 text-foreground"
            placeholder="z. B. Pulsnitz, Kamenz, Radeberg"
          />
        </label>
      </div>

      <div className="surface-action mt-4 border-l-4 border-action p-3.5">
        <p className="text-sm font-semibold text-action-strong">Ihre beste Route</p>
        <p className="mt-1 text-sm font-medium text-text-body">
          Projektanfrage mit 2–3 Eckdaten. So können wir Ihr Anliegen schneller und
          sauberer einordnen.
        </p>
        <p className="mt-1 text-xs text-text-muted">
          Wenn Sie lieber kurz sprechen möchten, buchen Sie direkt einen Rückruf.
        </p>
        <p className="mt-2 text-xs text-text-muted">
          Zuordnung: {recommendation.serviceType} · Prozess: {recommendation.bookingType}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          Terminwunsch: {preferredScheduleLabel}
        </p>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        <Button asChild>
          <Link
            href={recommendation.contactHref}
            onClick={() =>
              trackEvent("cta_intake_project_start", {
                service: recommendation.serviceType,
                booking: recommendation.bookingType,
              })
            }
          >
            Projekt starten
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href={recommendation.bookingHref}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() =>
              trackEvent("cta_intake_booking", {
                service: recommendation.serviceType,
                booking: recommendation.bookingType,
              })
            }
          >
            Rückruf buchen
          </a>
        </Button>
      </div>

      <p className="mt-2.5 text-xs text-text-muted">
        Sie bekommen eine klare Einschätzung — nicht noch mehr offene Fragen.
      </p>
    </div>
  );
}
