import { Balloon } from "./art/Art";

/** Recreated from the store flyer: sticker-style navy/gold lettering with balloons. */
export function Logo({ size = "md", ribbon = false, className = "" }: { size?: "sm" | "md" | "lg"; ribbon?: boolean; className?: string }) {
  const s = { sm: "text-[1.35rem]", md: "text-[2.1rem]", lg: "text-[clamp(2.6rem,9vw,4.6rem)]" }[size];
  const balloon = { sm: "h-8", md: "h-12", lg: "h-[4.5rem] sm:h-24" }[size];
  return (
    <span className={`inline-flex flex-col items-center leading-none select-none ${s} ${className}`} aria-label="Romero's Party Supplies">
      <span className="flex items-end gap-[0.2em]">
        <Balloon color="#2b2fb0" className={`${balloon} -mb-1 -rotate-12 text-ink`} />
        <span className="logo-type">ROMERO&apos;S</span>
        <Balloon color="#ffc21a" className={`${balloon} -mb-1 rotate-12 text-ink`} />
      </span>
      <span className="logo-sub -mt-[0.1em] text-[0.62em]">PARTY SUPPLIES</span>
      {ribbon && (
        <span className="mt-2 rounded-md bg-[#262b9c] px-4 py-1 text-[0.22em] font-extrabold uppercase tracking-wide text-white shadow-md ring-2 ring-[#ffc21a] font-heading">
          ¡Tu mejor opción para celebrar!
        </span>
      )}
    </span>
  );
}
