import type { Metadata } from "next";
import Image from "next/image";
import { MicCta } from "@/components/MicCta";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Scoreboard } from "@/components/Scoreboard";
import { SectionHeading } from "@/components/SectionHeading";
import { Waveform } from "@/components/Waveform";
import { gallery, impact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "35+ schools, 3 countries, 500+ students and a WIDPSC 2025 finalist — the impact of Speech Mania across Southeast Asia.",
};

// Walk the path forward in time: 2023 → 2024 → 2025.
const timeline = [...impact.timeline].reverse();

export default function ImpactPage() {
  return (
    <>
      <PageHeader eyebrow="The Results" title={impact.title} subtitle={impact.subtitle} />

      <section aria-labelledby="numbers-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading id="numbers-title" eyebrow="Scoreboard" title={impact.numbersTitle} subtitle={impact.numbersSubtitle} />
        <div className="mt-14">
          <Scoreboard stats={impact.stats} />
        </div>
      </section>

      {/* Success stories: pull-quotes over a live waveform */}
      <section aria-labelledby="stories-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading id="stories-title" eyebrow="In Their Words" title={impact.storiesTitle} subtitle={impact.storiesSubtitle} />
        <div className="mt-16 flex flex-col gap-24">
          {impact.stories.map((s, i) => (
            <Reveal key={s.name}>
              <figure className={`relative grid gap-10 lg:gap-16 ${i % 2 ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : "lg:grid-cols-[18rem_minmax(0,1fr)]"}`}>
                <Waveform
                  className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-48 w-full -translate-y-1/2 opacity-[0.12]"
                  color={i % 2 ? "#ffd27a" : "#d7262e"}
                  count={90}
                />
                <div className={`flex flex-col gap-5 ${i % 2 ? "lg:order-last" : ""}`}>
                  <div className="relative aspect-square w-48 overflow-hidden rounded-full border-2 border-gold/50 shadow-[0_0_60px_-10px_rgb(255_210_122/0.4)] lg:w-full">
                    <Image src={s.img.src} alt={s.img.alt} fill sizes="(min-width:1024px) 18rem, 12rem" className="object-cover" />
                  </div>
                  <figcaption>
                    <p className="display text-3xl">{s.name}</p>
                    <p className="mt-2 text-sm font-semibold text-red-text">{s.title}</p>
                    <p className="mt-1 text-sm">{s.school}</p>
                  </figcaption>
                </div>
                <blockquote className="relative">
                  <span aria-hidden className="absolute -left-2 -top-16 font-display text-[10rem] leading-none text-red/40">
                    &ldquo;
                  </span>
                  <p className="relative text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">{s.quote}</p>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements: a stage-lit path */}
      <section aria-labelledby="achievements-title" className="relative border-y border-line bg-hall/50 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="achievements-title" eyebrow="The Path" title={impact.achievementsTitle} subtitle={impact.achievementsSubtitle} />
          <div className="relative mt-16 ml-3 sm:ml-6">
            <span aria-hidden className="absolute -left-px top-0 h-full w-0.5 bg-gradient-to-b from-ink/10 via-gold/60 to-gold" />
            <ol>
            {timeline.map((t, i) => {
              const latest = i === timeline.length - 1;
              return (
                <Reveal as="li" key={t.year} className="relative pb-16 pl-10 last:pb-0 sm:pl-16">
                  <span
                    aria-hidden
                    className={`absolute -left-[9px] top-3 size-4 rounded-full ${latest ? "bg-gold shadow-[0_0_0_6px_rgb(255_210_122/0.2),0_0_40px_rgb(255_210_122/0.8)]" : "border-2 border-gold/70 bg-void"}`}
                  />
                  <p className={`display text-7xl sm:text-8xl ${latest ? "text-gold" : "text-ink/35"}`}>{t.year}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink">{t.title}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {t.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
            </ol>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading id="gallery-title" eyebrow="Backstage" title={impact.galleryTitle} subtitle={impact.gallerySubtitle} />
        <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((img, i) => (
            <li key={img.src} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-ink/10">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="w-full brightness-75 saturate-[0.85] transition duration-700 ease-stage group-hover:scale-105 group-hover:brightness-100"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
              <span aria-hidden className="absolute bottom-3 left-4 font-display text-sm tracking-widest text-ink/60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <MicCta title={impact.cta.title} body={impact.cta.body} />
    </>
  );
}
