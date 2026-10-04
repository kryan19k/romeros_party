import type { Metadata } from "next";
import { QuoteForm } from "@/components/site/QuoteForm";
import { getItems, getSettings } from "@/lib/store";

export const metadata: Metadata = { title: "Cotización · Quote" };

export default async function QuotePage({ searchParams }: PageProps<"/quote">) {
  const { mode } = await searchParams;
  const [items, settings] = await Promise.all([getItems(), getSettings()]);
  return <QuoteForm items={items} phone={settings.phone1} initialMode={mode === "pickup" ? "pickup" : "delivery"} />;
}
