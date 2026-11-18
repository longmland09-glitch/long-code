"use client";

import { useEffect, useRef } from "react";

/**
 * The page's signature visual: a node network that assembles into the "H"
 * of the monogram on load and bends away from the pointer.
 * Decorative only (aria-hidden). Static under prefers-reduced-motion,
 * paused when off-screen or when the tab is hidden.
 */

type Node = {
  hx: number; // home position, 0..1
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glyph: boolean;
  phase: number;
};

function rand(seed: number) {
  // small deterministic PRNG so the layout is identical on every load
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function buildNodes(): Node[] {
  const r = rand(7);
  const nodes: Node[] = [];
  const push = (hx: number, hy: number, glyph: boolean) =>
    nodes.push({
      hx,
      hy,
      x: 0.5 + (r() - 0.5) * 1.6,
      y: 0.5 + (r() - 0.5) * 1.6,
      vx: 0,
      vy: 0,
      r: glyph ? 1.6 + r() * 1.6 : 0.8 + r() * 1.2,
      glyph,
      phase: r() * Math.PI * 2,
    });

  // H glyph inside a 0.24..0.76 box
  const L = 0.27, R = 0.73, T = 0.2, B = 0.8, W = 0.08;
  for (let i = 0; i < 22; i++) {
    const y = T + ((B - T) * i) / 21;
    push(L + (r() - 0.5) * W, y + (r() - 0.5) * 0.02, true);
    push(R + (r() - 0.5) * W, y + (r() - 0.5) * 0.02, true);
  }
  for (let i = 1; i < 12; i++) {
    const x = L + ((R - L) * i) / 12;
    push(x, 0.5 + (r() - 0.5) * W * 0.9, true);
  }
  // ambient field
  for (let i = 0; i < 70; i++) {
    let x = r(), y = r();
    // keep the ambient nodes mostly outside the glyph
    if (x > L - 0.06 && x < R + 0.06 && y > T - 0.04 && y < B + 0.04 && r() < 0.75) {
      x = r() < 0.5 ? r() * 0.2 : 0.8 + r() * 0.2;
    }
    push(x, y, false);
  }
  return nodes;
}

export default function HeroLattice() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = buildNodes();
    if (reduce) nodes.forEach((n) => ((n.x = n.hx), (n.y = n.hy)));

    let w = 0, h = 0, size = 0, ox = 0, oy = 0;
    const pointer = { x: -9, y: -9, active: false };
    let raf = 0;
    let visible = true;
    let start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = Math.min(w, h) * 1.05;
      ox = (w - size) / 2;
      oy = (h - size) / 2;
      if (reduce) draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = (now - start) / 1000;
      const link = 0.13;

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > link * link) continue;
          const k = 1 - Math.sqrt(d2) / link;
          const both = a.glyph && b.glyph;
          ctx.strokeStyle = both
            ? `rgba(0, 213, 255, ${0.55 * k})`
            : `rgba(22, 119, 255, ${0.32 * k})`;
          ctx.lineWidth = both ? 1 : 0.7;
          ctx.beginPath();
          ctx.moveTo(ox + a.x * size, oy + a.y * size);
          ctx.lineTo(ox + b.x * size, oy + b.y * size);
          ctx.stroke();
        }
      }
      // nodes
      for (const n of nodes) {
        const pulse = reduce ? 1 : 0.75 + 0.25 * Math.sin(t * 1.6 + n.phase);
        ctx.fillStyle = n.glyph ? `rgba(255,255,255,${0.9 * pulse})` : `rgba(168,179,199,${0.55 * pulse})`;
        ctx.beginPath();
        ctx.arc(ox + n.x * size, oy + n.y * size, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      const t = (now - start) / 1000;
      // assembly strength ramps up over the first ~1.6s
      const pull = Math.min(1, t / 1.6);
      const px = (pointer.x - ox) / size, py = (pointer.y - oy) / size;
      for (const n of nodes) {
        const driftX = n.hx + Math.sin(t * 0.5 + n.phase) * 0.006;
        const driftY = n.hy + Math.cos(t * 0.45 + n.phase) * 0.006;
        n.vx += (driftX - n.x) * 0.02 * (0.35 + pull);
        n.vy += (driftY - n.y) * 0.02 * (0.35 + pull);
        if (pointer.active) {
          const dx = n.x - px, dy = n.y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < 0.02) {
            const f = (0.02 - d2) * 0.12;
            n.vx += dx * f * 20;
            n.vy += dy * f * 20;
          }
        }
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
      }
      draw(now);
      raf = visible ? requestAnimationFrame(step) : 0;
    };

    const play = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(step);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? play() : pause();
    });
    io.observe(canvas);

    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => (pointer.active = false);
    const host = canvas.parentElement!;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    start = performance.now();
    if (reduce) draw(start);
    else play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
