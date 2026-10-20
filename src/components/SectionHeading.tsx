import { Reveal } from "./Reveal";

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
    <Reveal className={`flex flex-col gap-5 ${center ? "items-center text-center" : ""}`}>
      {eyebrow && (
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-gold/70" />
          {eyebrow}
        </p>
      )}
      <H id={id} className="display text-5xl sm:text-7xl lg:text-8xl">
        {title}
      </H>
      {subtitle && <p className={`max-w-2xl text-lg leading-relaxed text-mute ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
    </Reveal>
  );
}
