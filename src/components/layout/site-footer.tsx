"use client";

import Link from "next/link";

import { openConsentPreferences } from "@/components/consent/consent-context";
import { footerLegalLinks, services, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#274765] bg-[#173651] text-white">
      <div className="site-container py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <h2 className="font-heading text-xl text-white">{siteConfig.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/76">
              {siteConfig.owner}
              <br />
              {siteConfig.role}
              <br />
              {siteConfig.street}
              <br />
              {siteConfig.postalCode} {siteConfig.city}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/82">
              <a href={siteConfig.phoneHref} className="underline underline-offset-4">
                {siteConfig.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-heading text-base text-white">Leistungen</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={service.href} className="hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/vermietung" className="hover:text-white">
                  Vermietung
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-base text-white">Rechtliches</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {footerLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={openConsentPreferences}
                >
                  Privatsphäre-Einstellungen ändern
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-5 text-xs text-white/60">
          <p>Saubere Elektrotechnik für Haus, Bestand und Alltag.</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
