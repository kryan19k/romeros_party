import type { Metadata } from "next";
import { AboutPage } from "@/components/site/Pages";
import { getLang, pageMeta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-data";
import { getSettings } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const m = PAGE_SEO.about[await getLang()];
  return pageMeta({ path: "/about", title: m.title, description: m.desc });
}

export default async function Page() {
  return <AboutPage settings={await getSettings()} />;
}
