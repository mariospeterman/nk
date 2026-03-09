export const siteConfig = {
  siteUrl: "https://www.elektro-kunath.de",
  name: "Elektro Kunath",
  legalName: "Elektro Kunath, Inh. Nico Kunath",
  owner: "Nico Kunath",
  role: "Elektrotechnikermeister",
  street: "Mühlweg 16",
  postalCode: "01896",
  city: "Pulsnitz",
  region: "Sachsen",
  country: "DE",
  email: "info@elektro-kunath.de",
  phoneDisplay: "+49 152 22 58 49 89",
  phoneHref: "tel:+4915222584989",
  vatId: "DE359984033",
  chamber: "Handwerkskammer Dresden",
  profession: "Elektroniker für Energie- und Gebäudetechnik",
  coordinates: {
    lat: 51.2214272,
    lng: 13.9917974,
  },
  openingHours: [
    "Mo-Fr 07:30-18:00",
    "Sa 09:00-13:00",
  ],
  serviceArea: [
    "Pulsnitz",
    "Oberlichtenau",
    "Kamenz",
    "Großröhrsdorf",
    "Arnsdorf",
    "Radeberg",
  ],
} as const;

export type ServiceId =
  | "elektroinstallation"
  | "licht-beleuchtung"
  | "photovoltaik"
  | "smart-home"
  | "pruefung-instandhaltung"
  | "baustromverteiler-mieten";

