import type { MetadataRoute } from "next";

import { localLandings, services, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/leistungen",
    "/projekte",
    "/ueber-uns",
    "/einsatzgebiet",
    "/faq",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/cookies",
  ];

  const servicePaths = services.map((service) => service.href);
  const localPaths = localLandings.map((local) => `/${local.slug}`);

  const allPaths = [...staticPaths, ...servicePaths, ...localPaths];

  return allPaths.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date("2026-03-08"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/kontakt") ? 0.9 : 0.75,
  }));
}
