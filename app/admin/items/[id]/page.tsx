import { notFound } from "next/navigation";
import { ItemForm } from "@/components/admin/ItemForm";
import { requireAdmin } from "@/lib/auth";
import { getItem } from "@/lib/store";

export default async function EditItemPage({ params }: PageProps<"/admin/items/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();
  return <ItemForm key={item.id} item={item} />;
}
