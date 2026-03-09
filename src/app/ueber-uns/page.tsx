import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Über uns",
  description:
    "Elektro Kunath ist ein meistergeführter Fachbetrieb mit regionalem Fokus auf Pulsnitz und Umgebung.",
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        kicker="Über uns"
        title="Meisterbetrieb mit Fokus auf Klarheit, Sicherheit und Entlastung"
        description="Elektro Kunath verbindet fachliche Präzision mit verständlicher Kommunikation und strukturierten Abläufen."
      >
        <Button asChild className="rounded-full">
          <Link href="/kontakt">Kontakt aufnehmen</Link>
        </Button>
      </PageHero>

      <SectionFrame title="Wofür wir stehen">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Klarheit",
              text: "Verständliche Einschätzungen statt technischer Unschärfe.",
            },
            {
              title: "Sicherheit",
              text: "Fachgerechte Ausführung mit Blick auf Langzeitstabilität.",
            },
            {
              title: "Entlastung",
              text: "Weniger Abstimmungschaos durch strukturierte Projektführung.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-heading text-xl">{item.title}</h2>
              <p className="mt-3 text-sm text-foreground/82">{item.text}</p>
            </article>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame title="Betriebsdaten">
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-foreground/82">
          <p>
            <strong>{siteConfig.name}</strong>
            <br />
            {siteConfig.owner} · {siteConfig.role}
            <br />
            {siteConfig.street}, {siteConfig.postalCode} {siteConfig.city}
          </p>
          <p className="mt-3">
            Zuständige Kammer: {siteConfig.chamber}
            <br />
            Berufsbezeichnung: {siteConfig.profession}
          </p>
        </div>
      </SectionFrame>
    </>
  );
}
