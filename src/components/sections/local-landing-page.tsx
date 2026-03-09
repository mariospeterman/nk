import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { SectionFrame } from "@/components/sections/section-frame";
import { Button } from "@/components/ui/button";
import {
  services,
  type LocalLanding,
  type ServiceItem,
} from "@/lib/site-config";

function getServices(serviceIds: LocalLanding["serviceIds"]) {
  return serviceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is ServiceItem => Boolean(service));
}

export function LocalLandingPage({ local }: { local: LocalLanding }) {
  const matchingServices = getServices(local.serviceIds);

  return (
    <>
      <PageHero title={local.h1} description={local.description} kicker="Lokale Seite">
        <Button asChild>
          <Link href="/kontakt">Anfrage starten</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="tel:+4915222584989">Direkt anrufen</a>
        </Button>
      </PageHero>

      <SectionFrame title="Warum diese Seite für Ihren Ort relevant ist">
        <ul className="grid gap-4 md:grid-cols-3">
          {local.focus.map((item) => (
            <li key={item} className="surface-default p-5 text-sm text-text-body">
              {item}
            </li>
          ))}
        </ul>
      </SectionFrame>

      <SectionFrame
        tone="section"
        title="Passende Leistungen"
        description="Diese Leistungsbereiche werden in Ihrem Kontext besonders häufig angefragt."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {matchingServices.map((service) => (
            <article key={service.id} className="surface-default p-5">
              <h3 className="font-heading text-xl">{service.title}</h3>
              <p className="mt-3 text-sm text-text-body">{service.short}</p>
              <Link href={service.href} className="arrow-link mt-4">
                Mehr zur Leistung
              </Link>
            </article>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}
