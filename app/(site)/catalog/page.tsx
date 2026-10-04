import type { Metadata } from "next";
import { Catalog } from "@/components/site/Catalog";
import { getItems } from "@/lib/store";
import { CATEGORIES, type Category } from "@/lib/types";

export const metadata: Metadata = { title: "Catálogo · Catalog" };

export default async function CatalogPage({ searchParams }: PageProps<"/catalog">) {
  const { cat } = await searchParams;
  const initial = CATEGORIES.includes(cat as Category) ? (cat as Category) : "all";
  // Items the owner switched off ("hidden") never reach the public site.
  const items = (await getItems()).filter((i) => i.available);
  return <Catalog items={items} initialCat={initial} />;
}
