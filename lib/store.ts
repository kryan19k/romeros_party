import "server-only";
import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";
import { mutate, readDB, UPLOAD_DIR } from "./db";
import { DEFAULT_SETTINGS, SEED_ITEMS } from "./seed";
import type { Item, QuoteRequest, Settings } from "./types";

/**
 * Storage layer. Uses Supabase when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set,
 * otherwise a local JSON file (handy for development without a Supabase project).
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const usingSupabase = Boolean(URL && KEY);
const BUCKET = "items";

const sb = usingSupabase ? createClient(URL!, KEY!, { auth: { persistSession: false } }) : null;
const must = <T>(r: { data: T; error: { message: string } | null }) => {
  if (r.error) throw new Error(r.error.message);
  return r.data;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toItem = (r: any): Item => ({
  id: r.id,
  category: r.category,
  name: { es: r.name_es, en: r.name_en },
  desc: { es: r.desc_es, en: r.desc_en },
  price: r.price === null ? null : Number(r.price),
  unit: r.unit,
  stock: r.stock,
  image: r.image,
  available: r.available,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});
const fromItem = (i: Item) => ({
  id: i.id,
  category: i.category,
  name_es: i.name.es,
  name_en: i.name.en,
  desc_es: i.desc.es,
  desc_en: i.desc.en,
  price: i.price,
  unit: i.unit,
  stock: i.stock,
  image: i.image,
  available: i.available,
  created_at: i.createdAt,
  updated_at: i.updatedAt,
});
const toRequest = (r: any): QuoteRequest => ({
  id: r.id,
  createdAt: r.created_at,
  status: r.status,
  name: r.name,
  phone: r.phone,
  date: r.event_date,
  mode: r.mode,
  address: r.address,
  notes: r.notes,
  lang: r.lang,
  items: r.items ?? [],
});

// First run on a fresh Supabase project: add the sample items + default info once.
let seeded: Promise<void> | null = null;
function ensureSeed() {
  if (!sb) return Promise.resolve();
  seeded ??= (async () => {
    const { data } = await sb.from("settings").select("id").eq("id", 1).maybeSingle();
    if (data) return;
    await sb.from("settings").insert({ id: 1, data: DEFAULT_SETTINGS });
    const { count } = await sb.from("items").select("id", { count: "exact", head: true });
    if (!count) must(await sb.from("items").insert(SEED_ITEMS.map(fromItem)));
  })().catch((e) => {
    seeded = null;
    throw e;
  });
  return seeded;
}

export async function getItems(): Promise<Item[]> {
  if (!sb) return (await readDB()).items;
  await ensureSeed();
  return (must(await sb.from("items").select("*").order("created_at", { ascending: false })) ?? []).map(toItem);
}
export async function getItem(id: string): Promise<Item | null> {
  if (!sb) return (await readDB()).items.find((i) => i.id === id) ?? null;
  await ensureSeed();
  const r = must(await sb.from("items").select("*").eq("id", id).maybeSingle());
  return r ? toItem(r) : null;
}
export async function upsertItem(item: Item): Promise<void> {
  if (!sb) {
    await mutate((db) => {
      const idx = db.items.findIndex((i) => i.id === item.id);
      if (idx >= 0) db.items[idx] = item;
      else db.items.unshift(item);
    });
    return;
  }
  must(await sb.from("items").upsert(fromItem(item)));
}
export async function setItemAvailable(id: string, available: boolean) {
  const it = await getItem(id);
  if (it) await upsertItem({ ...it, available, updatedAt: new Date().toISOString() });
}
export async function deleteItem(id: string): Promise<void> {
  if (!sb) {
    await mutate((db) => {
      db.items = db.items.filter((i) => i.id !== id);
    });
    return;
  }
  must(await sb.from("items").delete().eq("id", id));
}

export async function getRequests(): Promise<QuoteRequest[]> {
  if (!sb) return (await readDB()).requests;
  return (must(await sb.from("requests").select("*").order("created_at", { ascending: false })) ?? []).map(toRequest);
}
export async function addRequest(r: QuoteRequest): Promise<void> {
  if (!sb) {
    await mutate((db) => {
      db.requests.unshift(r);
    });
    return;
  }
  must(
    await sb.from("requests").insert({
      id: r.id,
      created_at: r.createdAt,
      status: r.status,
      name: r.name,
      phone: r.phone,
      event_date: r.date,
      mode: r.mode,
      address: r.address,
      notes: r.notes,
      lang: r.lang,
      items: r.items,
    }),
  );
}
export async function setRequestStatus(id: string, status: "new" | "done"): Promise<void> {
  if (!sb) {
    await mutate((db) => {
      const r = db.requests.find((x) => x.id === id);
      if (r) r.status = status;
    });
    return;
  }
  must(await sb.from("requests").update({ status }).eq("id", id));
}
export async function deleteRequest(id: string): Promise<void> {
  if (!sb) {
    await mutate((db) => {
      db.requests = db.requests.filter((x) => x.id !== id);
    });
    return;
  }
  must(await sb.from("requests").delete().eq("id", id));
}

export async function getSettings(): Promise<Settings> {
  if (!sb) return (await readDB()).settings;
  await ensureSeed();
  const r = must(await sb.from("settings").select("data").eq("id", 1).maybeSingle());
  return { ...DEFAULT_SETTINGS, ...((r?.data as Partial<Settings>) ?? {}) };
}
export async function saveSettings(s: Settings): Promise<void> {
  if (!sb) {
    await mutate((db) => {
      db.settings = s;
    });
    return;
  }
  must(await sb.from("settings").upsert({ id: 1, data: s }));
}

const CONTENT_TYPE: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };
export async function uploadPhoto(name: string, buf: Buffer): Promise<void> {
  if (!sb) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
    return;
  }
  must(
    await sb.storage.from(BUCKET).upload(name, buf, {
      contentType: CONTENT_TYPE[name.split(".").pop() ?? "jpg"],
      cacheControl: "31536000",
    }),
  );
}
export async function deletePhoto(name: string | null): Promise<void> {
  if (!name || !/^[\w-]+\.(jpg|png|webp)$/.test(name)) return;
  if (!sb) {
    await fs.unlink(path.join(UPLOAD_DIR, name)).catch(() => undefined);
    return;
  }
  await sb.storage.from(BUCKET).remove([name]);
}
