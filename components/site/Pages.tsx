"use client";

import Link from "@/components/LocalLink";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Balloon, Truck } from "../art/Art";
import { Logo } from "../Logo";
import { useLang } from "../Providers";
import { ContactCta } from "./Home";
import { Reveal, SectionTitle, Stagger, StaggerItem } from "./Motion";
import { bi, telLink, type Settings } from "@/lib/types";

function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-2 to-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full bg-gold px-4 py-1 font-heading text-sm font-semibold uppercase tracking-wider text-[#1b1a58]">
          {eyebrow}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-balance text-5xl font-bold sm:text-7xl">
          {title}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mx-auto mt-4 max-w-xl text-xl text-muted">
            {sub}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button type="button" className="flex w-full items-center justify-between gap-4 p-5 text-left font-heading text-xl font-semibold" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-3xl text-pink">＋</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-lg text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DeliveryPage({ settings }: { settings: Settings }) {
  const { t, lang } = useLang();
  const d = t.delivery;
  const feats = [
    { e: "🚚", c: "bg-pink", t: d.f1t, d: d.f1d },
    { e: "↩️", c: "bg-sky", t: d.f2t, d: d.f2d },
    { e: "🛠️", c: "bg-green", t: d.f3t, d: d.f3d },
  ];
  const info = [
    { e: "📍", t: d.areaTitle, d: bi(settings.deliveryArea, lang) },
    { e: "💲", t: d.feeTitle, d: bi(settings.deliveryFee, lang) },
    { e: "📞", t: d.hoursTitle, d: bi(settings.hours, lang) },
  ];
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} sub={d.sub}>
        <div className="relative mx-auto mt-10 h-28 max-w-3xl overflow-hidden" aria-hidden>
          <div className="absolute bottom-3 h-1.5 w-full rounded bg-line" />
          <Truck className="absolute bottom-3 h-24 animate-drive" />
        </div>
        <Link href="/quote?mode=delivery" className="btn btn-pink btn-lg mt-6">🚚 {d.cta}</Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {feats.map((f) => (
            <StaggerItem key={f.t} className="card p-7 text-center">
              <span className={`mx-auto grid size-16 place-items-center rounded-full ${f.c} text-3xl text-white`}>{f.e}</span>
              <h3 className="mt-4 text-2xl font-bold">{f.t}</h3>
              <p className="mt-2 text-muted">{f.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {info.map((i) => (
            <StaggerItem key={i.t} className="rounded-3xl border-2 border-dashed border-navy bg-surface-2 p-7">
              <div className="text-4xl">{i.e}</div>
              <h3 className="mt-2 text-2xl font-bold">{i.t}</h3>
              <p className="mt-2 whitespace-pre-line text-lg">{i.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <SectionTitle title={d.faqTitle} />
        <div className="mt-8 space-y-3">
          <Faq q={d.q1} a={d.a1} />
          <Faq q={d.q2} a={d.a2} />
          <Faq q={d.q3} a={d.a3} />
        </div>
      </section>
      <ContactCta settings={settings} />
    </>
  );
}

export function AboutPage({ settings }: { settings: Settings }) {
  const { t, lang } = useLang();
  const a = t.about;
  const paras = bi(settings.about, lang).split(/\n{2,}/).filter(Boolean);
  const vals = [
    { e: "✨", c: "bg-gold", t: a.v1t, d: a.v1d },
    { e: "🎈", c: "bg-pink", t: a.v2t, d: a.v2d },
    { e: "🤝", c: "bg-green", t: a.v3t, d: a.v3d },
  ];
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} />
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-4 md:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-[2.5rem] bg-gradient-to-br from-gold/40 via-pink/25 to-sky/30">
          <Logo size="md" ribbon />
          <Balloon color="#e8336d" className="absolute -left-3 top-6 h-24 animate-float text-ink" />
          <Balloon color="#7a3fc4" className="absolute -right-3 top-12 h-20 animate-float-slow text-ink" />
          <Balloon color="#22a24a" className="absolute bottom-4 left-10 h-16 animate-float text-ink" />
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-xl leading-relaxed">
          {paras.map((p, i) => (
            <p key={i} className={i === 0 ? "font-heading text-2xl font-medium" : "text-muted"}>{p}</p>
          ))}
          <p className="font-heading text-2xl font-bold text-pink">{t.brand.slogan}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={telLink(settings.phone1)} className="btn btn-gold">📞 {settings.phone1}</a>
            <Link href="/quote" className="btn btn-pink">📝 {t.nav.quote}</Link>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {vals.map((v) => (
            <StaggerItem key={v.t} className="card p-7 text-center">
              <span className={`mx-auto grid size-16 place-items-center rounded-full ${v.c} text-3xl`}>{v.e}</span>
              <h3 className="mt-4 text-2xl font-bold">{v.t}</h3>
              <p className="mt-2 text-muted">{v.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <ContactCta settings={settings} />
    </>
  );
}
