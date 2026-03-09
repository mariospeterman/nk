"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const bookingOptions = [
  {
    title: "Rückruf (10 Min)",
    description: "Für schnelle Erstklärung und Priorisierung.",
    url:
      process.env.NEXT_PUBLIC_CAL_CALLBACK_URL ??
      "https://cal.com/elektro-kunath/rueckruf-10min",
    tone: "surface-tint-green",
  },
  {
    title: "Video-Erstgespräch (20 Min)",
    description: "Für Smart Home und Modernisierungsthemen.",
    url:
      process.env.NEXT_PUBLIC_CAL_VIDEO_URL ??
      "https://cal.com/elektro-kunath/video-erstgespraech-20min",
    tone: "surface-tint-blue",
  },
  {
    title: "PV-/Planungsberatung (30 Min)",
    description: "Für planbare Projekte und technische Vorabklärung.",
    url:
      process.env.NEXT_PUBLIC_CAL_PV_URL ??
      "https://cal.com/elektro-kunath/pv-beratung-30min",
    tone: "surface-tint-amber",
  },
] as const;

export function BookingOptions() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {bookingOptions.map((option) => (
        <article key={option.title} className={`surface-default border p-5 ${option.tone}`}>
          <h3 className="font-heading text-lg">{option.title}</h3>
          <p className="mt-2 text-sm text-text-body">{option.description}</p>
          <Button asChild variant="outline" className="mt-4">
            <a
              href={option.url}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() =>
                trackEvent("cta_booking_slot_open", {
                  slot: option.title,
                })
              }
            >
              Termin wählen
            </a>
          </Button>
        </article>
      ))}
    </div>
  );
}
