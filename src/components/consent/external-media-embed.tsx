"use client";

import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/consent/consent-context";

type ExternalMediaEmbedProps = {
  title: string;
  embedUrl: string;
  sourceLabel?: string;
  sourceHref?: string;
};

export function ExternalMediaEmbed({
  title,
  embedUrl,
  sourceLabel = "Externe Videoquelle",
  sourceHref,
}: ExternalMediaEmbedProps) {
  const { consent, isReady, saveConsent } = useConsent();

  if (!isReady) {
    return (
      <div className="h-70 animate-pulse rounded-2xl border border-border bg-muted md:h-80" />
    );
  }

  if (consent?.externalMedia) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <iframe
          title={title}
          src={embedUrl}
          className="h-70 w-full md:h-80"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <div className="border-t border-border px-4 py-3 text-xs text-text-muted">
          Quelle: {sourceLabel}
          {sourceHref ? (
            <>
              {" · "}
              <a
                href={sourceHref}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-action-strong underline underline-offset-4"
              >
                Original öffnen
              </a>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-70 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/35 p-5 text-center md:h-80">
      <h3 className="font-heading text-lg">Video nur nach Einwilligung</h3>
      <p className="max-w-md text-sm text-text-body">
        Externe Video-Inhalte laden wir erst nach Zustimmung zur Kategorie
        &quot;Externe Inhalte&quot;.
      </p>
      {sourceHref ? (
        <a
          href={sourceHref}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm font-semibold text-action-strong underline underline-offset-4"
        >
          Video-Quelle vorab öffnen
        </a>
      ) : null}
      <Button
        type="button"
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
