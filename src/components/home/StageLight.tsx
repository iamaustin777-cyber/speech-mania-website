"use client";

import { useEffect, useRef } from "react";

/**
 * Real-time stage lighting for the home hero (WebGL1, no libraries).
 *
 * One fragment shader relights a photo: the room sits in near-darkness and only the
 * spotlight's pool lifts the speaker. On top of that: volumetric haze drifting inside
 * the beam, dust catching the light, bloom around the lamp, velvet curtain edges lit
 * by spill, filmic tone mapping, and film grain that changes at 24 fps.
 *
 * Progressive enhancement: the <Image> underneath stays visible until the first frame
 * is drawn, and remains the fallback without WebGL. Rendering pauses off-screen and
 * draws a single still frame for reduced-motion users.
 */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5); // y down, like CSS
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes;      // canvas size in px
uniform float uTime;    // seconds
uniform float uIntro;   // 0..1 lamp power (fade-in with flicker)
uniform vec2 uRectMin;  // where the photo sits on screen (uv), top-left
uniform vec2 uRectSize; // and its size (uv)
uniform vec2 uTarget;   // where the beam lands, in screen uv
uniform float uLampX;   // lamp x, in screen uv (follows the mouse a little)

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return v;
}
vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 q = vUv;
  vec2 qa = vec2(q.x * aspect, q.y);           // aspect-corrected for distances

  // --- photo, in linear light (it always covers the canvas)
  vec2 imgUv = (q - uRectMin) / uRectSize;
  vec3 photo = toLinear(texture2D(uTex, clamp(imgUv, 0.0, 1.0)).rgb);

  // --- beam geometry: lamp above the frame, aimed at the target
  vec2 lamp = vec2(uLampX * aspect, -0.06);
  vec2 tgt = vec2(uTarget.x * aspect, uTarget.y);
  vec2 dir = normalize(tgt - lamp);
  vec2 v = qa - lamp;
  float along = dot(v, dir);
  float perp = length(v - dir * along);
  float radius = along * 0.15 + 0.012;                     // cone widens with distance
  float cone = smoothstep(1.0, 0.35, perp / radius) * step(0.0, along);
  float atten = 1.0 / (1.0 + along * along * 0.35);
  float beam = cone * atten * uIntro;

  // --- pool of light on the speaker (soft ellipse, brighter core)
  vec2 d = (qa - tgt) / vec2(0.22, 0.34);
  float pool = exp(-dot(d, d) * 2.2) * uIntro;
  // a stage spot is cut off below the chest; the front row stays in shadow
  float below = smoothstep(0.04, 0.3, q.y - uTarget.y);
  pool *= mix(1.0, 0.3, below);

  // --- relight: cold near-dark ambient + warm tungsten key light
  vec3 warm = vec3(1.0, 0.82, 0.58);
  vec3 ambient = photo * vec3(0.016, 0.015, 0.016);
  vec3 col = ambient + photo * warm * (pool * 1.5 + beam * 0.4 * (1.0 - below * 0.8));

  // --- volumetric haze drifting up through the beam
  float t = uTime;
  float haze = fbm(qa * vec2(2.2, 1.4) + vec2(t * 0.025, -t * 0.06));
  haze = smoothstep(0.25, 0.85, haze);
  col += warm * beam * (0.035 + haze * 0.32);

  // --- dust motes: only visible where the beam hits them
  float dust = 0.0;
  for (int layer = 0; layer < 2; layer++) {
    float scale = layer == 0 ? 38.0 : 64.0;
    vec2 g = qa * scale + vec2(t * 0.15, -t * (layer == 0 ? 0.45 : 0.3));
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float h = hash(id + float(layer) * 7.0);
    vec2 o = vec2(hash(id + 3.1), hash(id + 9.7)) - 0.5;
    float size = layer == 0 ? 0.09 : 0.06;
    float twinkle = 0.6 + 0.4 * sin(t * (1.5 + h * 3.0) + h * 40.0);
    dust += step(0.86, h) * smoothstep(size, 0.0, length(f - o * 0.7)) * twinkle;
  }
  col += warm * dust * beam * 0.9;

  // --- lamp bloom at the top of the frame
  float ld = length(qa - lamp);
  col += warm * uIntro * (exp(-ld * 14.0) * 2.2 + exp(-ld * 4.0) * 0.18 + exp(-ld * 1.4) * 0.04);

  // --- velvet curtains at the edges, lit only by spill
  float cw = 0.05 + 0.02 / aspect;
  float edge = max(smoothstep(cw, 0.0, q.x), smoothstep(1.0 - cw, 1.0, q.x));
  float folds = 0.5 + 0.5 * sin(q.x * 260.0 + fbm(vec2(q.x * 30.0, q.y * 2.0)) * 3.0);
  vec3 velvet = vec3(0.32, 0.015, 0.03) * (0.25 + 0.75 * folds * folds);
  float spill = 0.12 + 0.35 * exp(-abs(q.x - uTarget.x) * 2.0) * uIntro;
  col = mix(col, velvet * spill * (1.0 - q.y * 0.5), edge * 0.92);

  // --- lens vignette, filmic curve, back to display gamma
  float vig = smoothstep(1.25, 0.25, length((q - vec2(0.55, 0.45)) * vec2(1.0, 1.25)));
  col *= mix(0.45, 1.0, vig);
  col = aces(col * 1.15);
  col = pow(col, vec3(1.0 / 2.2));

  // --- film grain: new pattern 24 times a second, strongest in the mid-tones
  float frame = floor(t * 24.0);
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float grain = hash(gl_FragCoord.xy + frame * 13.17) - 0.5;
  col += grain * mix(0.07, 0.035, lum);

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
  return sh;
}

