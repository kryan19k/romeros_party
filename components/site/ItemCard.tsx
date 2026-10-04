"use client";

import { motion } from "motion/react";
import { CategoryArt } from "../art/Art";
import { useLang } from "../Providers";
import { useCart } from "@/lib/cart";
import { imageSrc } from "@/lib/image";
import { bi, type Item } from "@/lib/types";

export function Price({ item }: { item: Item }) {
  const { t } = useLang();
  if (item.price === null) return <span className="font-heading text-lg font-semibold text-muted">{t.catalog.callForPrice}</span>;
  const money = Number.isInteger(item.price) ? String(item.price) : item.price.toFixed(2);
  return (
    <span className="font-heading text-2xl font-bold text-pink">
      ${money}
      <span className="ml-1 text-sm font-semibold text-muted">{item.unit === "each" ? t.catalog.each : t.catalog.perEvent}</span>
    </span>
  );
}

export function ItemCard({ item }: { item: Item }) {
  const { t, lang } = useLang();
  const cart = useCart();
  const qty = cart.qty(item.id);
  const max = item.stock ?? 9999;
  const name = bi(item.name, lang);
  const desc = bi(item.desc, lang);

  return (
    <motion.article layout whileHover={{ y: -6 }} className={`card flex h-full flex-col overflow-hidden ${item.available ? "" : "opacity-70"}`}>
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-surface-2 to-bg-2">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc(item.image)} alt={name} loading="lazy" className="size-full object-cover transition duration-500 hover:scale-105" />
        ) : (
          <CategoryArt category={item.category} className="h-[85%] w-auto drop-shadow-lg" />
        )}
        {!item.available && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 font-heading text-sm font-semibold text-bg">{t.catalog.unavailable}</span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide text-[#1b1a58]">
          {t.cat[item.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        {desc && <p className="text-muted">{desc}</p>}
        <div className="mt-auto pt-3">
          <Price item={item} />
        </div>
        {item.available &&
          (qty === 0 ? (
            <button type="button" className="btn btn-pink mt-2 w-full" onClick={() => cart.set(item.id, 1)}>
              ＋ {t.catalog.add}
            </button>
          ) : (
            <div className="mt-2 flex items-center justify-between gap-2 rounded-full border-2 border-green bg-surface-2 p-1">
              <button type="button" aria-label={t.catalog.decrease} onClick={() => cart.set(item.id, qty - 1)} className="grid size-11 place-items-center rounded-full bg-surface text-2xl font-bold transition hover:scale-110">−</button>
              <motion.span key={qty} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="font-heading text-xl font-bold">
                {qty} <span className="text-sm font-semibold text-green">✓ {t.catalog.inQuote}</span>
              </motion.span>
              <button type="button" aria-label={t.catalog.increase} disabled={qty >= max} onClick={() => cart.set(item.id, qty + 1)} className="grid size-11 place-items-center rounded-full bg-green text-2xl font-bold text-white transition hover:scale-110 disabled:opacity-40">＋</button>
            </div>
          ))}
      </div>
    </motion.article>
  );
}
