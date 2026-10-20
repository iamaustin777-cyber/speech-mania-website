import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";
import { Waveform } from "./Waveform";
import { REGISTER_HREF } from "@/lib/content";

/** Stage-style mic on a stand, lit from above. */
function StageMic() {
  return (
    <svg aria-hidden viewBox="0 0 120 260" className="mic-glow h-44 w-auto sm:h-56">
      <defs>
        <linearGradient id="mic-head" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff3d6" />
          <stop offset="1" stopColor="#c9a25a" />
        </linearGradient>
        <pattern id="mic-mesh" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#05070f" opacity="0.55" />
        </pattern>
      </defs>
      <ellipse cx="60" cy="40" rx="30" ry="34" fill="url(#mic-head)" />
      <ellipse cx="60" cy="40" rx="30" ry="34" fill="url(#mic-mesh)" />
      <rect x="28" y="62" width="64" height="8" rx="3" fill="#d7262e" />
      <path d="M44 72h32l-6 62H50z" fill="#1b2240" stroke="#ffd27a" strokeOpacity="0.4" />
      <rect x="57" y="134" width="6" height="104" fill="#2a3256" />
      <ellipse cx="60" cy="244" rx="40" ry="8" fill="#141a33" stroke="#ffd27a" strokeOpacity="0.25" />
    </svg>
  );
}

export function MicCta({ title, body, button = "Get Started Today", href = REGISTER_HREF }: { title: string; body: string; button?: string; href?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden px-4 pb-10 pt-32 sm:px-6">
      <Spotlight className="opacity-90" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <StageMic />
          <p className="display mt-10 text-[clamp(3rem,8vw,8.5rem)]">
            Step up to <span className="text-red">the mic</span>
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 flex flex-col items-center gap-6">
          <h2 id="cta-title" className="text-2xl font-semibold text-ink sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed">{body}</p>
          <ButtonLink href={href} className="glow-pulse mt-2 px-8 py-4">
            {button}
          </ButtonLink>
        </Reveal>
        <Waveform className="mt-16 h-10 w-full max-w-md text-gold/50" count={48} />
      </div>
      <div aria-hidden className="stage-floor" />
    </section>
  );
}
