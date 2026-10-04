import type { Category } from "@/lib/types";

/* Flat illustrations drawn in SVG so the site needs no photos to look great. */

export function Balloon({ color = "#e8336d", className = "", style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 110" className={className} style={style} aria-hidden>
      <path d="M30 100 C26 88 34 82 30 72" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.6" fill="none" />
      <path d="M30 70 l-5 7 h10z" fill={color} />
      <ellipse cx="30" cy="35" rx="26" ry="33" fill={color} />
      <ellipse cx="20" cy="22" rx="6" ry="10" fill="#fff" opacity=".4" transform="rotate(-20 20 22)" />
    </svg>
  );
}

export function BounceHouse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="108" cy="168" rx="95" ry="8" fill="#000" opacity=".12" />
      {/* turrets */}
      <rect x="22" y="58" width="36" height="62" rx="5" fill="#ffc21a" />
      <path d="M18 60 L40 14 L62 60z" fill="#e8336d" />
      <rect x="150" y="58" width="36" height="62" rx="5" fill="#22a24a" />
      <path d="M146 60 L168 14 L190 60z" fill="#2b2fb0" />
      <rect x="86" y="44" width="36" height="52" rx="5" fill="#1c9ee0" />
      <path d="M82 46 L104 4 L126 46z" fill="#ff8a1f" />
      {/* body */}
      <rect x="20" y="92" width="168" height="68" rx="10" fill="#e8336d" />
      <rect x="20" y="92" width="168" height="26" rx="8" fill="#ffc21a" />
      <rect x="44" y="104" width="38" height="46" rx="19" fill="#2a1e5c" />
      <rect x="126" y="104" width="38" height="46" rx="19" fill="#2a1e5c" />
      <rect x="20" y="146" width="168" height="14" rx="6" fill="#2b2fb0" />
      {/* slide */}
      <path d="M186 98 L214 156 L186 156z" fill="#22a24a" />
      <path d="M186 98 L214 156" stroke="#fff" strokeWidth="3" opacity=".7" />
      {/* flags */}
      <path d="M40 14v-8l10 4z M168 14v-8l10 4z M104 4v-6l9 3z" fill="#fff" />
    </svg>
  );
}

export function Tent({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="110" cy="166" rx="98" ry="8" fill="#000" opacity=".12" />
      <path d="M108 20 L22 84 H196z" fill="#fff" stroke="#c9c7e8" strokeWidth="3" strokeLinejoin="round" />
      <path d="M108 20 L72 84 M108 20 L108 84 M108 20 L144 84" stroke="#c9c7e8" strokeWidth="2" fill="none" />
      <path d="M22 84 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0 q8 12 16 0" fill="#fff" stroke="#c9c7e8" strokeWidth="3" />
      <path d="M30 94 V160 M186 94 V160 M108 90 V160" stroke="#9c9ac4" strokeWidth="5" strokeLinecap="round" />
      {/* tables under tent */}
      <ellipse cx="66" cy="148" rx="22" ry="7" fill="#fff" />
      <rect x="64" y="148" width="4" height="12" fill="#9c9ac4" />
      <ellipse cx="150" cy="148" rx="22" ry="7" fill="#ffd1e0" />
      <rect x="148" y="148" width="4" height="12" fill="#9c9ac4" />
      <circle cx="108" cy="20" r="5" fill="#ffc21a" />
    </svg>
  );
}

export function TableChairs({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="110" cy="168" rx="92" ry="8" fill="#000" opacity=".12" />
      {/* chairs */}
      <g fill="#f3f1ff" stroke="#b9b6e0" strokeWidth="3" strokeLinejoin="round">
        <rect x="18" y="86" width="34" height="42" rx="8" />
        <rect x="14" y="120" width="42" height="12" rx="5" />
        <rect x="168" y="86" width="34" height="42" rx="8" />
        <rect x="164" y="120" width="42" height="12" rx="5" />
      </g>
      <path d="M26 132v28M44 132v28M176 132v28M194 132v28" stroke="#b9b6e0" strokeWidth="4" strokeLinecap="round" />
      {/* table */}
      <ellipse cx="110" cy="100" rx="66" ry="18" fill="#fff" stroke="#d7d4f2" strokeWidth="3" />
      <path d="M46 102 q10 40 22 44 h84 q12 -4 22 -44 q-30 18 -64 18 t-64 -18z" fill="#ff8fb4" />
      <path d="M52 112 q10 26 20 30 M168 112 q-10 26 -20 30 M110 122 v22" stroke="#e8336d" strokeWidth="2" opacity=".5" fill="none" />
      <rect x="104" y="140" width="12" height="22" fill="#9c9ac4" />
      <rect x="84" y="158" width="52" height="8" rx="4" fill="#9c9ac4" />
      {/* centerpiece */}
      <rect x="107" y="70" width="6" height="26" fill="#22a24a" />
      <circle cx="110" cy="62" r="11" fill="#ffc21a" />
      <circle cx="98" cy="70" r="9" fill="#e8336d" />
      <circle cx="122" cy="70" r="9" fill="#7a3fc4" />
      <circle cx="110" cy="62" r="4" fill="#fff" opacity=".7" />
    </svg>
  );
}

