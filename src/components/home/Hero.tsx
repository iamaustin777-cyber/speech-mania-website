import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { Spotlight } from "@/components/Spotlight";
import { Waveform } from "@/components/Waveform";
import { home, images, REGISTER_HREF } from "@/lib/content";

function Spoken({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="speak-word mr-[0.22em] last:mr-0" style={{ ["--i" as string]: start + i }}>
          {word}
        </span>
      ))}
    </span>
  );
}

/**
 * "You just walked onto a stage": dark room → spotlight → the headline is spoken word by word.
 * Drop a muted loop at public/hero.mp4 and it replaces the still photo (photo stays as poster).
 */
export function Hero({ hasVideo }: { hasVideo: boolean }) {
  const { line1, line2, body, badge } = home.hero;
  const line1Words = line1.split(" ").length;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Backdrop: stage photo (or video) pushed far into the dark */}
      <div className="absolute inset-0 -z-10">
        {hasVideo ? (
          <video
            className="size-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            poster={images.hero.src}
            aria-hidden
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.22] grayscale-[0.5]"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,transparent,var(--color-void)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div aria-hidden className="curtain curtain-left" />
      <div aria-hidden className="curtain curtain-right" />
      <Spotlight follow intro />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <p className="eyebrow fade-up mb-6 flex items-center gap-3" style={{ ["--d" as string]: "0.6s" }}>
          <span aria-hidden className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-red" />
          </span>
          Speech Mania · Thailand &amp; Southeast Asia
        </p>

        <h1 id="hero-title" className="display text-[clamp(3.4rem,11vw,11.5rem)] leading-[0.86]">
          <Spoken text={line1} start={0} />
          <Spoken text={line2} start={line1Words + 0.6} className="text-red" />
        </h1>

        <Waveform
          className="fade-up mt-8 h-12 w-full max-w-xl sm:h-14"
          style={{ ["--d" as string]: "1.9s" }}
          color="url(#hero-wave)"
          count={64}
        />
        <svg aria-hidden className="absolute size-0">
          <defs>
            <linearGradient id="hero-wave" x1="0" x2="1">
              <stop offset="0" stopColor="#d7262e" />
              <stop offset="0.5" stopColor="#ffd27a" />
              <stop offset="1" stopColor="#d7262e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="fade-up max-w-xl" style={{ ["--d" as string]: "2.2s" }}>
            <p className="text-lg leading-relaxed text-mute sm:text-xl">{body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={REGISTER_HREF}>Join a Workshop</ButtonLink>
              <ButtonLink href="/programs" variant="ghost">
                Explore Programs
              </ButtonLink>
            </div>
          </div>

          <div
            className="fade-up glass flex w-fit items-center gap-4 rounded-2xl px-6 py-4"
            style={{ ["--d" as string]: "2.5s" }}
          >
            <span className="display text-5xl text-gold">{badge.value}</span>
            <span className="text-xs font-semibold uppercase leading-tight tracking-[0.2em] text-ink">
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden className="stage-floor" />
    </section>
  );
}
