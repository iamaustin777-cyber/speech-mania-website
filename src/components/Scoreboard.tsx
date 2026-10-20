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

  return (
    <span ref={ref} className={`display whitespace-nowrap tabular-nums ${size === "lg" ? "text-[clamp(3.5rem,6vw,6rem)]" : "text-[clamp(2.75rem,4.4vw,4.25rem)]"}`}>
      <span aria-hidden>{shown}</span>
      {suffix && (
        <span aria-hidden className="text-gold">
          {suffix}
        </span>
      )}
      <span className="sr-only">
        {value}
        {suffix ?? ""}
      </span>
    </span>
  );
}

/** Open number row (no boxes): hairlines above and below, thin dividers between. */
export function Scoreboard({ stats, size = "lg" }: { stats: Stat[]; size?: "lg" | "md" }) {
  return (
    <dl className="grid grid-cols-2 border-y border-ink/10 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse items-start gap-3 px-1 py-9 sm:px-6 sm:py-11 ${
            i % 2 ? "border-l border-ink/10" : ""
          } ${i % 4 ? "lg:border-l lg:border-ink/10" : "lg:border-l-0"} ${i >= 2 ? "border-t border-ink/10" : ""} ${
            i >= 4 ? "lg:border-t" : "lg:border-t-0"
          } ${i % 2 ? "pl-5" : ""}`}
        >
          <dt className="meta uppercase tracking-[0.12em]">{s.label}</dt>
          <dd>
            <ScoreNumber value={s.value} suffix={s.suffix} size={size} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
