import Image from "next/image";
import Link from "next/link";
import { CircleCheck, ShieldCheck, Workflow } from "lucide-react";

import { TrackedCta } from "@/components/analytics/tracked-cta";
import { LeadIntakeAssistant } from "@/components/forms/lead-intake-assistant";
import { ContextSelectorAdaptive } from "@/components/home/context-selector-adaptive";
import { ServiceIntelligenceLayer } from "@/components/home/service-intelligence-layer";
import { Reveal } from "@/components/motion/reveal";
import { SignalPointerOverlay } from "@/components/motion/signal-pointer-overlay";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionFrame } from "@/components/sections/section-frame";
import { globalFaq, projects, siteConfig } from "@/lib/site-config";
import {
  buildFaqSchema,
  buildMetadata,
  buildServicesCollectionSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Elektriker Pulsnitz | Klar. Sicher. Sauber.",
  description:
    "Wenn es sicher werden soll, muss es sauber gedacht sein. Elektro Kunath bringt Klarheit in Elektro, Licht, PV und Smart Home im Raum Pulsnitz.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd id="faq-home" data={buildFaqSchema(globalFaq)} />
      <JsonLd id="services-home" data={buildServicesCollectionSchema()} />

      <section className="signal-grid relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_9%_3%,rgba(47,143,78,0.18),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(14,74,123,0.2),transparent_42%),linear-gradient(180deg,#fcfcfa_0%,#f6f4ee_100%)]">
        <SignalPointerOverlay />
        <div className="site-container relative z-10 screen-zone grid items-start gap-5 py-5 md:py-7 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="min-w-0 lg:self-center">
            <div className="grid w-full grid-cols-3 gap-1.5 pb-1 md:flex md:gap-2 md:overflow-x-auto md:no-scrollbar">
              {[
                "Meisterbetrieb",
                "Klare Erstklärung",
                "Saubere Umsetzung",
              ].map((item) => (
                <span
                  key={item}
                  className="eyebrow min-w-0 w-full justify-center px-1.5 py-1 text-center text-[9px] tracking-[0.04em] md:w-auto md:shrink-0 md:whitespace-nowrap md:px-3 md:text-[11px] md:tracking-[0.14em]"
                >
                  {item}
                </span>
              ))}
            </div>

            <h1 className="mt-4 max-w-3xl wrap-break-word font-heading text-[1.85rem] leading-[1.05] sm:text-[2.05rem] md:text-[2.75rem] lg:text-[3.3rem]">
              Bringen Sie Licht ins dunkle.
              <br className="hidden md:block" />
              {" "}Sauber geplant, sicher umgesetzt.
            </h1>

            <p className="mt-4 max-w-2xl wrap-break-word text-[0.98rem] leading-relaxed text-text-body md:text-[1.04rem]">
              Für Haus, Sanierung, Bestand und kleinere Gewerbeprojekte im Raum Pulsnitz.
              Sie bekommen klare Einordnung, nachvollziehbare Schritte und Technik, die im
              Alltag zuverlässig funktioniert.
            </p>

            <p className="mt-2.5 max-w-2xl wrap-break-word text-sm text-text-body">
              Installation, Modernisierung, PV-Einbindung, Licht oder Prüfung: Sie
              schildern kurz Ihr Anliegen, wir zeigen den nächsten sinnvollen Schritt.
            </p>

          </div>

          <div className="relative min-w-0">
            <div className="glass-phaser signal-path mb-2 overflow-hidden rounded-2xl">
              <Image
                src="/media/hero-electric-detail.jpg"
                alt="Technische Elektrodetails bei Elektro Kunath"
                width={1920}
                height={600}
                className="h-14 w-full object-cover sm:h-20 lg:h-24"
                priority
              />
            </div>
            <Reveal delay={0.06}>
              <LeadIntakeAssistant />
            </Reveal>
          </div>
        </div>
      </section>

      <SectionFrame
        kicker="Ihr Gewinn auf den ersten Blick"
        title="Was mit Elektro Kunath sofort leichter wird"
        description="Weniger Unklarheit. Weniger Risiko. Mehr Ruhe im Projekt und im Alltag."
        className="signal-grid"
        contentClassName="py-10 md:py-12"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Schneller klar",
              text: "Sie wissen früh, was sinnvoll ist — statt Tage mit offenen Fragen zu verlieren.",
              icon: CircleCheck,
              tone: "surface-tint-green",
            },
            {
              title: "Weniger Risiko",
              text: "Saubere elektrotechnische Planung verhindert teure Nacharbeit und unnötige Schleifen.",
              icon: ShieldCheck,
              tone: "surface-tint-blue",
            },
            {
              title: "Mehr Ruhe im Alltag",
              text: "Technik funktioniert nicht nur auf dem Papier, sondern dort, wo sie jeden Tag gebraucht wird.",
              icon: Workflow,
              tone: "surface-tint-amber",
            },
          ].map((entry) => (
            <article key={entry.title} className={`surface-default p-5 ${entry.tone}`}>
              <div className="inline-flex rounded-full border border-border/80 bg-card p-2">
                <entry.icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="mt-4 font-heading text-xl">{entry.title}</h3>
              <p className="mt-3 text-sm text-text-body">{entry.text}</p>
            </article>
          ))}
        </div>

        <div className="facts-strip mt-4 grid-cols-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <span className="font-medium text-foreground lg:whitespace-nowrap">
            klare Einordnung
          </span>
          <span className="font-medium text-foreground lg:whitespace-nowrap">
            sichere Ausführung
          </span>
          <span className="font-medium text-foreground lg:whitespace-nowrap">
            nachvollziehbare Schritte
          </span>
          <span className="font-medium text-foreground lg:whitespace-nowrap">
            Regionale Erreichbarkeit
          </span>
        </div>
      </SectionFrame>

      <SectionFrame
        tone="section"
        kicker="Startpunkt"
        title="Wo stehen Sie gerade?"
        description="Wählen Sie den Kontext, der zu Ihrem Anliegen passt. Danach wird der Weg konkreter."
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <ContextSelectorAdaptive />
      </SectionFrame>

      <SectionFrame
        kicker="Leistungen"
        title="Was Elektro Kunath für Sie klarer und sicherer macht"
        description="Technisch präzise. Verständlich erklärt. Sauber umgesetzt."
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <ServiceIntelligenceLayer />
      </SectionFrame>

      <SectionFrame
        tone="section"
        kicker="Ablauf"
        title="So wird aus einem Anliegen ein präziser nächster Schritt"
        description="Klar im Ablauf. Ruhig in der Kommunikation. Sauber in der Umsetzung."
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Sie schildern kurz, was ansteht",
              text: "Ein paar Eckdaten, Fotos oder ein Plan reichen oft schon.",
            },
            {
              title: "Sie bekommen eine klare Einordnung",
              text: "Verständlich, direkt und ohne Technikkauderwelsch.",
            },
            {
              title: "Es wird passend umgesetzt",
              text: "Sicher, nachvollziehbar und abgestimmt auf Objekt und Nutzung.",
            },
          ].map((step, index) => (
            <li key={step.title} className="glass-phaser rounded-2xl p-5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-action text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 font-heading text-lg leading-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </SectionFrame>

      <SectionFrame
        kicker="Praxis statt Prospekt"
        title="So sieht saubere Lösung in echt aus"
        description="Keine Marketingmärchen. Sondern reale Ausgangslagen, klare Maßnahmen und greifbare Ergebnisse."
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="glass-phaser overflow-hidden rounded-2xl">
            <Image
              src="/media/distribution-board.jpg"
              alt="Verteilungstechnik als Beispiel aus dem Praxisalltag"
              width={900}
              height={400}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-text-body">
                Reale Projektfotos aus dem Betriebskontext werden fortlaufend ergänzt.
              </p>
            </div>
          </article>

          <div className="grid gap-3">
            {projects.map((project) => (
              <details key={project.title} className="glass-phaser rounded-xl p-4">
                <summary className="cursor-pointer list-none font-heading text-lg">
                  {project.title}
                </summary>
                <p className="mt-2 text-sm text-text-muted">{project.context}</p>
                <p className="mt-2 text-sm text-text-body">
                  <strong>Ausgangslage:</strong> {project.challenge}
                </p>
                <p className="mt-1 text-sm text-text-body">
                  <strong>Lösung:</strong> {project.implementation}
                </p>
                <p className="mt-1 text-sm text-text-body">
                  <strong>Ergebnis:</strong> {project.result}
                </p>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          Weitere anonymisierte Praxisbeispiele zeigen wir im passenden Gesprächskontext.
        </p>
      </SectionFrame>

      <SectionFrame
        tone="section"
        kicker="Warum Kunath"
        title="Damit es nicht im Kabelsalat endet"
        description="Wer mit Elektro zu tun hat, braucht nicht noch mehr offene Schleifen, Rückfragen und halbe Lösungen. Sondern einen Ansprechpartner, der ruhig sortiert, verständlich einordnet und sauber umsetzt."
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Ein Ansprechpartner statt Zuständigkeitschaos",
            "Klare Einordnung statt offener Fragen",
            "Saubere Umsetzung statt späterer Korrektur",
            "Regionale Nähe statt Funkstille",
          ].map((point) => (
            <article key={point} className="surface-default p-4">
              <p className="text-sm font-medium text-foreground">{point}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold text-action-strong">
          Kurz gesagt: weniger Reibung, mehr Lösung.
        </p>
      </SectionFrame>

      <SectionFrame
        kicker="Region"
        title="Schnell vor Ort im Raum Pulsnitz"
        description="Regional betreut, mit kurzen Wegen und klarer Erreichbarkeit."
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <ul className="flex flex-wrap gap-2">
          {siteConfig.serviceArea.map((area) => (
            <li
              key={area}
              className="rounded-full border border-brand/20 bg-brand-tint px-3 py-1 text-sm font-medium text-brand-strong"
            >
              {area}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-text-body">
          Wenn Ihr Ort in der Nähe liegt, klären wir die Einsatzmöglichkeit direkt im
          Erstkontakt.
        </p>
      </SectionFrame>

      <SectionFrame
        tone="section"
        kicker="Fragen, die schnell geklärt sind"
        title="Was oft vor dem ersten Kontakt wichtig ist"
        className="signal-grid"
        contentClassName="py-12 md:py-14"
      >
        <div className="space-y-3">
          {globalFaq.map((entry) => (
            <details key={entry.question} className="surface-default rounded-xl p-4">
              <summary className="cursor-pointer list-none font-semibold text-foreground">
                {entry.question}
              </summary>
              <p className="mt-3 text-sm text-text-body">{entry.answer}</p>
            </details>
          ))}
        </div>
      </SectionFrame>

      <section className="signal-grid pb-8 md:pb-16">
        <div className="site-container">
          <div className="glass-phaser signal-path rounded-3xl border border-action/40 p-6 md:p-9">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <h2 className="max-w-3xl font-heading text-2xl leading-tight md:text-4xl">
                  Ein Anliegen. Ein klarer nächster Schritt.
                </h2>
                <p className="mt-4 max-w-2xl text-sm text-text-body md:text-base">
                  Beschreiben Sie kurz Ihr Projekt. Elektro Kunath meldet sich mit
                  Orientierung — nicht mit Komplexität.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <TrackedCta
                    href="/kontakt"
                    variant="brand"
                    eventName="cta_home_final_project_start"
                    eventProps={{ area: "final_band" }}
                  >
                    Projekt starten
                  </TrackedCta>
                  <TrackedCta
                    href={siteConfig.phoneHref}
                    variant="outline"
                    eventName="cta_home_final_call"
                    eventProps={{ area: "final_band" }}
                  >
                    Direkt anrufen
                  </TrackedCta>
                </div>
                <p className="mt-3 text-xs text-text-muted">
                  Meisterbetrieb · Regionale Betreuung · Saubere Ausführung
                </p>
              </div>

              <div className="surface-default p-5">
                <h3 className="font-heading text-xl">Standort & Kontaktdaten</h3>
                <p className="mt-3 text-sm text-text-body">
                  {siteConfig.name}
                  <br />
                  {siteConfig.owner}
                  <br />
                  {siteConfig.role}
                  <br />
                  {siteConfig.street}
                  <br />
                  {siteConfig.postalCode} {siteConfig.city}
                </p>
                <p className="mt-3 text-sm text-text-body">
                  Telefon: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                  <br />
                  E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </p>
                <Link href="/kontakt" className="arrow-link mt-3">
                  Zur vollständigen Kontaktseite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
