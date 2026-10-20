import Image from "next/image";
import Link from "next/link";
import { GooeyButton } from "@/components/Gooey";
import { ArrowIcon } from "@/components/Icons";
import { Waveform } from "@/components/Waveform";
import { home, images, REGISTER_HREF } from "@/lib/content";
import { StageLight } from "./StageLight";

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
 * First screen: a real photo from our events relit by a live stage light (WebGL),
 * the headline spoken word by word, and our most recent competition results.
 * Drop a muted loop at public/hero.mp4 and it replaces the lit photo.
 */
export function Hero({ hasVideo }: { hasVideo: boolean }) {
  const { line1, line2, body, recent } = home.hero;
  const line1Words = line1.split(" ").length;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-void">
      <div className="absolute inset-0 -z-10">
        {hasVideo ? (
          <video className="size-full object-cover opacity-40" autoPlay muted loop playsInline poster={images.hero.src} aria-hidden>
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <>
            {/* Fallback (and first paint) until the stage light has drawn its first frame */}
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[48%_62%] opacity-25 brightness-75"
            />
            <StageLight
              src={images.hero.src}
              imgW={images.hero.w}
              imgH={images.hero.h}
              focus={images.hero.focus}
              frame={images.hero.frame}
              className="absolute inset-0 size-full"
            />
          </>
        )}
        {/* Keep the nav and the copy readable over the lit photo */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-void/80 to-transparent" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-void/85 via-void/30 to-transparent md:block" />
        <div className="absolute inset-x-0 top-[34svh] bottom-0 bg-gradient-to-b from-transparent via-void/90 to-void md:top-auto md:h-2/5 md:via-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-[44svh] sm:px-6 md:pt-28 lg:px-8 lg:pb-14">
        <div className="max-w-3xl">
          <h1 id="hero-title" className="display text-[clamp(2.9rem,6.3vw,6.5rem)] leading-[0.9]">
            <Spoken text={line1} start={0} />
            <Spoken text={line2} start={line1Words + 0.6} className="text-red" />
          </h1>

          <Waveform
            className="fade-up mt-6 h-7 w-full max-w-[16rem] sm:h-9"
            style={{ ["--d" as string]: "1.9s" }}
            color="linear-gradient(180deg, #ffd27a, #d7262e)"
            count={40}
          />

          <div className="fade-up mt-6" style={{ ["--d" as string]: "2.1s" }}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink/85">{body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GooeyButton href={REGISTER_HREF}>Join a Workshop</GooeyButton>
              <GooeyButton href="/programs" variant="ghost" tone="light">
                Explore Programs
              </GooeyButton>
            </div>
          </div>
        </div>

        {/* Latest results */}
        <ul
          aria-label="Latest results"
          className="fade-up mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:mt-12"
          style={{ ["--d" as string]: "2.4s" }}
        >
          {recent.map((r) => (
            <li key={r.event} className="bg-void/80">
              <Link href={r.href} className="group flex h-full flex-col gap-1.5 p-5 transition-colors hover:bg-hall sm:p-6">
                <span className="meta">
                  <span className="text-gold">{r.event}</span> · {r.where}
                </span>
                <span className="heading mt-1 text-xl sm:text-2xl">{r.headline}</span>
                <span className="text-ink">{r.name}</span>
                <span className="flex items-end justify-between gap-4 text-sm leading-relaxed">
                  {r.detail}
                  <ArrowIcon aria-hidden className="mb-0.5 size-4 shrink-0 text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-right text-xs text-mute/70">{images.hero.credit}</p>
      </div>
    </section>
  );
}
