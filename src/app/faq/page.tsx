import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import { globalFaq, services } from "@/lib/site-config";
import { buildFaqSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Häufige Fragen zu Leistungen, Ablauf, Einsatzgebiet und Anfrageprozess bei Elektro Kunath.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd id="faq-page-schema" data={buildFaqSchema(globalFaq)} />

      <PageHero
        kicker="FAQ"
        title="Häufige Fragen"
        description="Wenn Ihre Frage nicht dabei ist, genügt eine kurze Nachricht oder ein Anruf."
      >
        <Button asChild className="rounded-full">
          <Link href="/kontakt">Frage senden</Link>
        </Button>
      </PageHero>

      <SectionFrame title="Allgemein">
        <div className="space-y-3">
          {globalFaq.map((entry) => (
            <details key={entry.question} className="rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none font-semibold">
                {entry.question}
              </summary>
              <p className="mt-3 text-sm text-foreground/80">{entry.answer}</p>
            </details>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame title="Leistungsbezogene Fragen">
        <div className="space-y-5">
          {services.map((service) => (
            <article key={service.id} className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-heading text-xl">{service.title}</h2>
              <div className="mt-3 space-y-2">
                {service.faq.map((entry) => (
                  <details key={entry.question} className="rounded-xl border border-border p-4">
                    <summary className="cursor-pointer list-none font-semibold">
                      {entry.question}
                    </summary>
                    <p className="mt-3 text-sm text-foreground/80">{entry.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}
