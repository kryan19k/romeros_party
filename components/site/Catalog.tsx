"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../Providers";
import { ItemCard } from "./ItemCard";
import { useCart } from "@/lib/cart";
import { AUDIENCES, CATEGORIES, OCCASIONS, type Audience, type Category, type Item, type Occasion } from "@/lib/types";

const CAT_EMOJI: Record<Category | "all", string> = { all: "✨", jumpers: "🏰", tents: "⛺", tables: "🪑", dresses: "👗", shoes: "👟", decor: "🎈", extras: "🎁" };

function Chip({ active, onClick, children, tone = "pink" }: { active: boolean; onClick: () => void; children: React.ReactNode; tone?: "pink" | "purple" | "navy" }) {
  const on = { pink: "border-pink bg-pink text-white", purple: "border-purple bg-purple text-white", navy: "border-navy bg-navy text-bg" }[tone];
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-1.5 font-heading text-lg font-semibold transition hover:scale-105 ${active ? on : "border-line bg-surface hover:border-pink"}`}
    >
      {children}
    </button>
  );
}

export function Catalog({ items, initialCat, initialOcc }: { items: Item[]; initialCat: Category | "all"; initialOcc: Occasion | "all" }) {
  const { t, f } = useLang();
  const [cat, setCat] = useState<Category | "all">(initialCat);
  const [occ, setOcc] = useState<Occasion | "all">(initialOcc);
  const [aud, setAud] = useState<Audience>("all");
  const [q, setQ] = useState("");
  const { count } = useCart();

  const term = q.trim().toLowerCase();
  const showAudience = cat === "all" || cat === "dresses" || cat === "shoes";
  const shown = items.filter(
    (i) =>
      (cat === "all" || i.category === cat) &&
      (occ === "all" || i.occasions.includes(occ)) &&
      (!showAudience || aud === "all" || i.audience === "all" || i.audience === aud) &&
      (!term || `${i.name.es} ${i.name.en} ${i.desc.es} ${i.desc.en}`.toLowerCase().includes(term)),
  );
  const counts = (c: Category | "all") => items.filter((i) => c === "all" || i.category === c).length;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-32 pt-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold sm:text-6xl">🎈 {t.catalog.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{t.catalog.sub}</p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label={t.catalog.title}>
        {(["all", ...CATEGORIES] as const).map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            {CAT_EMOJI[c]} {t.cat[c]} <span className="opacity-70">({counts(c)})</span>
          </Chip>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={t.catalog.occasionLabel}>
        <span className="font-heading font-semibold text-muted">{t.catalog.occasionLabel}:</span>
        <Chip tone="purple" active={occ === "all"} onClick={() => setOcc("all")}>{t.catalog.allOccasions}</Chip>
        {OCCASIONS.map((o) => (
          <Chip tone="purple" key={o} active={occ === o} onClick={() => setOcc(o)}>{t.occ[o]}</Chip>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {showAudience && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={t.catalog.forLabel}>
              <span className="font-heading font-semibold text-muted">{t.catalog.forLabel}:</span>
              {AUDIENCES.map((a) => (
                <Chip tone="navy" key={a} active={aud === a} onClick={() => setAud(a)}>
                  {a === "girls" ? "👧 " : a === "boys" ? "👦 " : ""}{t.aud[a]}
                </Chip>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto mt-5 max-w-md">
        <input className="input text-center" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`🔍 ${t.catalog.search}`} aria-label={t.catalog.search} />
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((it) => (
            <motion.div key={it.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <ItemCard item={it} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && <p className="mt-16 text-center text-xl text-muted">{term || occ !== "all" || aud !== "all" ? t.catalog.noneSearch : t.catalog.none}</p>}

      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.35 }}
            className="fixed inset-x-3 bottom-16 z-30 mx-auto flex max-w-xl items-center justify-between gap-3 rounded-full border-2 border-green bg-surface p-2 pl-6 shadow-card sm:bottom-6"
          >
            <span className="font-heading text-lg font-semibold">🛒 {f(t.catalog.quoteBar, { n: count })}</span>
            <Link href="/quote" className="btn btn-pink !min-h-11">{t.catalog.quoteBarCta} →</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
