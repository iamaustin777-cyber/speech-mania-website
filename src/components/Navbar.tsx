"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { images, nav, REGISTER_HREF } from "@/lib/content";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: lock scroll, Escape closes, keep Tab focus inside the menu.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menu) {
        const items = [toggleRef.current!, ...menu.querySelectorAll<HTMLElement>("a")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <div
        className={`transition-all duration-500 ease-stage ${
          solid ? "glass border-x-0 border-t-0 shadow-[0_10px_40px_rgb(0_0_0/0.45)]" : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" className="relative z-[61] shrink-0" aria-label="Speech Mania home">
            <Image src={images.logo.src} alt={images.logo.alt} width={images.logo.w} height={images.logo.h} priority className="h-9 w-auto lg:h-11" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-ink ${
                    isActive(item.href) ? "text-ink" : "text-mute"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={REGISTER_HREF}
              className="glow-pulse hidden rounded-full bg-red px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-[#e8343c] sm:inline-flex"
            >
              Register
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[61] grid size-11 place-items-center rounded-full border border-ink/20 text-ink lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-[60] overflow-y-auto bg-void/97 backdrop-blur-xl lg:hidden"
      >
        <div aria-hidden className="spotlight opacity-70" />
        <nav aria-label="Mobile" className="relative flex min-h-full flex-col justify-center px-6 pb-12 pt-28">
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <li key={item.href} className="fade-up" style={{ ["--d" as string]: `${i * 0.05}s` }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`display block py-2 text-5xl sm:text-6xl ${isActive(item.href) ? "!text-red" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={REGISTER_HREF}
            onClick={() => setOpen(false)}
            className="glow-pulse mt-10 inline-flex w-fit rounded-full bg-red px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
