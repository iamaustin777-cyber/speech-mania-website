import type { Metadata } from "next";
import Image from "next/image";
import { MicCta } from "@/components/MicCta";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { Waveform } from "@/components/Waveform";
import { about, images } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Speech Mania is a youth-led organization running public speaking and leadership programs for students across Thailand and Southeast Asia.",
};

export default function AboutPage() {
  return (
    <>
      {/* Opening line: the founder's quote, alone under the light */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden">
        <div aria-hidden className="curtain curtain-left" />
        <div aria-hidden className="curtain curtain-right" />
        <Spotlight follow intro />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-36 text-center sm:px-6">
          <h1 className="eyebrow fade-up" style={{ ["--d" as string]: "0.5s" }}>
            About Speech Mania
          </h1>
          <figure className="mt-10">
            <blockquote>
              <p className="heading fade-up text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.08]" style={{ ["--d" as string]: "0.9s" }}>
                <span aria-hidden className="text-red">&ldquo;</span>
                {about.quote}
                <span aria-hidden className="text-red">&rdquo;</span>
              </p>
            </blockquote>
            <figcaption className="fade-up mt-10 text-gold" style={{ ["--d" as string]: "1.5s" }}>
              {about.quoteBy}
            </figcaption>
          </figure>
        </div>
        <div aria-hidden className="stage-floor" />
      </section>

      {/* Who we are: copy on the left rail, photos staged in overlapping frames */}
      <section aria-labelledby="who-title" className="mx-auto grid max-w-[1400px] gap-16 px-5 py-28 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-16 lg:py-44">
        <div>
          <SectionHeading id="who-title" title="Who We Are" />
          <div className="mt-10 flex flex-col gap-6 text-lg leading-relaxed">
            {about.whoWeAre.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-xl text-ink" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative min-h-[34rem] sm:min-h-[40rem]">
          <div className="absolute right-0 top-0 w-[64%] overflow-hidden rounded-2xl border border-ink/10 shadow-2xl">
            <Image src={images.aboutTeam.src} alt={images.aboutTeam.alt} width={images.aboutTeam.w} height={images.aboutTeam.h} sizes="(min-width:1024px) 32vw, 64vw" className="stage-photo aspect-[3/4] w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-[62%] overflow-hidden rounded-2xl border border-ink/10 shadow-[0_30px_80px_rgb(0_0_0/0.7)]">
            <Image src={images.aboutWorkshop.src} alt={images.aboutWorkshop.alt} width={images.aboutWorkshop.w} height={images.aboutWorkshop.h} sizes="(min-width:1024px) 30vw, 62vw" className="stage-photo aspect-[4/3] w-full object-cover" />
          </div>
          <div aria-hidden className="absolute -left-10 top-10 -z-10 size-72 rounded-full bg-red/20 blur-3xl" />
        </Reveal>
      </section>

      {/* Mission statement as a single delivered line */}
      <section aria-labelledby="mission-title" className="relative overflow-hidden border-y border-line bg-hall/60 py-28 lg:py-44">
        <Waveform variant="line" className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-30" speed="24s" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 id="mission-title" className="eyebrow">
            Our Mission
          </h2>
          <Reveal>
            <p className="heading mt-8 text-3xl leading-snug sm:text-4xl lg:text-[2.75rem]">{about.mission}</p>
          </Reveal>
        </div>
      </section>

      {/* Why speech matters: scenes that stack like cards being dealt on stage */}
      <section aria-labelledby="matters-title" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10 lg:px-16 lg:py-44">
        <SectionHeading id="matters-title" title={about.matters.title} subtitle={about.matters.subtitle} />
        <ol className="mt-16 flex flex-col gap-8">
          {about.matters.items.map((item, i) => (
            <li
              key={item.title}
              className="sticky overflow-hidden rounded-2xl border border-ink/10 bg-hall shadow-[0_-20px_60px_rgb(0_0_0/0.6)]"
              style={{ top: `${6 + i * 1.5}rem` }}
            >
              <div className="relative isolate grid min-h-[30rem] items-end p-6 sm:p-10 lg:min-h-[34rem] lg:p-14">
                <Image src={item.img.src} alt={item.img.alt} fill sizes="100vw" className="-z-20 object-cover opacity-40" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/85 to-void/20" />
                <div className="max-w-2xl">
                  <p className="meta mb-3 text-gold">0{i + 1}</p>
                  <h3 className="heading text-3xl sm:text-5xl">{item.title}</h3>
                  <p className="mt-6 text-lg leading-relaxed text-ink/80">{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Team as speaker cards with dramatic side light */}
      <section aria-labelledby="team-title" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10 lg:px-16">
        <SectionHeading id="team-title" title={about.team.title} subtitle={about.team.subtitle} />
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {about.team.members.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.08} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-hall">
                <Image
                  src={m.img.src}
                  alt={`${m.name} headshot`}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover object-top grayscale-[0.35] transition duration-700 ease-stage group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                {/* side lighting: plain gradients, no blend modes (cheaper to scroll past) */}
                <div
                  aria-hidden
                  className={`absolute inset-0 ${i % 2 ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-transparent via-transparent to-void/80`}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void to-transparent" />
              </div>
              <h3 className="heading mt-5 text-2xl">{m.name}</h3>
              <p className="mt-1 text-red-text">{m.role}</p>
              <p className="mt-3 leading-relaxed">{m.bio}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <MicCta title={about.cta.title} body={about.cta.body} button="Get in Touch" href="/contact" />
    </>
  );
}