export function Extras({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="110" cy="168" rx="80" ry="7" fill="#000" opacity=".12" />
      <path d="M92 150 C88 128 100 120 98 98" stroke="#8a88b8" strokeWidth="2" fill="none" />
      <path d="M118 150 C124 128 112 118 122 96" stroke="#8a88b8" strokeWidth="2" fill="none" />
      <path d="M104 150 C106 130 104 110 106 90" stroke="#8a88b8" strokeWidth="2" fill="none" />
      <ellipse cx="96" cy="76" rx="26" ry="32" fill="#e8336d" />
      <ellipse cx="128" cy="72" rx="26" ry="32" fill="#1c9ee0" />
      <ellipse cx="108" cy="52" rx="26" ry="32" fill="#ffc21a" />
      <ellipse cx="86" cy="62" rx="5" ry="9" fill="#fff" opacity=".45" />
      <ellipse cx="118" cy="38" rx="5" ry="9" fill="#fff" opacity=".45" />
      <ellipse cx="138" cy="60" rx="5" ry="9" fill="#fff" opacity=".4" />
      <path d="M40 40l5 11 12 2-9 8 3 12-11-6-11 6 3-12-9-8 12-2z" fill="#7a3fc4" />
      <path d="M180 100l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#22a24a" />
    </svg>
  );
}

export function Dress({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="110" cy="170" rx="70" ry="7" fill="#000" opacity=".12" />
      {/* hanger */}
      <path d="M110 10 v10 M110 20 c-10 0 -10 -12 0 -12 c8 0 9 8 3 11" stroke="#9c9ac4" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M110 22 L60 46 h100z" stroke="#9c9ac4" strokeWidth="3" fill="none" strokeLinejoin="round" />
      {/* bodice */}
      <path d="M84 48 q-4 14 8 30 h36 q12 -16 8 -30 q-10 8 -26 8 t-26 -8z" fill="#ffffff" stroke="#d7d4f2" strokeWidth="3" strokeLinejoin="round" />
      <path d="M90 78 h40" stroke="#ff8fb4" strokeWidth="6" strokeLinecap="round" />
      <circle cx="110" cy="78" r="6" fill="#ff8fb4" /><circle cx="110" cy="78" r="2.5" fill="#fff" />
      {/* skirt */}
      <path d="M92 80 C70 110 40 140 28 160 q82 18 164 0 C180 140 150 110 128 80z" fill="#fff" stroke="#d7d4f2" strokeWidth="3" strokeLinejoin="round" />
      <path d="M96 84 C84 116 64 140 52 160 M110 84 v78 M124 84 C136 116 156 140 168 160" stroke="#e4e1f7" strokeWidth="2.5" fill="none" />
      <path d="M30 156 q20 12 40 0 q20 12 40 0 q20 12 40 0 q20 12 40 0" stroke="#ff8fb4" strokeWidth="3" fill="none" />
      <circle cx="178" cy="40" r="4" fill="#ffc21a" /><circle cx="40" cy="62" r="3" fill="#7a3fc4" /><circle cx="188" cy="82" r="3" fill="#1c9ee0" />
    </svg>
  );
}

