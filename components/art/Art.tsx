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

export function CategoryArt({ category, className = "" }: { category: Category; className?: string }) {
  const C = { jumpers: BounceHouse, tents: Tent, tables: TableChairs, extras: Extras }[category];
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
