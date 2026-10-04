"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { motion } from "motion/react";
import { Logo } from "../Logo";
import { useLang } from "../Providers";
import { loginAction } from "@/lib/actions";

export function LoginForm() {
  const { t } = useLang();
  const [state, action, pending] = useActionState(loginAction, null);
  const [show, setShow] = useState(false);
  const l = t.a.login;
  const msg = state?.error ? { wrong: l.wrong, locked: l.locked, notSet: l.notSet }[state.error as "wrong"] : null;

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="card mx-auto mt-6 max-w-md p-8 text-center">
      <div className="flex justify-center"><Logo size="md" /></div>
      <h1 className="mt-6 text-4xl font-bold">🔑 {l.title}</h1>
      <p className="mt-2 text-muted">{l.sub}</p>
      <form action={action} className="mt-6 space-y-4 text-left">
        <div>
          <label htmlFor="password" className="label">{l.password}</label>
          <div className="relative">
            <input id="password" name="password" type={show ? "text" : "password"} required autoFocus autoComplete="current-password" className="input !pr-24 text-xl" />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-surface-2 px-4 py-1.5 font-heading font-semibold">
              {show ? l.hide : l.show}
            </button>
          </div>
        </div>
        {msg && <p role="alert" className="rounded-2xl bg-pink/15 px-4 py-3 font-heading font-semibold text-pink">⚠️ {msg}</p>}
        <button disabled={pending} className="btn btn-pink btn-lg w-full">{pending ? "…" : l.enter}</button>
      </form>
      <Link href="/" className="mt-5 inline-block text-muted hover:text-pink hover:underline">← {l.back}</Link>
    </motion.div>
  );
}
