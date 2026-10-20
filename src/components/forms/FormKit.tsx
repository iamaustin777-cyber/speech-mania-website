"use client";

import { useState, type ReactNode } from "react";
import { CheckIcon } from "../Icons";

export type Errors = Record<string, string>;
export type Rules = Record<string, (value: string) => string | undefined>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const required = (label: string) => (v: string) => (v.trim() ? undefined : `${label} is required.`);
export const email = (v: string) =>
  !v.trim() ? "Email is required." : EMAIL.test(v.trim()) ? undefined : "Please enter a valid email address.";

/** Client-side validation + success state. `onValid` gets the form values. */
export function useStageForm(rules: Rules, onValid: (values: Record<string, string>) => Promise<void> | void) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Errors = {};
    for (const [name, rule] of Object.entries(rules)) {
      const msg = rule(values[name] ?? "");
      if (msg) next[name] = msg;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    await onValid(values);
    setStatus("done");
  };

  return { errors, status, setStatus, handleSubmit };
}

export function Field({
  name,
  label,
  error,
  optional,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-mute">(Optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Props wiring an input to its label + error message. */
export const fieldProps = (name: string, errors: Errors) => ({
  id: name,
  name,
  className: "field",
  "aria-invalid": errors[name] ? (true as const) : undefined,
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
});

export function Success({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <div role="status" className="flex flex-col items-center gap-5 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-gold/15 text-gold">
        <CheckIcon aria-hidden className="size-6" />
      </span>
      <p className="heading text-3xl">{title}</p>
      <p className="max-w-sm">{body}</p>
      <button type="button" onClick={onReset} className="font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
        Send another
      </button>
    </div>
  );
}
