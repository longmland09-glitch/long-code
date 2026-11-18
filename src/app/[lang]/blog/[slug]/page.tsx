import Article, { articleMetadata } from "@/components/Article";
import type { Locale } from "@/lib/i18n";
import { posts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: P) {
  const { lang, slug } = await params;
  return articleMetadata(lang as Locale, slug);
}

export default async function Page({ params }: P) {
  const { lang, slug } = await params;
  return <Article locale={lang as Locale} slug={slug} />;
}
