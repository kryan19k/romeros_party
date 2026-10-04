import { ItemForm } from "@/components/admin/ItemForm";
import { requireAdmin } from "@/lib/auth";

export default async function NewItemPage() {
  await requireAdmin();
  return <ItemForm />;
}
