import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import { base, dictionaries } from "@/lib/i18n";
import { posts } from "@/lib/posts";
import { links, site } from "@/lib/site";
import Blueprint from "./Blueprint";
import ContactForm from "./ContactForm";
import CopyChannel from "./CopyChannel";
import Footer from "./Footer";
import Header from "./Header";
import HeroLattice from "./HeroLattice";
import HeroWaves from "./HeroWaves";
import Products3D from "./Products3D";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Bubble,
  Building,
  Chat,
  Flow,
  Globe,
  Handshake,
  Layers,
  Mail,
  Monogram,
  Spark,
  Target,
  Users,
} from "./Icons";

const aiIcons = [Spark, Flow, Target, Layers];
const bizIcons = [Handshake, Box, Building, Users];
/** Per-card art direction for the glossy AI service cards and blog covers. */
const art: CSSProperties[] = [
  { "--ax": "78%", "--ay": "8%", "--hue-a": "#00d5ff", "--hue-b": "#1677ff" } as CSSProperties,
  { "--ax": "18%", "--ay": "0%", "--hue-a": "#1677ff", "--hue-b": "#6a5cff" } as CSSProperties,
  { "--ax": "88%", "--ay": "30%", "--hue-a": "#00e0c6", "--hue-b": "#0b63e5" } as CSSProperties,
  { "--ax": "40%", "--ay": "-10%", "--hue-a": "#4aa8ff", "--hue-b": "#00d5ff" } as CSSProperties,
];

