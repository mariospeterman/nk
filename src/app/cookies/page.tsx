import { OpenSettingsButton } from "@/components/consent/open-settings-button";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie-Richtlinie",
  description:
    "Informationen zu Cookie-Kategorien und Einwilligungsverwaltung auf dieser Website.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <PageHero
        kicker="Rechtliches"
        title="Cookie- und Einwilligungsinformationen"
        description="Notwendige Cookies sind aktiv. Optionale Kategorien werden erst nach Einwilligung geladen."
      />

      <SectionFrame title="Kategorien">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground/84">
          <section>
            <h2 className="font-heading text-lg">1. Notwendig (immer aktiv)</h2>
            <p className="mt-2">
              Technisch erforderliche Einträge für Consent-Speicherung, Sicherheit und
              Basisfunktionen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">2. Analyse (optional)</h2>
            <p className="mt-2">
              Optionale Reichweitenmessung zur Verbesserung der Website. Diese Kategorie
              wird nur mit Einwilligung aktiviert.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">3. Externe Inhalte (optional)</h2>
            <p className="mt-2">
              Externe Karten- und Termininhalte werden erst nach Einwilligung geladen.
            </p>
          </section>

          <div className="pt-2">
            <OpenSettingsButton />
          </div>

          <p className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-foreground/70">
            Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG für
            optionale Kategorien; § 25 Abs. 2 TDDDG für technisch notwendige Zugriffe.
          </p>
        </div>
      </SectionFrame>
    </>
  );
}
