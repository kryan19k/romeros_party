import type { Category, Lang, Occasion } from "./types";

/** Public site address. Set NEXT_PUBLIC_SITE_URL to your real domain (e.g. https://romerospartyboutique.com). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const BRAND = "Romero's Party Boutique";
export const CITY = "Perris";
export const REGION = "CA";

/** Nearby cities named in the copy. Edit this list to match where the store really delivers. */
export const SERVICE_AREAS = ["Perris", "Moreno Valley", "Menifee", "Hemet", "Riverside", "Lake Elsinore", "San Jacinto", "Sun City"];
const AREAS = SERVICE_AREAS.slice(0, 5).join(", ");

export const slugOk = <T extends string>(list: readonly T[], v: string): v is T => (list as readonly string[]).includes(v);

interface Page {
  name: string;
  desc: string;
  intro: string;
}
type Copy = Record<Lang, Page>;

const t = (name: string, nameEs: string, descEn: string, descEs: string, introEn: string, introEs: string): Copy => ({
  en: { name, desc: descEn, intro: introEn },
  es: { name: nameEs, desc: descEs, intro: introEs },
});

export const CATEGORY_SEO: Record<Category, Copy> = {
  jumpers: t(
    "Bounce House & Jumper Rentals",
    "Renta de Brincolines y Jumpers",
    `Rent bounce houses, castle jumpers and slides in Perris, CA and nearby (${AREAS}). Kids' birthday favorite with delivery.`,
    `Renta de brincolines, castillos y jumpers con resbaladilla en Perris, CA y alrededores (${AREAS}). Con entrega a domicilio.`,
    `Looking for a bounce house rental in Perris, CA? Romero's Party Boutique rents colorful jumpers and castle slides for birthdays, quinceañeras and family parties, with delivery to ${AREAS} and nearby. Fun guaranteed!`,
    `¿Buscas renta de brincolines en Perris, CA? En Romero's Party Boutique rentamos brincolines y castillos con resbaladilla para cumpleaños, quinceañeras y fiestas familiares, con entrega en ${AREAS} y alrededores. ¡Diversión garantizada!`,
  ),
  tents: t(
    "Tent Rentals",
    "Renta de Carpas",
    `Party tent and canopy rentals in Perris, CA and nearby (${AREAS}). 10×20 and 20×20 sizes for birthdays, weddings and backyard events.`,
    `Renta de carpas para fiestas en Perris, CA y alrededores (${AREAS}). Carpas 10×20 y 20×20 para cumpleaños, bodas y eventos en tu patio.`,
    `Need a party tent in Perris, CA? Rent a canopy for shade and space at your birthday, baptism, wedding or backyard event. We deliver to ${AREAS} and nearby.`,
    `¿Necesitas una carpa para tu fiesta en Perris, CA? Renta una carpa para tener sombra y espacio en tu cumpleaños, bautizo, boda o evento en casa. Entregamos en ${AREAS} y alrededores.`,
  ),
  tables: t(
    "Table & Chair Rentals",
    "Renta de Mesas y Sillas",
    `Table and chair rentals in Perris, CA and nearby (${AREAS}). Rectangular and round tables, white folding chairs, delivered to your event.`,
    `Renta de mesas y sillas en Perris, CA y alrededores (${AREAS}). Mesas rectangulares y redondas, sillas blancas plegables, entregadas en tu evento.`,
    `Rent tables and chairs for your party in Perris, CA. Rectangular and round tables plus white folding chairs for birthdays, quinceañeras, weddings and church celebrations, delivered to ${AREAS} and nearby.`,
    `Renta mesas y sillas para tu fiesta en Perris, CA. Mesas rectangulares y redondas y sillas blancas plegables para cumpleaños, quinceañeras, bodas y celebraciones de iglesia, con entrega en ${AREAS} y alrededores.`,
  ),
  dresses: t(
    "Baptism, Communion & Quinceañera Dresses",
    "Vestidos de Bautizo, Primera Comunión y Quinceañera",
    "Dresses and suits for baptisms, first communion, confirmation and quinceañeras in Perris, CA. Girls' and boys' formal wear.",
    "Vestidos y trajes de bautizo, primera comunión, confirmación y quinceañera en Perris, CA. Ropa de vestir para niñas y niños.",
    "Shop dresses and suits for baptisms, first communions, confirmations and quinceañeras at Romero's Party Boutique in Perris, CA. Find the perfect outfit for girls and boys, then complete the look with shoes and party decor.",
    "Encuentra vestidos y trajes para bautizos, primeras comuniones, confirmaciones y quinceañeras en Romero's Party Boutique, en Perris, CA. El atuendo perfecto para niñas y niños, y completa el look con zapatos y decoración.",
  ),
  shoes: t(
    "Girls' & Boys' Dress Shoes",
    "Zapatos de Vestir para Niñas y Niños",
    "Dress shoes for girls and boys for baptisms, communions and parties in Perris, CA.",
    "Zapatos de vestir para niñas y niños para bautizos, comuniones y fiestas en Perris, CA.",
    "Dress shoes for girls and boys, ready for baptisms, first communions, confirmations and parties. Visit Romero's Party Boutique in Perris, CA to match shoes with your dress or suit.",
    "Zapatos de vestir para niñas y niños, listos para bautizos, primeras comuniones, confirmaciones y fiestas. Visita Romero's Party Boutique en Perris, CA y combina los zapatos con tu vestido o traje.",
  ),
  decor: t(
    "Party Decor, Balloons & Photo Backdrops",
    "Decoración para Fiestas, Globos y Fondos para Fotos",
    "Balloon arches, photo backdrops, photo spots and party decor in Perris, CA. Make your party picture-perfect.",
    "Arcos de globos, fondos para fotos, rincones de fotos y decoración para fiestas en Perris, CA.",
    "Balloon arches, photo backdrops and photo spots to make your celebration unforgettable. Romero's Party Boutique in Perris, CA has party decor for birthdays, quinceañeras, baptisms, communions and weddings.",
    "Arcos de globos, fondos y rincones de fotos para que tu celebración sea inolvidable. Romero's Party Boutique en Perris, CA tiene decoración para cumpleaños, quinceañeras, bautizos, comuniones y bodas.",
  ),
  extras: t(
    "Party Supplies",
    "Artículos para Fiesta",
    "Party supplies in Perris, CA: plates, cups, candles, piñatas and more for every celebration.",
    "Artículos para fiesta en Perris, CA: platos, vasos, velas, piñatas y más para cada celebración.",
    "Everything small that makes a party complete: plates, cups, candles, piñatas and more. Pick up party supplies at Romero's Party Boutique in Perris, CA.",
    "Todo lo que hace falta para completar tu fiesta: platos, vasos, velas, piñatas y más. Encuentra artículos para fiesta en Romero's Party Boutique, en Perris, CA.",
  ),
};

