"use client";

import Link from "@/components/LocalLink";
import { Balloon } from "@/components/art/Art";
import { useLang } from "@/components/Providers";

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <div className="flex justify-center gap-2">
          <Balloon color="#e8336d" className="h-28 animate-float text-ink" />
          <span className="self-center font-display text-8xl text-navy">404</span>
          <Balloon color="#ffc21a" className="h-28 animate-float-slow text-ink" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">{t.notFound.title}</h1>
        <Link href="/" className="btn btn-pink btn-lg mt-6">{t.notFound.back}</Link>
      </div>
    </div>
  );
}
