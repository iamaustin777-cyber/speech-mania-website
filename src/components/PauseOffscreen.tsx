"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Toggles .wave-paused on the element while it is off-screen, pausing looping CSS animations inside it. */
export function usePauseOffscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("wave-paused", !entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function PauseOffscreen({ children, className }: { children: ReactNode; className?: string }) {
  const ref = usePauseOffscreen<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
