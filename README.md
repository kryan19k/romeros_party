# Romero's Party Boutique

Bilingual (English / Español), light + dark party-rental website with a simple owner dashboard.
Next.js 16 · Tailwind 4 · Motion · libSQL/Turso.

## Run it

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD and SESSION_SECRET
npm run dev
```

Out of the box the data (items, requests, info and item photos) lives in a local SQLite file, `./data/romeros.db`.
Tables and sample items are created automatically on first run.

## Production database (free): Turso

```bash
turso db create romeros
turso db show romeros --url          # -> TURSO_DATABASE_URL
turso db tokens create romeros       # -> TURSO_AUTH_TOKEN
```

Put both in the host's environment variables (plus `ADMIN_PASSWORD` and `SESSION_SECRET`). Same code, no migration step.

## Owner dashboard: `/admin`

Big-button flow for non-technical use: add/edit items with phone photos, show/hide with one switch,
read quote requests (call / WhatsApp buttons), and edit phones, delivery info and the About text in both languages.

## Structure

- `app/(site)` public pages: home, catalog, delivery, about, quote
- `app/admin` owner dashboard
- `lib/store.ts` storage layer (libSQL / Turso)
- `lib/i18n.ts` all English/Spanish text

## SEO (local: Perris, CA)

- English lives at `/…`, Spanish at `/es/…` (hreflang, canonical, sitemap and `robots.txt` are generated).
- Landing pages: `/catalog/<category>` and `/occasion/<occasion>` carry the Perris, CA search copy (`lib/seo-data.ts`).
- Edit the nearby cities in `SERVICE_AREAS` (`lib/seo-data.ts`) so they match where the store really delivers.
- Environment variables on the host:
  - `NEXT_PUBLIC_SITE_URL` = the real domain, e.g. `https://yourdomain.com` (needed for canonical URLs and the sitemap)
  - `GOOGLE_SITE_VERIFICATION` = token from Google Search Console (optional, adds the verification tag)
