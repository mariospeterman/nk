"use client";

import { Button } from "@/components/ui/button";
import { openConsentPreferences } from "@/components/consent/consent-context";

export function OpenSettingsButton() {
  return (
    <Button type="button" variant="outline" className="rounded-full" onClick={openConsentPreferences}>
      Cookie-Einstellungen öffnen
    </Button>
  );
}
