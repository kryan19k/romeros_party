"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { MotionConfig } from "motion/react";
import { dicts, fmt, type Dict } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

interface LangCtx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
  f: typeof fmt;
}
const Ctx = createContext<LangCtx | null>(null);

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang outside Providers");
  return c;
}

export function Providers({ initialLang, children }: { initialLang: Lang; children: React.ReactNode }) {
  // The language comes from the URL (/es/... is Spanish), so it only changes with a full page load.
  const lang = initialLang;

  const setLang = useCallback((l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
    const { pathname, search, hash } = window.location;
    if (pathname.startsWith("/admin")) {
      window.location.reload();
      return;
    }
    const base = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
    const next = l === "es" ? (base === "/" ? "/es" : `/es${base}`) : base;
    window.location.assign(next + search + hash);
  }, []);

  const value = useMemo<LangCtx>(
    () => ({ lang, t: dicts[lang], setLang, toggle: () => setLang(lang === "en" ? "es" : "en"), f: fmt }),
    [lang, setLang],
  );

  return (
    <Ctx.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}
