import "server-only";
import { cookies, headers } from "next/headers";
import type { Metadata } from "next";
import { pickLang } from "./i18n";
import { SITE_URL, BRAND } from "./seo-data";
import type { Lang } from "./types";

/** Language of the current request: the URL (/es/...) wins, then cookie / browser (used by /admin). */
export async function getLang(): Promise<Lang> {
  const [h, c] = await Promise.all([headers(), cookies()]);
  const x = h.get("x-lang");
  if (x === "es" || x === "en") return x;
  return pickLang(c.get("lang")?.value, h.get("accept-language"));
}

/** English path -> URL for a language. "/" -> "/" (en) or "/es" (es). */
export const langPath = (path: string, lang: Lang) => (lang === "es" ? (path === "/" ? "/es" : `/es${path}`) : path);

interface MetaInput {
  /** English (unprefixed) path, e.g. "/catalog/jumpers" */
  path: string;
  title: string;
  description: string;
  /** Use the title exactly as written (skip the "| brand" suffix). */
  absolute?: boolean;
  noindex?: boolean;
}

export async function pageMeta(i: MetaInput): Promise<Metadata> {
  const lang = await getLang();
  const url = langPath(i.path, lang);
  return {
    title: i.absolute ? { absolute: i.title } : i.title,
    description: i.description,
    alternates: {
      canonical: url,
      languages: { en: i.path, es: langPath(i.path, "es"), "x-default": i.path },
    },
    openGraph: {
      title: i.title,
      description: i.description,
      url,
      siteName: BRAND,
      locale: lang === "es" ? "es_US" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: BRAND }],
    },
    twitter: { card: "summary_large_image", title: i.title, description: i.description, images: ["/opengraph-image"] },
    robots: i.noindex ? { index: false, follow: true } : undefined,
  };
}

export { SITE_URL };
