import type { MetadataRoute } from "next";
import { CATEGORIES, OCCASIONS } from "@/lib/types";
import { SITE_URL } from "@/lib/seo-data";

const paths = ["/", "/catalog", "/delivery", "/about", ...CATEGORIES.map((c) => `/catalog/${c}`), ...OCCASIONS.map((o) => `/occasion/${o}`)];
const es = (p: string) => (p === "/" ? "/es" : `/es${p}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // One entry per language, each pointing at its translation (hreflang).
  return paths.flatMap((p) =>
    [p, es(p)].map((path) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: p === "/" || p === "/catalog" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "/" ? 1 : p.startsWith("/catalog/") || p.startsWith("/occasion/") ? 0.8 : 0.7,
      alternates: { languages: { en: `${SITE_URL}${p === "/" ? "" : p}`, es: `${SITE_URL}${es(p)}` } },
    })),
  );
}
