import { Reveal } from "./Reveal";

/** Headline stacked over a short paragraph. Eyebrows are optional and used sparingly. */
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
  const center = align === "center";
  return (
    <Reveal className={`flex flex-col gap-4 ${center ? "items-center text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className="heading max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
        {title}
      </H>
      {subtitle && <p className={`max-w-[60ch] text-lg leading-relaxed text-mute ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </Reveal>
  );
}
