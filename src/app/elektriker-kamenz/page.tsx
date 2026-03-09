import { JsonLd } from "@/components/seo/json-ld";
import { LocalLandingPage } from "@/components/sections/local-landing-page";
import { getLocalLandingBySlug } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildLocalLandingSchema,
  buildMetadata,
} from "@/lib/seo";

const local = getLocalLandingBySlug("elektriker-kamenz");

export const metadata = buildMetadata({
  title: local.title,
  description: local.description,
  path: `/${local.slug}`,
});

export default function ElektrikerKamenzPage() {
  return (
    <>
      <JsonLd id="elektriker-kamenz-schema" data={buildLocalLandingSchema(local)} />
      <JsonLd
        id="elektriker-kamenz-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: local.title, path: `/${local.slug}` },
        ])}
      />
      <LocalLandingPage local={local} />
    </>
  );
}
