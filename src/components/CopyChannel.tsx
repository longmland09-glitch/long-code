"use client";

import { useState, type ReactNode } from "react";

/** Contact channel without a deep link (LINE by phone number): tap copies the number. */
export default function CopyChannel({
  label,
  value,
  hint,
  copied,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  copied: string;
  icon: ReactNode;
}) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard can be blocked; fall back to a selectable prompt.
      window.prompt(label, value);
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 2500);
  };

  return (
    <button type="button" onClick={copy} aria-describedby={`${label}-hint`}>
      {icon}
      <span>
        {label} · {value}
        <small id={`${label}-hint`} aria-live="polite">
          {done ? copied : hint}
        </small>
      </span>
    </button>
  );
}
