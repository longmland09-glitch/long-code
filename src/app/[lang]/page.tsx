import Home from "@/components/Home";
import { isLocale, type Locale } from "@/lib/i18n";
import { homeMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return homeMetadata((isLocale(lang) ? lang : "vi") as Locale);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <Home locale={lang as Locale} />;
}
