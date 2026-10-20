import Image from "next/image";
import { home } from "@/lib/content";

function Logos({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
      {home.partners.map((p) => (
        <li
          key={p.name}
          className="group/logo grid h-24 w-44 shrink-0 place-items-center rounded-2xl bg-ink/[0.92] p-4 opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 sm:h-28 sm:w-56"
        >
          <Image
            src={p.src}
            alt={hidden ? "" : p.name}
            width={p.w}
            height={p.h}
            sizes="224px"
            className="h-full w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

/** "Trusted By" logos sliding across in monochrome; hover brings back the color. */
export function LogoMarquee() {
  return (
    <section aria-labelledby="trusted-title" className="py-24">
      <h2 id="trusted-title" className="meta mb-8 text-center">
        Trusted By
      </h2>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max">
          <Logos />
          <Logos hidden />
        </div>
      </div>
    </section>
  );
}
