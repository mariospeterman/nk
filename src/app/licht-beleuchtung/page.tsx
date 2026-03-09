import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceById } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
} from "@/lib/seo";

const service = getServiceById("licht-beleuchtung");

export const metadata = buildMetadata({
  title: "Licht & Beleuchtung",
  description: service.short,
  path: service.href,
});

export default function LichtBeleuchtungPage() {
  return (
    <>
      <JsonLd id="licht-schema" data={buildServiceSchema(service)} />
      <JsonLd id="licht-faq" data={buildFaqSchema(service.faq)} />
      <JsonLd
        id="licht-breadcrumb"
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
