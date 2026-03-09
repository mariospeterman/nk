"use client";

import { useMemo, useState } from "react";

import { TrackedCta } from "@/components/analytics/tracked-cta";
import type { ProjectExample, ServiceId } from "@/lib/site-config";
import { projects, services } from "@/lib/site-config";

type ContextId = "zuhause" | "sanierung" | "gewerbe" | "baustrom";

type ContextConfig = {
  id: ContextId;
  title: string;
  description: string;
  typicalProblem: string;
  serviceIds: ServiceId[];
  caseTitle: ProjectExample["title"];
  ctaLabel: string;
  ctaHref: string;
};

const contexts: ContextConfig[] = [
  {
    id: "zuhause",
    title: "Zuhause",
    description: "Mehr Sicherheit, Komfort und ein gutes Gefühl im Alltag.",
    typicalProblem:
      "Sie möchten, dass Technik im Alltag einfach funktioniert, statt ständig Fragen offenzulassen.",
    serviceIds: ["elektroinstallation", "licht-beleuchtung", "smart-home"],
    caseTitle: "Lichtkonzept für Wohn- und Außenbereich",
    ctaLabel: "Projekt fürs Zuhause starten",
    ctaHref: "/kontakt?customerType=privat",
  },
  {
    id: "sanierung",
    title: "Neubau / Sanierung",
    description: "Von Anfang an sauber gedacht statt später teuer korrigiert.",
    typicalProblem:
      "Planung, Gewerke und Zeitfenster müssen zusammenpassen, damit aus dem Projekt kein Nachbesserungszyklus wird.",
    serviceIds: ["elektroinstallation", "photovoltaik", "licht-beleuchtung"],
    caseTitle: "Altbausanierung mit neuer Unterverteilung",
    ctaLabel: "Sanierungsprojekt starten",
    ctaHref: "/kontakt?customerType=privat&serviceType=Sanierung%20%2F%20Modernisierung",
  },
  {
    id: "gewerbe",
    title: "Gewerbe",
    description: "Verlässlich, dokumentierbar und ohne unnötigen Stillstand.",
    typicalProblem:
      "Sie brauchen klare Zuständigkeiten und belastbare Umsetzung, damit Betrieb und Termine stabil bleiben.",
    serviceIds: ["pruefung-instandhaltung", "elektroinstallation", "photovoltaik"],
    caseTitle: "PV-Einbindung im Bestand",
    ctaLabel: "Gewerbeanfrage starten",
    ctaHref: "/kontakt?customerType=gewerbe",
  },
  {
    id: "baustrom",
    title: "Baustrom",
    description: "Schnell bereitgestellt, klar abgestimmt und regional betreut.",
    typicalProblem:
      "Sie wollen starten statt warten und brauchen deshalb klare Zeitfenster für Bereitstellung und Rücknahme.",
    serviceIds: ["baustromverteiler-mieten", "pruefung-instandhaltung"],
    caseTitle: "Altbausanierung mit neuer Unterverteilung",
    ctaLabel: "Baustrom anfragen",
    ctaHref: "/kontakt?serviceType=Baustromverteiler&customerType=baustelle",
  },
];

const serviceMap = Object.fromEntries(services.map((entry) => [entry.id, entry]));
const caseMap = Object.fromEntries(projects.map((entry) => [entry.title, entry]));

export function ContextSelectorAdaptive() {
  const [selectedContext, setSelectedContext] = useState<ContextId>("zuhause");

  const activeContext = useMemo(
    () => contexts.find((entry) => entry.id === selectedContext) ?? contexts[0],
    [selectedContext],
  );

  const activeCase = caseMap[activeContext.caseTitle];
  const matchedServices = activeContext.serviceIds
    .map((serviceId) => serviceMap[serviceId])
    .filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {contexts.map((entry) => {
          const isActive = entry.id === activeContext.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSelectedContext(entry.id)}
              className={`text-left transition-all ${
                isActive
                  ? "glass-phaser rounded-2xl p-5 shadow-[0_22px_45px_-35px_rgba(14,74,123,0.55)]"
                  : "surface-default p-5 hover:border-action/25"
              }`}
            >
              <p className="font-heading text-xl">{entry.title}</p>
              <p className="mt-2 text-sm text-text-body">{entry.description}</p>
            </button>
          );
        })}
      </div>

      <div className="glass-phaser signal-path grid gap-5 rounded-2xl p-5 md:grid-cols-[1.2fr_0.8fr] md:p-6">
        <div>
          <p className="text-kicker">Typisches Anliegen</p>
          <p className="mt-2 text-sm text-foreground">{activeContext.typicalProblem}</p>

          <p className="mt-5 text-kicker">Passende Leistungen</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {matchedServices.map((service) => (
              <span
                key={service.id}
                className="rounded-full border border-brand/25 bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-strong"
              >
                {service.title}
              </span>
            ))}
          </div>

          <TrackedCta
            href={activeContext.ctaHref}
            className="mt-5"
            eventName="cta_context_project_start"
            eventProps={{ context: activeContext.id }}
          >
            {activeContext.ctaLabel}
          </TrackedCta>
        </div>

        <div className="rounded-xl border border-action/20 bg-card/70 p-4">
          <p className="text-kicker">Passendes Praxisbeispiel</p>
          <h3 className="mt-2 font-heading text-lg">{activeCase?.title}</h3>
          <p className="mt-2 text-sm text-text-body">
            <strong>Ausgangslage:</strong> {activeCase?.challenge}
          </p>
          <p className="mt-2 text-sm text-text-body">
            <strong>Ergebnis:</strong> {activeCase?.result}
          </p>
          <p className="mt-3 text-xs text-text-muted">{activeCase?.proof}</p>
        </div>
      </div>
    </div>
  );
}
