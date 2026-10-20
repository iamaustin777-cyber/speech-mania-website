"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { home } from "@/lib/content";

/**
 * Programs as "stage panels". Desktop: the section pins and vertical scroll slides
 * the panels sideways. Mobile / tablet: panels simply stack.
 */
export function ProgramStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const track = trackRef.current;
      setDistance(mq.matches && track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const pinned = distance > 0;

  // Keyboard users: tabbing into an off-screen panel scrolls the page to reveal it.
  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (!pinned || !sectionRef.current) return;
    e.currentTarget.parentElement?.parentElement?.scrollTo({ left: 0 });
    const left = e.currentTarget.offsetLeft - 64;
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + Math.min(distance, Math.max(0, left)) });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="programs-title"
      className="relative"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen items-center overflow-hidden" : "py-24"}>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className="flex flex-col gap-6 px-4 sm:px-6 lg:w-max lg:flex-row lg:items-stretch lg:gap-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {/* Intro panel */}
          <div className="flex flex-col justify-end gap-6 pb-6 lg:w-[30rem] lg:pb-0 lg:pr-8">
            <h2 id="programs-title" className="heading text-5xl sm:text-6xl">
              {home.programs.title}
            </h2>
            <p className="max-w-md text-lg leading-relaxed">{home.programs.subtitle}</p>
          </div>

          {home.programs.items.map((p, i) => (
            <article
              key={p.title}
              onFocus={onFocus}
              className="group relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-2xl border border-ink/10 p-6 sm:p-10 lg:h-[72vh] lg:max-h-[46rem] lg:w-[min(64vw,52rem)]"
            >
              <Image
                src={p.img.src}
                alt={p.img.alt}
                fill
                sizes="(min-width: 1024px) 64vw, 100vw"
                className="-z-20 object-cover opacity-55 transition duration-700 ease-stage group-hover:scale-[1.04] group-hover:opacity-70"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/70 to-void/10" />
              <div
                aria-hidden
                className="spotlight -z-10 opacity-40 transition-opacity duration-700 group-hover:opacity-90"
              />

              <p className="meta mb-3 text-gold">
                0{i + 1}
                {p.tag && <span className="text-mute"> / {p.tag}</span>}
              </p>
              <h3 className="heading text-4xl sm:text-5xl">{p.title}</h3>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/80">{p.body}</p>
              <div className="mt-8">
                <ButtonLink href={p.href} variant="secondary" aria-label={`Learn more about ${p.title}`}>
                  Learn More
                </ButtonLink>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
