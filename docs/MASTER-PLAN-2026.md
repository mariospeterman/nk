# Elektro Kunath 2026 - Step-by-Step Plan + To-do

## Projektziel
Production-ready Website als "smarter, ruhiger Lead- und Angebotsmotor" mit Fokus auf:
- Klarheit
- Sicherheit
- Entlastung

## Skill-Strategie (vermerkt)
- [x] Kurzfristig: direkter Website-Stack ohne zusätzliche Agent-Runtime-Abhängigkeit.
- [ ] Mittelfristig: ZeroClaw-basierte Skills für Backoffice-Workflows (Lead-Triage, Zusammenfassungen, interne Prozessautomatisierung).
- [ ] Langfristig: kontrollierte Verknüpfung von Website-Events mit ZeroClaw-Skill-Routing, ohne autonome Endkunden-Entscheidungen.

## Phase 0 - Discovery & Strategie
- [x] Bestand analysieren (aktuelle Website, Struktur, Content, UX, Technik)
- [x] Wettbewerber in Pulsnitz/Umfeld analysieren (faktisch belegte Seiten)
- [x] Positionierung und Differenzierung festlegen
- [x] 2026-Rechts- und SEO-Basisquellen prüfen

Deliverables:
- [x] Wettbewerbs- und Gap-Analyse
- [x] Klarer Differenzierungsrahmen für IA, UX, Content

## Phase 1 - Architektur & Setup
- [x] Next.js 16 + React 19 + TypeScript + Tailwind 4 setup
- [x] shadcn/ui-Basis integriert
- [x] Framer Motion sparsam integriert
- [x] Design-Tokens und Brand-Theme aufgebaut

Deliverables:
- [x] Wartbare Projektstruktur
- [x] Reusable Komponentenbasis

## Phase 2 - Informationsarchitektur
- [x] Hauptseiten angelegt
- [x] Leistungsseiten angelegt
- [x] Lokalseiten angelegt
- [x] Rechtsseiten angelegt

Zielsitemap:
- [x] /
- [x] /leistungen
- [x] /elektroinstallation
- [x] /licht-beleuchtung
- [x] /photovoltaik
- [x] /smart-home
- [x] /pruefung-instandhaltung
- [x] /baustromverteiler-mieten
- [x] /projekte
- [x] /ueber-uns
- [x] /einsatzgebiet
- [x] /faq
- [x] /kontakt
- [x] /impressum
- [x] /datenschutz
- [x] /cookies
- [x] /elektriker-pulsnitz
- [x] /elektriker-oberlichtenau
- [x] /elektriker-kamenz
- [x] /photovoltaik-elektriker-pulsnitz
- [x] /smart-home-pulsnitz
- [x] /baustromverteiler-mieten-pulsnitz

## Phase 3 - Conversion & Lead-System
- [x] Geführter Anfrage-Assistent auf Homepage
- [x] Vollständiges Kontaktformular mit Upload
- [x] API-Validierung + Lead-Verarbeitung
- [x] Supabase-kompatibles Datenmodell + SQL-Schema
- [x] Optionale Resend-Notification
- [x] Cal.com-Link-Integration für Rückruf/Video/PV-Beratung

## Phase 4 - SEO, Technik, AI-Readability
- [x] Metadaten je Seite
- [x] JSON-LD (Organization, LocalBusiness, Service, FAQ, Breadcrumb)
- [x] sitemap.xml
- [x] robots.txt
- [x] llms.txt + llms-full.txt

## Phase 5 - Compliance 2026
- [x] Impressum gemäß DDG-Struktur
- [x] Datenschutzerklärung (Template, projektbezogen)
- [x] Cookie-/Einwilligungsbanner mit Kategorien
- [x] Karten nur nach Consent (Externe Inhalte)
- [x] KI-Hinweis im Anfrageprozess (optional, transparent)

## Phase 6 - Motion & Frontend-Polish
- [x] Ruhige Section-Reveals
- [x] Konsistente Card- und CTA-Motion
- [x] Desktop + Mobile CTA-Pattern
- [x] Visuelle Hierarchie für schnelle Erstorientierung

## Phase 7 - QA & Go-live
- [x] Lint- und Build-Checks
- [ ] Lighthouse-Lauf auf Produktionsumgebung
- [ ] Rechtstexte final juristisch prüfen lassen
- [ ] Produktions-Keys eintragen (Supabase/Resend/Cal/Plausible)
- [ ] DNS/Deployment und Monitoring live schalten

## Senior Full-Stack To-do (operativ)
- [x] API-Route `POST /api/leads`
- [x] Dateiupload-Regeln (Dateianzahl/Größe)
- [x] Fehlerbehandlung und Referenz-ID
- [x] Supabase-Tabellenstruktur dokumentiert
- [x] ENV-Template erstellt
- [ ] E2E-Tests für Formular und Consent ergänzen

## Senior Frontend To-do
- [x] Mobile-first Layout
- [x] Sticky Mobile CTA
- [x] Performance-freundliche Komponentenstruktur
- [x] Zugängliche Form Controls (Labels, States)
- [ ] Feintuning CLS/LCP mit realen Bildassets auf Prod-CDN

## Motion Designer To-do
- [x] Subtile Reveal-Transitions
- [x] Interaktionsakzente ohne Overload
- [x] Conversion-fokussierte Bewegung (nicht dekorativ)
- [ ] Optional: Page-Transition-Variant A/B testen

## Farben / Psychologie (Designentscheidung)
- [x] Vertrauensanker: tiefes Blau (Kompetenz, Stabilität)
- [x] Handlungsakzent: kontrolliertes Amber (CTA-Fokus)
- [x] Hintergrund: warmes, helles Grau (Ruhe, Lesbarkeit)
- [x] Kontrast: WCAG-konforme Lesbarkeit als harte Leitplanke
