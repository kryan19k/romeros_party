export type Lang = "en" | "es";
export type Bi = { es: string; en: string };

/** Rentals first, then things the store sells. */
export const CATEGORIES = ["jumpers", "tents", "tables", "dresses", "shoes", "decor", "extras"] as const;
export type Category = (typeof CATEGORIES)[number];

export const RENTAL_CATEGORIES: readonly Category[] = ["jumpers", "tents", "tables"];

export const OCCASIONS = ["baptism", "confirmation", "communion", "quince", "wedding", "birthday"] as const;
export type Occasion = (typeof OCCASIONS)[number];

export const AUDIENCES = ["all", "girls", "boys"] as const;
export type Audience = (typeof AUDIENCES)[number];

/** "event" = rental price per event, "each" = rental price per piece, "sale" = price to buy */
export type Unit = "event" | "each" | "sale";

export interface Item {
  id: string;
  category: Category;
  name: Bi;
  desc: Bi;
  price: number | null;
  unit: Unit;
  stock: number | null;
  occasions: Occasion[];
  audience: Audience;
  /** free text, e.g. "Sizes 2–14" */
  sizes: string;
  /** file name inside the uploads folder, served at /uploads/<image> */
  image: string | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RequestItem {
  id: string;
  name: Bi;
  qty: number;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  status: "new" | "done";
  name: string;
  phone: string;
  date: string;
  mode: "delivery" | "pickup";
  address: string;
  notes: string;
  lang: Lang;
  items: RequestItem[];
}

export interface Settings {
  phone1: string;
  phone2: string;
  deliveryArea: Bi;
  deliveryFee: Bi;
  hours: Bi;
  about: Bi;
}

export interface DB {
  items: Item[];
  requests: QuoteRequest[];
  settings: Settings;
}

/** Pick the text for a language, falling back to the other one if it is empty. */
export const bi = (b: Bi, lang: Lang) => (b[lang] || b.es || b.en || "").trim();

const digits = (phone: string) => phone.replace(/\D/g, "");
const withCountry = (phone: string) => {
  const d = digits(phone);
  return d.length === 10 ? `1${d}` : d;
};

export function waLink(phone: string, text?: string) {
  return `https://wa.me/${withCountry(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
export const telLink = (phone: string) => `tel:+${withCountry(phone)}`;
