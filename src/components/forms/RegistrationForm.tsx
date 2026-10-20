"use client";

import { Button } from "../Button";
import { email, Field, fieldProps, required, Success, useStageForm } from "./FormKit";
import { getInvolved } from "@/lib/content";

export function RegistrationForm() {
  const { errors, status, setStatus, handleSubmit } = useStageForm(
    {
      firstName: required("First name"),
      lastName: required("Last name"),
      email,
      school: required("School/Organization"),
      program: required("Program interest"),
    },
    async (values) => {
      // TODO: connect to a backend / email service (e.g. a Next.js route handler,
      // Formspree, Resend or Google Sheets) and send `values`.
      void values;
      await new Promise((r) => setTimeout(r, 600));
    },
  );

  if (status === "done")
    return (
      <Success
        title="Registration received"
        body="Thanks. We'll email you the workshop details."
        onReset={() => setStatus("idle")}
      />
    );

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field name="firstName" label="First Name" error={errors.firstName}>
        <input {...fieldProps("firstName", errors)} autoComplete="given-name" />
      </Field>
      <Field name="lastName" label="Last Name" error={errors.lastName}>
        <input {...fieldProps("lastName", errors)} autoComplete="family-name" />
      </Field>
      <Field name="email" label="Email" error={errors.email}>
        <input {...fieldProps("email", errors)} type="email" autoComplete="email" />
      </Field>
      <Field name="school" label="School/Organization" error={errors.school}>
        <input {...fieldProps("school", errors)} autoComplete="organization" />
      </Field>
      <div className="sm:col-span-2">
        <Field name="program" label="Program Interest" error={errors.program}>
          <select {...fieldProps("program", errors)} defaultValue="">
            <option value="" disabled>
              Select a program
            </option>
            {getInvolved.registration.programOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field name="message" label="Message" optional>
          <textarea {...fieldProps("message", errors)} rows={4} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? "Submitting…" : "Submit Registration"}
        </Button>
      </div>
    </form>
  );
}
