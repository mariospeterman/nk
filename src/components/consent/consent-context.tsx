"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  consentStorageKey,
  defaultConsent,
  parseConsent,
  type ConsentState,
} from "@/lib/consent";

type ConsentContextValue = {
  consent: ConsentState | null;
  isReady: boolean;
  shouldShowBanner: boolean;
  saveConsent: (next: Pick<ConsentState, "analytics" | "externalMedia">) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
};

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = parseConsent(window.localStorage.getItem(consentStorageKey));
    queueMicrotask(() => {
      setConsent(stored);
      setIsReady(true);
    });
  }, []);

  const persist = useCallback((next: ConsentState) => {
    window.localStorage.setItem(consentStorageKey, JSON.stringify(next));
    setConsent(next);
  }, []);

  const saveConsent = useCallback(
    (next: Pick<ConsentState, "analytics" | "externalMedia">) => {
      persist({
        necessary: true,
        analytics: next.analytics,
        externalMedia: next.externalMedia,
        decisionAt: new Date().toISOString(),
        version: defaultConsent.version,
      });
    },
    [persist],
  );

  const acceptAll = useCallback(
    () =>
      saveConsent({
        analytics: true,
        externalMedia: true,
      }),
    [saveConsent],
  );

  const rejectOptional = useCallback(
    () =>
      saveConsent({
        analytics: false,
        externalMedia: false,
      }),
    [saveConsent],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      isReady,
      shouldShowBanner: isReady && consent === null,
      saveConsent,
      acceptAll,
      rejectOptional,
    }),
    [acceptAll, consent, isReady, rejectOptional, saveConsent],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return context;
}

export function openConsentPreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ek-open-consent-settings"));
  }
}
