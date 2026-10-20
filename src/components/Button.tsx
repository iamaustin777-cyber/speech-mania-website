import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Shape rule: buttons are 8px radius, cards are 16px.
type Variant = "primary" | "secondary" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[0.9375rem] font-medium leading-none transition-colors duration-200 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-red text-ink hover:bg-[#e3343c]",
  secondary: "border border-ink/15 bg-ink/[0.04] text-ink hover:border-ink/30 hover:bg-ink/[0.08]",
  light: "bg-ink text-void hover:bg-white",
};

/** Optional trailing icon: "external" for off-page links, "download" for files. */
type Icon = "external" | "download";
const icons = { external: ArrowUpRight, download: DownloadSimple };

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; icon?: Icon; className?: string } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const Glyph = icon ? icons[icon] : null;
  const inner = (
    <>
      {children}
      {Glyph && <Glyph aria-hidden size={16} weight="bold" />}
    </>
  );
  // Plain <a> for mailto/placeholder links; Next <Link> for internal routes.
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`} {...rest}>
      {children}
    </button>
  );
}
