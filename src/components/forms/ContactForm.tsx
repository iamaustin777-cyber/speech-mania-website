"use client";

import { Button } from "../Button";
import { email, Field, fieldProps, required, Success, useStageForm } from "./FormKit";
import { contactPage } from "@/lib/content";

export function ContactForm() {
  const { errors, status, setStatus, handleSubmit } = useStageForm(
    {
      name: required("Name"),
      email,
      purpose: required("Purpose"),
      subject: required("Subject"),
      message: required("Message"),
    },
    async (values) => {
      // TODO: connect to a backend / email service and send `values`
      // to speechmaniaofficial@gmail.com.
      void values;
      await new Promise((r) => setTimeout(r, 600));
    },
  );

  if (status === "done")
    return <Success title="Message sent" body={contactPage.formNote + "."} onReset={() => setStatus("idle")} />;

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field name="name" label="Name" error={errors.name}>
        <input {...fieldProps("name", errors)} autoComplete="name" />
      </Field>
      <Field name="email" label="Email" error={errors.email}>
        <input {...fieldProps("email", errors)} type="email" autoComplete="email" />
      </Field>
      <Field name="purpose" label="Purpose" error={errors.purpose}>
        <select {...fieldProps("purpose", errors)} defaultValue="">
          <option value="" disabled>
            Select a purpose
          </option>
          {contactPage.purposes.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field name="subject" label="Subject" error={errors.subject}>
        <input {...fieldProps("subject", errors)} />
      </Field>
      <div className="sm:col-span-2">
        <Field name="message" label="Message" error={errors.message}>
          <textarea {...fieldProps("message", errors)} rows={5} />
        </Field>
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </Button>
        <p className="text-sm">{contactPage.formNote}</p>
      </div>
    </form>
  );
}
