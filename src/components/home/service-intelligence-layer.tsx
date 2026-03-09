"use client";

import { useMemo, useState } from "react";

import { TrackedCta } from "@/components/analytics/tracked-cta";
import type { ServiceId } from "@/lib/site-config";
import { services } from "@/lib/site-config";

type ClusterId = "installation" | "energy" | "service";

type ClusterConfig = {
  id: ClusterId;
  title: string;
  description: string;
  serviceIds: ServiceId[];
};

const clusters: ClusterConfig[] = [
  {
    id: "installation",
    title: "Installation & Modernisierung",
    description: "Für Neubau, Umbau, Erweiterung und Bestand.",
    serviceIds: ["elektroinstallation"],
  },
  {
    id: "energy",
    title: "Licht, PV & Smart Home",
    description: "Für Komfort, Effizienz und eine stimmige technische Zukunft.",
    serviceIds: ["licht-beleuchtung", "photovoltaik", "smart-home"],
  },
  {
    id: "service",
    title: "Prüfung, Reparatur & Baustrom",
    description: "Für schnelle Einordnung, sichere Funktion und temporäre Versorgung.",
    serviceIds: ["pruefung-instandhaltung", "baustromverteiler-mieten"],
  },
];

const benefitLineByService: Record<ServiceId, string> = {
  elektroinstallation:
    "Sie schaffen eine sichere Basis statt späterer Improvisation.",
  "licht-beleuchtung":
    "Sie gewinnen Orientierung, Atmosphäre und bessere Nutzung im Alltag.",
  photovoltaik:
    "Sie vermeiden Reibung zwischen Planung, Bestand und neuer Technik.",
  "smart-home":
    "Sie machen Technik einfacher statt komplizierter.",
  "pruefung-instandhaltung":
    "Sie gewinnen Klarheit, bevor kleine Probleme groß werden.",
  "baustromverteiler-mieten":
    "Sie kommen schneller ins Arbeiten statt länger ins Warten.",
};

const serviceMap = Object.fromEntries(services.map((entry) => [entry.id, entry]));

export function ServiceIntelligenceLayer() {
  const [activeCluster, setActiveCluster] = useState<ClusterId>("installation");

  const cluster = useMemo(
    () => clusters.find((entry) => entry.id === activeCluster) ?? clusters[0],
    [activeCluster],
  );

  const clusterServices = cluster.serviceIds
    .map((serviceId) => serviceMap[serviceId])
    .filter((service): service is (typeof services)[number] => Boolean(service));

  return (
    <div className="space-y-5">
      <div className="grid gap-2 md:grid-cols-3">
        {clusters.map((entry) => {
          const isActive = entry.id === cluster.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActiveCluster(entry.id)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                isActive
                  ? "border-action/35 bg-action-tint text-foreground"
                  : "border-border bg-card hover:border-action/25"
              }`}
            >
              <p className="font-heading text-base leading-tight">{entry.title}</p>
              <p className="mt-1 text-xs text-text-body">{entry.description}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {clusterServices.map((service) => (
          <article key={service.id} className="glass-phaser rounded-2xl p-5">
            <h3 className="font-heading text-xl">{service.title}</h3>
            <p className="mt-2 text-sm text-text-body">{service.short}</p>
            <p className="mt-3 text-sm font-semibold text-brand-strong">
              {benefitLineByService[service.id]}
            </p>

            <details className="mt-4 rounded-xl border border-border/80 bg-card/75 p-3">
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                Mehr Details anzeigen
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-text-body">
                {service.outcomes.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>

            <TrackedCta
              href={service.href}
              variant="outline"
              className="mt-4"
              eventName="cta_service_view"
              eventProps={{ service: service.id, cluster: cluster.id }}
            >
              Leistung ansehen
            </TrackedCta>
          </article>
        ))}
      </div>
    </div>
  );
}
