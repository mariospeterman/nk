import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Datenschutz",
  description: "Datenschutzhinweise gemäß DSGVO und TDDDG für diese Website.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        kicker="Rechtliches"
        title="Datenschutzerklärung"
        description="Informationen zur Verarbeitung personenbezogener Daten auf dieser Website."
      />

      <SectionFrame title="1. Verantwortliche Stelle">
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground/85">
          <p>
            Verantwortlich im Sinne der DSGVO ist:
            <br />
            {siteConfig.name}
            <br />
            Inh. {siteConfig.owner}
            <br />
            {siteConfig.street}
            <br />
            {siteConfig.postalCode} {siteConfig.city}
            <br />
            E-Mail: {siteConfig.email}
            <br />
            Telefon: {siteConfig.phoneDisplay}
          </p>

          <section>
            <h2 className="font-heading text-lg">2. Zwecke und Rechtsgrundlagen</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Bereitstellung und Sicherheit der Website (Art. 6 Abs. 1 lit. f DSGVO)
              </li>
              <li>
                Bearbeitung von Anfragen und vorvertraglichen Maßnahmen (Art. 6 Abs. 1
                lit. b DSGVO)
              </li>
              <li>
                Einwilligungsbasierte optionale Dienste wie Analyse oder externe Inhalte
                (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg">3. Server-Logdaten</h2>
            <p className="mt-2">
              Beim Aufruf der Website können technisch erforderliche Logdaten (z. B.
              IP-Adresse, Zeitpunkt, User-Agent, angeforderte Ressource) verarbeitet
              werden. Die Verarbeitung erfolgt zur Stabilität, Sicherheit und
              Missbrauchserkennung.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">4. Kontaktformular und Lead-Verarbeitung</h2>
            <p className="mt-2">
              Bei Nutzung des Kontaktformulars verarbeiten wir die von Ihnen übermittelten
              Daten (Kontaktinformationen, Projektangaben, optional hochgeladene Dateien)
              zur Bearbeitung Ihres Anliegens. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b
              DSGVO (vorvertragliche Kommunikation) und ggf. Art. 6 Abs. 1 lit. a DSGVO
              bei optionalen Einwilligungen.
            </p>
            <p className="mt-2">
              Uploads können in einer geschützten Projekt- oder Lead-Ablage gespeichert
              werden. Die Speicherdauer richtet sich nach Zweck, gesetzlichen
              Aufbewahrungspflichten und Löschfristen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">5. Termine / Cal.com</h2>
            <p className="mt-2">
              Für Terminbuchungen kann auf einen externen Buchungsdienst (Cal.com)
              verlinkt werden. Erst beim Klick auf einen Terminlink gelten die
              Datenschutzhinweise des jeweiligen Anbieters.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">6. Karteninhalte</h2>
            <p className="mt-2">
              Externe Karteninhalte (z. B. OpenStreetMap-Embed) werden nur nach aktiver
              Einwilligung in die Kategorie &quot;Externe Inhalte&quot; geladen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">7. Analyse</h2>
            <p className="mt-2">
              Optionale Reichweitenmessung wird erst nach Einwilligung aktiviert. Ohne
              Einwilligung werden keine optionalen Analyse-Skripte geladen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">8. KI-Assistenz im Anfrageprozess</h2>
            <p className="mt-2">
              Wenn Sie optional zustimmen, kann eine KI bei der internen Strukturierung
              Ihrer Anfrage unterstützen. Es erfolgt keine ausschließlich automatisierte
              Entscheidung. Die finale Bearbeitung erfolgt durch Menschen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">9. Empfänger und Auftragsverarbeitung</h2>
            <p className="mt-2">
              Wir setzen bei Bedarf technische Dienstleister (z. B. Hosting,
              Formverarbeitung, E-Mail-Versand, Terminbuchung) als Auftragsverarbeiter
              oder eigenständige Verantwortliche ein. Entsprechende Verträge und
              Rechtsgrundlagen werden intern dokumentiert.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">10. Speicherdauer</h2>
            <p className="mt-2">
              Personenbezogene Daten werden nur solange gespeichert, wie dies für den
              jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten
              bestehen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">11. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung,
              Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen.
              Einwilligungen können jederzeit mit Wirkung für die Zukunft widerrufen
              werden.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg">12. Beschwerderecht</h2>
            <p className="mt-2">
              Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu
              beschweren.
            </p>
          </section>

          <p className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-foreground/70">
            Letzte Aktualisierung: 8. März 2026. Diese Seite ist ein praxisnahes
            Datenschutz-Template und sollte vor Livegang final juristisch geprüft
            werden.
          </p>

          <p className="text-xs text-foreground/70">
            Ergänzend: <Link href="/cookies">Cookie-Informationen</Link>.
          </p>
        </div>
      </SectionFrame>
    </>
  );
}
