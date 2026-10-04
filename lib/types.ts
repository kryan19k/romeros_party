export type Lang = "en" | "es";
export type Bi = { es: string; en: string };

export const CATEGORIES = ["jumpers", "tents", "tables", "extras"] as const;
export type Category = (typeof CATEGORIES)[number];

/** "event" = price per event, "each" = price per piece (chairs, tables…) */
export type Unit = "event" | "each";

export interface Item {
  id: string;
  category: Category;
  name: Bi;
  desc: Bi;
  price: number | null;
  unit: Unit;
  stock: number | null;
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
