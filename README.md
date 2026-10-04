# Romero's Party Supplies

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
