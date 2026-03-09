"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { TrackedCta } from "@/components/analytics/tracked-cta";
import { navItems, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const callbackBookingUrl =
    process.env.NEXT_PUBLIC_CAL_CALLBACK_URL ??
    "https://cal.com/elektro-kunath/rueckruf-10min";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-[70] transition-all duration-200",
        isScrolled
          ? "border-b border-border/85 bg-background/90 shadow-[0_10px_30px_-26px_rgba(18,59,99,0.9)] backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "border-b border-border/45 bg-background/78 backdrop-blur supports-[backdrop-filter]:bg-background/68",
      )}
    >
      <div className="site-container flex items-center justify-between gap-4 py-2.5 md:py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-webseite-header.png"
            alt="Elektro Kunath"
            width={220}
            height={34}
            priority
            className="h-auto w-[146px] min-[390px]:w-[170px] md:w-[205px]"
          />
          <span className="sr-only">Zur Startseite</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[15px] font-medium text-foreground/84 transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <TrackedCta
            href={callbackBookingUrl}
            size="sm"
            variant="outline"
            className="rounded-full"
            newTab
            eventName="cta_header_callback"
            eventProps={{ area: "header" }}
          >
            Rückruf buchen
          </TrackedCta>
          <TrackedCta
            href={siteConfig.phoneHref}
            size="sm"
            variant="outline"
            className="rounded-full"
            eventName="cta_header_call"
            eventProps={{ area: "header" }}
          >
            Direkt anrufen
          </TrackedCta>
          <TrackedCta
            href="/kontakt"
            size="sm"
            variant="brand"
            className="rounded-full"
            eventName="cta_header_project_start"
            eventProps={{ area: "header" }}
          >
            Projekt starten
          </TrackedCta>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-[0_10px_24px_-20px_rgba(18,59,99,0.75)] transition-colors hover:border-action/30 [&::-webkit-details-marker]:hidden">
            Menü
            <ChevronDown
              className="h-4 w-4 text-text-muted transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="glass-phaser absolute right-0 top-12 min-w-64 space-y-1 rounded-2xl border border-border p-3 shadow-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground/88 transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={callbackBookingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 block rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground/90"
            >
              Rückruf buchen
            </a>
            <a
              href={siteConfig.phoneHref}
              className="mt-2 block rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground/90"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
