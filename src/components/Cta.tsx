import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Call-to-action links.
 *   primary: red pill; the arrow in its round badge slides out and a new one slides in on hover.
 *   link:    no box, text plus arrow, underline draws in from the left on hover.
 * Pure CSS (transform/opacity only), works without JavaScript.
 */
export function Cta({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: "primary" | "link";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  if (variant === "link") {
    return (
      <Link href={href} className={`cta-link ${className}`} {...rest}>
        <span className="cta-link__text">{children}</span>
        <ArrowRight aria-hidden weight="bold" className="cta-link__arrow" />
      </Link>
    );
  }
  return (
    <Link href={href} className={`cta-primary cta-primary--${size} ${className}`} {...rest}>
      <span>{children}</span>
      <span aria-hidden className="cta-primary__badge">
        <ArrowRight weight="bold" className="cta-primary__arrow" />
        <ArrowRight weight="bold" className="cta-primary__arrow cta-primary__arrow--next" />
      </span>
    </Link>
  );
}
