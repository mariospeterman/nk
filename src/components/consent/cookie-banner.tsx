"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/consent/consent-context";

export function CookieBanner() {
  const { consent, isReady, shouldShowBanner, acceptAll, rejectOptional, saveConsent } =
    useConsent();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [externalMedia, setExternalMedia] = useState(consent?.externalMedia ?? false);

  const openSettings = useCallback(() => {
    setAnalytics(consent?.analytics ?? false);
    setExternalMedia(consent?.externalMedia ?? false);
    setIsSettingsOpen(true);
  }, [consent?.analytics, consent?.externalMedia]);

  useEffect(() => {
    const handler = () => openSettings();
    window.addEventListener("ek-open-consent-settings", handler);
    return () => window.removeEventListener("ek-open-consent-settings", handler);
  }, [openSettings]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      {shouldShowBanner && (
        <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-4 shadow-2xl backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-foreground/85">
              Wir verwenden nur notwendige Cookies standardmäßig. Optionale Analyse und
              externe Inhalte aktivieren wir erst nach Ihrer Einwilligung gem. Art. 6 Abs.
              1 lit. a DSGVO und § 25 Abs. 1 TDDDG.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={openSettings}
              >
                Einstellungen
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={rejectOptional}
              >
                Nur notwendige
              </Button>
              <Button type="button" className="rounded-full" onClick={acceptAll}>
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </aside>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="space-y-2">
              <h2 className="font-heading text-xl">Datenschutz-Einstellungen</h2>
              <p className="text-sm text-foreground/80">
                Sie können optionale Kategorien aktivieren oder deaktivieren. Notwendige
                Cookies sind technisch erforderlich.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">Notwendig</h3>
                    <p className="text-sm text-foreground/75">
                      Für Sicherheit, Consent-Speicherung und Grundfunktionen.
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Immer aktiv
                  </span>
                </div>
              </div>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4">
                <div>
                  <h3 className="font-semibold">Analyse</h3>
                  <p className="text-sm text-foreground/75">
                    Anonyme Reichweitenmessung zur Verbesserung von Inhalten und UX.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-primary"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4">
                <div>
                  <h3 className="font-semibold">Externe Inhalte</h3>
                  <p className="text-sm text-foreground/75">
                    Karten- oder Termin-Widgets externer Anbieter (z. B. OpenStreetMap /
                    Cal.com).
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-primary"
                  checked={externalMedia}
                  onChange={(event) => setExternalMedia(event.target.checked)}
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                className="rounded-full"
                onClick={() => {
                  saveConsent({ analytics, externalMedia });
                  setIsSettingsOpen(false);
                }}
              >
                Auswahl speichern
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  rejectOptional();
                  setIsSettingsOpen(false);
                }}
              >
                Nur notwendige
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  acceptAll();
                  setIsSettingsOpen(false);
                }}
              >
                Alle akzeptieren
              </Button>
              <button
                type="button"
                className="ml-auto text-sm text-foreground/70 underline underline-offset-4"
                onClick={() => setIsSettingsOpen(false)}
              >
                Schließen
              </button>
            </div>

            <p className="mt-4 text-xs text-foreground/70">
              Details: <Link href="/datenschutz">Datenschutz</Link> ·{" "}
              <Link href="/cookies">Cookie-Richtlinie</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
