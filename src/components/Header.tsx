"use client";

import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { base, locales, localeLabel } from "@/lib/i18n";
import { Close, Menu, Monogram } from "./Icons";

type Props = { locale: Locale; t: Dict; home?: boolean };

export default function Header({ locale, t, home = true }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = base(locale) + "/";
  // On article pages section links must point back to the home page.
  const href = (hash: string) => (home ? hash : root + hash);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = [
    ["#about", t.nav.about],
    ["#ai", t.nav.ai],
    ["#engineering", t.nav.engineering],
    ["#marketing", t.nav.marketing],
    ["#business", t.nav.business],
    ["#blog", t.nav.blog],
  ] as const;

  const langSwitch = (
    <nav className="lang" aria-label={t.nav.language}>
      {locales.map((l) => (
        <a
          key={l}
          href={base(l) + "/"}
          hrefLang={l === "zh-tw" ? "zh-Hant-TW" : l}
          lang={l === "zh-tw" ? "zh-Hant-TW" : l}
          aria-current={l === locale ? "true" : undefined}
          title={localeLabel[l].name}
        >
          {localeLabel[l].short}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="header" data-scrolled={scrolled || open}>
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <div className="wrap header-inner">
        <a className="brand" href={root} aria-label="HOANG LONG AI">
          <Monogram className="brand-mark" />
          <span>HOANG LONG AI</span>
        </a>

        <nav className="nav" aria-label="Main">
          <ul>
            {items.map(([h, label]) => (
              <li key={h}>
                <a href={href(h)}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="nav">{langSwitch}</div>
          <a className="btn btn-primary header-cta" href={href("#contact")}>
            {t.nav.contact}
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="mobile-nav">
          <nav aria-label="Main">
            {[...items, ["#contact", t.nav.contact] as const].map(([h, label]) => (
              <a key={h} href={href(h)} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          {langSwitch}
        </div>
      )}
    </header>
  );
}