function formatDate(iso: string, locale: Locale) {
  const tag = locale === "zh-tw" ? "zh-TW" : locale;
  return new Intl.DateTimeFormat(tag, { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export default function Home({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const root = base(locale);

  return (
    <>
      <Header locale={locale} t={t} />
      <main id="main">
        {/* ───── Hero ───── */}
        <section className="hero" aria-labelledby="hero-title">
          <HeroWaves />
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="badge">
                  <span className="badge-dot" aria-hidden="true" />
                  {t.hero.tagline}
                </p>
                <h1 id="hero-title" lang="en">
                  <span>I&rsquo;m Hoang Long.</span>
                  <span className="line-2">I build with AI.</span>
                </h1>
                <p className="hero-lead">{t.hero.lead}</p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#ai">
                    {t.hero.primary}
                    <ArrowRight />
                  </a>
                  <a className="btn btn-ghost" href="#contact">
                    {t.hero.secondary}
                  </a>
                </div>
              </div>
              <div className="hero-visual">
                <HeroLattice />
                <div className="hero-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-portrait.webp"
                    alt={t.about.portraitAlt}
                    width={760}
                    height={950}
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
                <div className="glass-chip chip-a">
                  <Monogram />
                  <span>
                    <strong>{t.hero.chips[0].title}</strong>
                    <small>{t.hero.chips[0].sub}</small>
                  </span>
                </div>
                <div className="glass-chip chip-b">
                  <span className="live-dot" aria-hidden="true" />
                  <span>
                    <strong>{t.hero.chips[1].title}</strong>
                    <small>{t.hero.chips[1].sub}</small>
                  </span>
                </div>
              </div>
            </div>

            <ul className="pillars">
              {t.pillars.map((p) => (
                <li key={p.code}>
                  <a href={p.href}>
                    <span className="pillar-code">{p.code}</span>
                    <span className="pillar-label">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───── About ───── */}
        <section id="about" className="section" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <figure className="portrait-frame">
              <div className="portrait">
                {site.portrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={site.portrait} alt={t.about.portraitAlt} width={920} height={1150} loading="lazy" decoding="async" />
                ) : (
                  <div className="portrait-mark">
                    <Monogram />
                  </div>
                )}
              </div>
              <figcaption>
                <strong>{site.owner}</strong>
                <span>Founder, HOANG LONG AI</span>
              </figcaption>
            </figure>

            <div className="about-copy">
              <p className="kicker">{t.about.label}</p>
              <h2 id="about-title" className="about-title">
                {t.about.title}
              </h2>
              <div className="about-story">
                {t.about.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <dl className="facts">
                {t.about.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="subhead">{t.about.valuesTitle}</h3>
              <dl className="values">
                {t.about.values.map((v) => (
                  <div key={v.title}>
                    <dt>{v.title}</dt>
                    <dd>{v.body}</dd>
                  </div>
                ))}
              </dl>

              <div className="vision">
                <h3 className="subhead">{t.about.visionTitle}</h3>
                <p>{t.about.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── AI Solutions ───── */}
        <section id="ai" className="section" aria-labelledby="ai-title">
          <div className="wrap ai-grid">
            <div className="ai-intro">
              <p className="kicker">{t.nav.ai}</p>
              <h2 id="ai-title">{t.ai.title}</h2>
              <p>{t.ai.intro}</p>
              <a className="btn btn-ghost" href="#contact">
                {t.ai.cta}
                <ArrowRight />
              </a>
            </div>
            {t.ai.items.map((it, i) => {
              const Icon = aiIcons[i];
              return (
                <article key={it.title} className="gloss-card" style={art[i]}>
                  <div className="gloss-art" aria-hidden="true" />
                  <a className="round-arrow" href="#contact" aria-label={`${t.ai.cta}: ${it.title}`}>
                    <ArrowUpRight />
                  </a>
                  <div className="gloss-body">
                    <Icon className="gloss-icon" />
                    <h3>{it.title}</h3>
                    <p>{it.body}</p>
                    <ul className="tags" aria-label={it.title}>
                      {it.tags?.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ───── Process ───── */}
        <section id="process" className="section" aria-labelledby="process-title">
          <div className="wrap process-grid">
            <div className="process-intro">
              <p className="kicker">{t.process.label}</p>
              <h2 id="process-title">{t.process.title}</h2>
              <p>{t.process.intro}</p>
              <a className="btn btn-primary" href="#contact">
                {t.process.cta}
                <ArrowRight />
              </a>
            </div>
            <ol className="timeline">
              {t.process.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="node" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="step-card">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───── Engineering ───── */}
        <section id="engineering" className="section engineering" aria-labelledby="eng-title">
          <div className="wrap">
            <div className="eng-layout">
              <div className="eng-visual">
                <Blueprint caption={t.engineering.drawingCaption} />
              </div>
              <div className="eng-panel">
                <div className="eng-head">
                  <h2 id="eng-title">{t.engineering.title}</h2>
                  <p>{t.engineering.intro}</p>
                </div>
                <div className="cadcam">
                  {t.engineering.panels.map((p) => (
                    <div key={p.title} className="cadcam-cell">
                      <h3 lang="en">{p.title}</h3>
                      <p>{p.body}</p>
                      <ul>
                        {p.tags?.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <dl className="eng-notes">
                  {[t.engineering.items[2], t.engineering.items[3]].map((it) => (
                    <div key={it.title}>
                      <dt>{it.title}</dt>
                      <dd>{it.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ───── 3D Products ───── */}
        <section id="products" className="section" aria-labelledby="products-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">{t.products.label}</p>
                <h2 id="products-title">{t.products.title}</h2>
              </div>
              <p>{t.products.intro}</p>
            </div>
            <Products3D t={t.products} />
          </div>
        </section>

        {/* ───── Marketing ───── */}
        <section id="marketing" className="section" aria-labelledby="mkt-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">{t.nav.marketing}</p>
                <h2 id="mkt-title">{t.marketing.title}</h2>
              </div>
              <p>{t.marketing.intro}</p>
            </div>
            <ul className="mkt-grid">
              {t.marketing.items.map((it, i) => (
                <li key={it.title}>
                  <span className="mkt-index" aria-hidden="true">
                    {["Brand", "Ads", "Web", "Social"][i]}
                  </span>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </li>
              ))}
            </ul>
            <div className="channels">
              <p className="channels-label">{t.marketing.channelsLabel}</p>
              <ul>
                {t.marketing.channels.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───── Business ───── */}
        <section id="business" className="section" aria-labelledby="biz-title">
          <div className="wrap">
            <div className="glass-panel">
              <div className="section-head">
                <div>
                  <p className="kicker">{t.nav.business}</p>
                  <h2 id="biz-title">{t.business.title}</h2>
                </div>
                <p>{t.business.intro}</p>
              </div>
              <ul className="biz">
                {t.business.items.map((it, i) => {
                  const Icon = bizIcons[i];
                  return (
                    <li key={it.title}>
                      <Icon />
                      <h3>{it.title}</h3>
                      <p>{it.body}</p>
                    </li>
                  );
                })}
              </ul>
              <div className="biz-cta">
                <a className="btn btn-light" href="#contact">
                  {t.business.joinCta}
                  <ArrowRight />
                </a>
              </div>

              <h3 className="roadmap-title">{t.business.roadmapTitle}</h3>
              <ol className="roadmap">
                {t.business.roadmap.map((r, i) => (
                  <li key={r.title}>
                    <span className="dot" aria-hidden="true" />
                    <span className="stage">
                      {t.business.stage} {i + 1}
                    </span>
                    <h4>{r.title}</h4>
                    <p>{r.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ───── Blog ───── */}
        <section id="blog" className="section" aria-labelledby="blog-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">{t.nav.blog}</p>
                <h2 id="blog-title">{t.blog.title}</h2>
              </div>
              <p>{t.blog.intro}</p>
            </div>
            <ul className="work-grid">
              {posts.map((p, i) => {
                const title = locale === "en" ? p.titleEn : locale === "zh-tw" ? p.titleZh : p.title;
                return (
                  <li key={p.slug}>
                    <a className="work-card" href={`${root}/blog/${p.slug}/`} style={art[(i + 1) % art.length]}>
                      <div className="work-cover" aria-hidden="true">
                        <span>{p.category}</span>
                      </div>
                      <span className="round-arrow" aria-hidden="true">
                        <ArrowUpRight />
                      </span>
                      <div className="work-body">
                        <h3>{title}</h3>
                        <p className="work-meta">
                          <time dateTime={p.date}>{formatDate(p.date, locale)}</time> · {p.minutes} {t.blog.minutes}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
            {t.blog.langNote && <p className="lang-note">{t.blog.langNote}</p>}
          </div>
        </section>

        {/* ───── Contact ───── */}
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="wrap contact-grid">
            <div>
              <p className="kicker">{t.nav.contact}</p>
              <h2 id="contact-title">{t.contact.title}</h2>
              <p className="contact-intro">{t.contact.intro}</p>
              <ul className="channel-list">
                <li>
                  <a href={links.zalo} target="_blank" rel="noopener noreferrer">
                    <Chat />
                    <span>
                      {t.contact.channels.zalo}
                      <small>{site.contact.zaloPhone}</small>
                    </span>
                  </a>
                </li>
                <li>
                  <CopyChannel
                    label={t.contact.channels.line}
                    value={site.contact.linePhone}
                    hint={t.contact.lineHint}
                    copied={t.contact.copied}
                    icon={<Bubble />}
                  />
                </li>
                {links.facebook && (
                  <li>
                    <a href={links.facebook} target="_blank" rel="noopener noreferrer">
                      <Globe />
                      <span>
                        {t.contact.channels.facebook}
                        <small>{links.facebook.replace(/^https?:\/\/(www\.)?/, "")}</small>
                      </span>
                    </a>
                  </li>
                )}
                <li>
                  <a href={links.email}>
                    <Mail />
                    <span>
                      {t.contact.channels.email}
                      <small>{site.contact.email}</small>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <ContactForm t={t.contact.form} />
          </div>
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
