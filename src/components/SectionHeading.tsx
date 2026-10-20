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
  // Split into two columns only when the heading's own container is wide enough
  // (container query, not viewport), so it never collides when placed in a narrow column.
  return (
    <div className="@container">
      <Reveal className="grid gap-6 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] @4xl:items-end @4xl:gap-12">
        <div>
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <H id={id} className="heading text-[clamp(2.75rem,5vw,5.75rem)] @4xl:max-w-[16ch]">
            {title}
          </H>
        </div>
        {subtitle && <p className="max-w-[56ch] text-lg leading-relaxed text-mute @4xl:pb-2">{subtitle}</p>}
      </Reveal>
    </div>
  );
}
