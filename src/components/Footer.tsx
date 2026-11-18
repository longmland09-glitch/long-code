import type { Dict } from "@/lib/i18n";

export default function Footer({ t }: { t: Dict }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          <strong>HOANG LONG AI</strong> © 2026 · {t.footer.line}
        </p>
        <p>{t.footer.rights}</p>
      </div>
    </footer>
  );
}
