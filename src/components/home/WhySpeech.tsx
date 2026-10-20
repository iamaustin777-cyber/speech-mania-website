"use client";

import { motion } from "framer-motion";
import { home } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

/** Three statements that light up one by one as they scroll up the screen, like lines being delivered. */
export function WhySpeech() {
  return (
    <section aria-labelledby="why-title" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-40">
      <SectionHeading id="why-title" title={home.why.title} subtitle={home.why.subtitle} />
      <ol className="mt-20 flex flex-col gap-16 lg:mt-28 lg:gap-24">
        {home.why.items.map((item, i) => (
          <motion.li
            key={item.title}
            className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-10"
            initial={{ opacity: 0.16 }}
            whileInView={{ opacity: 1 }}
            // Lights up once the line rises past ~60% of the screen height.
            viewport={{ once: true, margin: "0px 0px -40% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="meta text-red-text lg:pb-4">0{i + 1}</span>
            <h3 className="heading text-[clamp(2.75rem,7vw,6.5rem)]">{item.title}</h3>
            <p className="max-w-md text-lg leading-relaxed lg:pb-4">{item.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
