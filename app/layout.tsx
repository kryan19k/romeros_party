import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Fredoka, Nunito } from "next/font/google";
import { cookies } from "next/headers";
import { Providers } from "@/components/Providers";
import { dicts } from "@/lib/i18n";
import { getLang } from "@/lib/seo";
import { PAGE_SEO, SITE_URL } from "@/lib/seo-data";
import "./globals.css";

const alfa = Alfa_Slab_One({ weight: "400", subsets: ["latin"], variable: "--font-alfa", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = dicts[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${t.brand.name} · ${t.hero.eyebrow}`, template: `%s | ${t.brand.name}` },
    description: PAGE_SEO.home[lang].desc,
    applicationName: t.brand.name,
    openGraph: { siteName: t.brand.name, type: "website", locale: lang === "es" ? "es_US" : "en_US" },
    formatDetection: { telephone: true },
    // Verify ownership in Google Search Console by setting GOOGLE_SITE_VERIFICATION in the host's env vars.
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b2c" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();
  const theme = (await cookies()).get("theme")?.value;
  return (
    <html
      lang={lang}
      className={`${alfa.variable} ${fredoka.variable} ${nunito.variable} ${theme === "dark" ? "dark" : theme === "light" ? "light" : ""}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col">
        <Providers initialLang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
