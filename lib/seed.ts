import type { DB, Item, Settings } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  phone1: "(951) 581-7266",
  phone2: "(909) 331-9553",
  deliveryArea: {
    es: "Entregamos en los condados de Riverside y San Bernardino. ¡Llámanos y te confirmamos tu zona!",
    en: "We deliver across Riverside and San Bernardino counties. Call us and we'll confirm your area!",
  },
  deliveryFee: {
    es: "El costo de entrega depende de la distancia. Pide tu cotización y te damos el precio exacto.",
    en: "The delivery fee depends on distance. Request a quote and we'll give you the exact price.",
  },
  hours: {
    es: "Llámanos o escríbenos por WhatsApp",
    en: "Call or message us on WhatsApp",
  },
  about: {
    es: "Romero's Party Supplies es tu mejor opción para celebrar. Rentamos brincolines, carpas, mesas y sillas, y también vendemos vestidos y zapatos para bautizos, confirmaciones, primeras comuniones y quinceañeras, además de decoración y artículos para fiesta.\n\nNos encargamos del equipo para que tú disfrutes de la fiesta con tu familia y tus amigos. Cumpleaños, bodas, quinceañeras, bautizos o reuniones: ¡tu fiesta, nuestro equipo!",
    en: "Romero's Party Supplies is your best choice to celebrate. We rent bounce houses, tents, tables and chairs, and we sell dresses and shoes for baptisms, confirmations, first communions and quinceañeras, plus party decor and supplies.\n\nWe take care of the equipment so you can enjoy the party with your family and friends. Birthdays, weddings, quinceañeras, baptisms or get-togethers: your party, our equipment!",
  },
};

const now = new Date().toISOString();
const mk = (
  id: string,
  category: Item["category"],
  es: string,
  en: string,
  unit: Item["unit"],
  descEs = "",
  descEn = "",
  extra: Partial<Pick<Item, "occasions" | "audience" | "sizes">> = {},
): Item => ({
  id,
  category,
  name: { es, en },
  desc: { es: descEs, en: descEn },
  price: null,
  unit,
  stock: null,
  occasions: [],
  audience: "all",
  sizes: "",
  image: null,
  available: true,
  createdAt: now,
  updatedAt: now,
  ...extra,
});

// Sample items so the site never looks empty. The owner edits or deletes these in the dashboard.
export const SEED_ITEMS: Item[] = [
  mk("seed-jumper-castle", "jumpers", "Castillo con resbaladilla", "Castle with slide", "event", "¡Diversión garantizada para los más pequeños!", "Guaranteed fun for the little ones!"),
  mk("seed-jumper-classic", "jumpers", "Brincolín clásico", "Classic bounce house", "event", "Colorido y divertido para cualquier fiesta.", "Colorful and fun for any party."),
  mk("seed-tent-10x20", "tents", "Carpa 10×20", "10×20 tent", "event", "Espacio perfecto para tu celebración.", "The perfect space for your celebration."),
  mk("seed-tent-20x20", "tents", "Carpa 20×20", "20×20 tent", "event", "Más espacio para más invitados.", "More room for more guests."),
  mk("seed-table-rect", "tables", "Mesa rectangular", "Rectangular table", "each", "Ideal para todo tipo de eventos.", "Ideal for every kind of event."),
  mk("seed-table-round", "tables", "Mesa redonda", "Round table", "each", "Perfecta para banquetes y bodas.", "Perfect for banquets and weddings."),
  mk("seed-chair", "tables", "Silla blanca plegable", "White folding chair", "each", "Cómoda y fácil de acomodar.", "Comfortable and easy to arrange."),
];

// Added later (dresses, shoes, decor, supplies). Inserted once into databases that already existed.
export const SEED_ITEMS_V2: Item[] = [
  mk("seed-dress-baptism-girl", "dresses", "Vestido de bautizo (niña)", "Baptism dress (girl)", "sale", "Elegante y delicado para el día especial.", "Elegant and delicate for the big day.", { occasions: ["baptism"], audience: "girls" }),
  mk("seed-suit-baptism-boy", "dresses", "Traje de bautizo (niño)", "Baptism outfit (boy)", "sale", "", "", { occasions: ["baptism"], audience: "boys" }),
  mk("seed-dress-communion", "dresses", "Vestido de primera comunión", "First communion dress", "sale", "Blanco y bonito para su primera comunión.", "Beautiful white dress for first communion.", { occasions: ["communion"], audience: "girls" }),
  mk("seed-suit-communion", "dresses", "Traje de primera comunión (niño)", "First communion suit (boy)", "sale", "", "", { occasions: ["communion"], audience: "boys" }),
  mk("seed-dress-confirmation", "dresses", "Vestido de confirmación", "Confirmation dress", "sale", "", "", { occasions: ["confirmation"], audience: "girls" }),
  mk("seed-dress-quince", "dresses", "Vestido de quinceañera", "Quinceañera dress", "sale", "Para el cumpleaños más especial: ¡los XV años!", "For the most special birthday: the quinceañera!", { occasions: ["quince"], audience: "girls" }),
  mk("seed-shoes-girl", "shoes", "Zapatos de niña", "Girls' shoes", "sale", "Para bautizo, comunión y fiestas.", "For baptisms, communions and parties.", { occasions: ["baptism", "communion", "confirmation"], audience: "girls" }),
  mk("seed-shoes-boy", "shoes", "Zapatos de niño", "Boys' shoes", "sale", "Para bautizo, comunión y fiestas.", "For baptisms, communions and parties.", { occasions: ["baptism", "communion", "confirmation"], audience: "boys" }),
  mk("seed-decor-balloon-arch", "decor", "Arco de globos", "Balloon arch", "sale", "El toque perfecto para tu entrada o mesa de pastel.", "The perfect touch for your entrance or cake table.", { occasions: ["birthday", "quince", "wedding", "baptism", "communion"] }),
  mk("seed-decor-backdrop", "decor", "Fondo para fotos (backdrop)", "Photo backdrop", "event", "Tu rincón de fotos listo para lucir.", "A photo corner ready to shine.", { occasions: ["birthday", "quince", "wedding", "baptism", "communion"] }),
  mk("seed-decor-balloons", "decor", "Globos", "Balloons", "sale", "Todos los colores y tamaños.", "Every color and size.", {}),
  mk("seed-supplies-party", "extras", "Artículos para fiesta", "Party supplies", "sale", "Platos, vasos, velas, piñatas y más.", "Plates, cups, candles, piñatas and more.", {}),
];

export const SEED_DB: DB = { items: SEED_ITEMS, requests: [], settings: DEFAULT_SETTINGS };
