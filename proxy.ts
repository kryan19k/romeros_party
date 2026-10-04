import { NextResponse, type NextRequest } from "next/server";

/**
 * Language in the URL, so Google can index both versions:
 *   /catalog      -> English
 *   /es/catalog   -> Spanish (rewritten to /catalog with an x-lang header)
 * Returning Spanish visitors (cookie, or a Spanish browser on their first visit) are sent to /es.
 * Search-engine crawlers are never redirected by language.
 */
const BOT = /bot|crawl|spider|slurp|bing|facebookexternalhit|preview|lighthouse/i;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const headers = new Headers(req.headers);

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    headers.set("x-lang", "es");
    return NextResponse.rewrite(url, { request: { headers } });
  }

  const cookieLang = req.cookies.get("lang")?.value;
  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  const isBot = BOT.test(req.headers.get("user-agent") ?? "");
  const wantsSpanish = cookieLang === "es" || (!cookieLang && !isBot && accept.startsWith("es"));
  if (wantsSpanish && req.method === "GET") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
    return NextResponse.redirect(url);
  }

  headers.set("x-lang", "en");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Public pages only: skip admin, uploaded photos, Next internals, API and any file with an extension.
  matcher: ["/((?!admin|uploads|api|_next|opengraph-image|.*\\..*).*)"],
};
