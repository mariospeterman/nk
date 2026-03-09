import { JsonLd } from "@/components/seo/json-ld";
import { LocalLandingPage } from "@/components/sections/local-landing-page";
import { getLocalLandingBySlug } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildLocalLandingSchema,
  buildMetadata,
} from "@/lib/seo";

const local = getLocalLandingBySlug("elektriker-oberlichtenau");

export const metadata = buildMetadata({
  title: local.title,
  description: local.description,
  path: `/${local.slug}`,
});

export default function ElektrikerOberlichtenauPage() {
  return (
    <>
      <JsonLd
        id="elektriker-oberlichtenau-schema"
        data={buildLocalLandingSchema(local)}
      />
      <JsonLd
        id="elektriker-oberlichtenau-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: local.title, path: `/${local.slug}` },
        ])}
      />
      <LocalLandingPage local={local} />
    </>
  );
}
