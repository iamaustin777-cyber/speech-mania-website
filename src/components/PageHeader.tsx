import type { ReactNode } from "react";
import { Spotlight } from "./Spotlight";

/** Inner-page opener: one spotlight on a dark stage, a plain headline, one line of context. */
export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Spotlight follow intro />
      <div className="relative mx-auto flex min-h-[60svh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-32 sm:px-10 lg:px-16 lg:pb-20">
        <h1 className="heading fade-up text-[clamp(3.5rem,8.5vw,9rem)]" style={{ ["--d" as string]: "0.4s" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="fade-up mt-6 max-w-[56ch] text-lg leading-relaxed sm:text-xl" style={{ ["--d" as string]: "0.7s" }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
      <div aria-hidden className="stage-floor" />
    </section>
  );
}

/** "Act I" marker that stages each program as an act. */
export function ActLabel({ n }: { n: string }) {
  return <p className="meta text-gold">Act {n}</p>;
}
