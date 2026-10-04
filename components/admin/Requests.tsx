"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../Providers";
import { BackLink } from "./Shell";
import { deleteRequestAction, setRequestStatusAction } from "@/lib/actions";
import { bi, telLink, waLink, type QuoteRequest } from "@/lib/types";

export function RequestList({ requests }: { requests: QuoteRequest[] }) {
  const { t, lang } = useLang();
  const r = t.a.req;
  const [filter, setFilter] = useState<"new" | "all">("new");
  const [askDelete, setAskDelete] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const newCount = requests.filter((x) => x.status === "new").length;
  const shown = filter === "new" ? requests.filter((x) => x.status === "new") : requests;
  const fmtDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(lang === "es" ? "es-US" : "en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const fmtWhen = (d: string) => new Date(d).toLocaleString(lang === "es" ? "es-US" : "en-US", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div>
      <BackLink />
      <h1 className="text-4xl font-bold">📬 {r.title}</h1>
      <div className="mt-5 flex gap-2">
        <button onClick={() => setFilter("new")} className={`rounded-full border-2 px-5 py-2 font-heading text-lg font-semibold ${filter === "new" ? "border-pink bg-pink text-white" : "border-line bg-surface"}`}>{r.filterNew} ({newCount})</button>
        <button onClick={() => setFilter("all")} className={`rounded-full border-2 px-5 py-2 font-heading text-lg font-semibold ${filter === "all" ? "border-navy bg-navy text-bg" : "border-line bg-surface"}`}>{r.filterAll} ({requests.length})</button>
      </div>

      <ul className="mt-6 space-y-5">
        <AnimatePresence initial={false}>
          {shown.map((q) => (
            <motion.li key={q.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }} className={`card overflow-hidden ${q.status === "new" ? "!border-pink" : "opacity-80"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-2 px-5 py-3">
                <span className={`rounded-full px-3 py-1 font-heading font-bold ${q.status === "new" ? "bg-pink text-white" : "bg-green text-white"}`}>{q.status === "new" ? `🆕 ${r.new}` : `✅ ${r.done}`}</span>
                <span className="text-muted">{r.received}: {fmtWhen(q.createdAt)}</span>
              </div>
              <div className="space-y-3 p-5">
                <p className="font-heading text-3xl font-bold">{q.name}</p>
                <p className="text-xl">📅 <b>{r.date}:</b> {fmtDate(q.date)}</p>
                <p className="text-xl">{q.mode === "delivery" ? `🚚 ${r.delivery}` : `🚗 ${r.pickup}`}{q.mode === "delivery" && q.address && <> — {q.address}</>}</p>
                <div>
                  <p className="font-heading text-xl font-semibold">🎈 {r.items}</p>
                  {q.items.length ? (
                    <ul className="mt-1 list-inside list-disc text-xl">
                      {q.items.map((l) => <li key={l.id}><b>{l.qty}×</b> {bi(l.name, lang)}</li>)}
                    </ul>
                  ) : <p className="text-muted">{r.noItems}</p>}
                </div>
                {q.notes && <p className="rounded-2xl bg-gold/25 px-4 py-3 text-lg">📝 <b>{r.notes}:</b> {q.notes}</p>}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={telLink(q.phone)} className="btn btn-gold btn-lg">📞 {r.call} {q.phone}</a>
                  <a href={waLink(q.phone)} target="_blank" rel="noreferrer" className="btn btn-green btn-lg">💬 {r.whatsapp}</a>
                </div>
                <div className="flex flex-wrap gap-3 border-t-2 border-line pt-4">
                  <button disabled={pending} onClick={() => start(() => setRequestStatusAction(q.id, q.status === "new" ? "done" : "new"))} className="btn btn-ghost">
                    {q.status === "new" ? `✅ ${r.markDone}` : `↩️ ${r.reopen}`}
                  </button>
                  {askDelete === q.id ? (
                    <>
                      <span className="self-center font-heading text-lg font-semibold">{r.deleteAsk}</span>
                      <button className="btn btn-pink" onClick={() => start(async () => { await deleteRequestAction(q.id); setAskDelete(null); })}>{t.a.form.deleteYes}</button>
                      <button className="btn btn-ghost" onClick={() => setAskDelete(null)}>{t.a.form.deleteNo}</button>
                    </>
                  ) : (
                    <button className="btn btn-ghost !border-pink !text-pink" onClick={() => setAskDelete(q.id)}>🗑️ {r.delete}</button>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {shown.length === 0 && <p className="mt-12 text-center text-xl text-muted">{r.empty}</p>}
    </div>
  );
}
