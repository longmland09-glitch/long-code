"use client";

import { useEffect, useRef, useState } from "react";

/** Technical drawing of a machined bracket; the toolpath draws itself once in view. */
export default function Blueprint({ caption }: { caption: string }) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dim = "#A8B3C7";
  return (
    <figure ref={ref} className="blueprint" data-inview={inView}>
      <svg viewBox="0 0 560 400" role="img" aria-label={caption}>
        <defs>
          <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(168,179,199,0.08)" />
          </pattern>
          <marker id="bp-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 2 10 5 0 8Z" fill={dim} />
          </marker>
        </defs>
        <rect width="560" height="400" fill="url(#bp-grid)" />

        {/* part outline */}
        <path
          d="M120 110H400Q440 110 440 150V290H340V230Q340 210 320 210H240Q220 210 220 230V290H120Z"
          fill="rgba(22,119,255,0.08)"
          stroke="#fff"
          strokeWidth="1.6"
        />
        {/* bores */}
        <circle cx="170" cy="160" r="18" fill="none" stroke="#fff" strokeWidth="1.4" />
        <circle cx="390" cy="160" r="18" fill="none" stroke="#fff" strokeWidth="1.4" />
        <path d="M170 132v56M142 160h56M390 132v56M362 160h56" stroke={dim} strokeWidth="0.8" strokeDasharray="6 3 2 3" />

        {/* toolpath (offset contour) */}
        <path
          className="toolpath"
          d="M110 300V100H402Q450 100 450 148V300H330V232Q330 220 318 220H242Q230 220 230 232V300H110"
          fill="none"
          stroke="#00D5FF"
          strokeWidth="1.6"
          strokeDasharray="1400"
        />
        <circle className="toolpath" cx="110" cy="300" r="4" fill="#00D5FF" />

        {/* dimensions */}
        <g stroke={dim} strokeWidth="0.8" fill="none">
          <path d="M120 330V300M440 330V296" />
          <path d="M120 322H440" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
          <path d="M80 110H112M80 290H112" />
          <path d="M88 110V290" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
          <path d="M220 255H340" markerStart="url(#bp-arrow)" markerEnd="url(#bp-arrow)" />
        </g>
        <g fill={dim} fontFamily="Space Grotesk Variable, system-ui" fontSize="12">
          <text x="280" y="342" textAnchor="middle">160.00</text>
          <text x="72" y="204" textAnchor="middle" transform="rotate(-90 72 204)">90.00</text>
          <text x="280" y="250" textAnchor="middle">60.00 ±0.02</text>
          <text x="196" y="132">Ø18 H7</text>
        </g>
        <g fill="#00D5FF" fontFamily="Space Grotesk Variable, system-ui" fontSize="11">
          <text x="456" y="372" textAnchor="end">T04 · Ø10 · S8000 · F1200</text>
        </g>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
