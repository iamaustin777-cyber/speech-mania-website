"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { getInvolved } from "@/lib/content";

const paths = getInvolved.paths;

/** Audience paths as spotlights you step into: an accessible tablist. */
export function PathPicker() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = {
      ArrowRight: (i + 1) % paths.length,
      ArrowDown: (i + 1) % paths.length,
      ArrowLeft: (i - 1 + paths.length) % paths.length,
      ArrowUp: (i - 1 + paths.length) % paths.length,
      Home: 0,
      End: paths.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      setActive(map[e.key]);
      tabs.current[map[e.key]]?.focus();
    }
  };

  const p = paths[active];

  return (
    <div>
      <div role="tablist" aria-label="Choose your path" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {paths.map((path, i) => {
          const on = i === active;
          return (
            <button
              key={path.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${path.id}`}
              aria-selected={on}
              aria-controls={`panel-${path.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative isolate flex min-h-36 flex-col justify-end overflow-hidden rounded-2xl border p-5 text-left transition duration-500 sm:min-h-44 sm:p-6 ${
                on ? "border-gold/60 bg-hall" : "border-ink/10 bg-hall/40 hover:border-ink/25"
              }`}
            >
              {/* the beam: on for the chosen path */}
              <span
                aria-hidden
                className={`spotlight -z-10 transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`}
              />
              <span aria-hidden className={`mb-3 block size-2 rounded-full transition ${on ? "bg-gold shadow-[0_0_14px_#ffd27a]" : "bg-ink/25"}`} />
              <span className={`display text-2xl transition-colors sm:text-4xl ${on ? "text-ink" : "text-ink/55"}`}>{path.title}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-6 min-h-[16rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            role="tabpanel"
            id={`panel-${p.id}`}
            aria-labelledby={`tab-${p.id}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="glass grid gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center"
          >
            <p className="text-xl leading-relaxed text-ink">{p.body}</p>
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {p.links.map((l) => (
                <li key={l.label}>
                  {/* TODO: links with href "#" are placeholder downloads (no PDF in the repo yet). */}
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-4 py-4 font-semibold text-ink transition-colors hover:text-gold"
                  >
                    {l.label}
                    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 transition-transform group-hover:translate-x-1">
                      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