export const OCCASION_SEO: Record<Occasion, Copy> = {
  baptism: t(
    "Baptism Dresses, Outfits & Decor",
    "Vestidos, Trajes y Decoración para Bautizo",
    "Baptism dresses, boys' outfits, shoes and party decor in Perris, CA. Everything for a beautiful bautizo.",
    "Vestidos de bautizo, trajes para niño, zapatos y decoración en Perris, CA. Todo para un bautizo hermoso.",
    "Planning a baptism in Perris, CA? Find baptism dresses, boys' outfits, shoes, balloons and decor, plus tables, chairs and tent rentals for the celebration.",
    "¿Preparas un bautizo en Perris, CA? Encuentra vestidos de bautizo, trajes para niño, zapatos, globos y decoración, además de renta de mesas, sillas y carpas para la celebración.",
  ),
  confirmation: t(
    "Confirmation Dresses & Outfits",
    "Vestidos y Trajes de Confirmación",
    "Confirmation dresses, outfits and shoes in Perris, CA for girls and boys.",
    "Vestidos, trajes y zapatos de confirmación en Perris, CA para niñas y niños.",
    "Dress for a meaningful day. Browse confirmation dresses, outfits and shoes at Romero's Party Boutique in Perris, CA.",
    "Viste para un día muy significativo. Mira vestidos, trajes y zapatos de confirmación en Romero's Party Boutique, en Perris, CA.",
  ),
  communion: t(
    "First Communion Dresses & Suits",
    "Vestidos y Trajes de Primera Comunión",
    "First communion dresses, boys' suits, shoes and party rentals in Perris, CA.",
    "Vestidos de primera comunión, trajes para niño, zapatos y renta para fiestas en Perris, CA.",
    "Find the perfect first communion dress or suit in Perris, CA, plus shoes, decor and rentals (tents, tables and chairs) for the celebration.",
    "Encuentra el vestido o traje perfecto de primera comunión en Perris, CA, además de zapatos, decoración y renta de carpas, mesas y sillas para la celebración.",
  ),
  quince: t(
    "Quinceañera Dresses & Party Decor",
    "Vestidos de Quinceañera y Decoración",
    "Quinceañera dresses, party decor, balloon arches, photo backdrops and rentals in Perris, CA.",
    "Vestidos de quinceañera, decoración, arcos de globos, fondos para fotos y renta de equipo en Perris, CA.",
    "Celebrate the quinceañera in style. Romero's Party Boutique in Perris, CA offers quinceañera dresses, balloon arches, photo backdrops and tent, table and chair rentals for the big night.",
    "Celebra los XV años con estilo. Romero's Party Boutique en Perris, CA ofrece vestidos de quinceañera, arcos de globos, fondos para fotos y renta de carpas, mesas y sillas para la gran noche.",
  ),
  wedding: t(
    "Wedding Party Rentals & Decor",
    "Renta y Decoración para Bodas",
    "Wedding rentals and decor in Perris, CA: tents, tables, chairs, balloons and photo backdrops.",
    "Renta y decoración para bodas en Perris, CA: carpas, mesas, sillas, globos y fondos para fotos.",
    "Tents, tables, chairs and decor for weddings in Perris, CA and nearby. Ask for a free quote for your date.",
    "Carpas, mesas, sillas y decoración para bodas en Perris, CA y alrededores. Pide tu cotización gratis para tu fecha.",
  ),
  birthday: t(
    "Birthday Party Rentals & Decor",
    "Renta y Decoración para Cumpleaños",
    "Birthday party rentals in Perris, CA: bounce houses, tents, tables, chairs, balloons and backdrops.",
    "Renta para cumpleaños en Perris, CA: brincolines, carpas, mesas, sillas, globos y fondos.",
    "Make the birthday unforgettable with a bounce house, tent, tables and chairs, plus balloon decor and a photo backdrop. Free quotes in Perris, CA and nearby.",
    "Haz inolvidable el cumpleaños con un brincolín, carpa, mesas y sillas, además de globos y un fondo para fotos. Cotización gratis en Perris, CA y alrededores.",
  ),
};

