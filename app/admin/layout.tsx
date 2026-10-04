import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/Shell";
import { isAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const authed = await isAdmin();
  return (
    <>
      <AdminHeader authed={authed} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 text-[1.12rem]">{children}</main>
    </>
  );
}
