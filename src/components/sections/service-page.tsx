import Image from "next/image";
import Link from "next/link";

import { ExternalMediaEmbed } from "@/components/consent/external-media-embed";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import type { ServiceId, ServiceItem } from "@/lib/site-config";

type ServiceMediaConfig = {
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  video?: {
    title: string;
    embedUrl: string;
    sourceLabel: string;
    sourceHref?: string;
  };
};

const serviceMedia: Record<ServiceId, ServiceMediaConfig> = {
  elektroinstallation: {
    imageSrc: "/media/distribution-board.jpg",
    imageAlt: "Unterverteilung und Elektrokomponenten im Projektkontext",
    imageCaption:
      "Beispiel aus dem Projektumfeld: saubere Verteilungstechnik und strukturierte Ausführung.",
  },
  "licht-beleuchtung": {
    imageSrc: "/media/hero-electric-detail.jpg",
    imageAlt: "Technisches Detailbild aus dem Elektrohandwerk",
    imageCaption:
      "Detailaufnahme aus dem Arbeitskontext mit Fokus auf präzise elektrotechnische Umsetzung.",
  },
  photovoltaik: {
    imageSrc: "/media/hero-electric-detail.jpg",
    imageAlt: "Elektrotechnisches Detail für PV-nahe Projektarbeit",
    imageCaption:
      "Technische Anschlussdetails aus der Praxis für saubere Integration in bestehende Strukturen.",
  },
  "smart-home": {
    imageSrc: "/media/hero-electric-detail.jpg",
    imageAlt: "Elektrotechnisches Detail im Kontext moderner Gebäudetechnik",
    imageCaption:
      "Saubere Infrastruktur als Basis für alltagstaugliche Smart-Home-Lösungen.",
  },
  "pruefung-instandhaltung": {
    imageSrc: "/media/distribution-board.jpg",
    imageAlt: "Verteilungstechnik für Prüfung und Instandhaltung",
    imageCaption:
      "Praxisnaher Einblick: klare Struktur für systematische Prüfung und verlässliche Instandhaltung.",
  },
  "baustromverteiler-mieten": {
    imageSrc: "/media/distribution-board.jpg",
    imageAlt: "Elektrotechnische Komponenten im temporären Versorgungsumfeld",
    imageCaption:
      "Temporäre Versorgung braucht saubere Technik und klare Übergabepunkte.",
  },
};

export function ServicePage({ service }: { service: ServiceItem }) {
  const media = serviceMedia[service.id];

  return (
    <>
      <PageHero kicker="Leistung" title={service.title} description={service.short}>
        <Button asChild>
          <Link href="/kontakt">Projekt anfragen</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="tel:+4915222584989">Rückruf anfragen</a>
        </Button>
      </PageHero>

      <SectionFrame
        title="Ihr Nutzen"
        description="Die Umsetzung ist auf Klarheit, Sicherheit und eine saubere Abwicklung ausgelegt."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {service.outcomes.map((outcome, index) => (
            <Reveal key={outcome} delay={index * 0.08}>
              <div className="surface-default h-full p-5">
                <p className="text-kicker">Vorteil {index + 1}</p>
                <p className="mt-3 text-sm text-text-body">{outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        tone="section"
        title="Projekt-Einblick"
        description="Reale Projektbilder für einen schnellen Eindruck zur Arbeitsweise."
      >
        <div className={`grid gap-4 ${media.video ? "lg:grid-cols-2" : ""}`}>
          <article className="glass-phaser overflow-hidden rounded-2xl">
            <Image
              src={media.imageSrc}
              alt={media.imageAlt}
              width={1440}
              height={900}
              className="h-70 w-full object-cover md:h-80"
            />
            <p className="border-t border-border px-4 py-3 text-sm text-text-body">
              {media.imageCaption}
            </p>
          </article>

          {media.video ? (
            <ExternalMediaEmbed
              title={media.video.title}
              embedUrl={media.video.embedUrl}
              sourceLabel={media.video.sourceLabel}
              sourceHref={media.video.sourceHref}
            />
          ) : null}
        </div>
      </SectionFrame>

      <SectionFrame
        tone="section"
        title="So läuft es ab"
        description="Kurzer Intake, klare Priorisierung, strukturierte Umsetzung."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            "Anliegen klären und Rahmenbedingungen erfassen",
            "Technisch sinnvollen nächsten Schritt festlegen",
            "Fachgerechte Umsetzung und nachvollziehbare Rückmeldung",
          ].map((step, index) => (
            <li key={step} className="surface-default p-5">
              <p className="text-kicker">Schritt {index + 1}</p>
              <p className="mt-3 text-sm text-text-body">{step}</p>
            </li>
          ))}
        </ol>
      </SectionFrame>

      <SectionFrame title="Häufige Fragen" id="faq">
        <div className="space-y-3">
          {service.faq.map((entry) => (
            <details key={entry.question} className="surface-default rounded-xl p-4">
              <summary className="cursor-pointer list-none font-semibold text-foreground">
                {entry.question}
              </summary>
              <p className="mt-3 text-sm text-text-body">{entry.answer}</p>
            </details>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}
