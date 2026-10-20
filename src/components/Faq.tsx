"use client";

import { useId, useState } from "react";
import { PlusIcon } from "./Icons";
import { contactPage } from "@/lib/content";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="border-b border-line">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-a`}
          id={`${id}-q`}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-ink transition-colors hover:text-gold"
        >
          {q}
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition duration-300 ${
              open ? "rotate-45 border-gold bg-gold text-void" : "border-ink/20"
            }`}
          >
            <PlusIcon className="size-4" />
          </span>
        </button>
      </h4>
      {/* grid-rows trick animates height without measuring */}
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-500 ease-stage ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="max-w-3xl pb-6 leading-relaxed">{a}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
      {contactPage.faq.map((g) => (
        <section key={g.group} aria-label={g.group}>
          <h3 className="eyebrow mb-2">{g.group}</h3>
          <ul>
            {g.items.map((it) => (
              <Item key={it.q} {...it} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
