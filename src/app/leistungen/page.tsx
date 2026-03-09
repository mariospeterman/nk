import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-config";
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildServicesCollectionSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Leistungen",
  description:
    "Alle Leistungen von Elektro Kunath: Elektroinstallation, Licht, Photovoltaik, Smart Home, Prüfung, Baustrom und Vermietung.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <JsonLd id="services-list" data={buildServicesCollectionSchema()} />
      <JsonLd
        id="leistungen-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
        ])}
      />

      <PageHero
        kicker="Leistungsübersicht"
        title="Elektroleistungen für Zuhause, Bau und Gewerbe"
        description="Alle Bereiche sind auf saubere Umsetzung, klare Kommunikation und planbare Abläufe ausgerichtet."
      >
        <Button asChild className="rounded-full">
          <Link href="/kontakt">Projekt anfragen</Link>
        </Button>
      </PageHero>

      <SectionFrame title="Unsere Leistungen im Überblick">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-heading text-xl">{service.title}</h2>
              <p className="mt-3 text-sm text-foreground/82">{service.short}</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/75">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span aria-hidden>•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4"
              >
                Zur Leistungsseite
              </Link>
            </article>
          ))}

          <article className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-xl">Vermietung</h2>
            <p className="mt-3 text-sm text-foreground/82">
              Vermietung von Baustromverteilern mit optionaler Installation und
              klarer Abstimmung zu Ort, Zeitraum und Leistungsbedarf.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              <li className="flex gap-2">
                <span aria-hidden>•</span>
                <span>Temporäre Stromversorgung für Baustellen</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden>•</span>
                <span>Fachgerechte Installation auf Wunsch inklusive</span>
              </li>
            </ul>
            <Link
              href="/vermietung"
              className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4"
            >
              Zur Vermietungsseite
            </Link>
          </article>
        </div>
      </SectionFrame>
    </>
  );
}
