"use client";

import { useEffect, useRef } from "react";

/**
 * Warm stage spotlight shining down from the top of its parent.
 * With `follow`, it drifts toward the mouse on desktop (fine pointer only,
 * never when reduced motion is requested). Parent must be `relative`.
 */
export function Spotlight({
  follow = false,
  intro = false,
  className = "",
}: {
  follow?: boolean;
  intro?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!follow || !el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const host = el.parentElement!;
    let target = 50;
    let current = 50;
    let raf = 0;

    const tick = () => {
      current += (target - current) * 0.06;
      el.style.setProperty("--x", `${current.toFixed(2)}%`);
      if (Math.abs(target - current) > 0.05) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      // Keep the beam near center: it leans toward the cursor rather than chasing it.
      target = 50 + (((e.clientX - r.left) / r.width) * 100 - 50) * 0.55;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [follow]);

  return <div ref={ref} aria-hidden className={`spotlight ${intro ? "spotlight-intro" : ""} ${className}`} />;
}
