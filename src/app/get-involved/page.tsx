import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { DownloadIcon } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { PathPicker } from "@/components/PathPicker";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { getInvolved, PLACEHOLDER_PDF } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Register for a Speech Mania workshop, partner with us as a school, sponsor our mission, or download free public speaking resources.",
};

export default function GetInvolvedPage() {
  const { registration, sponsor, resources } = getInvolved;
  return (
    <>
      <PageHeader title={getInvolved.title} subtitle={getInvolved.subtitle} />

      <section aria-labelledby="paths-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 id="paths-title" className="sr-only">
            Ways to get involved
          </h2>
          <p className="text-xl leading-relaxed text-ink">{getInvolved.intro}</p>
        </Reveal>
        <div className="mt-12">
          <PathPicker />
        </div>
      </section>

      {/* Registration on a dark glass panel */}
      <section id="register" aria-labelledby="register-title" className="relative isolate overflow-hidden py-24 lg:py-32">
        <Spotlight className="opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <SectionHeading id="register-title" title={registration.title} subtitle={registration.subtitle} />
          <Reveal className="glass rounded-2xl p-6 sm:p-10">
            <RegistrationForm />
          </Reveal>
        </div>
      </section>

      {/* Sponsorship */}
      <section id="sponsor" aria-labelledby="sponsor-title" className="border-y border-line bg-hall/50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="sponsor-title" title={sponsor.title} subtitle={sponsor.subtitle} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {sponsor.options.map((o, i) => (
              <li key={o.title} className="group relative isolate bg-void p-8 transition-colors duration-500 hover:bg-hall sm:p-10">
                <span aria-hidden className="spotlight -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-70" />
                <span className="meta text-gold">0{i + 1}</span>
                <h3 className="heading mt-3 text-2xl">{o.title}</h3>
                <p className="mt-4 leading-relaxed">{o.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-4">
            {/* TODO: link the sponsorship package PDF once it exists. */}
            <ButtonLink href={PLACEHOLDER_PDF} variant="light" icon="download">
              Download Sponsorship Package
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Schedule a Meeting
            </ButtonLink>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <h3 className="heading text-2xl">{sponsor.impactTitle}</h3>
              <dl className="mt-6 flex flex-col divide-y divide-line">
                {sponsor.impact.map((s) => (
                  <div key={s.value} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="order-2 sm:text-right">{s.label}</dt>
                    <dd className="heading order-1 text-4xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Reveal>
              <figure className="relative rounded-2xl border border-gold/25 bg-void/60 p-8 sm:p-12">
                <blockquote>
                  <p className="text-xl leading-relaxed text-ink sm:text-[1.375rem]">&ldquo;{sponsor.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 text-gold">{sponsor.quoteBy}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Free resources as download cards */}
      <section id="resources" aria-labelledby="resources-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading id="resources-title" title={resources.title} subtitle={resources.subtitle} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {resources.items.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col gap-5 rounded-2xl border border-ink/10 bg-hall/50 p-7 transition-colors duration-300 hover:border-ink/25 sm:p-8">
                <div className="flex-1">
                  <p className="meta">PDF</p>
                  <h3 className="heading mt-2 text-2xl">{r.title}</h3>
                  <p className="mt-3 leading-relaxed">{r.body}</p>
                </div>
                {/* TODO: point to the real PDF (e.g. /files/...); no file in the repo yet. */}
                <a
                  href={PLACEHOLDER_PDF}
                  className="inline-flex w-fit items-center gap-2 font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  <DownloadIcon aria-hidden className="size-4" />
                  Download PDF
                  <span className="sr-only">: {r.title}</span>
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
