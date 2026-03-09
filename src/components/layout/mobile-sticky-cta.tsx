import { TrackedCta } from "@/components/analytics/tracked-cta";
import { siteConfig } from "@/lib/site-config";

export function MobileStickyCta() {
  const callbackBookingUrl =
    process.env.NEXT_PUBLIC_CAL_CALLBACK_URL ??
    "https://cal.com/elektro-kunath/rueckruf-10min";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/97 p-3 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <TrackedCta
          href={callbackBookingUrl}
          variant="outline"
          className="h-10 px-2 text-xs"
          eventName="cta_mobile_sticky_callback"
          eventProps={{ area: "mobile_sticky" }}
          newTab
        >
          Rückruf
        </TrackedCta>
        <TrackedCta
          href={siteConfig.phoneHref}
          variant="outline"
          className="h-10 px-2 text-xs"
          eventName="cta_mobile_sticky_call"
          eventProps={{ area: "mobile_sticky" }}
        >
          Anrufen
        </TrackedCta>
        <TrackedCta
          href="/kontakt"
          className="h-10 px-2 text-xs"
          eventName="cta_mobile_sticky_project_start"
          eventProps={{ area: "mobile_sticky" }}
        >
          Starten
        </TrackedCta>
      </div>
    </div>
  );
}
