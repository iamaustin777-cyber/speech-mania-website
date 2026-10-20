"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { Reveal } from "./Reveal";
import TearTicket from "./vendor/TearTicket";
import { home, images, programs, REGISTER_HREF } from "@/lib/content";

const t = programs.tipsc;

/** Barcode stripes for the stub, fixed so server and client match. */
function Barcode() {
  const widths = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 4, 2, 1];
  let x = 0;
  const bars = widths.map((w, i) => {
    const r = <rect key={i} x={x} y={0} width={w} height={40} fill="currentColor" />;
    x += w + 1.5;
    return r;
  });
  return (
    <svg aria-hidden viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" className="h-9 w-full text-ink/75">
      {bars}
    </svg>
  );
}

const ticketTheme = {
  background: "#18181b",
  stubBackground: "#121214",
  color: "#f5f3ee",
  borderColor: "rgba(245,243,238,0.14)",
};

function Body({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex h-full flex-col justify-end ${compact ? "p-6" : "p-10"}`}>
      <p className="meta text-gold [text-shadow:0_1px_10px_rgb(10_10_11/0.95)]">Featured Event</p>
      <p className={`display mt-4 leading-[1.02] ${compact ? "text-6xl" : "text-[6.5rem]"}`}>
        TIPSC <span className="text-gold">2025</span>
      </p>
      <p className={`mt-3 max-w-[34rem] leading-relaxed text-ink/85 ${compact ? "text-[0.95rem]" : "text-lg"}`}>{home.tipsc.body}</p>
      <div className={`flex flex-wrap items-end gap-x-8 gap-y-3 ${compact ? "mt-4" : "mt-6"}`}>
        {home.tipsc.stats.map((s) => (
          <p key={s.label}>
            <span className="meta block">{s.label}</span>
            <span className={`heading select-none ${compact ? "text-3xl" : "text-4xl"}`}>{s.value}</span>
          </p>
        ))}
        <Link
          href="/programs#tipsc"
          className="mb-1 ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          Learn More <ArrowIcon aria-hidden className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Stub({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex h-full flex-col justify-between ${compact ? "p-6" : "p-8"}`}>
      <div className={compact ? "flex items-end justify-between gap-4" : ""}>
        <div>
          <p className="meta text-red-text">Admit one</p>
          <p className={`display mt-2 select-none ${compact ? "text-5xl" : "text-7xl"}`}>01</p>
          <p className={`display text-gold ${compact ? "text-2xl" : "text-4xl"}`}>Feb 2025</p>
        </div>
        {compact && <p className="meta max-w-[9rem] text-right">{t.venue}</p>}
      </div>
      {!compact && (
        <div className="space-y-3 text-sm">
          <p>
            <span className="meta block">Venue</span>
            <span className="text-ink">{t.venue}</span>
          </p>
          <p>
            <span className="meta block">Theme</span>
            <span className="text-ink">&ldquo;{t.theme}&rdquo;</span>
          </p>
        </div>
      )}
      <Barcode />
    </div>
  );
}

/**
 * TIPSC 2025 as a ticket whose stub you can actually tear off (drag it; Enter/Space
 * does the same for keyboard users). Tearing it reveals the registration step.
 */
export function TipscTicket({ full = false }: { full?: boolean }) {
  const [torn, setTorn] = useState(false);
  const shared = {
    ...ticketTheme,
    image: images.tipscHome.src,
    imageAlt: images.tipscHome.alt,
    scrim: true,
    radius: 18,
    holes: 14,
    holeSize: 6,
    notch: 4,
    border: true,
    borderWidth: 1,
    recenter: true,
    torn,
    onTear: () => setTorn(true),
    ariaLabel: "Tear off the TIPSC 2025 ticket stub",
    className: "tipsc-ticket",
  } as const;

  return (
    <Reveal className="flex flex-col items-center">
      <div className="hidden w-full justify-center md:flex">
        <TearTicket {...shared} width={1180} height={470} stubSize={300} rotate={-1.5} tiltMax={6} stub={<Stub />}>
          <Body />
        </TearTicket>
      </div>
      <div className="flex w-full justify-center md:hidden">
        <TearTicket {...shared} orientation="vertical" width={360} height={640} stubSize={200} rotate={0} tiltMax={4} stub={<Stub compact />}>
          <Body compact />
        </TearTicket>
      </div>

      <div aria-live="polite" className="mt-8 min-h-12 text-center">
        {torn ? (
          <div className="fade-up flex flex-col items-center gap-3 sm:flex-row">
            <p className="text-ink">Stub torn. Your seat is waiting.</p>
            <div className="flex gap-3">
              <Link
                href={REGISTER_HREF}
                className="inline-flex items-center gap-2 rounded-lg bg-red px-4 py-2.5 font-medium text-ink transition-colors hover:bg-[#e3343c]"
              >
                Register for TIPSC 2025
              </Link>
              <button
                type="button"
                onClick={() => setTorn(false)}
                className="rounded-lg border border-ink/15 px-4 py-2.5 font-medium text-mute transition-colors hover:text-ink"
              >
                Put it back
              </button>
            </div>
          </div>
        ) : (
          <p className="meta">Grab the stub and pull to tear it off</p>
        )}
      </div>

      {full && (
        <div className="mt-16 grid w-full gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <p className="eyebrow">Our Upcoming Event</p>
            <h3 id="tipsc-title-full" className="heading mt-4 text-3xl sm:text-4xl">
              {t.fullName}
            </h3>
            <p className="mt-5 text-lg leading-relaxed">{t.body}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <dl className="grid gap-4">
              {[
                ["Date", t.date],
                ["Venue", t.venue],
                ["Two Categories", t.categories],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="meta">{k}</dt>
                  <dd className="mt-1 text-lg text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h4 className="meta">Competition Details</h4>
              <ul className="mt-3 flex flex-col gap-2.5">
                {t.details.map(([k, v]) => (
                  <li key={k} className="leading-relaxed">
                    <span className="text-ink">{k}:</span> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Reveal>
  );
}
