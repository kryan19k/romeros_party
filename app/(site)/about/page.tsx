import type { Metadata } from "next";
import { AboutPage } from "@/components/site/Pages";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = { title: "Nosotros · About" };

export default async function Page() {
  return <AboutPage settings={await getSettings()} />;
}
