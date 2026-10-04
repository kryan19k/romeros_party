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
    es: "Romero's Party Supplies es tu mejor opción para celebrar. Rentamos brincolines, carpas, mesas y sillas para que tu evento sea un día muy especial.\n\nNos encargamos del equipo para que tú disfrutes de la fiesta con tu familia y tus amigos. Cumpleaños, bodas, quinceañeras, bautizos o reuniones: ¡tu fiesta, nuestro equipo!",
    en: "Romero's Party Supplies is your best choice to celebrate. We rent bounce houses, tents, tables and chairs so your event becomes a truly special day.\n\nWe take care of the equipment so you can enjoy the party with your family and friends. Birthdays, weddings, quinceañeras, baptisms or get-togethers: your party, our equipment!",
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
): Item => ({
  id,
  category,
  name: { es, en },
  desc: { es: descEs, en: descEn },
  price: null,
  unit,
  stock: null,
  image: null,
  available: true,
  createdAt: now,
  updatedAt: now,
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

export const SEED_DB: DB = { items: SEED_ITEMS, requests: [], settings: DEFAULT_SETTINGS };
