import type { Metadata } from "next";
import { DeliveryPage } from "@/components/site/Pages";
import { JsonLd } from "@/components/JsonLd";
import { dicts } from "@/lib/i18n";
import { getLang, pageMeta } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-data";
import { getSettings } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const m = PAGE_SEO.delivery[await getLang()];
  return pageMeta({ path: "/delivery", title: m.title, description: m.desc });
}

export default async function Page() {
  const d = dicts[await getLang()].delivery;
  const faq = [[d.q1, d.a1], [d.q2, d.a2], [d.q3, d.a3]];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }}
      />
      <DeliveryPage settings={await getSettings()} />
    </>
  );
}
