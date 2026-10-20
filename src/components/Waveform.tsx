"use client";

import type { CSSProperties } from "react";
import { usePauseOffscreen } from "./PauseOffscreen";

// Audio-waveform motif. "bars" pulses like a live mic level meter;
// "line" is a slow scrolling sine used as a section divider.
// Both animate only transform (compositor-only) and pause while off-screen.

type BarsProps = { variant?: "bars"; count?: number; className?: string; color?: string; still?: boolean; style?: CSSProperties };
type LineProps = { variant: "line"; className?: string; color?: string; speed?: string };

// Deterministic pseudo-random heights so server and client render the same bars.
function heightAt(i: number, count: number) {
  const env = Math.sin((i / (count - 1)) * Math.PI);
  const jitter = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  return 0.18 + env * (0.45 + Math.abs(jitter) * 0.37);
}

export function Waveform(props: BarsProps | LineProps) {
  if (props.variant === "line") return <WaveLine {...props} />;
  return <WaveBars {...props} />;
}

function WaveBars({ count = 56, className = "", color = "currentColor", still = false, style }: BarsProps) {
  const ref = usePauseOffscreen<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden className={`flex items-center gap-[3px] ${className}`} style={style}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`block h-full min-w-0 flex-1 rounded-full ${still ? "" : "wave-bar"}`}
          style={{
            background: color,
            transform: still ? `scaleY(${heightAt(i, count).toFixed(3)})` : undefined,
            maxHeight: still ? undefined : `${(heightAt(i, count) * 100).toFixed(1)}%`,
            animationDelay: still ? undefined : `${-((i * 137) % 1100)}ms`,
            animationDuration: still ? undefined : `${900 + ((i * 53) % 700)}ms`,
          }}
        />
      ))}
    </div>
  );
}

function sinePath(amp: number, freq: number, phase: number, width = 2400, height = 60) {
  let d = "";
  for (let x = 0; x <= width; x += 8) {
    const y = height / 2 + Math.sin((x / width) * Math.PI * 2 * freq + phase) * amp * Math.sin((x / width) * Math.PI * 2 * 2 + 1.3);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
}

function WaveLine({ className = "", color = "var(--color-red)", speed = "14s" }: LineProps) {
  const ref = usePauseOffscreen<HTMLDivElement>();
  // Path is 2x wide and loops by translating -50%; frequencies are even so it tiles.
  return (
    <div ref={ref} aria-hidden className={`relative h-14 overflow-hidden ${className}`}>
      <svg
        className="wave-line absolute inset-y-0 left-0 h-full w-[200%]"
        style={{ ["--speed" as string]: speed }}
        viewBox="0 0 2400 60"
        preserveAspectRatio="none"
      >
        <path d={sinePath(22, 12, 0)} stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" vectorEffect="non-scaling-stroke" />
        <path d={sinePath(14, 18, 1.2)} stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.45" vectorEffect="non-scaling-stroke" />
        <path d={sinePath(9, 26, 2.4)} stroke="var(--color-ink)" strokeWidth="1" fill="none" opacity="0.18" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
