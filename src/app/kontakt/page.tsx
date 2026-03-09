import Link from "next/link";
import { Suspense } from "react";

import { MapConsentCard } from "@/components/consent/map-consent-card";
import { BookingOptions } from "@/components/forms/booking-options";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt & Anfrage",
  description:
    "Projektanfrage, Rückruf oder Beratungstermin: Kontakt zu Elektro Kunath im Raum Pulsnitz.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        kicker="Kontakt"
        title="Projekt anfragen oder Rückruf vereinbaren"
        description="Sie müssen nicht alles fertig formuliert haben. Eine kurze Beschreibung reicht für die erste Einordnung."
      />

      <SectionFrame
        title="Termine und Rückrufe"
        description="Für planbare Anliegen können Sie direkt einen passenden Slot wählen."
      >
        <BookingOptions />
      </SectionFrame>

      <SectionFrame
        title="Anfrageformular"
        description="Mit optionalem Upload für Fotos und Pläne."
      >
        <Suspense
          fallback={
            <div className="rounded-3xl border border-border bg-card p-6 text-sm text-foreground/75">
              Anfrageformular wird geladen ...
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </SectionFrame>

      <SectionFrame title="Standort & Kontaktdaten">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-xl">{siteConfig.name}</h2>
            <p className="mt-3 text-sm text-foreground/80">
              {siteConfig.owner}
              <br />
              {siteConfig.role}
              <br />
              {siteConfig.street}
              <br />
              {siteConfig.postalCode} {siteConfig.city}
            </p>

            <p className="mt-4 text-sm text-foreground/80">
              Telefon: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              <br />
              E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>

            <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4 text-sm">
              <p className="font-semibold">Öffnungszeiten</p>
              <ul className="mt-2 space-y-1 text-foreground/80">
                {siteConfig.openingHours.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-xs text-foreground/70">
              Rechtliche Hinweise zur Datenverarbeitung finden Sie in unserer{" "}
              <Link href="/datenschutz" className="underline underline-offset-4">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>

          <MapConsentCard />
        </div>
      </SectionFrame>
    </>
  );
}
