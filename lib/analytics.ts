// Analytics + consent (audit H5). GA4 is loaded ONLY after the visitor accepts
// the consent banner; until then nothing fires. The measurement ID is org-side.
//
// TODO(NWS): set NEXT_PUBLIC_GA_ID to the real GA4 measurement ID (e.g. G-XXXXXXX).
// While unset, the consent banner and GA stay inert (no tracking at all).
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const CONSENT_KEY = "nws-analytics-consent";
export type ConsentState = "granted" | "denied";

/** The five conversion events the site reports (spec §9). */
export type GaEvent =
  | "buy_tickets_click"
  | "become_member_click"
  | "donate_click"
  | "donation_amount_selected"
  | "membership_tier_selected";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/**
 * Fire a GA4 event — but only when there is a measurement ID, the visitor has
 * granted consent, and gtag has actually loaded. Otherwise it is a silent no-op,
 * so call sites never need to guard.
 */
export function track(event: GaEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!GA_ID) return;
  if (getConsent() !== "granted") return;
  window.gtag?.("event", event, params);
}
