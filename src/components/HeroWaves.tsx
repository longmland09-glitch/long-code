"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed hero background: bundles of thin light strands flowing across
 * the screen with drifting particles. Decorative, static under reduced motion,
 * paused off-screen.
 */
export default function HeroWaves() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const t0 = performance.now();

    // two ribbons: a teal one and a blue one
    const ribbons = [
      { strands: 26, y: 0.58, amp: 0.16, freq: 1.4, speed: 0.12, spread: 0.07, color: [0, 213, 200], tilt: -0.22 },
      { strands: 22, y: 0.5, amp: 0.12, freq: 1.9, speed: -0.09, spread: 0.06, color: [22, 119, 255], tilt: -0.3 },
    ];
    const dust = Array.from({ length: 90 }, (_, i) => ({
      x: (i * 0.6180339) % 1,
      y: (i * 0.3819660 + 0.2) % 1,
      r: 0.4 + ((i * 37) % 10) / 10,
      s: 0.004 + ((i * 13) % 7) / 2000,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const seg = Math.max(40, Math.round(w / 18));
      for (const rb of ribbons) {
        for (let s = 0; s < rb.strands; s++) {
          const k = s / (rb.strands - 1) - 0.5; // -0.5..0.5 across the bundle
          const a = 0.05 + 0.13 * (1 - Math.abs(k) * 2);
          ctx.strokeStyle = `rgba(${rb.color[0]},${rb.color[1]},${rb.color[2]},${a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i <= seg; i++) {
            const u = i / seg;
            const phase = u * Math.PI * 2 * rb.freq + t * rb.speed * 6 + k * 1.4;
            const y =
              rb.y +
              rb.tilt * (u - 0.5) +
              Math.sin(phase) * rb.amp * (0.6 + 0.4 * Math.sin(u * 3 + t * 0.2)) +
              k * rb.spread * (1 + Math.cos(phase * 0.7));
            const px = u * w, py = y * h;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      for (const d of dust) {
        const x = ((d.x + t * d.s) % 1) * w;
        const y = (d.y + Math.sin(t * 0.3 + d.x * 9) * 0.01) * h;
        ctx.fillStyle = "rgba(168,179,199,0.45)";
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(step);
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
    reduce ? draw(0) : play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="hero-waves" aria-hidden="true" />;
}
