"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "../Logo";
import { LangToggle, ThemeToggle } from "../Toggles";
import { useLang } from "../Providers";
import { useCart } from "@/lib/cart";
import { bi, telLink, waLink, type Bi } from "@/lib/types";

const LINKS = [
  { href: "/", key: "home" },
  { href: "/catalog", key: "catalog" },
  { href: "/delivery", key: "delivery" },
  { href: "/about", key: "about" },
] as const;

export function Navbar({ phone }: { phone: string }) {
  const { t } = useLang();
  const path = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <Link href="/" className="shrink-0 transition hover:scale-105" aria-label={t.brand.name} onClick={() => setOpen(false)}>
          <Logo size="sm" />
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 font-heading text-lg font-medium transition hover:text-pink ${active ? "text-pink" : ""}`}
              >
                {t.nav[l.key]}
                {active && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-1 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <Link href="/quote" className="btn btn-pink relative !min-h-11 !px-4 !py-1.5 text-base">
            <span className="hidden sm:inline">{t.nav.quote}</span>
            <span className="sm:hidden" aria-hidden>📝</span>
            <span className="sr-only sm:hidden">{t.nav.quote}</span>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="grid size-6 place-items-center rounded-full bg-gold text-sm font-bold text-[#1b1a58]"
              >
                {count}
              </motion.span>
            )}
          </Link>
          <a href={telLink(phone)} className="btn btn-gold !hidden !min-h-11 !px-4 !py-1.5 text-base xl:!inline-flex" aria-label={`${t.nav.call} ${phone}`}>
            📞 {phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full border-2 border-line bg-surface text-2xl lg:hidden"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-2 border-line bg-bg lg:hidden"
            aria-label="Mobile"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 p-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-heading text-2xl font-medium ${path === l.href ? "bg-surface-2 text-pink" : ""}`}
                >
                  {t.nav[l.key]}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Always-visible call / WhatsApp bar on phones: the fastest way to book. */
export function MobileBar({ phone }: { phone: string }) {
  const { t } = useLang();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t-2 border-line bg-bg/95 p-2 backdrop-blur-md sm:hidden">
      <a href={telLink(phone)} className="btn btn-gold !min-h-12">📞 {t.nav.call}</a>
      <a href={waLink(phone)} target="_blank" rel="noreferrer" className="btn btn-green !min-h-12">💬 WhatsApp</a>
    </div>
  );
}

export function Footer({ phone1, phone2, hours }: { phone1: string; phone2: string; hours: Bi }) {
  const { t, lang } = useLang();
  return (
    <footer className="mt-20 border-t-2 border-line bg-bg-2 pb-24 sm:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo size="md" />
          <p className="font-heading text-lg font-medium text-muted">{t.brand.slogan}</p>
        </div>
        <div>
          <h3 className="mb-3 text-xl">{t.footer.explore}</h3>
          <ul className="space-y-1.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-pink hover:underline">{t.nav[l.key]}</Link>
              </li>
            ))}
            <li><Link href="/quote" className="hover:text-pink hover:underline">{t.nav.quote}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xl">{t.footer.contact}</h3>
          <ul className="space-y-2">
            <li><a className="font-heading text-xl font-semibold hover:text-pink" href={telLink(phone1)}>📞 {phone1}</a></li>
            {phone2 && <li><a className="font-heading text-xl font-semibold hover:text-pink" href={telLink(phone2)}>📞 {phone2}</a></li>}
            <li><a className="hover:text-pink hover:underline" href={waLink(phone1)} target="_blank" rel="noreferrer">💬 WhatsApp</a></li>
            {bi(hours, lang) && <li className="text-muted">{bi(hours, lang)}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-line py-4 text-center text-sm text-muted">
        © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights} ·{" "}
        <Link href="/admin" className="underline-offset-2 hover:underline">{t.footer.owner}</Link>
      </div>
    </footer>
  );
}
