import fs from "node:fs";
import path from "node:path";
import { EventSentence } from "@/components/home/EventSentence";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { ProgramStage } from "@/components/home/ProgramStage";
import { WhySpeech } from "@/components/home/WhySpeech";
import { MicCta } from "@/components/MicCta";
import { Scoreboard } from "@/components/Scoreboard";
import { SectionHeading } from "@/components/SectionHeading";
import { TipscTicket } from "@/components/TipscTicket";
import { Waveform } from "@/components/Waveform";
import { home } from "@/lib/content";

// Drop a muted loop at public/hero.mp4 and rebuild: the hero switches to video automatically.
const hasHeroVideo = fs.existsSync(path.join(process.cwd(), "public", "hero.mp4"));

export default function HomePage() {
  return (
    <>
      <Hero hasVideo={hasHeroVideo} />

      <section aria-labelledby="impact-title" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading id="impact-title" title={home.impact.title} subtitle={home.impact.subtitle} />
        <div className="mt-14">
          <Scoreboard stats={home.impact.stats} />
        </div>
      </section>

      <EventSentence />

      <Waveform variant="line" />

      <WhySpeech />

      <section aria-label="Featured event" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TipscTicket />
      </section>

      <ProgramStage />

      <LogoMarquee />

      <MicCta title={home.cta.title} body={home.cta.body} />
    </>
  );
}
