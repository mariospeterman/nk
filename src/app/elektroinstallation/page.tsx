import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceById } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
} from "@/lib/seo";

const service = getServiceById("elektroinstallation");

export const metadata = buildMetadata({
  title: "Elektroinstallation",
  description: service.short,
  path: service.href,
});

export default function ElektroinstallationPage() {
  return (
    <>
      <JsonLd id="elektroinstallation-schema" data={buildServiceSchema(service)} />
      <JsonLd id="elektroinstallation-faq" data={buildFaqSchema(service.faq)} />
      <JsonLd
        id="elektroinstallation-breadcrumb"
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
