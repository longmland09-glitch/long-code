"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ArrowUpRight } from "./Icons";

type Field = "name" | "reach" | "message";

/**
 * Collaboration request form. Without a backend it composes an email in the
 * visitor's mail app. To store requests instead (e.g. Supabase), replace the
 * body of `submit` with an API call.
 */
export default function ContactForm({ t }: { t: Dict["contact"]["form"] }) {
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const val = (k: string) => String(data.get(k) ?? "").trim();
    const next: Partial<Record<Field, boolean>> = {};
    (["name", "reach", "message"] as Field[]).forEach((k) => {
      if (!val(k)) next[k] = true;
    });
    setErrors(next);
    const first = (["name", "reach", "message"] as Field[]).find((k) => next[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const subject = `${t.subject}: ${val("topic")} — ${val("name")}`;
    const body = [
      `${t.name}: ${val("name")}`,
      `${t.reach}: ${val("reach")}`,
      `${t.topic}: ${val("topic")}`,
      "",
      val("message"),
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const clear = (k: Field) => errors[k] && setErrors((e) => ({ ...e, [k]: false }));

  const err = (k: Field) =>
    errors[k] ? (
      <p className="error" id={`${k}-error`}>
        {t.required}
      </p>
    ) : null;

  const describedBy = (k: Field, help?: boolean) =>
    [help ? `${k}-help` : "", errors[k] ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} className="form" noValidate onSubmit={submit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">{t.name}</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={errors.name || undefined}
            aria-describedby={describedBy("name")}
            onInput={() => clear("name")}
          />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="reach">{t.reach}</label>
          <input
            id="reach"
            name="reach"
            autoComplete="tel"
            required
            aria-invalid={errors.reach || undefined}
            aria-describedby={describedBy("reach", true)}
            onInput={() => clear("reach")}
          />
          <p className="help" id="reach-help">
            {t.reachHelp}
          </p>
          {err("reach")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="topic">{t.topic}</label>
        <select id="topic" name="topic" defaultValue={t.topics[0]}>
          {t.topics.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">{t.message}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={errors.message || undefined}
          aria-describedby={describedBy("message", true)}
          onInput={() => clear("message")}
        />
        <p className="help" id="message-help">
          {t.messageHelp}
        </p>
        {err("message")}
      </div>

      <div aria-live="polite">{sent && <p className="form-status">{t.sent}</p>}</div>

      <button type="submit" className="btn btn-primary">
        {t.submit}
        <ArrowUpRight />
      </button>
    </form>
  );
}
