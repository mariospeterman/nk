import { JsonLd } from "@/components/seo/json-ld";
import { LocalLandingPage } from "@/components/sections/local-landing-page";
import { getLocalLandingBySlug } from "@/lib/content-selectors";
import {
  buildBreadcrumbSchema,
  buildLocalLandingSchema,
  buildMetadata,
} from "@/lib/seo";

const local = getLocalLandingBySlug("photovoltaik-elektriker-pulsnitz");

export const metadata = buildMetadata({
  title: local.title,
  description: local.description,
  path: `/${local.slug}`,
});

export default function PhotovoltaikElektrikerPulsnitzPage() {
  return (
    <>
      <JsonLd
        id="photovoltaik-elektriker-pulsnitz-schema"
        data={buildLocalLandingSchema(local)}
      />
      <JsonLd
        id="photovoltaik-elektriker-pulsnitz-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Startseite", path: "/" },
          { name: local.title, path: `/${local.slug}` },
        ])}
      />
      <LocalLandingPage local={local} />
    </>
  );
}
