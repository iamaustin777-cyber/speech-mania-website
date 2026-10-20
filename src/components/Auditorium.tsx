"use client";

import { useEffect, useRef } from "react";

/**
 * Site background: an auditorium seen from the podium. Rows of seats (dots) curve around a
 * stage just above the top of the screen, split by aisles. Seats near the pointer light up
 * warm, like the audience catching a follow spot.
 *
 * Cost: the seat map is drawn once into an offscreen canvas; on pointer move we only blit it
 * and redraw the few seats inside the light. Nothing runs while the pointer is still.
 */
export function Auditorium() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seats: Float32Array = new Float32Array(0); // x, y pairs in CSS px
    let base: HTMLCanvasElement | null = null;
    let dpr = 1;
    let W = 0;
    let H = 0;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    const LIGHT = 190; // follow-spot radius in px

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      // Stage centre sits above the viewport; rows fan out below it.
      const cx = W / 2;
      const cy = -H * 0.42;
      const rowGap = W < 768 ? 22 : 26;
      const seatGap = W < 768 ? 17 : 21;
      const first = H * 0.62;
      const last = Math.hypot(W, H * 1.5);
      const pts: number[] = [];
      for (let r = first, row = 0; r < last; r += rowGap, row++) {
        const step = seatGap / r; // radians per seat
        const offset = (row % 2) * step * 0.5; // stagger rows like real seating
        for (let a = Math.PI / 2 - 1.35 + offset; a < Math.PI / 2 + 1.35; a += step) {
          // three aisles: centre and two sides
          const d = Math.abs(a - Math.PI / 2);
          if (d < 0.022 || Math.abs(d - 0.52) < 0.02) continue;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
          pts.push(x, y);
        }
      }
      seats = new Float32Array(pts);

      base = document.createElement("canvas");
      base.width = canvas.width;
      base.height = canvas.height;
      const b = base.getContext("2d")!;
      b.scale(dpr, dpr);
      for (let i = 0; i < seats.length; i += 2) {
        const y = seats[i + 1];
        // rows further back (lower on screen) fade a little, like seats receding into the dark
        const a = 0.17 - (y / H) * 0.06;
        b.fillStyle = `rgba(244,242,238,${a.toFixed(3)})`;
        b.fillRect(seats[i] - 1, y - 1, 2, 2);
      }
      draw();
    };

    const draw = () => {
      raf = 0;
      if (!base) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      if (mx < -1000) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // soft pool of light on the floor
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, LIGHT * 1.3);
      g.addColorStop(0, "rgba(255,210,122,0.07)");
      g.addColorStop(1, "rgba(255,210,122,0)");
      ctx.fillStyle = g;
      ctx.fillRect(mx - LIGHT * 1.3, my - LIGHT * 1.3, LIGHT * 2.6, LIGHT * 2.6);
      // seats inside the light glow warm
      for (let i = 0; i < seats.length; i += 2) {
        const dx = seats[i] - mx;
        const dy = seats[i + 1] - my;
        const d2 = dx * dx + dy * dy;
        if (d2 > LIGHT * LIGHT) continue;
        const k = 1 - Math.sqrt(d2) / LIGHT;
        const s = 2 + k * 1.6;
        ctx.fillStyle = `rgba(255,${Math.round(200 + 20 * k)},${Math.round(140 + 30 * k)},${(0.12 + k * 0.7).toFixed(3)})`;
        ctx.fillRect(seats[i] - s / 2, seats[i + 1] - s / 2, s, s);
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onLeave = () => {
      mx = my = -9999;
      if (!raf) raf = requestAnimationFrame(draw);
    };

    build();
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);
    if (fine && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
