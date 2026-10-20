"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MicIcon } from "./Icons";
import { usePauseOffscreen } from "./PauseOffscreen";

// Audio-waveform motif.
//   "bars": a live level meter. Idle it pulses on its own (CSS, compositor only); the bars
//           near the pointer swell like an equalizer; with `mic`, a "Try your voice" button
//           lets the bars follow the visitor's own voice (analysed locally, never recorded).
//   "line": a divider made of three strings; moving the pointer across plucks them and they
//           ring out and settle (canvas, runs only while visible and while still moving).

type BarsProps = {
  variant?: "bars";
  count?: number;
  className?: string;
  color?: string;
  still?: boolean;
  mic?: boolean;
  style?: CSSProperties;
};
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

/* ------------------------------------------------------------------ bars */

function WaveBars({ count = 56, className = "", color = "currentColor", still = false, mic = false, style }: BarsProps) {
  const ref = usePauseOffscreen<HTMLDivElement>();
  const outer = useRef<(HTMLSpanElement | null)[]>([]);
  const inner = useRef<(HTMLSpanElement | null)[]>([]);
  const [live, setLive] = useState(false);
  const [error, setError] = useState("");
  const audio = useRef<{ stream: MediaStream; ctx: AudioContext; raf: number } | null>(null);

  // Equalizer swell around the pointer (desktop). Writes transforms directly, no re-render.
  useEffect(() => {
    const el = ref.current;
    if (still || !el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = el.closest("section") ?? el;
    let raf = 0;
    let px = -1;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      outer.current.forEach((b, i) => {
        if (!b) return;
        const bx = r.left + ((i + 0.5) / count) * r.width;
        const k = px < 0 ? 0 : Math.exp(-(((bx - px) / 70) ** 2));
        b.style.transform = `scaleY(${(1 + k * 1.15).toFixed(3)})`;
      });
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      px = -1;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    host.addEventListener("pointermove", onMove as EventListener, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [count, still, ref]);

  const stopMic = () => {
    const a = audio.current;
    if (!a) return;
    cancelAnimationFrame(a.raf);
    a.stream.getTracks().forEach((t) => t.stop());
    a.ctx.close();
    audio.current = null;
    inner.current.forEach((b) => b && (b.style.transform = ""));
    setLive(false);
  };

  const startMic = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.7;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const half = Math.ceil(count / 2);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        // voice energy sits low: spread the first ~40 bins from the centre outwards
        for (let i = 0; i < count; i++) {
          const fromCentre = Math.abs(i - (count - 1) / 2) / half;
          const bin = Math.min(data.length - 1, Math.floor(2 + fromCentre * 38));
          const v = data[bin] / 255;
          const b = inner.current[i];
          if (b) b.style.transform = `scaleY(${(0.12 + v * 1.25).toFixed(3)})`;
        }
        if (audio.current) audio.current.raf = requestAnimationFrame(tick);
      };
      audio.current = { stream, ctx, raf: requestAnimationFrame(tick) };
      setLive(true);
    } catch {
      setError("Microphone not available");
    }
  };

  useEffect(() => () => stopMic(), []);

  return (
    <div className={`flex items-center gap-5 ${mic ? "" : "contents"}`}>
      <div ref={ref} aria-hidden className={`flex items-center gap-[3px] ${live ? "wave-live" : ""} ${className}`} style={style}>
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            ref={(el) => {
              outer.current[i] = el;
            }}
            className="flex h-full min-w-0 flex-1 items-center transition-transform duration-300 ease-out"
          >
            <span
              ref={(el) => {
                inner.current[i] = el;
              }}
              className={`block h-full w-full rounded-full ${still ? "" : "wave-bar"}`}
              style={{
                background: color,
                transform: still ? `scaleY(${heightAt(i, count).toFixed(3)})` : undefined,
                maxHeight: still ? undefined : `${(heightAt(i, count) * 100).toFixed(1)}%`,
                animationDelay: still ? undefined : `${-((i * 137) % 1100)}ms`,
                animationDuration: still ? undefined : `${900 + ((i * 53) % 700)}ms`,
              }}
            />
          </span>
        ))}
      </div>
      {mic && (
        <button
          type="button"
          onClick={() => (live ? stopMic() : startMic())}
          aria-pressed={live}
          className={`meta inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
            live ? "border-red/60 text-ink" : "border-ink/15 hover:border-ink/40 hover:text-ink"
          }`}
        >
          <span className="relative flex size-2">
            {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-red opacity-75" />}
            <span className={`relative inline-flex size-2 rounded-full ${live ? "bg-red" : "bg-ink/40"}`} />
          </span>
          <MicIcon aria-hidden className="size-3.5" />
          {error || (live ? "Listening. Stop" : "Try your voice")}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ line */

const STRINGS = [
  { amp: 9, freq: 6, phase: 0, speed: 0.55, width: 1.6, alpha: 0.95, tone: "red" },
  { amp: 6, freq: 9, phase: 1.2, speed: -0.4, width: 1, alpha: 0.5, tone: "accent" },
  { amp: 4, freq: 13, phase: 2.4, speed: 0.3, width: 1, alpha: 0.22, tone: "ink" },
] as const;

function WaveLine({ className = "", color = "#d7262e" }: LineProps) {
  const wrap = usePauseOffscreen<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = { red: color, accent: "#e7dfd3", ink: "#f4f2ee" };

    let W = 0;
    let H = 0;
    let dpr = 1;
    const N = 120; // points per string
    // per-string displacement field: a damped wave equation along the string
    const pos = STRINGS.map(() => new Float32Array(N));
    const vel = STRINGS.map(() => new Float32Array(N));
    let visible = false;
    let raf = 0;
    let t = 0;
    let last = performance.now();
    let lastX = -1;
    let energy = 0;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth;
      H = host.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      STRINGS.forEach((s, k) => {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const x = (i / (N - 1)) * W;
          const u = i / (N - 1);
          const env = Math.sin(u * Math.PI); // ends are fixed, like a real string
          const y = H / 2 + Math.sin(u * Math.PI * 2 * s.freq + s.phase + t * s.speed) * s.amp * env + pos[k][i];
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = colors[s.tone];
        ctx.globalAlpha = s.alpha;
        ctx.lineWidth = s.width;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      raf = 0;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!reduced) t += dt;
      energy = 0;
      // small substeps keep the explicit integration stable at any frame rate
      const SUB = 4;
      const h = dt / SUB;
      for (let sub = 0; sub < SUB; sub++) {
        for (let k = 0; k < STRINGS.length; k++) {
          const p = pos[k];
          const v = vel[k];
          for (let i = 1; i < N - 1; i++) {
            const lap = p[i - 1] + p[i + 1] - 2 * p[i];
            v[i] += (lap * 900 - p[i] * 18) * h; // tension + restoring force
            v[i] *= 1 - 2.6 * h; // damping: rings out in about a second
          }
          for (let i = 1; i < N - 1; i++) p[i] += v[i] * h;
        }
      }
      for (let k = 0; k < STRINGS.length; k++) for (let i = 1; i < N - 1; i++) energy += Math.abs(vel[k][i]) + Math.abs(pos[k][i]);
      draw();
      // keep running while visible (idle drift) and while strings still ring
      if (visible && (!reduced || energy > 0.5)) raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    // Pluck: the pointer crossing a string pushes it in the direction of travel.
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < -40 || y > H + 40) {
        lastX = -1;
        return;
      }
      const dx = lastX < 0 ? 0 : x - lastX;
      lastX = x;
      const i = Math.round((x / W) * (N - 1));
      const push = Math.max(-26, Math.min(26, (y - H / 2) * 0.6 + dx * 0.4));
      STRINGS.forEach((_, k) => {
        for (let j = -4; j <= 4; j++) {
          const n = i + j;
          if (n <= 0 || n >= N - 1) continue;
          vel[k][n] += push * (1 - Math.abs(j) / 5) * (1.4 - k * 0.3) * 6;
        }
      });
      kick();
    };
    const onLeave = () => {
      lastX = -1;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(host);
    const ro = new ResizeObserver(size);
    ro.observe(host);
    size();
    const fine = window.matchMedia("(pointer: fine)").matches;
    const area = host.parentElement ?? host;
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);
    // touch: a swipe across plucks too
    if (!fine) area.addEventListener("pointerdown", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      area.removeEventListener("pointerdown", onMove);
    };
  }, [color, wrap]);

  return (
    <div ref={wrap} aria-hidden className={`relative h-20 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
