import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { Faq } from "@/components/Faq";
import { ContactForm } from "@/components/forms/ContactForm";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/Spotlight";
import { contact, contactPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Speech Mania — questions about programs, school partnerships, sponsorship or media.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="The Floor Is Yours" title={contactPage.title} subtitle={contactPage.subtitle} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:px-8">
        <Reveal className="glass rounded-3xl p-6 sm:p-10">
          <h2 className="display mb-8 text-4xl sm:text-5xl">{contactPage.formTitle}</h2>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-8 rounded-3xl border border-line bg-hall/40 p-6 sm:p-10">
          <div>
            <h2 className="display text-4xl sm:text-5xl">{contactPage.touchTitle}</h2>
            <p className="mt-4 leading-relaxed">{contactPage.touchBody}</p>
          </div>
          {/* TODO: confirm contact details (see lib/content.ts) */}
          <ul className="flex flex-col gap-6">
            <li className="flex gap-4">
              <MailIcon className="mt-1 size-5 shrink-0 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Email</p>
                <a href={`mailto:${contact.email}`} className="break-all text-ink hover:text-gold">
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <PhoneIcon className="mt-1 size-5 shrink-0 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Phone</p>
                <p className="text-ink">
                  {contact.phone} <span className="text-sm text-mute">{contact.phoneNote}</span>
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <PinIcon className="mt-1 size-5 shrink-0 text-gold" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Location</p>
                <p className="text-ink">{contact.location}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <ClockIcon className="mt-1 size-5 shrink-0 text-gold" />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Office Hours</p>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-ink">
                  {contact.hours.map(([d, h]) => (
                    <div key={d} className="contents">
                      <dt className="text-mute">{d}:</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </li>
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="faq-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading id="faq-title" eyebrow="Q & A" title={contactPage.faqTitle} subtitle={contactPage.faqSubtitle} />
        <div className="mt-14">
          <Faq />
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-24 text-center sm:px-6">
        <Spotlight className="opacity-80" />
        <Reveal className="relative flex flex-col items-center gap-8">
          <h2 className="display text-5xl sm:text-7xl">{contactPage.bottom}</h2>
          <ButtonLink href={`mailto:${contact.email}`} className="glow-pulse px-8 py-4">
            Contact Us Directly
          </ButtonLink>
        </Reveal>
        <div aria-hidden className="stage-floor" />
      </section>
    </>
  );
}
