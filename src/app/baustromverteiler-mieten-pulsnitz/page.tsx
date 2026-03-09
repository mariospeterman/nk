import { JsonLd } from "@/components/seo/json-ld";
import { LocalLandingPage } from "@/components/sections/local-landing-page";
import { getLocalLandingBySlug } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildLocalLandingSchema,
  buildMetadata,
} from "@/lib/seo";

const local = getLocalLandingBySlug("baustromverteiler-mieten-pulsnitz");

export const metadata = buildMetadata({
  title: local.title,
  description: local.description,
  path: `/${local.slug}`,
});

export default function BaustromverteilerMietenPulsnitzPage() {
  return (
    <>
      <JsonLd
        id="baustromverteiler-mieten-pulsnitz-schema"
        data={buildLocalLandingSchema(local)}
      />
      <JsonLd
        id="baustromverteiler-mieten-pulsnitz-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: local.title, path: `/${local.slug}` },
        ])}
      />
      <LocalLandingPage local={local} />
    </>
  );
}
