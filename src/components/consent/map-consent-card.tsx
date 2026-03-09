"use client";

import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/consent/consent-context";
import { siteConfig } from "@/lib/site-config";

const { lat, lng } = siteConfig.coordinates;
const latDelta = 0.0045;
const lngDelta = 0.0075;
const west = (lng - lngDelta).toFixed(6);
const south = (lat - latDelta).toFixed(6);
const east = (lng + lngDelta).toFixed(6);
const north = (lat + latDelta).toFixed(6);

const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
  `${west},${south},${east},${north}`,
)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;

export function MapConsentCard() {
  const { consent, isReady, saveConsent } = useConsent();

  if (!isReady) {
    return (
      <div className="h-80 animate-pulse rounded-2xl border border-border bg-muted" />
    );
  }

  if (consent?.externalMedia) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <iframe
          title="Standort Elektro Kunath"
          src={osmEmbedUrl}
          className="h-85 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
          <p className="text-foreground/75">Kartenquelle: OpenStreetMap</p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Route in OpenStreetMap öffnen
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-85 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/35 p-8 text-center">
      <h3 className="font-heading text-xl">Karte nur nach Einwilligung</h3>
      <p className="max-w-xl text-sm text-foreground/75">
        Externe Karteninhalte werden erst geladen, wenn Sie der Kategorie
        &quot;Externe Inhalte&quot; zustimmen.
      </p>
      <Button
        type="button"
        className="rounded-full"
        onClick={() =>
          saveConsent({
            analytics: consent?.analytics ?? false,
            externalMedia: true,
          })
        }
      >
        Externe Inhalte aktivieren
      </Button>
    </div>
  );
}
