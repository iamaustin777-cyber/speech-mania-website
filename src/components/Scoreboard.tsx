"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

/**
 * A stadium-scoreboard number that counts up when scrolled into view.
 * The server-rendered HTML always contains the final value, so it is correct
 * without JavaScript, with reduced motion, or if the animation is interrupted.
 */
export function ScoreNumber({ value, suffix, size = "lg" }: Pick<Stat, "value" | "suffix"> & { size?: "lg" | "md" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(value);
  const armed = useRef(false);

  // Before it scrolls into view, park the counter at 0 (offscreen, so nobody sees the swap).
  useEffect(() => {
    if (reduced || inView) return;
    armed.current = true;
    setShown(0);
  }, [reduced, inView]);

  useEffect(() => {
    if (!inView) return;
    if (reduced || !armed.current) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
      onComplete: () => setShown(value),
    });
    // Safety net: if animation frames stall (background tab, throttling), still land on the real value.
    const fallback = window.setTimeout(() => {
      controls.stop();
      setShown(value);
    }, 2400);
    return () => {
      window.clearTimeout(fallback);
      controls.stop();
      setShown(value);
    };
  }, [inView, reduced, value]);

  const digits = String(shown).padStart(String(value).length, "0").split("");
  const tile = size === "lg" ? "h-[1.15em] w-[0.72em] text-6xl sm:text-7xl" : "h-[1.15em] w-[0.72em] text-5xl";

  return (
    <span ref={ref} className="inline-flex items-end gap-1" aria-label={`${value}${suffix ?? ""}`} role="img">
      {digits.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className={`relative grid place-items-center overflow-hidden rounded-md bg-gradient-to-b from-[#1a2140] to-[#0c1124] font-display leading-none text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_10px_30px_rgb(0_0_0/0.5)] ${tile}`}
        >
          <span key={d} className="flap">{d}</span>
          {/* split-flap hinge */}
          <span className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
        </span>
      ))}
      {suffix && (
        <span aria-hidden className={`font-display leading-none text-gold ${size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl"} pb-1`}>
          {suffix}
        </span>
      )}
    </span>
  );
}

export function Scoreboard({ stats, size = "lg" }: { stats: Stat[]; size?: "lg" | "md" }) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col gap-4 bg-hall px-6 py-8 sm:px-8 sm:py-10 ${
            // Odd count: let the last cell fill the row so the grid has no hole.
            stats.length % 2 === 1 && i === stats.length - 1 ? "sm:col-span-2" : ""
          }`}
        >
          <dt className="order-2 text-[0.9375rem] text-mute">{s.label}</dt>
          <dd className="order-1">
            <ScoreNumber value={s.value} suffix={s.suffix} size={size} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
