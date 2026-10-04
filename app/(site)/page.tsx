import type { Metadata } from "next";
import { Home } from "@/components/site/Home";
import { getLang, pageMeta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-data";
import { getItems, getSettings } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const m = PAGE_SEO.home[await getLang()];
  return pageMeta({ path: "/", title: m.title, description: m.desc, absolute: m.absolute });
}

export default async function HomePage() {
  const [items, settings] = await Promise.all([getItems(), getSettings()]);
  // Show one popular pick per category first, then fill up to six.
  const live = items.filter((i) => i.available);
  const firstPerCat = (["jumpers", "tents", "tables", "dresses", "decor", "extras"] as const).flatMap((c) => live.find((i) => i.category === c) ?? []);
  const featured = [...firstPerCat, ...live.filter((i) => !firstPerCat.includes(i))].slice(0, 6);
  return <Home items={featured} settings={settings} />;
}
