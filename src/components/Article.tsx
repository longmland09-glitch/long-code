import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { base, dictionaries } from "@/lib/i18n";
import { getPost, posts } from "@/lib/posts";
import { alternates } from "@/lib/seo";
import { site } from "@/lib/site";
import Footer from "./Footer";
import Header from "./Header";
import { ArrowRight } from "./Icons";

export function articleMetadata(locale: Locale, slug: string): Metadata {
  const p = getPost(slug);
  if (!p) return {};
  return {
    metadataBase: new URL(site.url),
    title: `${p.title} — ${site.name}`,
    description: p.excerpt,
    alternates: alternates(locale, `/blog/${p.slug}/`),
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, siteName: site.name },
  };
}

export default function Article({ locale, slug }: { locale: Locale; slug: string }) {
  const p = getPost(slug);
  if (!p) notFound();
  const t = dictionaries[locale];
  const root = base(locale);
  const others = posts.filter((o) => o.slug !== p.slug);
  const date = new Intl.DateTimeFormat("vi", { day: "numeric", month: "long", year: "numeric" }).format(new Date(p.date));

  return (
    <>
      <Header locale={locale} t={t} home={false} />
      <main id="main" className="article">
        <article className="wrap">
          <div className="article-inner" lang="vi">
            <a className="back" href={`${root}/#blog`} lang={locale === "zh-tw" ? "zh-Hant-TW" : locale}>
              <ArrowRight />
              {t.blog.allPosts}
            </a>
            <p className="post-meta">
              {p.category} · <time dateTime={p.date}>{date}</time> · {p.minutes} phút đọc
            </p>
            <h1>{p.title}</h1>
            <p className="lede">{p.excerpt}</p>
            <div className="prose">
              {p.body.map((para) =>
                para.startsWith("## ") ? <h2 key={para}>{para.slice(3)}</h2> : <p key={para}>{para}</p>,
              )}
            </div>
            <nav className="more" aria-label="Bài viết khác">
              <h2>Bài viết khác</h2>
              <ul className="posts">
                {others.map((o) => (
                  <li key={o.slug}>
                    <a href={`${root}/blog/${o.slug}/`}>
                      <div className="post-body">
                        <h3>{o.title}</h3>
                        <p>{o.excerpt}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </article>
      </main>
      <Footer t={t} />
    </>
  );
}
