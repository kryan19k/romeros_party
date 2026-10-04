import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/Login";
import { isAdmin } from "@/lib/auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return <LoginForm />;
}
