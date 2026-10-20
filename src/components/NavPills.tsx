"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Item = { href: string; label: string };

/**
 * Main navigation with two sliding pills:
 *   - a white pill that glides to the current page,
 *   - a faint pill that follows the item under the pointer.
 * Both move with transform/width transitions on a single element each, so changing
 * page or sweeping the mouse across the bar is one continuous motion, never a jump.
 */
export function NavPills({ items, label = "Main" }: { items: Item[]; label?: string }) {
  const pathname = usePathname();
  const active = Math.max(
    0,
    items.findIndex((it) => (it.href === "/" ? pathname === "/" : pathname.startsWith(it.href))),
  );
  const [selected, setSelected] = useState(active); // moves on click, before the route finishes loading
  const [hover, setHover] = useState<number | null>(null);
  const [ready, setReady] = useState(false); // no transition on the very first placement
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const textRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => setSelected(active), [active]);

  const place = useCallback((el: HTMLSpanElement | null, index: number | null) => {
    const list = listRef.current;
    if (!el || !list) return;
    if (index === null) {
      el.style.opacity = "0";
      return;
    }
    const a = textRefs.current[index];
    if (!a) return;
    // position relative to the list (the link's offsetParent is its <li>)
    const li = a.parentElement as HTMLElement;
    el.style.opacity = "1";
    el.style.width = `${a.offsetWidth}px`;
    el.style.transform = `translateX(${li.offsetLeft + a.offsetLeft}px)`;
  }, []);

  useLayoutEffect(() => {
    place(pillRef.current, selected);
  }, [selected, place]);
  useLayoutEffect(() => {
    place(ghostRef.current, hover);
  }, [hover, place]);

  // Re-measure when fonts load or the bar resizes; enable transitions after first paint.
  useEffect(() => {
    const re = () => place(pillRef.current, selected);
    document.fonts?.ready.then(re);
    const ro = new ResizeObserver(re);
    if (listRef.current) ro.observe(listRef.current);
    const id = requestAnimationFrame(() => setReady(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, [selected, place]);

  return (
    <nav aria-label={label}>
      <ul ref={listRef} className="relative flex items-center" onPointerLeave={() => setHover(null)}>
        <span
          ref={ghostRef}
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 h-full rounded-[10px] bg-ink/[0.08] opacity-0 ${
            ready ? "transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
          }`}
        />
        <span
          ref={pillRef}
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 h-full rounded-[10px] bg-ink shadow-[0_6px_20px_-8px_rgb(244_242_238/0.45)] ${
            ready ? "transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
          }`}
        />
        {items.map((item, i) => (
          <li key={item.href} className="relative">
            <Link
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              href={item.href}
              aria-current={active === i ? "page" : undefined}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => setSelected(i)}
              className={`relative z-10 block rounded-[10px] px-[0.95em] py-[0.55em] text-sm transition-colors duration-300 ${
                selected === i ? "text-void" : hover === i ? "text-ink" : "text-mute"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
