import "server-only";
import { createClient, type Row } from "@libsql/client";
import { mkdirSync } from "fs";
import { DEFAULT_SETTINGS, SEED_ITEMS, SEED_ITEMS_V2 } from "./seed";
import { OCCASIONS, type Item, type Occasion, type QuoteRequest, type Settings } from "./types";

/**
 * Storage layer on libSQL (SQLite).
 *  - Local dev: a file at ./data/romeros.db, zero setup.
 *  - Production: set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN (free hosted SQLite at turso.tech).
 * Item photos live in the same database, so there is no separate file storage to manage.
 */
if (process.env.VERCEL && !process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is not set. Vercel cannot keep a local database file; add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Project Settings > Environment Variables.");
}
const url = process.env.TURSO_DATABASE_URL || "file:./data/romeros.db";
if (url.startsWith("file:")) mkdirSync("data", { recursive: true });
const db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY, category TEXT NOT NULL,
    name_es TEXT NOT NULL DEFAULT '', name_en TEXT NOT NULL DEFAULT '',
    desc_es TEXT NOT NULL DEFAULT '', desc_en TEXT NOT NULL DEFAULT '',
    price REAL, unit TEXT NOT NULL DEFAULT 'event', stock INTEGER, image TEXT,
    available INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS requests (
    id TEXT PRIMARY KEY, created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new',
    name TEXT NOT NULL, phone TEXT NOT NULL, event_date TEXT NOT NULL, mode TEXT NOT NULL,
    address TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '', lang TEXT NOT NULL DEFAULT 'es',
    items TEXT NOT NULL DEFAULT '[]')`,
  `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY CHECK (id = 1), data TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS photos (name TEXT PRIMARY KEY, type TEXT NOT NULL, data BLOB NOT NULL)`,
];

// Runs once per server start. INSERT OR IGNORE keeps it safe if two requests arrive together.
let ready: Promise<void> | null = null;
function init() {
  ready ??= (async () => {
    await db.batch(SCHEMA, "write");
    const first = await db.execute({ sql: "INSERT OR IGNORE INTO settings (id, data) VALUES (1, ?)", args: [JSON.stringify(DEFAULT_SETTINGS)] });
    // Columns added after the first release (older databases get them here).
    const cols = new Set((await db.execute("PRAGMA table_info(items)")).rows.map((c) => String(c.name)));
    const add: [string, string][] = [
      ["occasions", "TEXT NOT NULL DEFAULT '[]'"],
      ["audience", "TEXT NOT NULL DEFAULT 'all'"],
      ["sizes", "TEXT NOT NULL DEFAULT ''"],
    ];
    for (const [c, def] of add) if (!cols.has(c)) await db.execute(`ALTER TABLE items ADD COLUMN ${c} ${def}`);
    if (first.rowsAffected) {
      await db.batch(SEED_ITEMS.map((i) => insertItem(i, true)), "write");
    }
    // Dresses, shoes, decor and supplies samples: added once, never re-added after the owner deletes them.
    const v2 = await db.execute("INSERT OR IGNORE INTO meta (key, value) VALUES ('seed_v2', '1')");
    if (v2.rowsAffected) {
      await db.batch(SEED_ITEMS_V2.map((i) => insertItem(i, true)), "write");
    }
  })().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

const insertItem = (i: Item, ignoreIfExists = false) => ({
  sql: `INSERT OR ${ignoreIfExists ? "IGNORE" : "REPLACE"} INTO items
    (id, category, name_es, name_en, desc_es, desc_en, price, unit, stock, occasions, audience, sizes, image, available, created_at, updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  args: [i.id, i.category, i.name.es, i.name.en, i.desc.es, i.desc.en, i.price, i.unit, i.stock, JSON.stringify(i.occasions), i.audience, i.sizes, i.image, i.available ? 1 : 0, i.createdAt, i.updatedAt],
});

