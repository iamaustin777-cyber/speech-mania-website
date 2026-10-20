"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

/**
 * Impact numbers.
 *   layout="feature": one headline stat (huge, with an auditorium of seats that fill in red,
 *                     one per unit) beside a list of the other stats. Used on Home.
 *   layout="grid":    every stat in an open grid with a red pixel row under each. Used on Impact.
 * Digits roll like an odometer. The server HTML already holds the final values, so the numbers
 * are right without JavaScript, with reduced motion, or if the animation never runs.
 */

/** Rolls into view once; `rolled` is true on the server and with reduced motion. */
function useRoll() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const [rolled, setRolled] = useState(true);
  const [instant, setInstant] = useState(true);
  useEffect(() => {
    if (reduced) return;
    if (!inView) {
      setInstant(true);
      setRolled(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      setInstant(false);
      requestAnimationFrame(() => setRolled(true));
    });
    const t = window.setTimeout(() => setRolled(true), 400); // safety net
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, [inView, reduced]);
  return { ref, rolled, instant };
}

function Odometer({ value, rolled, instant, delay = 0 }: { value: number; rolled: boolean; instant: boolean; delay?: number }) {
  return (
    <span aria-hidden className="inline-flex">
      {String(value)
        .split("")
        .map(Number)
        .map((d, i) => (
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

function StatNumber({
  stat,
  rolled,
  instant,
  delay,
  className,
}: {
  stat: Stat;
  rolled: boolean;
  instant: boolean;
  delay?: number;
  className: string;
}) {
  return (
    <span className={`display whitespace-nowrap tabular-nums ${className}`}>
      <Odometer value={stat.value} rolled={rolled} instant={instant} delay={delay} />
      {stat.suffix && (
        <span aria-hidden className="text-red">
          {stat.suffix}
        </span>
      )}
      <span className="sr-only">
        {stat.value}
        {stat.suffix ?? ""}
      </span>
    </span>
  );
}

/** A small auditorium: `n` seats on curved rows facing the stage, filling in red front row first. */
function SeatMap({ n, rolled, instant }: { n: number; rolled: boolean; instant: boolean }) {
  const seats: { x: number; y: number }[] = [];
  let row = 0;
  while (seats.length < n) {
    const cap = 7 + row * 3;
    const count = Math.min(cap, n - seats.length);
    const r = 70 + row * 22;
    const spread = 1.05; // radians either side of centre
    for (let k = 0; k < count; k++) {
      const a = -spread + (2 * spread * (k + (cap - count) / 2)) / Math.max(1, cap - 1);
      seats.push({ x: 160 + Math.sin(a) * r, y: 18 + Math.cos(a) * r * 0.55 + row * 6 });
    }
    row++;
  }
  const h = 18 + (70 + (row - 1) * 22) * 0.55 + (row - 1) * 6 + 14;
  return (
    <svg aria-hidden viewBox={`0 0 320 ${h.toFixed(0)}`} className="w-full max-w-[22rem]">
      <rect x="120" y="0" width="80" height="6" rx="3" fill="rgb(244 242 238 / 0.3)" />
      {seats.map((s, i) => (
        <rect
          key={i}
          x={s.x - 5}
          y={s.y - 4}
          width={10}
          height={8}
          rx={2.5}
          style={{
            fill: rolled ? "var(--color-red)" : "rgb(244 242 238 / 0.12)",
            transition: instant ? "none" : `fill .35s ease ${0.5 + i * 0.045}s`,
          }}
        />
      ))}
    </svg>
  );
}

function Feature({ stats, sentence }: { stats: Stat[]; sentence?: string }) {
  const { ref, rolled, instant } = useRoll();
  const [lead, ...rest] = stats;
  return (
    <div ref={ref} className="grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20 lg:pt-16">
      <dl>
        <div className="flex flex-col">
          <dt className="meta order-2 mt-3 uppercase tracking-[0.12em]">{lead.label}</dt>
          <dd className="order-1">
            <StatNumber stat={lead} rolled={rolled} instant={instant} className="text-[clamp(6rem,15vw,13rem)] leading-[0.85]" />
          </dd>
          <dd className="order-3 mt-10">
            <SeatMap n={lead.value} rolled={rolled} instant={instant} />
          </dd>
          {sentence && <dd className="order-4 mt-6 max-w-[38ch] text-lg leading-relaxed">{sentence}</dd>}
        </div>
      </dl>

      <dl className="flex flex-col justify-end">
        {rest.map((s, i) => (
          <div
            key={s.label}
            className="group flex items-end justify-between gap-6 border-t border-ink/10 py-7 first:border-t-0 lg:py-9"
          >
            <div className="flex flex-col">
              <dt className="meta order-2 mt-2 uppercase tracking-[0.12em] transition-colors group-hover:text-ink">{s.label}</dt>
              <dd className="order-1">
                <StatNumber
                  stat={s}
                  rolled={rolled}
                  instant={instant}
                  delay={0.2 + i * 0.15}
                  className="text-[clamp(3.25rem,6vw,5.5rem)] transition-colors duration-300 group-hover:text-red"
                />
              </dd>
            </div>
            <ArrowRight
              aria-hidden
              className="mb-3 size-5 -translate-x-2 text-red opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>
        ))}
      </dl>
    </div>
  );
}

/** How a grid cell represents a stat: total cells, cells lit, and what one cell means. */
function gridFor(s: Stat) {
  if (s.suffix?.includes("%")) return { total: 20, lit: Math.round(s.value / 5), unit: "1 = 5%" };
  if (s.value <= 60) return { total: s.value, lit: s.value, unit: "" };
  return { total: Math.round(s.value / 10), lit: Math.round(s.value / 10), unit: `1 = 10${s.suffix?.includes("K") ? "K" : ""}` };
}

function GridCell({ stat, index }: { stat: Stat; index: number }) {
  const { ref, rolled, instant } = useRoll();
  const grid = gridFor(stat);
  return (
    <div
      ref={ref}
      className={`group relative flex flex-col gap-5 py-9 sm:py-11 ${index % 2 ? "border-l border-ink/10 pl-5 sm:pl-6" : "pr-4 sm:pr-6"} ${
        index % 4 ? "lg:border-l lg:border-ink/10 lg:pl-6" : "lg:border-l-0 lg:pl-0"
      } ${index >= 2 ? "border-t border-ink/10" : ""} ${index >= 4 ? "lg:border-t" : "lg:border-t-0"}`}
    >
      <dt className="meta order-last mt-auto uppercase tracking-[0.12em] transition-colors group-hover:text-ink">{stat.label}</dt>
      <dd className="flex flex-col gap-5">
        <StatNumber
          stat={stat}
          rolled={rolled}
          instant={instant}
          delay={index * 0.08}
          className="text-[clamp(2.75rem,4.4vw,4.25rem)] transition-colors duration-300 group-hover:text-red"
        />
        <span aria-hidden className="flex flex-col gap-2">
          <span className="grid w-fit grid-cols-[repeat(10,7px)] gap-[4px]">
            {Array.from({ length: grid.total }, (_, k) => (
              <span
                key={k}
                className="size-[7px] rounded-[1.5px]"
                style={{
                  background: k < grid.lit && rolled ? "var(--color-red)" : "rgb(244 242 238 / 0.1)",
                  transition: instant ? "none" : `background-color .35s ease ${0.4 + k * 0.022}s`,
                }}
              />
            ))}
          </span>
          {grid.unit && <span className="meta text-[0.65rem] text-mute/70">{grid.unit}</span>}
        </span>
      </dd>
    </div>
  );
}

export function Scoreboard({ stats, layout = "grid", sentence }: { stats: Stat[]; layout?: "grid" | "feature"; sentence?: string }) {
  if (layout === "feature") return <Feature stats={stats} sentence={sentence} />;
  return (
    <dl className="grid grid-cols-2 border-y border-ink/10 lg:grid-cols-4">
      {stats.map((s, i) => (
        <GridCell key={s.label} stat={s} index={i} />
      ))}
    </dl>
  );
}
