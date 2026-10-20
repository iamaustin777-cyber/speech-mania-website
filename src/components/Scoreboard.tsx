"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

/**
 * Impact numbers in an open row (no boxes). Digits roll like an odometer, a row of small
 * round dots under each number fills in red (one dot per unit), and hovering a column
 * draws a thin red line across its top. The server HTML already holds the final values, so the numbers
 * are right without JavaScript, with reduced motion, or if the animation never runs.
 */

/** Rolls into view once; `rolled` is true on the server and with reduced motion. */
function useRoll() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const [rolled, setRolled] = useState(true);
  const [instant, setInstant] = useState(true);
  const [fast, setFast] = useState(false);
  const lastReplay = useRef(0);
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
  /** Hover: recount quickly (digits spin, dots relight). At most once a second. */
  const replay = () => {
    const now = performance.now();
    if (reduced || now - lastReplay.current < 1000) return;
    lastReplay.current = now;
    setFast(true);
    setInstant(true);
    setRolled(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setInstant(false);
        setRolled(true);
      }),
    );
  };
  return { ref, rolled, instant, fast, replay };
}

function Odometer({ value, rolled, instant, fast = false, delay = 0 }: { value: number; rolled: boolean; instant: boolean; fast?: boolean; delay?: number }) {
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
                transition: instant
                  ? "none"
                  : fast
                    ? `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07}s`
                    : `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.12}s`,
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
  fast,
  delay,
  className,
}: {
  stat: Stat;
  rolled: boolean;
  instant: boolean;
  fast?: boolean;
  delay?: number;
  className: string;
}) {
  return (
    <span className={`display inline-block whitespace-nowrap tabular-nums select-none ${className}`}>
      <Odometer value={stat.value} rolled={rolled} instant={instant} fast={fast} delay={delay} />
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

/** How a grid cell represents a stat: total cells, cells lit, and what one cell means. */
function gridFor(s: Stat) {
  if (s.suffix?.includes("%")) return { total: 20, lit: Math.round(s.value / 5), unit: "1 = 5%" };
  if (s.value <= 60) return { total: s.value, lit: s.value, unit: "" };
  return { total: Math.round(s.value / 10), lit: Math.round(s.value / 10), unit: `1 = 10${s.suffix?.includes("K") ? "K" : ""}` };
}

function GridCell({ stat, index, big }: { stat: Stat; index: number; big: boolean }) {
  const { ref, rolled, instant, fast, replay } = useRoll();
  const grid = gridFor(stat);
  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && replay()}
      className={`group relative flex flex-col gap-6 py-10 sm:py-12 ${index % 2 ? "border-l border-ink/10 pl-5 sm:pl-8" : "pr-4 sm:pr-8"} ${
        index % 4 ? "lg:border-l lg:border-ink/10 lg:pl-8" : "lg:border-l-0 lg:pl-0"
      } ${index >= 2 ? "border-t border-ink/10" : ""} ${index >= 4 ? "lg:border-t" : "lg:border-t-0"}`}
    >
      {/* hover: a thin red line draws across the top of the column */}
      <span
        aria-hidden
        className="absolute -top-px left-0 right-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      <dt className="meta order-last mt-auto uppercase tracking-[0.14em] transition-colors duration-300 group-hover:text-ink">{stat.label}</dt>
      <dd className="flex flex-col gap-6">
        <StatNumber
          stat={stat}
          rolled={rolled}
          instant={instant}
          fast={fast}
          delay={index * 0.08}
          className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 ${
            big ? "text-[clamp(3.5rem,6.2vw,6.25rem)]" : "text-[clamp(2.75rem,4.4vw,4.25rem)]"
          }`}
        />
        <span aria-hidden className="flex flex-col gap-2.5">
          <span className="grid w-fit grid-cols-[repeat(10,6px)] gap-[6px]">
            {Array.from({ length: grid.total }, (_, k) => (
              <span
                key={k}
                className="size-[6px] rounded-full"
                style={{
                  background: k < grid.lit && rolled ? "var(--color-red)" : "rgb(244 242 238 / 0.1)",
                  boxShadow: k < grid.lit && rolled ? "0 0 6px rgb(215 38 46 / 0.55)" : "none",
                  transform: rolled ? "scale(1)" : "scale(0.35)",
                  // first view: a slow fill; hover: a quick ripple with a little overshoot
                  transition: instant
                    ? "none"
                    : (() => {
                        const d = fast ? 0.12 + k * 0.014 : 0.45 + k * 0.025;
                        const t = fast ? ".35s" : ".4s";
                        return `background-color ${t} ease ${d}s, box-shadow ${t} ease ${d}s, transform .45s cubic-bezier(.34,1.7,.64,1) ${d}s`;
                      })(),
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

export function Scoreboard({ stats, size = "lg" }: { stats: Stat[]; size?: "lg" | "md" }) {
  return (
    <dl className="grid select-none grid-cols-2 border-y border-ink/10 lg:grid-cols-4">
      {stats.map((s, i) => (
        <GridCell key={s.label} stat={s} index={i} big={size === "lg"} />
      ))}
    </dl>
  );
}
