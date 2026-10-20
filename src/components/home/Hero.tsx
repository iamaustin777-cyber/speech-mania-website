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
        <h1 id="hero-title" className="display text-[clamp(3.2rem,9.5vw,9.75rem)] leading-[0.88]">
          <Spoken text={line1} start={0} />
          <Spoken text={line2} start={line1Words + 0.6} className="text-red" />
        </h1>

        <Waveform
          className="fade-up mt-8 h-12 w-full max-w-xl sm:h-14"
          style={{ ["--d" as string]: "1.9s" }}
          color="linear-gradient(180deg, #ffd27a, #d7262e)"
          count={64}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="fade-up max-w-xl" style={{ ["--d" as string]: "2.2s" }}>
            <p className="text-lg leading-relaxed text-mute">{body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={REGISTER_HREF}>Join a Workshop</ButtonLink>
              <ButtonLink href="/programs" variant="secondary">
                Explore Programs
              </ButtonLink>
            </div>
          </div>

          <p className="fade-up flex items-baseline gap-3 border-l border-gold/50 pl-4" style={{ ["--d" as string]: "2.5s" }}>
            <span className="heading text-4xl text-gold">{badge.value}</span>
            <span className="text-ink">{badge.label}</span>
          </p>
        </div>
      </div>

      <div aria-hidden className="stage-floor" />
    </section>
  );
}
