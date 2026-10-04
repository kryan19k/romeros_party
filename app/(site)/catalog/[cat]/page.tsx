import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/site/Catalog";
import { getLang, pageMeta } from "@/lib/seo";
import { CATEGORY_SEO, h1For, slugOk } from "@/lib/seo-data";
import { getItems } from "@/lib/store";
import { CATEGORIES } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/catalog/[cat]">): Promise<Metadata> {
  const { cat } = await params;
  if (!slugOk(CATEGORIES, cat)) return {};
  const lang = await getLang();
  const c = CATEGORY_SEO[cat][lang];
  return pageMeta({ path: `/catalog/${cat}`, title: h1For(c, lang), description: c.desc });
}

export default async function CategoryPage({ params }: PageProps<"/catalog/[cat]">) {
  const { cat } = await params;
  if (!slugOk(CATEGORIES, cat)) notFound();
  const items = (await getItems()).filter((i) => i.available);
  return <Catalog items={items} initialCat={cat} initialOcc="all" seo={CATEGORY_SEO[cat]} />;
}
