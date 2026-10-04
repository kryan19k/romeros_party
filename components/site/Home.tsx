"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Balloon, BounceHouse, Bunting, CategoryArt, FallingConfetti, Tent, TableChairs, Truck } from "../art/Art";
import { Logo } from "../Logo";
import { useLang } from "../Providers";
import { Reveal, SectionTitle, Stagger, StaggerItem } from "./Motion";
import { ItemCard } from "./ItemCard";
import { bi, telLink, waLink, type Category, type Item, type Settings } from "@/lib/types";

const FLOATERS = [
  { c: "#e8336d", left: "4%", top: "16%", h: "h-24", d: "0s", r: "-10deg" },
  { c: "#ffc21a", left: "11%", top: "58%", h: "h-20", d: "-2s", r: "8deg" },
  { c: "#1c9ee0", left: "90%", top: "12%", h: "h-24", d: "-1s", r: "10deg" },
  { c: "#22a24a", left: "94%", top: "55%", h: "h-20", d: "-3s", r: "-8deg" },
  { c: "#7a3fc4", left: "48%", top: "4%", h: "h-14", d: "-4s", r: "6deg" },
];

function Hero({ settings }: { settings: Settings }) {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-2 to-bg">
      <Bunting className="absolute inset-x-0 top-0 h-14 w-full origin-top animate-sway sm:h-20" />
      <FallingConfetti />
      {FLOATERS.map((b, i) => (
        <Balloon
          key={i}
          color={b.c}
          className={`pointer-events-none absolute hidden animate-float text-ink md:block ${b.h}`}
          style={{ left: b.left, top: b.top, animationDelay: b.d, ["--r" as string]: b.r }}
        />
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-24 sm:pt-32 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.5, duration: 0.9 }} className="mb-6 flex justify-center lg:justify-start">
            <Logo size="lg" ribbon />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-balance text-5xl font-bold sm:text-6xl"
          >
            {t.hero.title}{" "}
            <span className="inline-block -rotate-1 rounded-2xl bg-pink px-3 py-1 text-white shadow-lg">{t.hero.titleHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mx-auto mt-5 max-w-xl text-xl text-muted lg:mx-0">
            <span className="rounded-lg bg-gold/90 px-2 font-heading font-semibold text-[#1b1a58]">{t.hero.sub}</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/quote" className="btn btn-pink btn-lg">📝 {t.hero.ctaQuote}</Link>
            <Link href="/catalog" className="btn btn-gold btn-lg">🎈 {t.hero.ctaCatalog}</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((b) => (
              <span key={b} className="rounded-full border-2 border-line bg-surface px-3 py-1 font-heading text-sm font-semibold">✓ {b}</span>
            ))}
          </motion.div>
          <p className="mt-5 text-lg">
            <a href={telLink(settings.phone1)} className="font-heading text-xl font-bold text-navy hover:text-pink">📞 {settings.phone1}</a>
          </p>
        </div>

        {/* illustrated showcase */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-sky/30 via-purple/20 to-pink/30 blur-2xl" />
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring", bounce: 0.4 }} className="card absolute left-0 top-0 w-[68%] -rotate-3 animate-float-slow p-3">
            <BounceHouse className="w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring", bounce: 0.4 }} className="card absolute right-0 top-[30%] w-[60%] rotate-3 animate-float p-3" style={{ animationDelay: "-3s" }}>
            <Tent className="w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: "spring", bounce: 0.4 }} className="card absolute bottom-0 left-[8%] w-[58%] -rotate-2 animate-float-slow p-3" style={{ animationDelay: "-5s" }}>
            <TableChairs className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { t } = useLang();
  const row = [...t.marquee, ...t.marquee];
  const colors = ["bg-pink", "bg-navy text-bg", "bg-green", "bg-purple", "bg-sky text-[#0b0b2c]", "bg-orange text-[#0b0b2c]"];
  return (
    <div className="overflow-hidden border-y-2 border-line bg-surface py-3" aria-hidden>
      <div className="flex w-max animate-marquee gap-4 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className={`rounded-full px-5 py-1.5 font-heading text-lg font-semibold text-white ${colors[i % colors.length]}`}>
            ★ {w}
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICE_COLORS: Record<Category, string> = {
  jumpers: "from-purple/25 to-sky/20",
  tents: "from-green/25 to-sky/15",
  tables: "from-pink/25 to-gold/20",
  extras: "from-orange/25 to-pink/15",
};

function Services() {
  const { t } = useLang();
  const cats: Category[] = ["jumpers", "tents", "tables"];
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
      <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} />
      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {cats.map((c) => (
          <StaggerItem key={c}>
            <Link href={`/catalog?cat=${c}`} className="card group block overflow-hidden transition hover:-translate-y-2 hover:border-pink">
              <div className={`grid aspect-[4/3] place-items-center bg-gradient-to-br ${SERVICE_COLORS[c]}`}>
                <CategoryArt category={c} className="h-[82%] transition duration-500 group-hover:scale-110 group-hover:-rotate-2" />
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-bold">{t.cat[c]}</h3>
                <p className="mt-1 text-lg text-muted">{t.catTag[c]}</p>
                <span className="mt-4 inline-block font-heading text-lg font-semibold text-pink group-hover:underline">{t.services.see} →</span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Steps() {
  const { t } = useLang();
  const steps = [
    { e: "🎈", c: "bg-pink", t: t.steps.s1t, d: t.steps.s1d },
    { e: "📝", c: "bg-sky", t: t.steps.s2t, d: t.steps.s2d },
    { e: "🚚", c: "bg-green", t: t.steps.s3t, d: t.steps.s3d },
    { e: "🎉", c: "bg-purple", t: t.steps.s4t, d: t.steps.s4d },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24">
      <SectionTitle eyebrow={t.steps.eyebrow} title={t.steps.title} />
      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <StaggerItem key={i} className="card relative p-6 pt-10 text-center">
            <span className={`absolute -top-6 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full ${s.c} text-3xl text-white shadow-lg ring-4 ring-bg`}>{s.e}</span>
            <span className="font-heading text-sm font-bold uppercase tracking-widest text-muted">{i + 1}</span>
            <h3 className="mt-1 text-2xl font-bold">{s.t}</h3>
            <p className="mt-2 text-muted">{s.d}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Featured({ items }: { items: Item[] }) {
  const { t } = useLang();
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24">
      <SectionTitle eyebrow={t.featured.eyebrow} title={t.featured.title} />
      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <StaggerItem key={it.id}>
            <ItemCard item={it} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <Link href="/catalog" className="btn btn-gold btn-lg">{t.featured.all} →</Link>
      </Reveal>
    </section>
  );
}

function DeliveryBanner() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-[#262b9c] p-8 text-white shadow-card sm:p-12">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block rounded-full bg-gold px-4 py-1 font-heading text-sm font-semibold uppercase tracking-wider text-[#1b1a58]">{t.deliveryBanner.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{t.deliveryBanner.title}</h2>
          <p className="mt-3 text-lg text-white/85">{t.deliveryBanner.text}</p>
          <Link href="/delivery" className="btn btn-gold mt-6">{t.deliveryBanner.cta} →</Link>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden" aria-hidden>
          <div className="absolute bottom-3 left-0 h-1.5 w-full bg-white/20" />
          <Truck className="absolute bottom-3 h-20 animate-drive sm:h-24" />
        </div>
        <div className="pb-20" />
      </Reveal>
    </section>
  );
}

function AboutTeaser({ settings }: { settings: Settings }) {
  const { t, lang } = useLang();
  const first = bi(settings.about, lang).split("\n\n")[0];
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-24 md:grid-cols-2">
      <Reveal className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-[2.5rem] bg-gradient-to-br from-gold/40 to-pink/30">
        <Logo size="md" ribbon />
        <Balloon color="#1c9ee0" className="absolute -left-2 top-4 h-20 animate-float text-ink" />
        <Balloon color="#22a24a" className="absolute -right-2 bottom-6 h-24 animate-float-slow text-ink" />
      </Reveal>
      <Reveal delay={0.1}>
        <span className="mb-3 inline-block rounded-full bg-gold px-4 py-1 font-heading text-sm font-semibold uppercase tracking-wider text-[#1b1a58]">{t.aboutTeaser.eyebrow}</span>
        <h2 className="text-4xl font-bold sm:text-5xl">{t.aboutTeaser.title}</h2>
        <p className="mt-4 text-lg text-muted">{first}</p>
        <Link href="/about" className="btn btn-pink mt-6">{t.aboutTeaser.cta} →</Link>
      </Reveal>
    </section>
  );
}

export function ContactCta({ settings }: { settings: Settings }) {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink to-purple p-8 text-center text-white shadow-card sm:p-14">
        <h2 className="text-4xl font-bold sm:text-6xl">{t.contact.title}</h2>
        <p className="mt-3 text-xl text-white/90">{t.contact.sub}</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {[settings.phone1, settings.phone2].filter(Boolean).map((p) => (
            <a key={p} href={telLink(p)} className="font-heading text-4xl font-bold text-gold drop-shadow transition hover:scale-105 sm:text-6xl">{p}</a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={waLink(settings.phone1)} target="_blank" rel="noreferrer" className="btn btn-green btn-lg">💬 {t.contact.whatsapp}</a>
          <Link href="/quote" className="btn btn-gold btn-lg">📝 {t.nav.quote}</Link>
        </div>
      </Reveal>
    </section>
  );
}

export function Home({ items, settings }: { items: Item[]; settings: Settings }) {
  return (
    <>
      <Hero settings={settings} />
      <Marquee />
      <Services />
      <Steps />
      <Featured items={items} />
      <DeliveryBanner />
      <AboutTeaser settings={settings} />
      <ContactCta settings={settings} />
    </>
  );
}
