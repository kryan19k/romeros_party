"use client";

import { useSyncExternalStore } from "react";

export interface CartLine {
  id: string;
  qty: number;
}

const KEY = "romeros-quote";
const EMPTY: CartLine[] = [];
let raw: string | null = null;
let snapshot: CartLine[] = EMPTY;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  let s: string | null = null;
  try {
    s = localStorage.getItem(KEY);
  } catch {}
  if (s === raw) return snapshot;
  raw = s;
  try {
    const parsed = s ? (JSON.parse(s) as CartLine[]) : EMPTY;
    snapshot = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    snapshot = EMPTY;
  }
  return snapshot;
}
function write(lines: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
  read();
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) listeners.forEach((l) => l());
  });
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useCart() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    qty: (id: string) => lines.find((l) => l.id === id)?.qty ?? 0,
    set(id: string, qty: number) {
      const cur = read();
      const next = qty <= 0 ? cur.filter((l) => l.id !== id) : cur.some((l) => l.id === id) ? cur.map((l) => (l.id === id ? { ...l, qty } : l)) : [...cur, { id, qty }];
      write(next);
    },
    clear: () => write([]),
  };
}
