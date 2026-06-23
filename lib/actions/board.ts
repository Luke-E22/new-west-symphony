"use server";

import { EXTERNAL } from "@/lib/config";

/**
 * Board "Express Interest" handler (audit H6). Delivers the lead to a provider-
 * agnostic HTTP endpoint (Salesforce web-to-lead, Zapier/Make, a Resend webhook,
 * etc.) set via BOARD_INTEREST_ENDPOINT (+ optional bearer BOARD_INTEREST_TOKEN).
 * It NEVER reports success unless the lead was actually delivered: if the
 * endpoint is unset or the POST fails, it returns an error that points the
 * prospect at a real inbox instead of silently dropping them. Honeypot provides
 * spam protection; add Turnstile before launch if abuse appears.
 *
 * TODO(NWS): set BOARD_INTEREST_ENDPOINT (and BOARD_INTEREST_TOKEN if required).
 */

export interface BoardFormState {
  ok: boolean;
  message: string;
  /** Field-level errors keyed by field name. */
  errors?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitBoardInterest(
  _prev: BoardFormState,
  formData: FormData,
): Promise<BoardFormState> {
  // Honeypot — real users never fill a hidden field. Pretend success.
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true, message: "Thank you — we'll be in touch." };
  }

  const first = (formData.get("firstName") as string)?.trim() ?? "";
  const last = (formData.get("lastName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (!first) errors.firstName = "Please enter your first name.";
  if (!last) errors.lastName = "Please enter your last name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please fix the errors below.", errors };
  }

  const lead = {
    firstName: first,
    lastName: last,
    email,
    phone,
    message,
    source: "website-board-interest",
    submittedAt: new Date().toISOString(),
  };

  const endpoint = process.env.BOARD_INTEREST_ENDPOINT;
  const token = process.env.BOARD_INTEREST_TOKEN;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`lead endpoint responded ${res.status}`);
      return {
        ok: true,
        message: `Thank you, ${first}. Our Board Chair will reach out soon.`,
      };
    } catch (err) {
      // Delivery failed — do NOT claim success; give the prospect a real path.
      console.error("[board-interest] delivery failed:", err, lead);
      return {
        ok: false,
        message: `Sorry — we couldn't submit your interest just now. Please email us at ${EXTERNAL.boardInterestEmail} and we'll be in touch.`,
      };
    }
  }

  // No endpoint configured: never silently drop, never over-promise outreach.
  console.error(
    "[board-interest] BOARD_INTEREST_ENDPOINT not configured; lead NOT delivered:",
    lead,
  );
  return {
    ok: false,
    message: `Thanks, ${first}. Our online board intake isn't live yet — please email us at ${EXTERNAL.boardInterestEmail} so we can connect.`,
  };
}
