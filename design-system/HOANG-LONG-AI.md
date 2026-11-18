# Design system — HOANG LONG AI

Direction: Future Technology – Premium – Modern Business. Dark, spacious, restrained motion.

## Color (from the brand brief)
| Token | Hex | Use |
| --- | --- | --- |
| Midnight | #080F20 | page background |
| Electric Blue | #1677FF | brand accent, hover fill |
| Fill | #0B63E5 | button fill (white text passes 4.5:1; #1677FF does not) |
| Neon Cyan | #00D5FF | technical highlights, focus ring, the lattice |
| White | #FFFFFF | primary text |
| Silver | #A8B3C7 | secondary text (≈8.9:1 on Midnight) |

## Type
- Display: Space Grotesk (variable) — geometric, technical, has a Vietnamese subset.
- Body: Be Vietnam Pro 400/500/600 — drawn for Vietnamese diacritics.
- Chinese falls back to PingFang TC / Noto Sans TC / Microsoft JhengHei, with looser line-height.

## Principles
1. One signature element: the node lattice that assembles into the "H" on load and reacts to the pointer. Everything else stays quiet.
2. Structure shows meaning: numbers only where content is a real sequence (engineering pipeline, roadmap).
3. Each section has its own layout (rows, spec sheet + drawing, split list, cards, timeline) instead of one card kit everywhere.
4. Motion: one load sequence in the hero, a toolpath that draws once in view. Reduced motion renders final states.
5. Quality floor: 44px+ touch targets, visible cyan focus ring, inline form errors with focus moved to the first error, no horizontal scroll at 375px.
