import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/site/Catalog";
import { getLang, pageMeta } from "@/lib/seo";
import { OCCASION_SEO, h1For, slugOk } from "@/lib/seo-data";
import { getItems } from "@/lib/store";
import { OCCASIONS } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/occasion/[occ]">): Promise<Metadata> {
  const { occ } = await params;
  if (!slugOk(OCCASIONS, occ)) return {};
  const lang = await getLang();
  const c = OCCASION_SEO[occ][lang];
  return pageMeta({ path: `/occasion/${occ}`, title: h1For(c, lang), description: c.desc });
}

export default async function OccasionPage({ params }: PageProps<"/occasion/[occ]">) {
  const { occ } = await params;
  if (!slugOk(OCCASIONS, occ)) notFound();
  const items = (await getItems()).filter((i) => i.available);
  return <Catalog items={items} initialCat="all" initialOcc={occ} seo={OCCASION_SEO[occ]} />;
}
