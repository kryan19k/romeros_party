"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { useLang } from "../Providers";
import { BackLink } from "./Shell";
import { saveSettingsAction } from "@/lib/actions";
import type { Settings } from "@/lib/types";

function Pair({ label, name, v, rows = 2 }: { label: string; name: string; v: { es: string; en: string }; rows?: number }) {
  const { t } = useLang();
  return (
    <div>
      <h3 className="label !text-xl">{label}</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {(["es", "en"] as const).map((l) => (
          <div key={l}>
            <label className="mb-1 block text-muted" htmlFor={`${name}${l}`}>{l === "es" ? "🇲🇽 " : "🇺🇸 "}{t.a.set[l]}</label>
            <textarea id={`${name}${l}`} name={`${name}${l === "es" ? "Es" : "En"}`} rows={rows} className="input" defaultValue={v[l]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsForm({ settings }: { settings: Settings }) {
  const { t } = useLang();
  const s = t.a.set;
  const [state, action, pending] = useActionState(saveSettingsAction, null);
  return (
    <div>
      <BackLink />
      <h1 className="text-4xl font-bold">⚙️ {s.title}</h1>
      <p className="mt-2 text-muted">{s.sub}</p>
      <form action={action} className="mt-6 space-y-8">
        <section className="card grid gap-5 p-5 sm:grid-cols-2">
          <h2 className="text-2xl font-bold sm:col-span-2">📞 {s.phones}</h2>
          <div>
            <label className="label" htmlFor="phone1">{s.phone1}</label>
            <input id="phone1" name="phone1" type="tel" className="input !text-xl" defaultValue={settings.phone1} required />
          </div>
          <div>
            <label className="label" htmlFor="phone2">{s.phone2}</label>
            <input id="phone2" name="phone2" type="tel" className="input !text-xl" defaultValue={settings.phone2} />
          </div>
        </section>
        <section className="card space-y-5 p-5">
          <h2 className="text-2xl font-bold">🚚 {s.delivery}</h2>
          <Pair label={s.area} name="deliveryArea" v={settings.deliveryArea} />
          <Pair label={s.fee} name="deliveryFee" v={settings.deliveryFee} />
          <Pair label={s.hours} name="hours" v={settings.hours} />
        </section>
        <section className="card space-y-5 p-5">
          <h2 className="text-2xl font-bold">💬 {s.about}</h2>
          <Pair label="" name="about" v={settings.about} rows={9} />
        </section>

        {state?.ok && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-green/20 px-5 py-3 font-heading text-xl font-semibold text-green">✅ {s.saved}</motion.p>}
        {state?.error && <p role="alert" className="rounded-2xl bg-pink/15 px-5 py-3 font-heading text-xl font-semibold text-pink">⚠️ {s.fail}</p>}

        <div className="sticky bottom-3 z-10 rounded-full border-2 border-line bg-bg/95 p-2 shadow-card backdrop-blur">
          <button disabled={pending} className="btn btn-green btn-lg w-full">💾 {pending ? s.saving : s.save}</button>
        </div>
      </form>
    </div>
  );
}
