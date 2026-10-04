"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "./Providers";

/** next/link that keeps Spanish visitors on /es URLs (so each language has its own address for Google). */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { lang } = useLang();
  const prefixed =
    lang === "es" && typeof href === "string" && href.startsWith("/") && !href.startsWith("/admin") && !href.startsWith("/es")
      ? href === "/" ? "/es" : `/es${href}`
      : href;
  return <NextLink href={prefixed} {...props} />;
}
