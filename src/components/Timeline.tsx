"use client";

import { motion } from "framer-motion";

type Milestone = { year: string; title: string; items: string[] };

/**
 * A real timeline (after the GDG DVC "Road to Hackathon Day"): milestones on one axis,
 * the axis draws itself left to right when it scrolls into view, nodes light up in turn,
 * and the latest year is the highlighted one. Vertical on small screens.
 */
export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const last = milestones.length - 1;
  return (
    <div className="relative mt-16 lg:mt-24">
      {/* axis: vertical on mobile, horizontal on desktop; scaleX/scaleY only (compositor) */}
      <div aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-ink/12 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto" />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-gold/30 to-gold lg:hidden"
        initial={{ transform: "scaleY(0)" }}
        whileInView={{ transform: "scaleY(1)" }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-gold/25 to-gold lg:block"
        initial={{ transform: "scaleX(0)" }}
        whileInView={{ transform: "scaleX(1)" }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <ol className="grid gap-14 lg:grid-cols-3 lg:gap-10">
        {milestones.map((m, i) => {
          const latest = i === last;
          return (
            <motion.li
              key={m.year}
              className="relative pl-10 lg:pl-0 lg:pt-14"
              initial={{ opacity: 0, transform: "translateY(16px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                aria-hidden
                className={`absolute left-0 top-2 size-[15px] rounded-full lg:top-0 ${
                  latest ? "bg-gold shadow-[0_0_0_6px_rgb(231_223_211/0.16)]" : "border-2 border-gold/70 bg-void"
                }`}
              />
              <p className="meta">{latest ? "Latest" : i === 0 ? "Start" : " "}</p>
              <p className={`display mt-2 select-none text-[clamp(3.5rem,6vw,5.5rem)] tabular-nums ${latest ? "text-gold" : "text-ink/45"}`}>{m.year}</p>
              <h3 className="heading mt-3 text-2xl">{m.title}</h3>
              <ul className="mt-5 flex flex-col gap-2.5">
                {m.items.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
