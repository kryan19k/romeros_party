"use client";

import Link from "next/link";
import { useActionState, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CategoryArt } from "../art/Art";
import { useLang } from "../Providers";
import { BackLink } from "./Shell";
import { deleteItemAction, saveItemAction } from "@/lib/actions";
import { imageSrc } from "@/lib/image";
import { AUDIENCES, bi, CATEGORIES, OCCASIONS, RENTAL_CATEGORIES, type Audience, type Category, type Item, type Occasion, type Unit } from "@/lib/types";

const CAT_EMOJI: Record<Category, string> = { jumpers: "🏰", tents: "⛺", tables: "🪑", dresses: "👗", shoes: "👟", decor: "🎈", extras: "🎁" };

/** Phone photos are huge; shrink to a web-friendly JPEG before uploading. */
async function shrink(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.82));
    return blob ? new File([blob], "photo.jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

export function ItemForm({ item }: { item?: Item }) {
  const { t, lang, f } = useLang();
  const a = t.a.form;
  const [state, action, pending] = useActionState(saveItemAction, null);
  const [category, setCategory] = useState<Category>(item?.category ?? "jumpers");
  const [unit, setUnit] = useState<Unit>(item?.unit ?? "event");
  const [occasions, setOccasions] = useState<Occasion[]>(item?.occasions ?? []);
  const [audience, setAudience] = useState<Audience>(item?.audience ?? "all");
  const [available, setAvailable] = useState(item?.available ?? true);
  const [preview, setPreview] = useState<string | null>(item?.image ? imageSrc(item.image) : null);
  const [removed, setRemoved] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleting, startDelete] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const small = await shrink(file);
    const dt = new DataTransfer();
    dt.items.add(small);
    if (fileRef.current) fileRef.current.files = dt.files;
    setPreview(URL.createObjectURL(small));
    setRemoved(false);
  }
  function pickCategory(c: Category) {
    setCategory(c);
    if (!item) setUnit(RENTAL_CATEGORIES.includes(c) ? (c === "tables" ? "each" : "event") : "sale");
  }

  const errMsg = state?.error
    ? ({ name: a.errName, price: a.errPrice, stock: a.errStock, photo: a.errPhoto, category: a.errCategory, fail: a.errFail } as Record<string, string>)[state.error] ?? a.errFail
    : null;

  return (
    <div>
      <BackLink href="/admin/items" />
      <h1 className="text-4xl font-bold">{item ? `✏️ ${a.editTitle}` : `➕ ${a.addTitle}`}</h1>

      <form action={action} className="mt-6 space-y-8">
        {item && <input type="hidden" name="id" value={item.id} />}
        <input type="hidden" name="category" value={category} />
        <input type="hidden" name="unit" value={unit} />
        <input type="hidden" name="audience" value={audience} />
        {occasions.map((o) => <input key={o} type="hidden" name="occasions" value={o} />)}
        <input type="hidden" name="available" value={available ? "1" : "0"} />
        <input type="hidden" name="removePhoto" value={removed ? "1" : "0"} />

        {/* photo */}
        <section className="card p-5">
          <h2 className="label !text-xl">📷 {a.photo}</h2>
          <div className="flex flex-wrap items-center gap-5">
            <div className="grid size-40 shrink-0 place-items-center overflow-hidden rounded-3xl border-2 border-dashed border-line bg-surface-2">
              {preview && !removed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="" className="size-full object-cover" />
              ) : (
                <CategoryArt category={category} className="size-36" />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <input ref={fileRef} id="photo" name="photo" type="file" accept="image/*" onChange={onPick} className="sr-only" />
              <label htmlFor="photo" className="btn btn-gold btn-lg cursor-pointer">📸 {preview && !removed ? a.changePhoto : a.takePhoto}</label>
              {preview && !removed && (
                <button type="button" className="btn btn-ghost" onClick={() => { setRemoved(true); if (fileRef.current) fileRef.current.value = ""; }}>
                  🗑️ {a.removePhoto}
                </button>
              )}
              <p className="text-muted">{a.photoHint}</p>
            </div>
          </div>
        </section>

        {/* category */}
        <section>
          <h2 className="label !text-xl">{a.category}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" onClick={() => pickCategory(c)} aria-pressed={category === c}
                className={`rounded-3xl border-2 p-4 text-center font-heading text-lg font-semibold transition hover:scale-105 ${category === c ? "border-pink bg-pink/10 ring-4 ring-pink/25" : "border-line bg-surface"}`}>
                <span className="block text-4xl">{CAT_EMOJI[c]}</span>
                {t.cat[c]}
              </button>
            ))}
          </div>
        </section>

        {/* names */}
        <section className="grid gap-5">
          <div>
            <label className="label !text-xl" htmlFor="nameEs">{a.nameEs}</label>
            <input id="nameEs" name="nameEs" className="input !text-xl" defaultValue={item?.name.es} maxLength={120} />
          </div>
          <div>
            <label className="label !text-xl" htmlFor="nameEn">{a.nameEn}</label>
            <input id="nameEn" name="nameEn" className="input !text-xl" defaultValue={item?.name.en} maxLength={120} />
            <p className="mt-1 text-muted">{a.nameEnHint}</p>
          </div>
        </section>

        {/* price */}
        <section className="card grid gap-5 p-5 sm:grid-cols-2">
          <div>
            <label className="label !text-xl" htmlFor="price">💲 {a.price}</label>
            <input id="price" name="price" inputMode="decimal" className="input !text-2xl" defaultValue={item?.price ?? ""} placeholder="150" maxLength={10} />
            <p className="mt-1 text-muted">{a.priceHint}</p>
          </div>
          <div>
            <span className="label !text-xl">{a.unit}</span>
            <div className="grid grid-cols-3 gap-2">
              {(["event", "each", "sale"] as const).map((u) => (
                <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)}
                  className={`rounded-2xl border-2 px-3 py-3 font-heading text-lg font-semibold ${unit === u ? "border-pink bg-pink/10 ring-4 ring-pink/25" : "border-line bg-surface"}`}>
                  {u === "event" ? a.unitEvent : u === "each" ? a.unitEach : a.unitSale}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="label !text-xl" htmlFor="stock">📦 {a.stock}</label>
            <input id="stock" name="stock" inputMode="numeric" className="input max-w-40 !text-xl" defaultValue={item?.stock ?? ""} maxLength={6} />
          </div>
        </section>

        {/* occasions, who, sizes */}
        <section className="card space-y-5 p-5">
          <div>
            <h2 className="label !text-xl">🎉 {a.occasions}</h2>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => {
                const on = occasions.includes(o);
                return (
                  <button key={o} type="button" aria-pressed={on} onClick={() => setOccasions(on ? occasions.filter((x) => x !== o) : [...occasions, o])}
                    className={`rounded-full border-2 px-4 py-2 font-heading text-lg font-semibold ${on ? "border-purple bg-purple text-white" : "border-line bg-surface"}`}>
                    {on ? "✓ " : ""}{t.occ[o]}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="label !text-xl">{a.audience}</h2>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map((x) => (
                <button key={x} type="button" aria-pressed={audience === x} onClick={() => setAudience(x)}
                  className={`rounded-full border-2 px-5 py-2 font-heading text-lg font-semibold ${audience === x ? "border-navy bg-navy text-bg" : "border-line bg-surface"}`}>
                  {x === "girls" ? "👧 " : x === "boys" ? "👦 " : ""}{t.aud[x]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label !text-xl" htmlFor="sizes">📏 {a.sizes}</label>
            <input id="sizes" name="sizes" className="input max-w-sm !text-xl" defaultValue={item?.sizes} maxLength={80} />
            <p className="mt-1 text-muted">{a.sizesHint}</p>
          </div>
        </section>

        {/* descriptions */}
        <section className="grid gap-5">
          <div>
            <label className="label !text-xl" htmlFor="descEs">{a.descEs}</label>
            <textarea id="descEs" name="descEs" rows={2} className="input" defaultValue={item?.desc.es} maxLength={600} />
          </div>
          <div>
            <label className="label !text-xl" htmlFor="descEn">{a.descEn}</label>
            <textarea id="descEn" name="descEn" rows={2} className="input" defaultValue={item?.desc.en} maxLength={600} />
          </div>
        </section>

        {/* visibility */}
        <section>
          <h2 className="label !text-xl">👀 {a.show}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" aria-pressed={available === v} onClick={() => setAvailable(v)}
                className={`rounded-2xl border-2 p-4 font-heading text-xl font-semibold ${available === v ? (v ? "border-green bg-green/15 ring-4 ring-green/25" : "border-muted bg-surface-2 ring-4 ring-muted/20") : "border-line bg-surface"}`}>
                {v ? `✅ ${a.showOn}` : `🙈 ${a.showOff}`}
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {errMsg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="rounded-2xl bg-pink/15 px-4 py-3 font-heading text-xl font-semibold text-pink">
              ⚠️ {errMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="sticky bottom-3 z-10 flex gap-3 rounded-full border-2 border-line bg-bg/95 p-2 shadow-card backdrop-blur">
          <button disabled={pending} className="btn btn-green btn-lg flex-1">💾 {pending ? a.saving : a.save}</button>
          <BackLinkButton label={a.cancel} />
        </div>
      </form>

      {item && (
        <div className="mt-10 border-t-2 border-line pt-6">
          <button type="button" onClick={() => setConfirm(true)} className="btn btn-ghost !border-pink !text-pink">🗑️ {a.delete}</button>
        </div>
      )}

      <AnimatePresence>
        {confirm && item && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="alertdialog" aria-modal="true">
            <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="card w-full max-w-md p-7 text-center">
              <div className="text-6xl">🗑️</div>
              <h2 className="mt-3 text-3xl font-bold">{f(a.deleteAsk, { name: bi(item.name, lang) })}</h2>
              <p className="mt-2 text-muted">{a.deleteWarn}</p>
              <div className="mt-6 grid gap-3">
                <button className="btn btn-green btn-lg" onClick={() => setConfirm(false)}>{a.deleteNo}</button>
                <button disabled={deleting} className="btn btn-ghost !border-pink !text-pink" onClick={() => startDelete(() => deleteItemAction(item.id))}>{a.deleteYes}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BackLinkButton({ label }: { label: string }) {
  return (
    <Link href="/admin/items" className="btn btn-ghost btn-lg">{label}</Link>
  );
}
