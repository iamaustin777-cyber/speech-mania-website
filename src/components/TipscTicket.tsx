import Image from "next/image";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { home, images, programs, REGISTER_HREF } from "@/lib/content";

const t = programs.tipsc;

/** Barcode made of waveform-ish stripes, purely decorative. */
function Barcode() {
  const widths = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 3, 1, 4, 2, 1];
  return (
    <svg aria-hidden viewBox={`0 0 ${widths.reduce((a, b) => a + b + 1.5, 0)} 40`} className="h-10 w-full max-w-[13rem] text-ink/80" preserveAspectRatio="none">
      {widths.reduce<{ x: number; els: React.ReactElement[] }>(
        (acc, w, i) => {
          acc.els.push(<rect key={i} x={acc.x} y={0} width={w} height={40} fill="currentColor" />);
          acc.x += w + 1.5;
          return acc;
        },
        { x: 0, els: [] },
      ).els}
    </svg>
  );
}

/**
 * TIPSC 2025 as a premium event ticket. `full` adds the complete Programs-page details.
 */
export function TipscTicket({ full = false }: { full?: boolean }) {
  return (
    <Reveal>
      <article
        aria-labelledby={full ? "tipsc-title-full" : "tipsc-title"}
        className="relative isolate grid overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1030] via-hall to-[#0a1430] lg:grid-cols-[minmax(0,1fr)_20rem]"
      >
        {/* Main part */}
        <div className="relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <Image
            src={images.tipscHome.src}
            alt={images.tipscHome.alt}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="-z-10 object-cover opacity-25 grayscale-[0.4]"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/85 to-void/40" />
          <div aria-hidden className="absolute -top-24 left-1/3 -z-10 h-72 w-96 rounded-full bg-gold/15 blur-3xl" />

          <p className="eyebrow">{full ? "Our Upcoming Event" : "Featured Event"}</p>
          <h3 id={full ? "tipsc-title-full" : "tipsc-title"} className="display mt-4 text-[clamp(4.5rem,13vw,10rem)]">
            TIPSC <span className="text-gold">2025</span>
          </h3>
          {full && <p className="mt-3 text-xl font-medium text-ink">{t.fullName}</p>}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{full ? t.body : home.tipsc.body}</p>

          {full ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <dl className="grid gap-5">
                {[
                  ["Date", t.date],
                  ["Venue", t.venue],
                  ["Two Categories", t.categories],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="meta">{k}</dt>
                    <dd className="mt-1 text-lg font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <h4 className="meta">Competition Details</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {t.details.map(([k, v]) => (
                    <li key={k} className="leading-relaxed">
                      <span className="text-ink">{k}:</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <dl className="mt-10 flex flex-wrap gap-10">
              {home.tipsc.stats.map((s) => (
                <div key={s.label}>
                  <dt className="meta">{s.label}</dt>
                  <dd className="heading mt-1 text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10">
            {full ? (
              <ButtonLink href={REGISTER_HREF}>Register for TIPSC 2025</ButtonLink>
            ) : (
              <ButtonLink href="/programs#tipsc" variant="secondary">
                Learn More
              </ButtonLink>
            )}
          </div>
        </div>

        {/* Tear-off stub */}
        <aside
          aria-label="Ticket details"
          className="relative flex flex-col justify-between gap-8 border-t-2 border-dashed border-ink/20 bg-[#0d1328] p-6 sm:p-10 lg:border-l-2 lg:border-t-0"
        >
          <div>
            <p className="meta text-red-text">Admit one</p>
            <p className="display mt-4 text-7xl text-ink">01</p>
            <p className="display text-4xl text-gold">Feb 2025</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <p>
              <span className="meta block">Venue</span>
              <span className="text-ink">{t.venue}</span>
            </p>
            <p>
              <span className="meta block">Theme</span>
              <span className="text-ink">&ldquo;{t.theme}&rdquo;</span>
            </p>
          </div>
          <Barcode />
          {/* Perforation notches: page-colored circles clipped by the ticket's rounded overflow */}
          <span aria-hidden className="absolute left-0 top-0 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-void" />
          <span aria-hidden className="absolute right-0 top-0 size-9 translate-x-1/2 -translate-y-1/2 rounded-full bg-void lg:left-0 lg:right-auto lg:top-auto lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2" />
        </aside>
      </article>
    </Reveal>
  );
}
