"use client";

import { useLang } from "./Providers";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useLang();
  function flip() {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark") || (!root.classList.contains("light") && matchMedia("(prefers-color-scheme: dark)").matches);
    root.classList.remove("dark", "light");
    root.classList.add(isDark ? "light" : "dark");
    document.cookie = `theme=${isDark ? "light" : "dark"}; path=/; max-age=31536000; samesite=lax`;
  }
  return (
    <button
      type="button"
      onClick={flip}
      aria-label={t.nav.theme}
      title={t.nav.theme}
      className={`grid size-11 place-items-center rounded-full border-2 border-line bg-surface text-xl transition hover:scale-110 hover:border-gold ${className}`}
    >
      <span className="theme-light-only" aria-hidden>☀️</span>
      <span className="theme-dark-only" aria-hidden>🌙</span>
    </button>
  );
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { toggle, t } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.languageLabel}
      className={`h-11 rounded-full border-2 border-line bg-surface px-4 font-heading text-base font-semibold transition hover:scale-105 hover:border-gold ${className}`}
    >
      {t.nav.language}
    </button>
  );
}
