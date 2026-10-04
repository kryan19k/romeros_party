"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLang } from "../Providers";

export function Dashboard({ itemCount, newCount }: { itemCount: number; newCount: number }) {
  const { t, f } = useLang();
  const d = t.a.dash;
  const tiles = [
    { href: "/admin/items/new", e: "➕", c: "from-green to-green/70", t: d.add, h: d.addHint, badge: "" },
    { href: "/admin/items", e: "🎈", c: "from-sky to-sky/70", t: d.items, h: d.itemsHint, badge: f(d.itemsCount, { n: itemCount }) },
    { href: "/admin/requests", e: "📬", c: "from-pink to-pink/70", t: d.requests, h: d.requestsHint, badge: newCount ? f(d.newCount, { n: newCount }) : "" },
    { href: "/admin/settings", e: "⚙️", c: "from-purple to-purple/70", t: d.settings, h: d.settingsHint, badge: "" },
  ];
  return (
    <div>
      <h1 className="text-4xl font-bold sm:text-5xl">👋 {d.hello}</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {tiles.map((x, i) => (
          <motion.div key={x.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link href={x.href} className={`relative flex min-h-44 flex-col justify-between rounded-3xl bg-gradient-to-br ${x.c} p-6 text-white shadow-card transition hover:-translate-y-1 hover:scale-[1.02]`}>
              <span className="text-6xl drop-shadow">{x.e}</span>
              <span>
                <span className="block font-heading text-3xl font-bold">{x.t}</span>
                <span className="block text-lg text-white/90">{x.h}</span>
              </span>
              {x.badge && <span className="absolute right-4 top-4 rounded-full bg-white px-4 py-1 font-heading text-lg font-bold text-[#1b1a58]">{x.badge}</span>}
            </Link>
          </motion.div>
        ))}
      </div>
      <p className="mt-8 rounded-2xl bg-gold/30 px-5 py-4 text-lg">💡 {d.tip}</p>
    </div>
  );
}
