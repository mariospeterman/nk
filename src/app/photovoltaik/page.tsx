import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceById } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
} from "@/lib/seo";

const service = getServiceById("photovoltaik");

export const metadata = buildMetadata({
  title: "Photovoltaik",
  description: service.short,
  path: service.href,
});

export default function PhotovoltaikPage() {
  return (
    <>
      <JsonLd id="pv-schema" data={buildServiceSchema(service)} />
      <JsonLd id="pv-faq" data={buildFaqSchema(service.faq)} />
      <JsonLd
        id="pv-breadcrumb"
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
