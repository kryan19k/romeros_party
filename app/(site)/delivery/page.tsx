import type { Metadata } from "next";
import { DeliveryPage } from "@/components/site/Pages";
import { getSettings } from "@/lib/store";

export const metadata: Metadata = { title: "Entrega · Delivery" };

export default async function Page() {
  return <DeliveryPage settings={await getSettings()} />;
}
