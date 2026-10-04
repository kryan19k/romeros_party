import { ImageResponse } from "next/og";

export const alt = "Romero's Party Boutique · Party rentals, dresses & decor in Perris, CA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const balloon = (color: string, left: number, top: number, w: number) => (
  <div style={{ position: "absolute", left, top, width: w, height: w * 1.25, borderRadius: "50%", background: color, display: "flex" }} />
);

// Social-share card (WhatsApp, Facebook, Google previews).
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1a1d7a,#262b9c 60%,#5a2fc4)", color: "#fff", position: "relative", fontFamily: "sans-serif" }}>
        {balloon("#e8336d", 70, 70, 120)}
        {balloon("#ffc21a", 1010, 90, 110)}
        {balloon("#22a24a", 120, 380, 100)}
        {balloon("#1c9ee0", 980, 380, 120)}
        <div style={{ display: "flex", fontSize: 130, fontWeight: 900, color: "#ffc21a", letterSpacing: -2 }}>ROMERO&apos;S</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 900, marginTop: -10 }}>PARTY BOUTIQUE</div>
        <div style={{ display: "flex", marginTop: 34, padding: "14px 40px", borderRadius: 999, background: "#e8336d", fontSize: 38, fontWeight: 700 }}>
          Party rentals · Dresses · Decor
        </div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 40, color: "#ffe8a3" }}>Perris, CA · Renta y vestidos</div>
      </div>
    ),
    size,
  );
}
