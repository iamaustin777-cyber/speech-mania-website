import type { Metadata } from "next";
import Image from "next/image";
import { MicCta } from "@/components/MicCta";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Scoreboard } from "@/components/Scoreboard";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { Waveform } from "@/components/Waveform";
import { gallery, impact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Speech Mania has reached 35+ schools and 500+ students in 3 countries, and coached a WIDPSC 2025 finalist.",
};

// Walk the path forward in time: 2023 → 2024 → 2025.
const timeline = [...impact.timeline].reverse();

export default function ImpactPage() {
  return (
    <>
      <PageHeader title={impact.title} subtitle={impact.subtitle} />

      <section aria-labelledby="numbers-title" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:px-16">
        <SectionHeading id="numbers-title" title={impact.numbersTitle} subtitle={impact.numbersSubtitle} />
        <div className="mt-14">
          <Scoreboard stats={impact.stats} size="md" />
        </div>
      </section>

      {/* Success stories: pull-quotes over a waveform */}
      <section aria-labelledby="stories-title" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10 lg:px-16 lg:py-44">
        <SectionHeading id="stories-title" title={impact.storiesTitle} subtitle={impact.storiesSubtitle} />
        <div className="mt-16 flex flex-col gap-24">
          {impact.stories.map((s, i) => (
            <Reveal key={s.name}>
              <figure className={`relative grid gap-10 lg:gap-16 ${i % 2 ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : "lg:grid-cols-[18rem_minmax(0,1fr)]"}`}>
                <Waveform
                  className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-48 w-full -translate-y-1/2 opacity-[0.12]"
                  color={i % 2 ? "#ffd27a" : "#d7262e"}
                  count={90}
                  still
                />
                <div className={`flex flex-col gap-5 ${i % 2 ? "lg:order-last" : ""}`}>
                  <div className="relative aspect-square w-40 overflow-hidden rounded-2xl lg:w-full">
                    <Image src={s.img.src} alt={s.img.alt} fill sizes="(min-width:1024px) 18rem, 12rem" className="object-cover object-[50%_30%]" />
                  </div>
                  <figcaption>
                    <p className="heading text-xl">{s.name}</p>
                    <p className="mt-1 text-sm text-red-text">{s.title}</p>
                    <p className="mt-1 text-sm">{s.school}</p>
                  </figcaption>
                </div>
                <blockquote className="relative">
                  <p className="relative text-xl leading-relaxed text-ink sm:text-[1.375rem] sm:leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements: one axis, 2023 to 2025 */}
      <section aria-labelledby="achievements-title" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10 lg:px-16 lg:py-44">
        <SectionHeading id="achievements-title" title={impact.achievementsTitle} subtitle={impact.achievementsSubtitle} />
        <Timeline milestones={timeline} />
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10 lg:px-16 lg:py-44">
        <SectionHeading id="gallery-title" title={impact.galleryTitle} subtitle={impact.gallerySubtitle} />
        <ul className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((img) => (
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
            </li>
          ))}
        </ul>
      </section>

      <MicCta title={impact.cta.title} body={impact.cta.body} />
    </>
  );
}
