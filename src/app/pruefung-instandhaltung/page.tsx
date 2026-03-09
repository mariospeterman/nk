import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceById } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
} from "@/lib/seo";

const service = getServiceById("pruefung-instandhaltung");

export const metadata = buildMetadata({
  title: "Prüfung & Instandhaltung",
  description: service.short,
  path: service.href,
});

export default function PruefungInstandhaltungPage() {
  return (
    <>
      <JsonLd id="pruefung-schema" data={buildServiceSchema(service)} />
      <JsonLd id="pruefung-faq" data={buildFaqSchema(service.faq)} />
      <JsonLd
        id="pruefung-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
          { name: service.title, path: service.href },
        ])}
      />
      <ServicePage service={service} />
    </>
  );
}
