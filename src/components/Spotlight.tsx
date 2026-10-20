"use client";

import { useEffect, useRef } from "react";

/**
 * Warm stage spotlight shining down from the top of its parent.
 * With `follow`, it drifts toward the mouse on desktop (fine pointer only,
 * never when reduced motion is requested). Parent must be `relative`.
 * The beam moves with `transform`, so following the mouse never repaints the gradient.
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
    let target = 0;
    let current = 0;
    let raf = 0;

    const tick = () => {
      current += (target - current) * 0.08;
      el.style.transform = `translate3d(${current.toFixed(1)}px,0,0)`;
      // Stop once settled; restart on the next pointer move.
      raf = Math.abs(target - current) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      // Lean toward the cursor rather than chase it.
      target = (e.clientX - r.left - r.width / 2) * 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [follow]);

  return <div ref={ref} aria-hidden className={`spotlight ${intro ? "spotlight-intro" : ""} ${className}`} />;
}
