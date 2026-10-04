"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
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
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
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
