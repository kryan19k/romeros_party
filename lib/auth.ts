import "server-only";
import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "rps_admin";
const TTL_SECONDS = 60 * 60 * 24 * 14;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET is not set");
  return "dev-only-secret";
}
const sign = (v: string) => crypto.createHmac("sha256", secret()).update(v).digest("hex");
const sha = (v: string) => crypto.createHash("sha256").update(v).digest();

export function passwordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}
export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return crypto.timingSafeEqual(sha(input), sha(expected));
}

export async function startSession() {
  const exp = String(Date.now() + TTL_SECONDS * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_SECONDS,
  });
}
export async function endSession() {
  (await cookies()).delete(COOKIE);
}
export async function isAdmin() {
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v) return false;
  const [exp, sig] = v.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

// Tiny in-memory brute-force guard: 6 wrong passwords => 10 minute pause (per visitor IP).
const attempts = new Map<string, { n: number; until: number }>();
export async function loginGuard() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const rec = attempts.get(ip);
  return {
    locked: Boolean(rec && rec.until > Date.now()),
    fail() {
      const r = attempts.get(ip) ?? { n: 0, until: 0 };
      r.n += 1;
      if (r.n >= 6) {
        r.until = Date.now() + 10 * 60 * 1000;
        r.n = 0;
      }
      attempts.set(ip, r);
    },
    ok() {
      attempts.delete(ip);
    },
  };
}
