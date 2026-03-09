import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Über uns",
  description:
    "Nico Kunath ist Elektrotechnikermeister mit regionalem Fokus auf Pulsnitz, Oberlichtenau, Kamenz und Umgebung.",
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        kicker="Über mich"
        title="Herzlich willkommen bei Elektro Kunath"
        description="Ich bin Nico Kunath, Elektrotechnikermeister mit Fokus auf saubere Ausführung, klare Einschätzung und zuverlässige Betreuung in der Region."
      >
        <Button asChild className="rounded-full">
          <Link href="/kontakt">Kontakt aufnehmen</Link>
        </Button>
      </PageHero>

      <SectionFrame
        title="Über mich"
        description="Persönlich, regional und fachlich klar aufgestellt."
      >
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <p className="text-sm leading-relaxed text-foreground/82">
            Seit 2012 bin ich im Elektrohandwerk tätig, seit 2022 als
            Elektrotechnikermeister. Mein Ziel ist eine Umsetzung, die technisch sauber,
            nachvollziehbar und alltagstauglich ist.
          </p>
          <p className="text-sm leading-relaxed text-foreground/82">
            Ich betreue Projekte im Raum Pulsnitz, Oberlichtenau, Kamenz und Umgebung.
            Ob Installation, Modernisierung, Prüfung, Licht, PV oder Smart Home: Sie
            bekommen eine klare Einordnung und einen verlässlichen nächsten Schritt.
          </p>
        </div>
      </SectionFrame>

      <SectionFrame title="Wofür ich stehe">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Klarheit",
              text: "Verständliche Einschätzung statt technischer Unschärfe.",
            },
            {
              title: "Sicherheit",
              text: "Fachgerechte Ausführung mit Blick auf langfristige Stabilität.",
            },
            {
              title: "Verlässlichkeit",
              text: "Direkte Abstimmung und saubere Umsetzung ohne unnötige Schleifen.",
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
