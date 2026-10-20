import type { ReactNode } from "react";
import { Spotlight } from "./Spotlight";
import { Waveform } from "./Waveform";

/** Inner-page opener: a darkened stage, one spotlight, the page title delivered big. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="curtain curtain-left" />
      <div aria-hidden className="curtain curtain-right" />
      <Spotlight follow intro />
      <div className="relative mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-end px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-24">
        <p className="eyebrow fade-up flex items-center gap-3" style={{ ["--d" as string]: "0.5s" }}>
          <span aria-hidden className="h-px w-8 bg-gold/70" />
          {eyebrow}
        </p>
        <h1 className="display mt-6 text-[clamp(4rem,14vw,13rem)]">
          {title.split(" ").map((w, i) => (
            <span key={i} className="speak-word mr-[0.2em] last:mr-0" style={{ ["--i" as string]: i - 1.5 }}>
              {w}
            </span>
          ))}
        </h1>
        {subtitle && (
          <p className="fade-up mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl" style={{ ["--d" as string]: "1s" }}>
            {subtitle}
          </p>
        )}
        {children}
        <Waveform className="fade-up mt-12 h-10 w-full max-w-sm opacity-80" style={{ ["--d" as string]: "1.2s" }} color="#d7262e" count={44} />
      </div>
      <div aria-hidden className="stage-floor" />
    </section>
  );
}

/** "ACT I" label used to stage each program as an act. */
export function ActLabel({ n }: { n: string }) {
  return (
    <p className="flex items-center gap-4">
      <span className="display text-3xl text-gold sm:text-4xl">Act {n}</span>
      <span aria-hidden className="h-px w-24 bg-gradient-to-r from-gold/70 to-transparent" />
    </p>
  );
}
