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
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-tagline">{t.hero.tagline}</p>
                <h1 id="hero-title" lang="en">
                  <span>I&rsquo;m Hoang Long.</span>
                  <span className="line-2">I build with AI.</span>
                </h1>
                <p className="hero-welcome" lang="en">
                  {t.hero.welcome}
                </p>
                <p className="hero-lead">{t.hero.lead}</p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#ai">
                    {t.hero.primary}
                    <ArrowUpRight />
                  </a>
                  <a className="btn btn-ghost" href="#contact">
                    {t.hero.secondary}
                  </a>
                </div>
              </div>
              <div className="hero-visual">
                <HeroLattice />
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
            <figure className="portrait">
              {site.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={site.portrait} alt={t.about.portraitAlt} width={920} height={1150} loading="lazy" decoding="async" />
              ) : (
                <div className="portrait-mark">
                  <Monogram />
                </div>
              )}
              <figcaption>
                <strong>{site.owner}</strong>
                <span>Founder, HOANG LONG AI</span>
              </figcaption>
            </figure>

            <div>
              <h2 id="about-title" className="about-title">
                {t.about.title}
              </h2>
              <div className="about-story">
                {t.about.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

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
          <div className="wrap">
            <div className="section-head">
              <h2 id="ai-title">{t.ai.title}</h2>
              <p>{t.ai.intro}</p>
            </div>
            <ul className="rows">
              {t.ai.items.map((it, i) => {
                const Icon = aiIcons[i];
                return (
                  <li key={it.title}>
                    <h3>
                      <Icon />
                      {it.title}
                    </h3>
                    <p>{it.body}</p>
                    <ul className="tags" aria-label={it.title}>
                      {it.tags?.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ───── Engineering ───── */}
        <section id="engineering" className="section engineering" aria-labelledby="eng-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="eng-title">{t.engineering.title}</h2>
              <p>{t.engineering.intro}</p>
            </div>
            <ol className="pipeline">
              {t.engineering.pipeline.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <div className="eng-grid">
              <Blueprint caption={t.engineering.drawingCaption} />
              <dl className="spec">
                {t.engineering.items.map((it) => (
                  <div key={it.title}>
                    <dt>{it.title}</dt>
                    <dd>{it.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ───── Marketing ───── */}
        <section id="marketing" className="section" aria-labelledby="mkt-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="mkt-title">{t.marketing.title}</h2>
              <p>{t.marketing.intro}</p>
            </div>
            <ul className="split">
              {t.marketing.items.map((it) => (
                <li key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </li>
              ))}
            </ul>
            <p className="channels">
              {t.marketing.channels.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </p>
          </div>
        </section>

        {/* ───── Business ───── */}
        <section id="business" className="section" aria-labelledby="biz-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="biz-title">{t.business.title}</h2>
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
              <a className="btn btn-ghost" href="#contact">
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
        </section>

        {/* ───── Blog ───── */}
        <section id="blog" className="section" aria-labelledby="blog-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="blog-title">{t.blog.title}</h2>
              <p>{t.blog.intro}</p>
            </div>
            <ul className="posts">
              {posts.map((p) => {
                const title = locale === "en" ? p.titleEn : locale === "zh-tw" ? p.titleZh : p.title;
                return (
                  <li key={p.slug}>
                    <a href={`${root}/blog/${p.slug}/`}>
                      <div className="post-meta">
                        <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                        <br />
                        {p.minutes} {t.blog.minutes}
                      </div>
                      <div className="post-body">
                        <h3>{title}</h3>
                        <p lang="vi">{p.excerpt}</p>
                      </div>
                      <span className="read">
                        {t.blog.read}
                        <ArrowRight />
                      </span>
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
