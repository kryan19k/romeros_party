import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Fredoka, Nunito } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Providers } from "@/components/Providers";
import { dicts, pickLang } from "@/lib/i18n";
import "./globals.css";

const alfa = Alfa_Slab_One({ weight: "400", subsets: ["latin"], variable: "--font-alfa", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

async function currentLang() {
  const [c, h] = await Promise.all([cookies(), headers()]);
  return pickLang(c.get("lang")?.value, h.get("accept-language"));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = dicts[lang];
  return {
    title: { default: `${t.brand.name} · ${t.hero.eyebrow}`, template: `%s · ${t.brand.name}` },
    description: `${t.hero.sub} ${t.nav.catalog}: ${t.cat.jumpers}, ${t.cat.tents}, ${t.cat.tables}.`,
    openGraph: { title: t.brand.name, description: t.brand.tagline, type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b2c" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await currentLang();
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
