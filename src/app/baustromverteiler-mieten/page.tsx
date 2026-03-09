import { JsonLd } from "@/components/seo/json-ld";
import { ServicePage } from "@/components/sections/service-page";
import { getServiceById } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildServiceSchema,
} from "@/lib/seo";

const service = getServiceById("baustromverteiler-mieten");

export const metadata = buildMetadata({
  title: "Baustromverteiler mieten",
  description: service.short,
  path: service.href,
});

export default function BaustromPage() {
  return (
    <>
      <JsonLd id="baustrom-schema" data={buildServiceSchema(service)} />
      <JsonLd id="baustrom-faq" data={buildFaqSchema(service.faq)} />
      <JsonLd
        id="baustrom-breadcrumb"
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
