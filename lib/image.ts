/** Public URL of an uploaded item photo (Supabase Storage in production, local route in dev). */
export function imageSrc(name: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/items/${name}` : `/uploads/${name}`;
}
