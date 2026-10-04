import type { Metadata } from "next";
import { QuoteForm } from "@/components/site/QuoteForm";
import { getLang, pageMeta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-data";
import { getItems, getSettings } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const m = PAGE_SEO.quote[await getLang()];
  // The quote form has no search value on its own: keep it out of Google, let the links on it still count.
  return pageMeta({ path: "/quote", title: m.title, description: m.desc, noindex: true });
}

export default async function QuotePage({ searchParams }: PageProps<"/quote">) {
  const { mode } = await searchParams;
  const [items, settings] = await Promise.all([getItems(), getSettings()]);
  return <QuoteForm items={items} phone={settings.phone1} initialMode={mode === "pickup" ? "pickup" : "delivery"} />;
}
