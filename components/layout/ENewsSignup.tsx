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

  // TODO(audit P2): "Thanks!" shows optimistically regardless of Mailchimp success; input stays editable + button stuck. Disable input/button after submit (cross-origin embed has no success callback) or time-box the label. — see AUDIT.md
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
      <Button type="submit" variant="gold" size="md">
        {submitted ? "Thanks!" : "Join"}
      </Button>
    </form>
  );
}
