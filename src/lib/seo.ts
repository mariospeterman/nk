import type { Metadata } from "next";

import {
  globalFaq,
  services,
  siteConfig,
  type LocalLanding,
  type ServiceItem,
} from "@/lib/site-config";

const defaultDescription =
  "Elektroinstallation, Licht, Photovoltaik, Smart Home und Instandhaltung im Raum Pulsnitz. Verständlich geplant und fachgerecht umgesetzt.";

export function absoluteUrl(path = "/") {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return new URL(safePath, siteConfig.siteUrl).toString();
}

export function buildMetadata(input: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const description = input.description ?? defaultDescription;
  const title = `${input.title} | ${siteConfig.name}`;
  const url = absoluteUrl(input.path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    logo: absoluteUrl("/logo-webseite-header.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.street,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician"],
    "@id": absoluteUrl("/#localbusiness"),
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    image: absoluteUrl("/logo-webseite-header.png"),
    priceRange: "€€",
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    areaServed: siteConfig.serviceArea,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.street,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: [],
  };
}

export function buildServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} in ${siteConfig.city}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.serviceArea,
    description: service.short,
    url: absoluteUrl(service.href),
  };
}

export function buildFaqSchema(
  faq: Array<{ question: string; answer: string }> = globalFaq,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildServicesCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(service.href),
      name: service.title,
    })),
  };
}

export function buildLocalLandingSchema(local: LocalLanding) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: local.h1,
    description: local.description,
    url: absoluteUrl(`/${local.slug}`),
    about: local.serviceIds.map((serviceId) => {
      const service = services.find((item) => item.id === serviceId);
      return service?.title;
    }),
  };
}
