"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/** Fades + slides content up the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 28, ...p }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...p}
    />
  );
}

export function Stagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ className = "", ...p }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
      {...p}
    />
  );
}

export function SectionTitle({ eyebrow, title, center = true }: { eyebrow?: string; title: string; center?: boolean }) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-gold px-4 py-1 font-heading text-sm font-semibold uppercase tracking-wider text-[#1b1a58]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-4xl font-bold sm:text-5xl">{title}</h2>
    </Reveal>
  );
}
