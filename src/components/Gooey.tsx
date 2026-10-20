"use client";

// GooeyNav — from React Bits (https://reactbits.dev), via the GDG DVC site.
// Changes for this site: TypeScript, Next.js <Link> routing, the active pill follows the
// current route, particle colors use the Speech Mania palette (--color-1..4), and bursts
// are skipped for reduced motion. The goo merge is an SVG alpha filter (<GooeyDefs />).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const noise = (n = 1) => n / 2 - Math.random() * n;
const getXY = (distance: number, i: number, total: number): [number, number] => {
  const angle = ((360 + noise(8)) / total) * i * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
};
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Spawns the gooey bubbles inside `el` (an element with the goo filter). */
function burst(el: HTMLElement, { count = 15, dist = [90, 10] as [number, number], time = 600, variance = 300 } = {}) {
  if (reducedMotion()) return;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];
  el.querySelectorAll(".particle").forEach((p) => p.remove());
  el.style.setProperty("--time", `${time * 2 + variance}ms`);
  el.classList.remove("active");
  for (let i = 0; i < count; i++) {
    const t = time * 2 + noise(variance * 2);
    const rot = noise(10);
    const start = getXY(dist[0], count - i, count);
    const end = getXY(dist[1] + noise(7), count - i, count);
    setTimeout(() => {
      const particle = document.createElement("span");
      const point = document.createElement("span");
      particle.className = "particle";
      particle.style.setProperty("--start-x", `${start[0]}px`);
      particle.style.setProperty("--start-y", `${start[1]}px`);
      particle.style.setProperty("--end-x", `${end[0]}px`);
      particle.style.setProperty("--end-y", `${end[1]}px`);
      particle.style.setProperty("--time", `${t}ms`);
      particle.style.setProperty("--scale", `${1 + noise(0.2)}`);
      particle.style.setProperty("--color", `var(--color-${colors[(Math.random() * colors.length) | 0]}, white)`);
      particle.style.setProperty("--rotate", `${rot > 0 ? (rot + 5) * 10 : (rot - 5) * 10}deg`);
      point.className = "point";
      particle.appendChild(point);
      el.appendChild(particle);
      requestAnimationFrame(() => el.classList.add("active"));
      setTimeout(() => particle.remove(), t);
    }, 30);
  }
}

/** The SVG goo filter, rendered once in the layout. */
export function GooeyDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <filter id="gooey-goo" x="-200%" y="-450%" width="500%" height="1000%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
      </filter>
    </svg>
  );
}

type NavItem = { href: string; label: string };

export function GooeyNav({ items, label = "Main" }: { items: NavItem[]; label?: string }) {
  const pathname = usePathname();
  const routeIndex = Math.max(
    0,
    items.findIndex((it) => (it.href === "/" ? pathname === "/" : pathname.startsWith(it.href))),
  );
  const [active, setActive] = useState(routeIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Follow route changes (back/forward, links elsewhere) without a burst.
  useEffect(() => setActive(routeIndex), [routeIndex]);

  const place = (li: Element) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box || !filterRef.current || !textRef.current) return;
    const r = li.getBoundingClientRect();
    const styles = { left: `${r.x - box.x}px`, top: `${r.y - box.y}px`, width: `${r.width}px`, height: `${r.height}px` };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = (li as HTMLElement).innerText;
  };

  useEffect(() => {
    const li = listRef.current?.querySelectorAll("li")[active];
    if (!li) return;
    place(li);
    textRef.current?.classList.add("active");
    const ro = new ResizeObserver(() => {
      const cur = listRef.current?.querySelectorAll("li")[active];
      if (cur) place(cur);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    // fonts can change the pill size after first paint
    document.fonts?.ready.then(() => {
      const cur = listRef.current?.querySelectorAll("li")[active];
      if (cur) place(cur);
    });
    return () => ro.disconnect();
  }, [active]);

  const select = (li: HTMLElement, index: number) => {
    if (index === active) return;
    setActive(index);
    place(li);
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }
    if (filterRef.current) burst(filterRef.current);
  };

  return (
    <div className="gooey-nav" ref={containerRef}>
      <nav aria-label={label}>
        <ul ref={listRef}>
          {items.map((item, i) => (
            <li key={item.href} className={active === i ? "active" : ""}>
              <Link
                href={item.href}
                aria-current={routeIndex === i ? "page" : undefined}
                onClick={(e) => select(e.currentTarget.parentElement as HTMLElement, i)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} aria-hidden />
      <span className="effect text" ref={textRef} aria-hidden />
    </div>
  );
}
