import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "gold";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition duration-300 ease-stage";

const variants: Record<Variant, string> = {
  primary:
    "bg-red text-ink shadow-[0_0_24px_rgb(215_38_46/0.35)] hover:bg-[#e8343c] hover:shadow-[0_0_40px_rgb(215_38_46/0.65)]",
  ghost:
    "border border-ink/25 text-ink hover:border-gold/70 hover:text-gold hover:shadow-[0_0_30px_rgb(255_210_122/0.18)]",
  gold: "bg-gold text-void hover:shadow-[0_0_40px_rgb(255_210_122/0.5)]",
};

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Arrow />}
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