export type ServiceItem = {
  id: ServiceId;
  title: string;
  href: string;
  short: string;
  outcomes: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const services: ServiceItem[] = [
  {
    id: "elektroinstallation",
    title: "Elektroinstallation",
    href: "/elektroinstallation",
    short:
      "Stromkreise, Verteilungen, Anschlüsse und Erweiterungen — so aufgebaut, dass sie heute funktionieren und morgen mitwachsen.",
    outcomes: [
      "Sie erhalten sichere Ausführung nach aktuellem Stand der Technik.",
      "Sie bekommen klare Planung statt ungeklärter Nachträge.",
      "Sie erhalten eine saubere Übergabe mit nachvollziehbarer Dokumentation.",
    ],
    faq: [
      {
        question: "Übernehmen Sie auch Teilsanierungen im Bestand?",
        answer:
          "Ja. Wir prüfen den Ist-Zustand, priorisieren Sicherheits- und Funktionspunkte und setzen die Modernisierung in sinnvollen Etappen um.",
      },
      {
        question: "Machen Sie auch Unterverteilungen und Zählerschrank-Themen?",
        answer:
          "Ja. Wir planen und installieren Unterverteilungen und stimmen notwendige Schritte mit Netzbetreiber und Projektpartnern ab.",
      },
    ],
  },
  {
    id: "licht-beleuchtung",
    title: "Licht & Beleuchtung",
    href: "/licht-beleuchtung",
    short:
      "Licht, das Räume sicherer, klarer und angenehmer macht — innen wie außen.",
    outcomes: [
      "Sie gewinnen bessere Orientierung und Sicherheit im Alltag.",
      "Sie erhalten passende Lichtzonen für Wohnen, Arbeiten und Außenflächen.",
      "Sie profitieren von effizienter, wartungsarmer Umsetzung.",
    ],
    faq: [
      {
        question: "Bieten Sie auch Außenbeleuchtung an?",
        answer:
          "Ja. Wir planen und installieren funktionale sowie atmosphärische Außenbeleuchtung inklusive sinnvoller Steuerung.",
      },
      {
        question: "Kann bestehende Beleuchtung modernisiert werden?",
        answer:
          "In vielen Fällen ja. Wir prüfen die vorhandene Installation und zeigen auf, welche Umrüstung technisch und wirtschaftlich sinnvoll ist.",
      },
    ],
  },
  {
    id: "photovoltaik",
    title: "Photovoltaik",
    href: "/photovoltaik",
    short:
      "PV sauber eingebunden, damit Erzeugung, Bestand und Erweiterung wirklich zusammenpassen.",
    outcomes: [
      "Sie erhalten eine technisch saubere Einbindung in den Bestand.",
      "Sie profitieren von klaren Schnittstellen zwischen Gewerken.",
      "Sie bleiben flexibel für spätere Erweiterungen.",
    ],
    faq: [
      {
        question: "Installieren Sie komplette PV-Anlagen?",
        answer:
          "Wir fokussieren uns auf die elektrotechnische Planung und Einbindung. Für angrenzende Gewerke stimmen wir uns mit passenden Partnern ab.",
      },
      {
        question: "Sind Erweiterungen bestehender Systeme möglich?",
        answer:
          "Ja, nach technischer Prüfung der vorhandenen Anlage und der elektrischen Infrastruktur.",
      },
    ],
  },
  {
    id: "smart-home",
    title: "Smart Home",
    href: "/smart-home",
    short:
      "Steuerung mit echtem Nutzen: weniger Wege, mehr Kontrolle, mehr Komfort.",
    outcomes: [
      "Sie steuern Licht, Energie und Komfort einfacher und gezielter.",
      "Sie bekommen nur Automationen mit klarem Nutzen.",
      "Sie behalten eine verständliche, alltagstaugliche Bedienung.",
    ],
    faq: [
      {
        question: "Funktioniert Smart Home auch im Bestand?",
        answer:
          "Ja. Wir wählen die Technik passend zur vorhandenen Installation und zum gewünschten Komfortniveau.",
      },
      {
        question: "Muss ich alles per App steuern?",
        answer:
          "Nein. Wir planen Bedienkonzepte mit Schaltern, Szenen und optionaler App-Steuerung so, dass es alltagstauglich bleibt.",
      },
    ],
  },
  {
    id: "pruefung-instandhaltung",
    title: "Prüfung & Instandhaltung",
    href: "/pruefung-instandhaltung",
    short:
      "Wenn etwas nicht stimmt, zählt keine Vermutung, sondern eine schnelle saubere Einordnung.",
    outcomes: [
      "Sie erhalten schnelle technische Einordnung statt Vermutungen.",
      "Sie bekommen klare Prioritäten für die nächsten Maßnahmen.",
      "Sie stellen die Betriebssicherheit verlässlich wieder her.",
    ],
    faq: [
      {
        question: "Wie läuft eine Fehlersuche ab?",
        answer:
          "Wir erfassen Symptome und Randbedingungen, prüfen die Anlage systematisch und erklären die nächsten Schritte transparent.",
      },
      {
        question: "Bieten Sie wiederkehrende Prüfungen an?",
        answer:
          "Ja, für passende Objekt- und Nutzungsprofile mit klar dokumentierten Ergebnissen.",
      },
    ],
  },
  {
    id: "baustromverteiler-mieten",
    title: "Baustromverteiler mieten",
    href: "/baustromverteiler-mieten",
    short: "Baustrom ohne Theater: bereitgestellt, angeschlossen, abgestimmt.",
    outcomes: [
      "Sie profitieren von kurzen Reaktionswegen.",
      "Sie erhalten klare Abstimmung für Bereitstellung und Rücknahme.",
      "Sie bekommen planbare Versorgung für temporäre Einsätze.",
    ],
    faq: [
      {
        question: "Wie kurzfristig ist Baustrom möglich?",
        answer:
          "Das hängt von Netz- und Baustellensituation ab. Nach kurzer Klärung nennen wir realistische Zeitfenster.",
      },
      {
        question: "Was wird für die Anfrage benötigt?",
        answer:
          "Ort, Zeitraum, Leistungsbedarf und Ansprechpartner vor Ort reichen in der Regel für die erste Einschätzung.",
      },
    ],
  },
];

export type LocalLanding = {
  slug:
    | "elektriker-pulsnitz"
    | "elektriker-oberlichtenau"
    | "elektriker-kamenz"
    | "photovoltaik-elektriker-pulsnitz"
    | "smart-home-pulsnitz"
    | "baustromverteiler-mieten-pulsnitz";
  title: string;
  h1: string;
  description: string;
  focus: string[];
  serviceIds: ServiceId[];
};

export const localLandings: LocalLanding[] = [
  {
    slug: "elektriker-pulsnitz",
    title: "Elektriker in Pulsnitz",
    h1: "Elektriker in Pulsnitz: Klarheit und saubere Ausführung",
    description:
      "Elektroinstallation, Modernisierung, Licht, Smart Home und Prüfung im Raum Pulsnitz mit klaren Abläufen.",
    focus: [
      "Kurze Wege für Abstimmung und Vor-Ort-Termine",
      "Planbare Umsetzung für Neubau, Bestand und Gewerbe",
      "Transparente Kommunikation ohne Fachchinesisch",
    ],
    serviceIds: [
      "elektroinstallation",
      "licht-beleuchtung",
      "smart-home",
      "pruefung-instandhaltung",
    ],
  },
  {
    slug: "elektriker-oberlichtenau",
    title: "Elektriker in Oberlichtenau",
    h1: "Elektroleistungen in Oberlichtenau mit Meisterbetrieb-Fokus",
    description:
      "Für private und gewerbliche Objekte in Oberlichtenau: von der Installation bis zur Instandhaltung.",
    focus: [
      "Regionale Betreuung mit direkter Erreichbarkeit",
      "Durchdachte Lösungen für Bestand und Modernisierung",
      "Klare nächste Schritte bereits ab der Erstanfrage",
    ],
    serviceIds: [
      "elektroinstallation",
      "licht-beleuchtung",
      "pruefung-instandhaltung",
    ],
  },
  {
    slug: "elektriker-kamenz",
    title: "Elektriker in Kamenz",
    h1: "Elektriker für Kamenz: strukturiert geplant, fachgerecht umgesetzt",
    description:
      "Elektro, Licht, Smart Home und Wartung für Kamenz und Umgebung mit verlässlicher Projektabwicklung.",
    focus: [
      "Geeignet für Einfamilienhaus, Sanierung und kleine Gewerbeobjekte",
      "Saubere Absprachen und nachvollziehbare Umsetzung",
      "Leistungen mit dokumentierbarer Ausführung",
    ],
    serviceIds: [
      "elektroinstallation",
      "smart-home",
      "pruefung-instandhaltung",
      "photovoltaik",
    ],
  },
  {
    slug: "photovoltaik-elektriker-pulsnitz",
    title: "Photovoltaik Elektriker Pulsnitz",
    h1: "Photovoltaik-Elektrotechnik in Pulsnitz",
    description:
      "Elektrotechnische Einbindung von PV-Projekten im Raum Pulsnitz, inkl. Vorbereitung und Erweiterung.",
    focus: [
      "Saubere Schnittstellen zu PV-Partnern und Gewerken",
      "Zukunftssichere Planung für spätere Ausbaustufen",
      "Klare technische Bewertung des Bestands",
    ],
    serviceIds: ["photovoltaik", "elektroinstallation"],
  },
  {
    slug: "smart-home-pulsnitz",
    title: "Smart Home Pulsnitz",
    h1: "Smart Home in Pulsnitz mit klarem Alltagsnutzen",
    description:
      "Smarte Steuerung für Licht, Komfort und Energie, die im Alltag einfach funktioniert.",
    focus: [
      "Nachrüstung im Bestand und Integration im Neubau",
      "Bedienkonzepte ohne unnötige Komplexität",
      "Kombination mit Licht und Energie-Themen",
    ],
    serviceIds: ["smart-home", "licht-beleuchtung", "elektroinstallation"],
  },
  {
    slug: "baustromverteiler-mieten-pulsnitz",
    title: "Baustromverteiler mieten Pulsnitz",
    h1: "Baustromverteiler in Pulsnitz mieten",
    description:
      "Temporäre Stromversorgung für Baustellen im Raum Pulsnitz mit klarer Bereitstellung und Abstimmung.",
    focus: [
      "Schneller Anfrageprozess mit klaren Pflichtangaben",
      "Planbare Bereitstellung und Rücknahme",
      "Direkte Kommunikation mit Ansprechpartnern vor Ort",
    ],
    serviceIds: ["baustromverteiler-mieten", "pruefung-instandhaltung"],
  },
];

export const globalFaq = [
  {
    question: "Für welche Orte sind Sie im Einsatz?",
    answer:
      "Schwerpunkt ist Pulsnitz mit Oberlichtenau, Kamenz, Großröhrsdorf, Arnsdorf und Radeberg. Weitere Orte klären wir direkt im Erstkontakt.",
  },
  {
    question: "Wie schnell melden Sie sich zurück?",
    answer:
      "In der Regel kurzfristig. Bei zeitkritischen Anliegen bitte zusätzlich direkt anrufen.",
  },
  {
    question: "Kann ich Fotos oder Pläne mitsenden?",
    answer:
      "Ja. Das beschleunigt die Einordnung deutlich und reduziert Rückfragen.",
  },
  {
    question: "Gibt es Rückruftermine?",
    answer:
      "Ja. Rückruf- und Beratungsslots können direkt gebucht werden.",
  },
  {
    question: "Was passiert nach meiner Anfrage?",
    answer:
      "Sie erhalten eine Referenz und eine klare Rückmeldung zum nächsten sinnvollen Schritt.",
  },
  {
    question: "Wird mein Anliegen automatisiert entschieden?",
    answer:
      "Nein. Digitale Vorstrukturierung dient nur der Vorbereitung. Die Entscheidung trifft immer ein Mensch.",
  },
];

export type ProjectExample = {
  title: string;
  context: string;
  challenge: string;
  implementation: string;
  result: string;
  proof: string;
};

export const projects: ProjectExample[] = [
  {
    title: "Altbausanierung mit neuer Unterverteilung",
    context: "Bestandsobjekt, schrittweise Modernisierung",
    challenge: "Uneinheitlicher Bestand und fehlende Reserven für neue Lasten.",
    implementation:
      "Stufenweise Erneuerung der Verteilung mit klar priorisierten Sicherheitsmaßnahmen.",
    result: "Mehr Betriebssicherheit und saubere Basis für spätere Erweiterungen.",
    proof:
      "Anonymisierter Praxisfall. Nachweise und Detailunterlagen im Erstgespräch auf Anfrage.",
  },
  {
    title: "Lichtkonzept für Wohn- und Außenbereich",
    context: "Einfamilienhaus mit Fokus auf Alltag und Sicherheit",
    challenge:
      "Uneinheitliche Beleuchtung, wenig Orientierung und ineffiziente Leuchtmittel.",
    implementation:
      "Lichtzonen nach Nutzung geplant und technisch sauber in die Bestandsstruktur integriert.",
    result: "Mehr Sicherheit, bessere Stimmung und effizienterer Betrieb.",
    proof:
      "Anonymisierter Praxisfall. Nachweise und Detailunterlagen im Erstgespräch auf Anfrage.",
  },
  {
    title: "PV-Einbindung im Bestand",
    context: "Abstimmung von vorhandener Installation und geplanter Erzeugung",
    challenge:
      "Vorhandene Installation und neue PV mussten zusammengebracht werden.",
    implementation:
      "Elektrotechnische Einbindung mit sauberer Schnittstellenklärung zwischen Beteiligten.",
    result: "Stimmige Integration ohne unnötige Nacharbeiten im Bestand.",
    proof:
      "Anonymisierter Praxisfall. Nachweise und Detailunterlagen im Erstgespräch auf Anfrage.",
  },
  {
    title: "Smart-Home-Nachrüstung in bewohntem Objekt",
    context: "Komfort und Steuerung ohne Komplettumbau",
    challenge:
      "Gewünschter Komfortzuwachs bei möglichst geringem Eingriff in die Bausubstanz.",
    implementation:
      "Schrittweise Nachrüstung mit klarer Bedienlogik statt überladener Systemkomplexität.",
    result: "Mehr Alltagskomfort bei überschaubarem baulichen Aufwand.",
    proof:
      "Anonymisierter Praxisfall. Nachweise und Detailunterlagen im Erstgespräch auf Anfrage.",
  },
];

export const navItems = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/vermietung", label: "Vermietung" },
  { href: "/projekte", label: "Projekte" },
  { href: "/einsatzgebiet", label: "Einsatzgebiet" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const footerLegalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookies", label: "Cookie-Einstellungen" },
] as const;

export const trustStrip = [
  "Meisterbetrieb",
  "Regionale Betreuung",
  "Saubere Ausführung",
  "Klare Kommunikation",
] as const;

export const intakeOptions = [
  { value: "elektroinstallation", label: "Elektroinstallation" },
  { value: "sanierung", label: "Sanierung / Modernisierung" },
  { value: "licht", label: "Licht & Beleuchtung" },
  { value: "photovoltaik", label: "Photovoltaik" },
  { value: "smart-home", label: "Smart Home" },
  { value: "pruefung", label: "Defekt / Prüfung / Reparatur" },
  { value: "baustrom", label: "Baustromverteiler" },
] as const;

export const colorRationale = {
  base: "Helles Warmgrau für ruhige Flächen und geringe visuelle Härte",
  text: "Anthrazit für hohe Lesbarkeit und seriöse Anmutung",
  trust: "Tiefes Blau als Kompetenz-/Vertrauensanker",
  action: "Kontrolliertes Amber für klare CTA-Hervorhebung",
};
