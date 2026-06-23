"use client";

import { useActionState } from "react";
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import { submitBoardInterest, type BoardFormState } from "@/lib/actions/board";

const initial: BoardFormState = { ok: false, message: "" };

/** Express Interest form (§Join Our Board). Posts to a server action; honeypot
 *  + required-field validation; live status region. */
export default function BoardInterestForm() {
  const [state, formAction, pending] = useActionState(submitBoardInterest, initial);

  if (state.ok) {
    return (
      <p className="form-status form-status--ok" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="eoi-form" noValidate>
      {state.message && (
        <p className="form-status form-status--err field--full" role="alert">
          {state.message}
        </p>
      )}
      <Input id="firstName" name="firstName" label="First name" autoComplete="given-name" error={state.errors?.firstName} onDark required />
      <Input id="lastName" name="lastName" label="Last name" autoComplete="family-name" error={state.errors?.lastName} onDark required />
      <Input id="email" name="email" type="email" label="Email" autoComplete="email" error={state.errors?.email} onDark required className="field--full" />
      <Input id="phone" name="phone" type="tel" label="Phone (optional)" autoComplete="tel" onDark className="field--full" />
      <Input
        id="message"
        name="message"
        label="What draws you to the symphony?"
        multiline
        onDark
        className="field--full"
      />
      {/* Honeypot — visually hidden, bots fill it. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field--full">
        <Button type="submit" variant="gold" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send My Interest"}
        </Button>
      </div>
    </form>
  );
}