export const PAGE_SEO: Record<"home" | "catalog" | "delivery" | "about" | "quote", Record<Lang, { title: string; desc: string; absolute?: boolean }>> = {
  home: {
    en: {
      title: "Party Rentals in Perris, CA | Bounce Houses, Tents, Tables & Chairs",
      desc: `Romero's Party Boutique in Perris, CA: bounce house, tent, table and chair rentals, plus baptism, communion and quinceañera dresses, shoes, balloons and party decor. Free quotes and delivery.`,
      absolute: true,
    },
    es: {
      title: "Renta de Brincolines, Carpas, Mesas y Sillas en Perris, CA",
      desc: `Romero's Party Boutique en Perris, CA: renta de brincolines, carpas, mesas y sillas, y vestidos de bautizo, primera comunión y quinceañera, zapatos, globos y decoración. Cotización gratis y entrega a domicilio.`,
      absolute: true,
    },
  },
  catalog: {
    en: { title: "Party Rentals, Dresses & Decor Catalog | Perris, CA", desc: "Browse bounce houses, tents, tables, chairs, dresses, shoes, balloons and party decor from Romero's Party Boutique in Perris, CA." },
    es: { title: "Catálogo de Renta, Vestidos y Decoración | Perris, CA", desc: "Mira brincolines, carpas, mesas, sillas, vestidos, zapatos, globos y decoración de Romero's Party Boutique en Perris, CA." },
  },
  delivery: {
    en: { title: "Party Rental Delivery in Perris, CA & Nearby", desc: `We deliver bounce houses, tents, tables and chairs to ${AREAS} and nearby. Ask for your delivery quote.` },
    es: { title: "Entrega de Renta para Fiestas en Perris, CA y Alrededores", desc: `Entregamos brincolines, carpas, mesas y sillas en ${AREAS} y alrededores. Pide tu cotización de entrega.` },
  },
  about: {
    en: { title: "About Romero's Party Boutique | Perris, CA", desc: "Meet Romero's Party Boutique in Perris, CA: party rentals, dresses, shoes and decor for baptisms, communions, quinceañeras and birthdays." },
    es: { title: "Sobre Romero's Party Boutique | Perris, CA", desc: "Conoce Romero's Party Boutique en Perris, CA: renta para fiestas, vestidos, zapatos y decoración para bautizos, comuniones, quinceañeras y cumpleaños." },
  },
  quote: {
    en: { title: "Get a Free Party Quote | Perris, CA", desc: "Request a free quote for party rentals, dresses or decor from Romero's Party Boutique in Perris, CA." },
    es: { title: "Pide tu Cotización Gratis | Perris, CA", desc: "Pide una cotización gratis de renta para fiestas, vestidos o decoración con Romero's Party Boutique en Perris, CA." },
  },
};

/** "Bounce House Rentals in Perris, CA" / "Renta de Brincolines en Perris, CA" */
export const h1For = (p: { name: string }, lang: Lang) => `${p.name} ${lang === "es" ? "en" : "in"} ${CITY}, ${REGION}`;
