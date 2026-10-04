import { getPhoto } from "@/lib/store";

// Item photos are stored in the database and served from here (names are random, so they cache forever).
export async function GET(_: Request, ctx: RouteContext<"/uploads/[name]">) {
  const { name } = await ctx.params;
  if (!/^[\w-]+\.(jpg|png|webp)$/.test(name)) return new Response("Not found", { status: 404 });
  const photo = await getPhoto(name);
  if (!photo) return new Response("Not found", { status: 404 });
  return new Response(photo.data as BodyInit, {
    headers: { "Content-Type": photo.type, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
