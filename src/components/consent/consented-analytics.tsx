"use client";

import Script from "next/script";

import { useConsent } from "@/components/consent/consent-context";

export function ConsentedAnalytics() {
  const { consent, isReady } = useConsent();
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!isReady || !consent?.analytics || !domain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
