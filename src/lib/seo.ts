import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { base, dictionaries, htmlLang, locales } from "./i18n";
import { site } from "./site";

/** hreflang alternates for a path that exists in every locale (e.g. "/" or "/blog/x/"). */
export function alternates(locale: Locale, path = "/"): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = base(l) + path;
  languages["x-default"] = path;
  return { canonical: base(locale) + path, languages };
}

export function homeMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: base(locale) + "/",
      locale: htmlLang[locale].replace("-Hant", "").replace("-", "_"),
    },
    twitter: { card: "summary", title: t.meta.title, description: t.meta.description },
  };
}
