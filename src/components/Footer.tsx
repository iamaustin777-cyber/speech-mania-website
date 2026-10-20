import Image from "next/image";
import Link from "next/link";
import { contact, footer, images } from "@/lib/content";
import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { Waveform } from "./Waveform";

// TODO: replace "#" with the real social media URLs.
const socials = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-medium text-ink">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-mute transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 bg-[#03050b]">
      <Waveform variant="line" className="-mt-7" speed="20s" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div className="flex flex-col gap-6">
          <Image src={images.logo.src} alt={images.logo.alt} width={images.logo.w} height={images.logo.h} className="h-12 w-auto self-start" />
          <p className="max-w-xs leading-relaxed">{footer.tagline}</p>
          <ul className="flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-lg border border-ink/15 text-mute transition-colors hover:border-ink/40 hover:text-ink"
                >
                  <Icon aria-hidden className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Column title="Quick Links" links={footer.quickLinks} />
        <Column title="Get Involved" links={footer.getInvolved} />
        <div>
          <h2 className="mb-4 text-sm font-medium text-ink">Contact Us</h2>
          {/* TODO: confirm contact details (see lib/content.ts) */}
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3">
              <MailIcon aria-hidden className="mt-0.5 size-5 shrink-0" />
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-ink">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <PhoneIcon aria-hidden className="mt-0.5 size-5 shrink-0" />
              <span>
                {contact.phone} <span className="text-sm opacity-80">{contact.phoneNote}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon aria-hidden className="mt-0.5 size-5 shrink-0" />
              <span>{contact.location}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{footer.copyright}</p>
          <ul className="flex gap-6">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
