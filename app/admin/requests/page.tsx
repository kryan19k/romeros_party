import { RequestList } from "@/components/admin/Requests";
import { requireAdmin } from "@/lib/auth";
import { getRequests } from "@/lib/store";

export default async function RequestsPage() {
  await requireAdmin();
  return <RequestList requests={await getRequests()} />;
}
