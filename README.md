# Romero's Party Supplies

Bilingual (English / Español), light + dark party-rental website with a simple owner dashboard.
Next.js 16 · Tailwind 4 · Motion · Supabase.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev
```

Without Supabase keys the site stores data in `./data` (JSON + photos) so you can develop offline.

## Supabase setup (production)

1. Create a project at supabase.com.
2. SQL Editor → run `supabase/schema.sql` (tables + the public `items` photo bucket).
3. Project Settings → API: copy the **Project URL** and the **service_role** key into
   `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (server only, never expose it).
4. Set `ADMIN_PASSWORD` (the owner's password) and `SESSION_SECRET` (any long random string).

Sample items and default info are inserted automatically the first time the site runs.

## Owner dashboard: `/admin`

Big-button flow for non-technical use: add/edit items with phone photos, show/hide with one switch,
read quote requests (call / WhatsApp buttons), and edit phones, delivery info and the About text in both languages.

## Structure

- `app/(site)` public pages: home, catalog, delivery, about, quote
- `app/admin` owner dashboard
- `lib/store.ts` storage layer (Supabase, or local JSON fallback)
- `lib/i18n.ts` all English/Spanish text