const toItem = (r: Row): Item => ({
  id: String(r.id),
  category: r.category as Item["category"],
  name: { es: String(r.name_es), en: String(r.name_en) },
  desc: { es: String(r.desc_es), en: String(r.desc_en) },
  price: r.price === null ? null : Number(r.price),
  unit: r.unit as Item["unit"],
  stock: r.stock === null ? null : Number(r.stock),
  occasions: (JSON.parse(String(r.occasions ?? "[]")) as Occasion[]).filter((o) => OCCASIONS.includes(o)),
  audience: r.audience as Item["audience"],
  sizes: String(r.sizes ?? ""),
  image: r.image === null ? null : String(r.image),
  available: Number(r.available) === 1,
  createdAt: String(r.created_at),
  updatedAt: String(r.updated_at),
});
const toRequest = (r: Row): QuoteRequest => ({
  id: String(r.id),
  createdAt: String(r.created_at),
  status: r.status as QuoteRequest["status"],
  name: String(r.name),
  phone: String(r.phone),
  date: String(r.event_date),
  mode: r.mode as QuoteRequest["mode"],
  address: String(r.address),
  notes: String(r.notes),
  lang: r.lang as QuoteRequest["lang"],
  items: JSON.parse(String(r.items)),
});

async function run(sql: string, args: (string | number | null)[] = []) {
  await init();
  return db.execute({ sql, args });
}

// ───────────── items ─────────────
export async function getItems(): Promise<Item[]> {
  return (await run("SELECT * FROM items ORDER BY created_at DESC")).rows.map(toItem);
}
export async function getItem(id: string): Promise<Item | null> {
  const r = (await run("SELECT * FROM items WHERE id = ?", [id])).rows[0];
  return r ? toItem(r) : null;
}
export async function upsertItem(item: Item): Promise<void> {
  await init();
  await db.execute(insertItem(item));
}
export async function setItemAvailable(id: string, available: boolean) {
  await run("UPDATE items SET available = ?, updated_at = ? WHERE id = ?", [available ? 1 : 0, new Date().toISOString(), id]);
}
export async function deleteItem(id: string): Promise<void> {
  await run("DELETE FROM items WHERE id = ?", [id]);
}

// ───────────── requests ─────────────
export async function getRequests(): Promise<QuoteRequest[]> {
  return (await run("SELECT * FROM requests ORDER BY created_at DESC")).rows.map(toRequest);
}
export async function addRequest(r: QuoteRequest): Promise<void> {
  await run(
    `INSERT INTO requests (id, created_at, status, name, phone, event_date, mode, address, notes, lang, items)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [r.id, r.createdAt, r.status, r.name, r.phone, r.date, r.mode, r.address, r.notes, r.lang, JSON.stringify(r.items)],
  );
}
export async function setRequestStatus(id: string, status: "new" | "done"): Promise<void> {
  await run("UPDATE requests SET status = ? WHERE id = ?", [status, id]);
}
export async function deleteRequest(id: string): Promise<void> {
  await run("DELETE FROM requests WHERE id = ?", [id]);
}

// ───────────── settings ─────────────
export async function getSettings(): Promise<Settings> {
  const r = (await run("SELECT data FROM settings WHERE id = 1")).rows[0];
  return { ...DEFAULT_SETTINGS, ...(r ? (JSON.parse(String(r.data)) as Partial<Settings>) : {}) };
}
export async function saveSettings(s: Settings): Promise<void> {
  await run("INSERT OR REPLACE INTO settings (id, data) VALUES (1, ?)", [JSON.stringify(s)]);
}

// ───────────── photos ─────────────
const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };
export async function uploadPhoto(name: string, buf: Buffer): Promise<void> {
  await init();
  await db.execute({
    sql: "INSERT OR REPLACE INTO photos (name, type, data) VALUES (?,?,?)",
    args: [name, TYPES[name.split(".").pop() ?? "jpg"], new Uint8Array(buf)],
  });
}
export async function getPhoto(name: string): Promise<{ type: string; data: Uint8Array } | null> {
  const r = (await run("SELECT type, data FROM photos WHERE name = ?", [name])).rows[0];
  return r ? { type: String(r.type), data: new Uint8Array(r.data as ArrayBuffer) } : null;
}
export async function deletePhoto(name: string | null): Promise<void> {
  if (name) await run("DELETE FROM photos WHERE name = ?", [name]);
}
