import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

export const Chat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
  </svg>
);

export const Bubble = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4C7 4 3 7.1 3 11c0 2.4 1.5 4.5 3.9 5.8L6 20l3.7-2.2c.7.1 1.5.2 2.3.2 5 0 9-3.1 9-7s-4-7-9-7Z" />
  </svg>
);

export const Globe = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

/* Service icons */
export const Spark = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </svg>
);

export const Flow = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" />
    <path d="M9 6h4a3 3 0 0 1 3 3v6" />
  </svg>
);

export const Target = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export const Layers = (p: P) => (
  <svg {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const Handshake = (p: P) => (
  <svg {...base} {...p}>
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2L15 11" />
    <path d="M3 11l5-5 4 2 3-1 6 5-2.5 2.5M3 11l3 3M8 14l2 2" />
  </svg>
);

export const Box = (p: P) => (
  <svg {...base} {...p}>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </svg>
);

export const Building = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 21V5l8-2v18M12 8h8v13M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M2 21h20" />
  </svg>
);

export const Users = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
  </svg>
);

/** HOANG LONG AI monogram: an "H" whose crossbar is a circuit trace. */
export function Monogram(props: P) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden focusable={false} {...props}>
      <defs>
        <linearGradient id="hl-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D5FF" />
          <stop offset="1" stopColor="#1677FF" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="14" stroke="url(#hl-g)" strokeWidth="2" />
      <path d="M20 16v32M44 16v32" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 32h9l3-4 3 8 3-4h6" stroke="url(#hl-g)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="16" r="3.2" fill="#00D5FF" />
    </svg>
  );
}
