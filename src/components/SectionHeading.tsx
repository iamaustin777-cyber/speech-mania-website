import { Reveal } from "./Reveal";

/**
 * Magazine-style section header (same structure as the GDG DVC site): a large title on
 * the left, the short description on the right aligned to its baseline. Stacks on mobile.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  id,
  as: H = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
}) {
  if (align === "center") {
    return (
      <Reveal className="flex flex-col items-center gap-5 text-center">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <H id={id} className="heading max-w-4xl text-[clamp(2.75rem,5vw,5.75rem)]">
          {title}
        </H>
        {subtitle && <p className="max-w-[56ch] text-lg leading-relaxed text-mute">{subtitle}</p>}
      </Reveal>
    );
  }
  return (
    <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-end lg:gap-12">
      <div>
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <H id={id} className="heading max-w-[16ch] text-[clamp(2.75rem,5vw,5.75rem)]">
          {title}
        </H>
      </div>
      {subtitle && <p className="text-lg leading-relaxed text-mute lg:pb-2">{subtitle}</p>}
    </Reveal>
  );
}
