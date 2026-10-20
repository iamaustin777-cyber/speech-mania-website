import { GooeyButton } from "./Gooey";
import { MicIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";
import { REGISTER_HREF } from "@/lib/content";

export function MicCta({
  title,
  body,
  button = "Get Started Today",
  href = REGISTER_HREF,
}: {
  title: string;
  body: string;
  button?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      <Spotlight className="opacity-80" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <MicIcon aria-hidden weight="light" className="mic-glow size-20 text-gold" />
        <p className="display mt-8 text-[clamp(2.75rem,7vw,6.5rem)]">
          Step up to <span className="text-red">the mic</span>
        </p>
        <h2 id="cta-title" className="heading mt-8 text-2xl sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed">{body}</p>
        <GooeyButton href={href} className="mt-8">
          {button}
        </GooeyButton>
      </Reveal>
      <div aria-hidden className="stage-floor" />
    </section>
  );
}
