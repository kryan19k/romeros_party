import { Home } from "@/components/site/Home";
import { getItems, getSettings } from "@/lib/store";

export default async function HomePage() {
  const [items, settings] = await Promise.all([getItems(), getSettings()]);
  // Show one popular pick per category first, then fill up to six.
  const live = items.filter((i) => i.available);
  const firstPerCat = (["jumpers", "tents", "tables", "extras"] as const).flatMap((c) => live.find((i) => i.category === c) ?? []);
  const featured = [...firstPerCat, ...live.filter((i) => !firstPerCat.includes(i))].slice(0, 6);
  return <Home items={featured} settings={settings} />;
}
