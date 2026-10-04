"use client";

import Link from "next/link";
import { useOptimistic, useState, useTransition } from "react";
import { motion } from "motion/react";
import { CategoryArt } from "../art/Art";
import { useLang } from "../Providers";
import { BackLink } from "./Shell";
import { toggleItemAction } from "@/lib/actions";
import { imageSrc } from "@/lib/image";
import { bi, CATEGORIES, type Category, type Item } from "@/lib/types";

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-10 w-[4.5rem] shrink-0 rounded-full border-2 transition-colors ${on ? "border-green bg-green" : "border-line bg-surface-2"}`}
    >
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`absolute top-1 size-7 rounded-full bg-white shadow ${on ? "right-1" : "left-1"}`} />
    </button>
  );
}

export function ItemList({ items, flash }: { items: Item[]; flash: "saved" | "deleted" | null }) {
  const { t, lang } = useLang();
  const a = t.a.items;
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const [, start] = useTransition();
  const [rows, setOptimistic] = useOptimistic(items, (cur, p: { id: string; available: boolean }) =>
    cur.map((i) => (i.id === p.id ? { ...i, available: p.available } : i)),
  );

  const term = q.trim().toLowerCase();
  const shown = rows.filter((i) => (cat === "all" || i.category === cat) && (!term || `${i.name.es} ${i.name.en}`.toLowerCase().includes(term)));

  return (
    <div>
      <BackLink />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold">🎈 {a.title}</h1>
        <Link href="/admin/items/new" className="btn btn-green btn-lg">➕ {a.add}</Link>
      </div>

      {flash && (
        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl bg-green/20 px-5 py-3 font-heading text-xl font-semibold text-green">
          ✅ {flash === "saved" ? a.saved : a.deleted}
        </motion.p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", ...CATEGORIES] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full border-2 px-4 py-2 font-heading text-lg font-semibold ${cat === c ? "border-navy bg-navy text-bg" : "border-line bg-surface"}`}>
            {c === "all" ? a.all : t.cat[c]}
          </button>
        ))}
      </div>
      <input className="input mt-4" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`🔍 ${a.search}`} aria-label={a.search} />

      <ul className="mt-6 space-y-3">
        {shown.map((it) => (
          <motion.li layout key={it.id} className={`card flex flex-wrap items-center gap-4 p-4 ${it.available ? "" : "opacity-75"}`}>
            <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-surface-2">
              {it.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageSrc(it.image)} alt="" className="size-full object-cover" />
              ) : (
                <CategoryArt category={it.category} className="size-[4.5rem]" />
              )}
            </div>
            <div className="min-w-0 flex-1 basis-40">
              <p className="truncate font-heading text-2xl font-bold">{bi(it.name, lang)}</p>
              <p className="text-muted">
                {t.cat[it.category]} ·{" "}
                {it.price === null ? a.noPrice : `$${it.price} ${it.unit === "each" ? a.priceEach : a.priceEvent}`}
                {it.stock !== null && ` · ${t.a.items.stock.replace("{n}", String(it.stock))}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <Switch
                  on={it.available}
                  label={it.available ? a.available : a.hidden}
                  onChange={(v) => start(async () => { setOptimistic({ id: it.id, available: v }); await toggleItemAction(it.id, v); })}
                />
                <span className={`font-heading text-sm font-semibold ${it.available ? "text-green" : "text-muted"}`}>{it.available ? a.available : a.hidden}</span>
              </div>
              <Link href={`/admin/items/${it.id}`} className="btn btn-gold !min-h-12">✏️ {a.edit}</Link>
            </div>
          </motion.li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-10 text-center text-xl text-muted">{a.empty}</p>}
    </div>
  );
}
