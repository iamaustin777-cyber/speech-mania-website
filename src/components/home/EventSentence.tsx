"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/Icons";
import { home } from "@/lib/content";

/**
 * One big sentence is the interface (ported from the GDG DVC "TechSentence").
 * Pointing at an event lights it in its own color, dims the others, and the line
 * underneath swaps to our real WIDPSC 2025 result in that event. On touch screens the
 * first tap shows the result and the second tap follows the link.
 */
export function EventSentence() {
  const [on, setOn] = useState<string | null>(null);
  const active = home.events.find((e) => e.name === on);
  const [a, b, c] = home.events;

  const word = (e: (typeof home.events)[number]) => (
    <Link
      key={e.name}
      href={e.href}
      className={`es__word ${on === e.name ? "is-on" : ""}`}
      style={{ ["--p" as string]: e.tone }}
      onMouseEnter={() => setOn(e.name)}
      onMouseLeave={() => setOn(null)}
      onFocus={() => setOn(e.name)}
      onBlur={() => setOn(null)}
      onPointerDown={(ev) => {
        if (ev.pointerType === "touch" && on !== e.name) {
          // first tap: preview only
          ev.currentTarget.dataset.preview = "1";
          setOn(e.name);
        }
      }}
      onClick={(ev) => {
        if (ev.currentTarget.dataset.preview) {
          delete ev.currentTarget.dataset.preview;
          ev.preventDefault();
        }
      }}
    >
      {e.name}
    </Link>
  );

  return (
    <section aria-labelledby="events-title" className={`es mx-auto max-w-6xl px-4 py-28 text-center sm:px-6 lg:py-40 ${on ? "has-on" : ""}`}>
      <h2 id="events-title" className="sr-only">
        Events we train for
      </h2>
      <p className="es__sentence">
        We train speakers for {word(a)}, {word(b)} and {word(c)}.
      </p>
      <p className="es__caption" aria-live="polite">
        {active ? (
          <span key={active.name} className="es__swap" style={{ ["--p" as string]: active.tone }}>
            {active.result}{" "}
            <Link href={active.href} className="es__more">
              Team Thailand <ArrowIcon aria-hidden className="inline size-3.5 align-[-2px]" />
            </Link>
          </span>
        ) : (
          <span key="idle" className="es__swap es__idle">
            Pick an event to see how our students did at WIDPSC 2025.
          </span>
        )}
      </p>
    </section>
  );
}
