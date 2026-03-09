import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import { localLandings, siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Einsatzgebiet",
  description:
    "Einsatzgebiet von Elektro Kunath rund um Pulsnitz, Oberlichtenau, Kamenz und Umgebung.",
  path: "/einsatzgebiet",
});

export default function EinsatzgebietPage() {
  return (
    <>
      <PageHero
        kicker="Regional"
        title="Einsatzgebiet rund um Pulsnitz"
        description="Regionale Nähe ermöglicht schnelle Abstimmung, planbare Termine und kurze Wege auf der Baustelle."
      >
        <Button asChild className="rounded-full">
          <Link href="/kontakt">Einsatz prüfen</Link>
        </Button>
      </PageHero>

      <SectionFrame title="Regelmäßige Einsatzorte">
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {siteConfig.serviceArea.map((place) => (
            <li key={place} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
              {place}
            </li>
          ))}
        </ul>
      </SectionFrame>

      <SectionFrame
        title="Lokale Fachseiten"
        description="Jede Seite enthält lokalen Kontext statt generischer Doorway-Texte."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {localLandings.map((local) => (
            <Link
              key={local.slug}
              href={`/${local.slug}`}
              className="rounded-2xl border border-border bg-card p-4 text-sm font-medium hover:border-primary/40"
            >
              {local.title}
            </Link>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}
