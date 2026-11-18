import type { MetadataRoute } from "next";
import { base, locales } from "@/lib/i18n";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...posts.map((p) => `/blog/${p.slug}/`)];
  return pages.flatMap((path) =>
    locales.map((l) => ({
      url: site.url + base(l) + path,
      changeFrequency: path === "/" ? "monthly" : "yearly",
      priority: path === "/" ? 1 : 0.6,
    })),
  );
}
