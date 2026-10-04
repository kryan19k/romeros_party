import type { Metadata } from "next";
import { Catalog } from "@/components/site/Catalog";
import { getLang, pageMeta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-data";
import { getItems } from "@/lib/store";
import { CATEGORIES, OCCASIONS, type Category, type Occasion } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const m = PAGE_SEO.catalog[await getLang()];
  return pageMeta({ path: "/catalog", title: m.title, description: m.desc });
}

export default async function CatalogPage({ searchParams }: PageProps<"/catalog">) {
  const { cat, occ } = await searchParams;
  const initial = CATEGORIES.includes(cat as Category) ? (cat as Category) : "all";
  const initialOcc = OCCASIONS.includes(occ as Occasion) ? (occ as Occasion) : "all";
  // Items the owner switched off ("hidden") never reach the public site.
  const items = (await getItems()).filter((i) => i.available);
  return <Catalog items={items} initialCat={initial} initialOcc={initialOcc} />;
}