export function Shoes({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="110" cy="160" rx="84" ry="7" fill="#000" opacity=".12" />
      {/* girl shoe: mary jane */}
      <path d="M22 120 q-4 -40 14 -52 q10 -6 22 4 q12 10 30 14 q22 4 24 22 v16 q0 8 -8 8 h-76 q-6 0 -6 -12z" fill="#ff8fb4" stroke="#d6336c" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 138 h88" stroke="#7a3fc4" strokeWidth="6" strokeLinecap="round" opacity=".7" />
      <path d="M44 100 q20 -8 38 6" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="64" cy="100" r="6" fill="#ffc21a" />
      {/* boy shoe: loafer */}
      <path d="M118 128 q-2 -34 12 -46 q8 -6 20 -4 q16 6 30 12 q16 6 20 20 v18 q0 6 -8 6 h-66 q-8 0 -8 -6z" fill="#2b2fb0" stroke="#1b1a58" strokeWidth="3" strokeLinejoin="round" />
      <path d="M118 148 h92" stroke="#1b1a58" strokeWidth="7" strokeLinecap="round" />
      <path d="M150 96 q12 -8 26 2" stroke="#6a70ff" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M163 100 h14" stroke="#ffc21a" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Decor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden>
      <ellipse cx="110" cy="170" rx="92" ry="7" fill="#000" opacity=".12" />
      {/* backdrop frame */}
      <path d="M30 168 V40 M190 168 V40 M24 40 H196" stroke="#9c9ac4" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 44 H184 V160 H36z" fill="#ffe3ee" opacity=".85" />
      {/* balloon arch */}
      <g>
        <ellipse cx="38" cy="140" rx="14" ry="18" fill="#e8336d" />
        <ellipse cx="44" cy="112" rx="14" ry="18" fill="#ffc21a" />
        <ellipse cx="38" cy="84" rx="14" ry="18" fill="#1c9ee0" />
        <ellipse cx="50" cy="58" rx="14" ry="17" fill="#7a3fc4" />
        <ellipse cx="76" cy="44" rx="15" ry="17" fill="#e8336d" />
        <ellipse cx="110" cy="40" rx="15" ry="17" fill="#ffc21a" />
        <ellipse cx="144" cy="44" rx="15" ry="17" fill="#22a24a" />
        <ellipse cx="170" cy="58" rx="14" ry="17" fill="#e8336d" />
        <ellipse cx="182" cy="84" rx="14" ry="18" fill="#1c9ee0" />
        <ellipse cx="176" cy="112" rx="14" ry="18" fill="#ffc21a" />
        <ellipse cx="182" cy="140" rx="14" ry="18" fill="#7a3fc4" />
        <ellipse cx="104" cy="36" rx="4" ry="6" fill="#fff" opacity=".55" />
      </g>
      {/* sign */}
      <rect x="76" y="96" width="68" height="34" rx="8" fill="#fff" stroke="#e8336d" strokeWidth="3" />
      <path d="M92 118 l6 -14 l6 14 M94 114 h8 M110 104 v14 M110 104 h8 M118 104 q4 7 0 14 M126 104 l8 14 M134 104 l-8 14" stroke="#262b9c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CategoryArt({ category, className = "" }: { category: Category; className?: string }) {
  const C = { jumpers: BounceHouse, tents: Tent, tables: TableChairs, dresses: Dress, shoes: Shoes, decor: Decor, extras: Extras }[category];
  return <C className={className} />;
}

export function Truck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 120" className={className} aria-hidden>
      <rect x="6" y="14" width="146" height="72" rx="10" fill="#fff" stroke="#262b9c" strokeWidth="4" />
      <rect x="6" y="14" width="146" height="20" rx="8" fill="#e8336d" />
      <text x="79" y="62" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="22" fill="#262b9c">ROMERO&apos;S</text>
      <text x="79" y="78" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="900" fontSize="9" fill="#d99a00">PARTY SUPPLIES</text>
      <path d="M152 36 h40 l22 26 v24 h-62z" fill="#ffc21a" stroke="#262b9c" strokeWidth="4" strokeLinejoin="round" />
      <path d="M162 44 h26 l14 18 h-40z" fill="#bfe8ff" stroke="#262b9c" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="46" cy="94" r="16" fill="#262b9c" /><circle cx="46" cy="94" r="7" fill="#fff" />
      <circle cx="176" cy="94" r="16" fill="#262b9c" /><circle cx="176" cy="94" r="7" fill="#fff" />
      <path d="M40 4 q4 -8 8 0 M60 2 q4 -8 8 0" stroke="#ffc21a" strokeWidth="3" fill="none" />
    </svg>
  );
}

const FLAG_COLORS = ["#e8336d", "#ffc21a", "#22a24a", "#1c9ee0", "#7a3fc4", "#ff8a1f"];
export function Bunting({ className = "" }: { className?: string }) {
  const n = 22;
  const flags = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const x = t * 1200;
    const y = 8 + 4 * 34 * t * (1 - t);
    return <path key={i} d={`M${x - 24} ${y - 1} L${x + 24} ${y - 1} L${x} ${y + 52}z`} fill={FLAG_COLORS[i % FLAG_COLORS.length]} />;
  });
  return (
    <svg viewBox="0 0 1200 90" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 8 Q600 76 1200 8" stroke="#8a88b8" strokeWidth="3" fill="none" />
      {flags}
    </svg>
  );
}

/** Deterministic pseudo-random so server and client render the same confetti. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const CONF = (() => {
  const r = rng(7);
  return Array.from({ length: 26 }, () => ({
    left: Math.round(r() * 100),
    delay: -Math.round(r() * 90) / 10,
    dur: 8 + Math.round(r() * 60) / 10,
    size: 8 + Math.round(r() * 8),
    color: FLAG_COLORS[Math.floor(r() * FLAG_COLORS.length)],
    round: r() > 0.6,
  }));
})();

export function FallingConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CONF.map((c, i) => (
        <span
          key={i}
          className="absolute top-0 animate-confetti opacity-0"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.dur * 1.6}s`,
            width: c.size,
            height: c.round ? c.size : c.size * 0.5,
            background: c.color,
            borderRadius: c.round ? "50%" : 2,
          }}
        />
      ))}
    </div>
  );
}
