# Elektro Kunath Website (2026)

Production-ready Next.js 16 website for a regional electrical master business in Germany.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui
- Framer Motion (sparse)
- Optional integrations: Supabase, Cal.com, Resend, Plausible

## Features
- Conversion-focused homepage with guided lead assistant
- Service pages + local SEO pages
- Contact form with file uploads and lead API
- Lead protection (honeypot, minimum fill time, IP rate limiting)
- Distributed rate limiting via Upstash Redis (optional, recommended in production)
- CTA event tracking (after analytics consent)
- Cookie consent banner with granular categories
- Legal pages: Impressum, Datenschutz, Cookie info
- JSON-LD structured data
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`

## Local development
```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Environment
Copy `.env.example` to `.env.local` and set values.

```bash
cp .env.example .env.local
```

## Supabase setup
1. Create project and storage bucket for uploads.
2. Run schema from `supabase/schema.sql`.
3. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_LEAD_BUCKET`.

## Notes
- The legal text pages are implementation templates and should be reviewed before production go-live.
- Consent gates optional analytics and external media embeds.
- If Upstash credentials are missing, lead rate-limiting falls back to in-memory (single instance).
