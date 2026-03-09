import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceById } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
} from "@/lib/seo";

const service = getServiceById("smart-home");

export const metadata = buildMetadata({
  title: "Smart Home",
  description: service.short,
  path: service.href,
});

export default function SmartHomePage() {
  return (
    <>
      <JsonLd id="smart-schema" data={buildServiceSchema(service)} />
      <JsonLd id="smart-faq" data={buildFaqSchema(service.faq)} />
      <JsonLd
        id="smart-breadcrumb"
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
