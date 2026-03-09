import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { ConsentProvider } from "@/components/consent/consent-context";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { ConsentedAnalytics } from "@/components/consent/consented-analytics";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { buildLocalBusinessSchema, buildOrganizationSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const headingFont = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Elektrotechnik in Pulsnitz`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Elektrotechnik mit Klarheit: Elektroinstallation, Licht, Photovoltaik, Smart Home und Instandhaltung im Raum Pulsnitz.",
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "de_DE",
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${headingFont.variable}`}
      >
        <ConsentProvider>
          <ConsentedAnalytics />
          <JsonLd id="organization-schema" data={buildOrganizationSchema()} />
          <JsonLd id="localbusiness-schema" data={buildLocalBusinessSchema()} />
          <SiteHeader />
          <main className="min-w-0 overflow-x-hidden">{children}</main>
          <SiteFooter />
          <CookieBanner />
          <MobileStickyCta />
        </ConsentProvider>
      </body>
    </html>
  );
}
