"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { Stat } from "@/lib/content";

/**
 * Scoreboard: odometer digits that roll into place, a pixel grid under each number that
 * lights up one cell at a time (like the GDG DVC chapter grid), and on hover the cell you
 * point at keeps a warm light under the cursor while the others step back.
 *
 * The server HTML already shows the final values, so the numbers are right without
 * JavaScript, with reduced motion, or if the animation never runs. All motion is
 * transform/opacity on small elements.
 */

/** How the pixel grid represents a stat: total cells, cells lit, and what one cell means. */
function gridFor(s: Stat) {
  if (s.suffix?.includes("%")) return { total: 20, lit: Math.round(s.value / 5), unit: "1 = 5%" };
  if (s.value <= 60) return { total: s.value, lit: s.value, unit: "" };
  return { total: Math.round(s.value / 10), lit: Math.round(s.value / 10), unit: `1 = 10${s.suffix?.includes("K") ? "K" : ""}` };
}

function Odometer({ value, rolled, instant, delay }: { value: number; rolled: boolean; instant: boolean; delay: number }) {
  const digits = String(value).split("").map(Number);
  return (
    <span aria-hidden className="inline-flex">
      {digits.map((d, i) => (
        <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none">
          <span
            className="flex flex-col"
            style={{
              // two stacked 0-9 strips so every wheel spins at least one full turn
              transform: `translateY(-${((rolled ? 10 + d : 0) * 100) / 20}%)`,
              transition: instant ? "none" : `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.12}s`,
            }}
          >
            {Array.from({ length: 20 }, (_, k) => (
              <span key={k} className="h-[1em] leading-none">
                {k % 10}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function Cell({ stat, size, index }: { stat: Stat; size: "lg" | "md"; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  // SSR/no-JS: final state. Before it scrolls into view, park everything at zero.
  const [rolled, setRolled] = useState(true);
  const [instant, setInstant] = useState(true);
  useEffect(() => {
    if (reduced) return;
    if (!inView) {
      setInstant(true);
      setRolled(false);
      return;
    }
    // next frame: enable transitions, then roll
    const id = requestAnimationFrame(() => {
      setInstant(false);
      requestAnimationFrame(() => setRolled(true));
    });
    // safety net: land on the real value even if frames stall
    const t = window.setTimeout(() => setRolled(true), 400);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, [inView, reduced]);

  const grid = gridFor(stat);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const cols = 4;

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`sb-cell relative flex flex-col gap-5 py-9 transition-opacity duration-300 sm:py-11 ${index % 2 ? "border-l border-ink/10 pl-5 sm:pl-6" : "pr-4 sm:pr-6"} ${
        index % cols ? "lg:border-l lg:border-ink/10 lg:pl-6" : "lg:border-l-0 lg:pl-0"
      } ${index >= 2 ? "border-t border-ink/10" : ""} ${index >= cols ? "lg:border-t" : "lg:border-t-0"} [dl:hover_&:not(:hover)]:opacity-40`}
    >
      <dt className="meta order-last mt-auto uppercase tracking-[0.12em]">{stat.label}</dt>
      <dd className="flex flex-col gap-5">
        <span className={`display tabular-nums whitespace-nowrap ${size === "lg" ? "text-[clamp(3.5rem,6vw,6rem)]" : "text-[clamp(2.75rem,4.4vw,4.25rem)]"}`}>
          <Odometer value={stat.value} rolled={rolled} instant={instant} delay={index * 0.08} />
          {stat.suffix && (
            <span aria-hidden className="text-gold">
              {stat.suffix}
            </span>
          )}
          <span className="sr-only">
            {stat.value}
            {stat.suffix ?? ""}
          </span>
        </span>
        {/* pixel grid: one cell per unit, lit in order */}
        <div aria-hidden className="flex flex-col gap-2">
          <div className="grid w-fit grid-cols-[repeat(10,7px)] gap-[4px]">
            {Array.from({ length: grid.total }, (_, k) => (
              <span
                key={k}
                className={`sb-dot size-[7px] rounded-[1.5px] ${k < grid.lit ? "sb-dot--lit" : ""}`}
                style={{
                  opacity: rolled ? 1 : 0.15,
                  transform: rolled ? "scale(1)" : "scale(0.4)",
                  transition: instant ? "none" : `opacity .4s ease ${0.4 + k * 0.022}s, transform .4s cubic-bezier(.16,1,.3,1) ${0.4 + k * 0.022}s`,
                }}
              />
            ))}
          </div>
          {grid.unit && <span className="meta text-[0.65rem] text-mute/70">{grid.unit}</span>}
        </div>

      </dd>
    </div>
  );
}

/** Open number row: hairlines above and below, thin dividers between. */
export function Scoreboard({ stats, size = "lg" }: { stats: Stat[]; size?: "lg" | "md" }) {
  return (
    <dl className="grid grid-cols-2 border-y border-ink/10 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Cell key={s.label} stat={s} size={size} index={i} />
      ))}
    </dl>
  );
}
