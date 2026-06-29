"use client";

import { useState } from "react";
import Button from "@/components/core/Button";
import Input from "@/components/core/Input";
import { EXTERNAL } from "@/lib/config";

/**
 * E-news signup → Mailchimp (§1). Posts directly to the Mailchimp embedded-form
 * action (no PII touches our server). Swap EXTERNAL.mailchimpAction for the real
 * list endpoint. Honeypot field guards against bots.
 */
export default function ENewsSignup() {
  const [submitted, setSubmitted] = useState(false);

  // The Mailchimp embed posts cross-origin to a new tab with no success callback,
  // so "Thanks!" is a soft acknowledgement; lock the field + button after submit
  // (the email is captured by the native POST before React disables them) so a
  // failed/optimistic submit can't be silently re-clicked.
  return (
    <form
      className="enews-form"
      action={EXTERNAL.mailchimpAction}
      method="post"
      target="_blank"
      onSubmit={() => setSubmitted(true)}
    >
      <Input
        id="enews-email"
        type="email"
        name="EMAIL"
        label="Email address"
        placeholder="you@example.com"
        required
        autoComplete="email"
        onDark
        disabled={submitted}
      />
      {/* Mailchimp honeypot — keep visually hidden, do not remove. */}
      <div aria-hidden="true" className="sr-only">
        <input
          type="text"
          name={EXTERNAL.mailchimpHoneypot}
          tabIndex={-1}
          defaultValue=""
          autoComplete="off"
        />
      </div>
      <Button type="submit" variant="gold" size="md" disabled={submitted}>
        {submitted ? "Thanks!" : "Join"}
      </Button>
    </form>
  );
}
