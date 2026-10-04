import { ItemList } from "@/components/admin/Items";
import { requireAdmin } from "@/lib/auth";
import { getItems } from "@/lib/store";

export default async function ItemsPage({ searchParams }: PageProps<"/admin/items">) {
  await requireAdmin();
  const sp = await searchParams;
  const items = await getItems();
  return <ItemList items={items} flash={sp.saved ? "saved" : sp.deleted ? "deleted" : null} />;
}
