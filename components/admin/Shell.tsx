"use client";

import Link from "next/link";
import { Logo } from "../Logo";
import { LangToggle, ThemeToggle } from "../Toggles";
import { useLang } from "../Providers";
import { logoutAction } from "@/lib/actions";

export function AdminHeader({ authed }: { authed: boolean }) {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-30 border-b-2 border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 py-2">
        <Link href={authed ? "/admin" : "/"} aria-label={t.a.top.home}>
          <Logo size="sm" />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          {authed && (
            <>
              <Link href="/" target="_blank" className="btn btn-ghost !hidden !min-h-11 !px-4 !py-1 sm:!inline-flex">🌐 {t.a.top.site}</Link>
              <form action={logoutAction}>
                <button className="btn btn-ghost !min-h-11 !px-4 !py-1">{t.a.top.logout}</button>
              </form>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function BackLink({ href = "/admin" }: { href?: string }) {
  const { t } = useLang();
  return (
    <Link href={href} className="mb-4 inline-flex items-center gap-1 font-heading text-xl font-semibold text-navy hover:text-pink">
      ← {t.a.back}
    </Link>
  );
}
