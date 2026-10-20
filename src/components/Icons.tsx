// Small inline icon set (stroke icons, inherit currentColor).
import type { SVGProps } from "react";

const S = (p: SVGProps<SVGSVGElement>) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p} />
);

export const MicIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
  </S>
);
export const MailIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </S>
);
export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <path d="M5 3.5h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.5 1.5V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
  </S>
);
export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </S>
);
export const ClockIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
);
export const DownloadIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M4 19.5h16" />
  </S>
);
export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </S>
);
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </S>
);
export const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H8.6v3h2.7V21" />
  </S>
);
export const LinkedinIcon = (p: SVGProps<SVGSVGElement>) => (
  <S {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M8 10.5V16M8 7.6v.1M11.5 16v-3.2c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3V16M11.5 10.5V16" />
  </S>
);
