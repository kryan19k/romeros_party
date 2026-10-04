import { Footer, MobileBar, Navbar } from "@/components/site/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { getLang } from "@/lib/seo";
import { BRAND, CATEGORY_SEO, CITY, PAGE_SEO, REGION, SERVICE_AREAS, SITE_URL } from "@/lib/seo-data";
import { getSettings } from "@/lib/store";
import { CATEGORIES, telLink } from "@/lib/types";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [s, lang] = await Promise.all([getSettings(), getLang()]);
  const phones = [s.phone1, s.phone2].filter(Boolean).map((p) => telLink(p).replace("tel:", ""));

  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "@id": `${SITE_URL}/#business`,
    name: BRAND,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    description: PAGE_SEO.home[lang].desc,
    telephone: phones[0],
    address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: REGION, addressCountry: "US" },
    areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
    knowsLanguage: ["en", "es"],
    contactPoint: phones.map((telephone) => ({ "@type": "ContactPoint", telephone, contactType: "customer service", availableLanguage: ["English", "Spanish"] })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: BRAND,
      itemListElement: CATEGORIES.map((c) => ({
        "@type": "OfferCatalog",
        name: CATEGORY_SEO[c][lang].name,
        url: `${SITE_URL}${lang === "es" ? "/es" : ""}/catalog/${c}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={business} />
      <Navbar phone={s.phone1} />
      <main className="flex-1">{children}</main>
      <Footer phone1={s.phone1} phone2={s.phone2} hours={s.hours} />
      <MobileBar phone={s.phone1} />
    </>
  );
}
