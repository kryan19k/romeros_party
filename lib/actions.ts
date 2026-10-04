"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addRequest,
  deleteItem,
  deletePhoto,
  deleteRequest,
  getItem,
  getItems,
  getSettings,
  saveSettings,
  setItemAvailable,
  setRequestStatus,
  upsertItem,
  uploadPhoto,
} from "./store";
import {
  checkPassword,
  endSession,
  loginGuard,
  passwordConfigured,
  requireAdmin,
  startSession,
} from "./auth";
import { AUDIENCES, CATEGORIES, OCCASIONS, RENTAL_CATEGORIES, type Audience, type Category, type Lang, type Occasion, type Unit } from "./types";

export type FormState = { error?: string; ok?: boolean } | null;

const refresh = () => revalidatePath("/", "layout");
const str = (fd: FormData, k: string, max = 500) => String(fd.get(k) ?? "").trim().slice(0, max);

// ───────────── login ─────────────
export async function loginAction(_: FormState, fd: FormData): Promise<FormState> {
  if (!passwordConfigured()) return { error: "notSet" };
  const guard = await loginGuard();
  if (guard.locked) return { error: "locked" };
  if (!checkPassword(String(fd.get("password") ?? ""))) {
    guard.fail();
    return { error: "wrong" };
  }
  guard.ok();
  await startSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

// ───────────── photos ─────────────
function sniff(buf: Buffer): string | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 12 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}
async function savePhoto(file: File): Promise<string> {
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > 8 * 1024 * 1024) throw new Error("photo");
  const ext = sniff(buf);
  if (!ext) throw new Error("photo");
  const name = `${crypto.randomUUID()}.${ext}`;
  await uploadPhoto(name, buf);
  return name;
}

// ───────────── items ─────────────
export async function saveItemAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = str(fd, "id", 80);
  const nameEs = str(fd, "nameEs", 120);
  const nameEn = str(fd, "nameEn", 120);
  if (!nameEs && !nameEn) return { error: "name" };

  const category = str(fd, "category") as Category;
  if (!CATEGORIES.includes(category)) return { error: "category" };
  const unitRaw = str(fd, "unit");
  const unit: Unit = unitRaw === "each" || unitRaw === "sale" ? unitRaw : "event";
  const occasions = fd.getAll("occasions").map(String).filter((o): o is Occasion => (OCCASIONS as readonly string[]).includes(o));
  const audienceRaw = str(fd, "audience");
  const audience: Audience = (AUDIENCES as readonly string[]).includes(audienceRaw) ? (audienceRaw as Audience) : "all";

  const priceRaw = str(fd, "price", 12).replace(/[$,\s]/g, "");
  const price = priceRaw === "" ? null : Number(priceRaw);
  if (price !== null && (!Number.isFinite(price) || price < 0 || price > 100000)) return { error: "price" };
  const stockRaw = str(fd, "stock", 8);
  const stock = stockRaw === "" ? null : Math.floor(Number(stockRaw));
  if (stock !== null && (!Number.isFinite(stock) || stock < 0 || stock > 100000)) return { error: "stock" };

  const photo = fd.get("photo");
  let newImage: string | null = null;
  if (photo instanceof File && photo.size > 0) {
    try {
      newImage = await savePhoto(photo);
    } catch {
      return { error: "photo" };
    }
  }
  const dropImage = str(fd, "removePhoto") === "1";

  const stamp = new Date().toISOString();
  const fields = {
    category,
    unit,
    price,
    stock,
    occasions,
    audience,
    sizes: str(fd, "sizes", 80),
    name: { es: nameEs, en: nameEn },
    desc: { es: str(fd, "descEs", 600), en: str(fd, "descEn", 600) },
    available: str(fd, "available") === "1",
  };

  let oldImage: string | null = null;
  try {
    const existing = id ? await getItem(id) : null;
    if (existing) {
      const image = newImage ?? (dropImage ? null : existing.image);
      if (image !== existing.image) oldImage = existing.image;
      await upsertItem({ ...existing, ...fields, image, updatedAt: stamp });
    } else {
      await upsertItem({ id: crypto.randomUUID(), ...fields, image: newImage, createdAt: stamp, updatedAt: stamp });
    }
  } catch {
    await deletePhoto(newImage);
    return { error: "fail" };
  }
  await deletePhoto(oldImage);
  refresh();
  redirect("/admin/items?saved=1");
}

