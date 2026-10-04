import { SettingsForm } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/store";

export default async function SettingsPage() {
  await requireAdmin();
  return <SettingsForm settings={await getSettings()} />;
}
