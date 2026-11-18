import Article, { articleMetadata } from "@/components/Article";
import { posts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return articleMetadata("vi", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <Article locale="vi" slug={(await params).slug} />;
}