export async function toggleItemAction(id: string, available: boolean) {
  await requireAdmin();
  await setItemAvailable(id, available);
  refresh();
}

export async function deleteItemAction(id: string) {
  await requireAdmin();
  const item = await getItem(id);
  if (item) {
    await deleteItem(id);
    await deletePhoto(item.image);
  }
  refresh();
  redirect("/admin/items?deleted=1");
}

// ───────────── settings ─────────────
export async function saveSettingsAction(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  try {
    const cur = await getSettings();
    await saveSettings({
      phone1: str(fd, "phone1", 30) || cur.phone1,
      phone2: str(fd, "phone2", 30),
      deliveryArea: { es: str(fd, "deliveryAreaEs", 600), en: str(fd, "deliveryAreaEn", 600) },
      deliveryFee: { es: str(fd, "deliveryFeeEs", 600), en: str(fd, "deliveryFeeEn", 600) },
      hours: { es: str(fd, "hoursEs", 200), en: str(fd, "hoursEn", 200) },
      about: { es: str(fd, "aboutEs", 3000), en: str(fd, "aboutEn", 3000) },
    });
  } catch {
    return { error: "fail" };
  }
  refresh();
  return { ok: true };
}

// ───────────── requests ─────────────
export async function setRequestStatusAction(id: string, status: "new" | "done") {
  await requireAdmin();
  await setRequestStatus(id, status);
  refresh();
}
export async function deleteRequestAction(id: string) {
  await requireAdmin();
  await deleteRequest(id);
  refresh();
}

// Public: customer quote form
export type QuoteInput = {
  name: string;
  phone: string;
  date: string;
  mode: "delivery" | "pickup";
  address: string;
  notes: string;
  lang: Lang;
  items: { id: string; qty: number }[];
  website?: string; // honeypot
};
export type QuoteResult = { ok: true; id: string } | { ok: false; error: "name" | "phone" | "date" | "address" | "empty" | "fail" };

export async function submitQuoteAction(input: QuoteInput): Promise<QuoteResult> {
  if (input.website) return { ok: true, id: "ignored" }; // bots fill the hidden field
  const name = String(input.name ?? "").trim().slice(0, 100);
  const phone = String(input.phone ?? "").trim().slice(0, 30);
  const date = String(input.date ?? "").slice(0, 10);
  const mode = input.mode === "delivery" ? "delivery" : "pickup";
  const address = String(input.address ?? "").trim().slice(0, 300);
  const notes = String(input.notes ?? "").trim().slice(0, 1000);
  const lang: Lang = input.lang === "es" ? "es" : "en";

  if (name.length < 2) return { ok: false, error: "name" };
  if (phone.replace(/\D/g, "").length < 10) return { ok: false, error: "phone" };
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "date" };
  if (mode === "delivery" && address.length < 5) return { ok: false, error: "address" };

  try {
    const catalog = await getItems();
    const lines = (Array.isArray(input.items) ? input.items : [])
      .slice(0, 50)
      .flatMap((l) => {
        const it = catalog.find((i) => i.id === l.id);
        const qty = Math.max(1, Math.min(10000, Math.floor(Number(l.qty) || 1)));
        return it ? [{ id: it.id, name: it.name, qty }] : [];
      });
    if (!lines.length && !notes) return { ok: false, error: "empty" };
    const rents = lines.some((l) => RENTAL_CATEGORIES.includes(catalog.find((i) => i.id === l.id)!.category));
    if (rents && !date) return { ok: false, error: "date" };
    const id = crypto.randomUUID();
    await addRequest({
      id,
      createdAt: new Date().toISOString(),
      status: "new",
      name,
      phone,
      date,
      mode,
      address,
      notes,
      lang,
      items: lines,
    });
    revalidatePath("/admin", "layout");
    return { ok: true, id };
  } catch {
    return { ok: false, error: "fail" };
  }
}
