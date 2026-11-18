import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { htmlLang } from "@/lib/i18n";
import { site } from "@/lib/site";
import "@fontsource-variable/space-grotesk";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@/app/globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  founder: { "@type": "Person", name: site.owner },
  email: site.contact.email,
  areaServed: ["VN", "TW"],
  ...(site.contact.facebook ? { sameAs: [site.contact.facebook] } : {}),
  image: site.url + "/portrait.jpg",
  knowsAbout: ["Artificial intelligence", "CAD/CAM", "CNC programming", "3D design", "Digital marketing"],
};

/** Shared <html>/<body> for every root layout. */
export default function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={htmlLang[locale]}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
