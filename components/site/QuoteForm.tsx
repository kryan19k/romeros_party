"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CategoryArt } from "../art/Art";
import { useLang } from "../Providers";
import { Price } from "./ItemCard";
import { useCart } from "@/lib/cart";
import { imageSrc } from "@/lib/image";
import { submitQuoteAction } from "@/lib/actions";
import { bi, waLink, type Item } from "@/lib/types";

const COLORS = ["#e8336d", "#ffc21a", "#22a24a", "#1c9ee0", "#7a3fc4", "#ff8a1f"];
function Burst() {
  // Fixed pattern (no randomness) so rendering stays pure.
  const bits = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    const d = 140 + (i % 5) * 45;
    return { x: Math.cos(a) * d, y: Math.sin(a) * d - 60, c: COLORS[i % COLORS.length], r: i * 47 };
  });
  return (
    <div className="pointer-events-none absolute left-1/2 top-24 z-10" aria-hidden>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block h-3 w-2 rounded-sm"
          style={{ background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 220], opacity: [1, 1, 0], rotate: b.r }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function QuoteForm({ items, phone, initialMode }: { items: Item[]; phone: string; initialMode: "delivery" | "pickup" }) {
  const { t, lang } = useLang();
  const cart = useCart();
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const lines = cart.lines.flatMap((l) => {
    const item = items.find((i) => i.id === l.id);
    return item ? [{ item, qty: l.qty }] : [];
  });
  const today = new Date().toISOString().slice(0, 10);

  function summary(fd: FormData) {
    const q = t.quote;
    const rows = lines.map((l) => `• ${l.qty}× ${bi(l.item.name, lang)}`);
    return [
      q.waIntro,
      "",
      ...rows,
      "",
      `${q.waName}: ${fd.get("name")}`,
      `${q.waDate}: ${fd.get("date")}`,
      mode === "delivery" ? `${q.waDelivery}: ${fd.get("address")}` : q.waPickup,
      fd.get("notes") ? `${q.waNotes}: ${fd.get("notes")}` : "",
    ]
      .filter((x, i, a) => x !== "" || (a[i - 1] !== "" && i !== a.length - 1))
      .join("\n");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const res = await submitQuoteAction({
        name: String(fd.get("name") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        date: String(fd.get("date") ?? ""),
        mode,
        address: String(fd.get("address") ?? ""),
        notes: String(fd.get("notes") ?? ""),
        lang,
        items: cart.lines,
        website: String(fd.get("website") ?? ""),
      });
      if (!res.ok) {
        const map = { name: t.quote.errName, phone: t.quote.errPhone, date: t.quote.errDate, address: t.quote.errAddress, empty: t.quote.errEmpty, fail: t.quote.errFail };
        setError(map[res.error]);
        return;
      }
      setDone(waLink(phone, summary(fd)));
      cart.clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (done) {
    return (
      <div className="relative mx-auto max-w-xl px-4 py-20 text-center">
        <Burst />
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.6 }} className="text-8xl">🎉</motion.div>
        <h1 className="mt-4 text-5xl font-bold">{t.quote.thanksTitle}</h1>
        <p className="mt-3 text-xl text-muted">{t.quote.thanksText}</p>
        <div className="card mt-8 p-6">
          <p className="text-lg">{t.quote.thanksWa}</p>
          <a href={done} target="_blank" rel="noreferrer" className="btn btn-green btn-lg mt-4">💬 {t.quote.thanksWaBtn}</a>
        </div>
        <Link href="/" className="btn btn-ghost mt-6">{t.quote.home}</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold sm:text-6xl">📝 {t.quote.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{t.quote.sub}</p>
      </div>

      <section className="card mt-10 p-6">
        <h2 className="text-2xl font-bold">🎈 {t.quote.yourItems}</h2>
        {lines.length === 0 ? (
          <div className="mt-4 text-center">
            <p className="text-lg text-muted">{t.quote.empty}</p>
            <Link href="/catalog" className="btn btn-gold mt-4">{t.quote.browse} →</Link>
          </div>
        ) : (
          <ul className="mt-4 divide-y-2 divide-line">
            <AnimatePresence initial={false}>
              {lines.map(({ item, qty }) => (
                <motion.li key={item.id} layout exit={{ opacity: 0, height: 0 }} className="flex items-center gap-4 py-3">
                  <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-surface-2">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageSrc(item.image)} alt="" className="size-full object-cover" />
                    ) : (
                      <CategoryArt category={item.category} className="size-14" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-xl font-semibold">{bi(item.name, lang)}</p>
                    <Price item={item} />
                  </div>
                  <div className="flex items-center gap-1 rounded-full border-2 border-line p-1">
                    <button type="button" aria-label={t.catalog.decrease} onClick={() => cart.set(item.id, qty - 1)} className="grid size-10 place-items-center rounded-full bg-surface-2 text-xl font-bold">−</button>
                    <span className="w-9 text-center font-heading text-xl font-bold">{qty}</span>
                    <button type="button" aria-label={t.catalog.increase} disabled={qty >= (item.stock ?? 9999)} onClick={() => cart.set(item.id, qty + 1)} className="grid size-10 place-items-center rounded-full bg-green text-xl font-bold text-white disabled:opacity-40">＋</button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        {lines.length > 0 && (
          <Link href="/catalog" className="mt-3 inline-block font-heading font-semibold text-pink hover:underline">＋ {t.quote.browse}</Link>
        )}
      </section>

      <form onSubmit={onSubmit} className="card mt-6 space-y-6 p-6" noValidate>
        <h2 className="text-2xl font-bold">👋 {t.quote.yourInfo}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">{t.quote.name}</label>
            <input id="name" name="name" className="input" autoComplete="name" required maxLength={100} />
          </div>
          <div>
            <label className="label" htmlFor="phone">{t.quote.phone}</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" className="input" autoComplete="tel" placeholder="(951) 555-0123" required maxLength={30} />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="date">{t.quote.date}</label>
            <input id="date" name="date" type="date" className="input" min={today} required />
          </div>
        </div>

        <fieldset>
          <legend className="label">{t.quote.how}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["delivery", "pickup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`rounded-2xl border-2 p-4 text-left font-heading text-xl font-semibold transition hover:scale-[1.02] ${mode === m ? "border-pink bg-pink/10 ring-4 ring-pink/20" : "border-line bg-surface"}`}
              >
                {m === "delivery" ? "🚚" : "🚗"} {t.quote[m]}
              </button>
            ))}
          </div>
        </fieldset>

        <AnimatePresence initial={false}>
          {mode === "delivery" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <label className="label" htmlFor="address">{t.quote.address}</label>
              <input id="address" name="address" className="input" autoComplete="street-address" placeholder={t.quote.addressHint} maxLength={300} />
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="label" htmlFor="notes">{t.quote.notes}</label>
          <textarea id="notes" name="notes" rows={3} className="input" maxLength={1000} />
        </div>

        {/* honeypot: real people never see or fill this */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="rounded-2xl bg-pink/15 px-4 py-3 font-heading text-lg font-semibold text-pink">
              ⚠️ {error}
            </motion.p>
          )}
        </AnimatePresence>

        <button type="submit" disabled={pending} className="btn btn-pink btn-lg w-full">
          {pending ? t.quote.sending : `🎉 ${t.quote.send}`}
        </button>
      </form>
    </div>
  );
}
