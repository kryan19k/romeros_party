import { Dashboard } from "@/components/admin/Dashboard";
import { requireAdmin } from "@/lib/auth";
import { getItems, getRequests } from "@/lib/store";

export default async function AdminHome() {
  await requireAdmin();
  const [items, requests] = await Promise.all([getItems(), getRequests()]);
  return <Dashboard itemCount={items.length} newCount={requests.filter((r) => r.status === "new").length} />;
}
