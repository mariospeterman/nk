import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Vermietung",
  description:
    "Vermietung von Baustromverteilern inklusive optionaler Installation und klarer Abstimmung im Raum Pulsnitz.",
  path: "/vermietung",
});

export default function VermietungPage() {
  return (
    <>
      <JsonLd
        id="vermietung-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Vermietung", path: "/vermietung" },
        ])}
      />

      <PageHero
        kicker="Vermietung"
        title="Baustromverteiler mieten, klar abgestimmt und sicher umgesetzt"
        description="Hier finden Sie eine kleine Auswahl an Groß- und Kleingeräten zur Vermietung. Bei Interesse nutzen Sie das Formular oder rufen direkt an."
      >
        <Button asChild className="rounded-full">
          <Link href="/kontakt">Vermietung anfragen</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="tel:+4915222584989">Direkt anrufen</a>
        </Button>
      </PageHero>

      <SectionFrame
        title="Baustromverteiler"
        description="Ein Baustromverteiler wird zur sicheren, temporären Stromversorgung von Baustellen eingesetzt."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <article className="surface-default p-5">
            <h2 className="font-heading text-xl">Temporäre Versorgung</h2>
            <p className="mt-3 text-sm text-text-body">
              Der Baustromverteiler deckt den temporären Strombedarf auf der Baustelle
              und verteilt die Versorgung sicher und nachvollziehbar.
            </p>
          </article>

          <article className="surface-default p-5">
            <h2 className="font-heading text-xl">Installation inklusive</h2>
            <p className="mt-3 text-sm text-text-body">
              Zusätzlich zur Vermietung biete ich auch die fachgerechte Installation des
              Baustromverteilers an.
            </p>
          </article>
        </div>
      </SectionFrame>

      <SectionFrame
        tone="section"
        title="So läuft die Vermietung ab"
        description="Kurze Anfrage, klare Abstimmung, saubere Bereitstellung."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            "Anfrage mit Ort, Zeitraum und Ansprechpartner senden",
            "Leistungsbedarf und Bereitstellung abstimmen",
            "Baustromverteiler bereitstellen und optional installieren",
          ].map((step, index) => (
            <li key={step} className="surface-default p-5">
              <p className="text-kicker">Schritt {index + 1}</p>
              <p className="mt-3 text-sm text-text-body">{step}</p>
            </li>
          ))}
        </ol>
      </SectionFrame>
    </>
  );
}