type Props = {
  src: string;
  imgW: number;
  imgH: number;
  /** Where the subject's face is in the photo (0-1). */
  focus: [number, number];
  /** Zoom and where on screen (0-1) the face should land, per breakpoint. */
  frame?: { desktop: Framing; mobile: Framing };
  className?: string;
};
type Framing = { zoom: number; anchor: [number, number] };

const DEFAULT_FRAME = {
  desktop: { zoom: 1, anchor: [0.72, 0.45] as [number, number] },
  mobile: { zoom: 1, anchor: [0.5, 0.25] as [number, number] },
};

export function StageLight({ src, imgW, imgH, focus, frame = DEFAULT_FRAME, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return; // fallback image stays visible

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(program, n);
    const uRes = u("uRes"), uTime = u("uTime"), uIntro = u("uIntro"), uRectMin = u("uRectMin"), uRectSize = u("uRectSize"), uTarget = u("uTarget"), uLampX = u("uLampX");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // Photo framing: cover the canvas, zoomed so the speaker lands on `anchor`
    // (right half on desktop, upper third on mobile), clamped so no edge shows.
    const layout = () => {
      const mobile = canvas.clientWidth < 768;
      // Lower internal resolution keeps the shader cheap; grain hides the softness.
      const scale = Math.min(window.devicePixelRatio || 1, 1) * (mobile ? 0.55 : 0.7);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);

      const A = canvas.clientWidth / canvas.clientHeight;
      const I = imgW / imgH;
      const { zoom, anchor } = mobile ? frame.mobile : frame.desktop;
      // Photo size in screen uv when it just covers the canvas, then zoomed.
      const rw = (A > I ? 1 : I / A) * zoom;
      const rh = (A > I ? A / I : 1) * zoom;
      const rx = Math.min(0, Math.max(1 - rw, anchor[0] - focus[0] * rw));
      const ry = Math.min(0, Math.max(1 - rh, anchor[1] - focus[1] * rh));
      // Where the speaker actually ends up after clamping: the beam aims there.
      const tx = rx + focus[0] * rw;
      const ty = ry + focus[1] * rh;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uRectMin, rx, ry);
      gl.uniform2f(uRectSize, rw, rh);
      gl.uniform2f(uTarget, tx, ty);
      lampHome = tx;
      lampX = lampTarget = tx;
    };

    let lampHome = 0.7, lampX = 0.7, lampTarget = 0.7;
    let raf = 0;
    let running = false;
    let visible = true;
    let ready = false;
    const start = performance.now();

    // Lamp power-up: dark, a hesitant flicker, then full.
    const intro = (s: number) => {
      if (reduced) return 1;
      const x = Math.min(1, Math.max(0, (s - 0.25) / 1.6));
      const flicker = s < 0.9 ? (Math.sin(s * 60) > 0.2 ? 1 : 0.35) : 1;
      return x * x * (3 - 2 * x) * flicker;
    };

    const draw = (now: number) => {
      const s = (now - start) / 1000;
      lampX += (lampTarget - lampX) * 0.06;
      gl.uniform1f(uTime, reduced ? 4.2 : s);
      gl.uniform1f(uIntro, intro(s));
      gl.uniform1f(uLampX, lampX);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = (now: number) => {
      draw(now);
      raf = running ? requestAnimationFrame(loop) : 0;
    };
    const play = () => {
      if (!ready || reduced || running || !visible) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Texture
    const tex = gl.createTexture();
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      ready = true;
      layout();
      draw(performance.now());
      canvas.dataset.ready = "true"; // fades the canvas in over the fallback image
      play();
    };

    const ro = new ResizeObserver(() => {
      if (!ready) return;
      layout();
      if (!running) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else stop();
    });
    io.observe(canvas);

    // The lamp leans toward the cursor (desktop only).
    const host = canvas.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      lampTarget = lampHome + ((e.clientX - r.left) / r.width - 0.5) * 0.3;
    };
    if (finePointer && !reduced) host.addEventListener("pointermove", onMove, { passive: true });

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      delete canvas.dataset.ready;
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      img.onload = null;
    };
  }, [src, imgW, imgH, focus, frame]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100 ${className}`}
    />
  );
}
