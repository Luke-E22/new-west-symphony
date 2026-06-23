"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import {
  GA_ID,
  CONSENT_KEY,
  getConsent,
  type ConsentState,
} from "@/lib/analytics";

/**
 * CCPA/CPRA consent gate for GA4 (audit H5). GA does not load until the visitor
 * accepts; declining (or ignoring) means no GA script, no gtag, no beacons.
 * Renders nothing until NEXT_PUBLIC_GA_ID is provided.
 *
 * Consent is read with useSyncExternalStore so the client localStorage value
 * never causes a hydration mismatch and the banner appears only post-hydration.
 */
const CONSENT_EVENT = "nws-consent-change";

function subscribeConsent(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
const noopSubscribe = () => () => {};

export default function ConsentAnalytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  if (!GA_ID) return null;

  function choose(value: ConsentState) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {hydrated && consent === null && (
        <div className="consent-banner" role="region" aria-label="Privacy choices">
          <p className="consent-banner__text">
            We use analytics cookies to understand how the site is used. Accept to
            help us improve, or decline — your choice is remembered.{" "}
            <a href="/privacy" className="consent-banner__link">
              Privacy policy
            </a>
            .
          </p>
          <div className="consent-banner__actions">
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => choose("denied")}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn btn--gold btn--sm"
              onClick={() => choose("granted")}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
