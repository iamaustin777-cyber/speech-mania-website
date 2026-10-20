import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { MicCta } from "@/components/MicCta";
import { ActLabel, PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TipscTicket } from "@/components/TipscTicket";
import { Waveform } from "@/components/Waveform";
import { images, programs, widpscResults } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Speech Mania runs national competitions, TIPSC 2025, training workshops and Team Thailand for WIDPSC.",
};

// Podium order: Semi-Finalist · Finalist · Semi-Finalist
const podium = [widpscResults[1], widpscResults[0], widpscResults[2]];

export default function ProgramsPage() {
  const { competitions, inPerson, training, team } = programs;
  return (
    <>
      <PageHeader title={programs.title} subtitle={programs.subtitle} />

      {/* Act I: National Competitions + TIPSC */}
      <section id="national-competitions" aria-labelledby="act1-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <ActLabel n="I" />
            <h2 id="act1-title" className="heading mt-3 text-4xl sm:text-6xl">
              {competitions.title}
            </h2>
            <p className="mt-8 text-lg leading-relaxed">{competitions.body}</p>
            <ol className="mt-8 flex flex-col">
              {competitions.points.map((p, i) => (
                <li key={p} className="flex items-baseline gap-4 py-2.5 text-ink">
                  <span className="meta text-red-text">{String(i + 1).padStart(2, "0")}</span>
                  {p}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="overflow-hidden rounded-2xl border border-ink/10">
              <Image src={images.competition.src} alt={images.competition.alt} width={images.competition.w} height={images.competition.h} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div aria-hidden className="absolute inset-x-0 -bottom-10 -z-10 h-40 rounded-full bg-gold/10 blur-3xl" />
          </Reveal>
        </div>

        <div id="tipsc" className="mt-28 scroll-mt-28">
          <TipscTicket full />
          <Reveal className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-[0_40px_100px_-30px_rgb(255_210_122/0.25)]">
              <Image src={images.tipscPoster.src} alt={images.tipscPoster.alt} width={images.tipscPoster.w} height={images.tipscPoster.h} sizes="(min-width:1024px) 56rem, 100vw" className="w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      <Waveform variant="line" />

      {/* Act II: In-Person Workshops (TBD) */}
      <section aria-labelledby="act2-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <ActLabel n="II" />
          <h2 id="act2-title" className="heading mt-3 text-4xl sm:text-6xl">
            {inPerson.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{inPerson.subtitle}</p>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {inPerson.cards.map((text, i) => {
            const img = i === 0 ? images.workshop1 : images.workshop2;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <article className="group relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-2xl border border-dashed border-ink/20 p-8">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="-z-20 object-cover opacity-30 blur-[1px] grayscale transition duration-700 group-hover:opacity-45" />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/80 to-void/30" />
                  <p className="meta mb-4 text-gold">Coming soon</p>
                  <p className="text-lg leading-relaxed text-ink/85">{text}</p>
                  <div className="mt-8">
                    {/* TODO: hook "Notify Me" up to a mailing list; for now it opens the contact page. */}
                    <ButtonLink href="/contact" variant="secondary">
                      Notify Me
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Act III: Training Workshops */}
      <section id="training" aria-labelledby="act3-title" className="relative isolate overflow-hidden border-y border-line bg-hall/50 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
          <Reveal>
            <ActLabel n="III" />
            <h2 id="act3-title" className="heading mt-3 text-4xl sm:text-6xl">
              {training.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed">{training.subtitle}</p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10">
              <Image src={images.training.src} alt={images.training.alt} width={images.training.w} height={images.training.h} sizes="(min-width:1024px) 40vw, 100vw" className="stage-photo aspect-[16/10] w-full object-cover" />
            </div>
          </Reveal>
          <ol className="flex flex-col justify-center gap-4">
            {training.courses.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.1}>
                <article className="relative overflow-hidden rounded-2xl border border-ink/10 bg-void/60 p-7 transition-colors duration-300 hover:border-ink/25 sm:p-8">
                  <p className="meta text-gold">{c.length}</p>
                  <h3 className="heading mt-3 text-2xl sm:text-3xl">{c.title}</h3>
                  <p className="mt-3 leading-relaxed">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Act IV: National Team Management + podium */}
      <section id="national-team" aria-labelledby="act4-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="max-w-4xl">
          <ActLabel n="IV" />
          <h2 id="act4-title" className="heading mt-3 text-4xl sm:text-6xl">
            {team.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed">{team.subtitle}</p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 rounded-2xl border border-line bg-hall/60 p-8 sm:p-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <h3 className="heading text-2xl text-gold sm:text-3xl">What is WIDPSC?</h3>
          <p className="text-lg leading-relaxed">{team.whatIs}</p>
        </Reveal>

        <h3 className="heading mt-24 text-center text-2xl sm:text-3xl">{team.achievementsTitle}</h3>
        <ol className="relative mt-12 grid items-end gap-6 md:grid-cols-3 md:gap-4">
          {podium.map((r, i) => {
            const winner = r.place === "Finalist";
            return (
              <Reveal
                as="li"
                key={r.name}
                delay={winner ? 0.25 : i * 0.1}
                className={winner ? "md:order-none order-first" : ""}
              >
                <div className="px-2 pb-6 text-center">
                  <p className={`meta ${winner ? "text-gold" : ""}`}>{r.category}</p>
                  <p className="heading mt-2 text-xl sm:text-2xl">{r.name}</p>
                </div>
                <div
                  className={`relative flex flex-col items-center justify-start rounded-t-2xl border-x border-t pt-6 ${
                    winner
                      ? "h-64 border-gold/60 bg-gradient-to-b from-gold/25 to-gold/[0.02] shadow-[0_-30px_80px_-20px_rgb(255_210_122/0.45)] md:h-80"
                      : "h-40 border-ink/15 bg-gradient-to-b from-ink/10 to-transparent md:h-52"
                  }`}
                >
                  <span className={`heading text-2xl sm:text-3xl ${winner ? "text-gold" : "text-ink"}`}>{r.place}</span>
                  {winner && <div aria-hidden className="spotlight -top-40 opacity-80" />}
                </div>
              </Reveal>
            );
          })}
        </ol>
        <div aria-hidden className="h-3 rounded-b-xl bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
      </section>

      <MicCta title={programs.cta.title} body={programs.cta.body} button="Explore Opportunities" href="/get-involved" />
    </>
  );
}
