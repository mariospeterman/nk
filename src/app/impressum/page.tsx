import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Impressum",
  description: "Impressum gemäß § 5 DDG für Elektro Kunath.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        kicker="Rechtliches"
        title="Impressum"
        description="Angaben gemäß § 5 DDG."
      />

      <SectionFrame title="Anbieter">
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground/85">
          <section>
            <h2 className="font-heading text-lg">Angaben gemäß § 5 DDG</h2>
            <p className="mt-2">
              {siteConfig.owner}
              <br />
              {siteConfig.name}
              <br />
              {siteConfig.street}
              <br />
              {siteConfig.postalCode} {siteConfig.city}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">Kontakt</h2>
            <p className="mt-2">
              Telefon: {siteConfig.phoneDisplay}
              <br />
              E-Mail: {siteConfig.email}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">Umsatzsteuer-ID</h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {siteConfig.vatId}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">Berufsbezeichnung und Kammer</h2>
            <p className="mt-2">
              Berufsbezeichnung: {siteConfig.profession}
              <br />
              Zuständige Kammer: {siteConfig.chamber}
              <br />
              Verliehen in: Dresden
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">Verbraucherstreitbeilegung</h2>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <p className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-foreground/70">
            Hinweis: Dieser Text ist als Website-Impressum bereitgestellt. Bitte bei
            Änderungen von Rechtsform, Registereintrag oder Berufsrecht kurzfristig
            aktualisieren.
          </p>
        </div>
      </SectionFrame>
    </>
  );
}
