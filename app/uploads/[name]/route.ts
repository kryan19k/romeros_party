import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/db";

// Dev-only photo server (used when Supabase isn't configured). In production photos come from Supabase Storage.
const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export async function GET(_: Request, ctx: RouteContext<"/uploads/[name]">) {
  const { name } = await ctx.params;
  const m = /^[\w-]+\.(jpg|png|webp)$/.exec(name);
  if (!m) return new Response("Not found", { status: 404 });
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(buf), {
      headers: { "Content-Type": TYPES[m[1]], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
