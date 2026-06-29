"use client";

import { useState } from "react";
import Button from "@/components/core/Button";
import { track } from "@/lib/analytics";
import { EXTERNAL } from "@/lib/config";
import { MONTHLY_AMOUNTS, ONE_TIME_AMOUNTS } from "@/lib/data";

type Freq = "once" | "monthly";

/**
 * Donation module (§7). One-time/Monthly toggle swaps the amount set and resets
 * the default ($150 once / $25 monthly). Selectable amount cards, "Other" free
 * field, live impact strip, gold Continue → the Salesforce donation form.
 * Donations are a charitable gift — distinct from membership.
 */
export default function GivingModule() {
  const [freq, setFreq] = useState<Freq>("once");
  const [amount, setAmount] = useState<number>(150);
  const [custom, setCustom] = useState<string>("");

  const amounts = freq === "once" ? ONE_TIME_AMOUNTS : MONTHLY_AMOUNTS;
  const selected = amounts.find((a) => a.value === amount);
  const customActive = custom !== "" && !selected;
  const effectiveAmount = customActive ? Number(custom) || 0 : amount;
  const suffix = freq === "monthly" ? "/mo" : "";

  function switchFreq(next: Freq) {
    setFreq(next);
    setAmount(next === "once" ? 150 : 25);
    setCustom("");
  }

  // Built with URL so amount/frequency append safely even if EXTERNAL.donate
  // already carries a query string (no double "?").
  const donateUrl = new URL(EXTERNAL.donate);
  donateUrl.searchParams.set("amount", String(effectiveAmount));
  donateUrl.searchParams.set("frequency", freq);
  const donateHref = donateUrl.toString();

  return (
    <div className="giving-module">
      <h2 style={{ font: "var(--type-display-s)", color: "var(--text-strong)", margin: 0 }}>
        Make a gift today
      </h2>

      <div
        className="seg-toggle"
        role="group"
        aria-label="Gift frequency"
      >
        <button
          type="button"
          className="seg-toggle__btn"
          aria-pressed={freq === "once"}
          onClick={() => switchFreq("once")}
        >
          One-time
        </button>
        <button
          type="button"
          className="seg-toggle__btn"
          aria-pressed={freq === "monthly"}
          onClick={() => switchFreq("monthly")}
        >
          Monthly
        </button>
      </div>

      <div className="amount-grid" role="group" aria-label="Choose an amount">
        {amounts.map((a) => (
          <button
            key={a.value}
            type="button"
            className="amount-card"
            aria-pressed={!customActive && amount === a.value}
            onClick={() => {
              setAmount(a.value);
              setCustom("");
              track("donation_amount_selected", { amount: a.value, freq });
            }}
          >
            <span className="amount-card__n">
              {a.label}
              {suffix}
            </span>
            <span className="amount-card__impact">{a.impact}</span>
          </button>
        ))}
        <div className="amount-card" data-active={customActive} style={{ cursor: "text" }}>
          <label className="minilabel" htmlFor="custom-amount">
            Other amount
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span className="amount-card__n" aria-hidden="true">
              $
            </span>
            <input
              id="custom-amount"
              className="field__control"
              inputMode="numeric"
              placeholder="Custom"
              value={custom}
              onChange={(e) => {
                const v = e.target.value.replace(/[^\d]/g, "");
                setCustom(v);
                // Deselect the preset cards while a custom amount is entered so
                // customActive activates; restore the default when cleared.
                setAmount(v === "" ? (freq === "once" ? 150 : 25) : -1);
              }}
              aria-label="Custom donation amount in dollars"
            />
          </div>
        </div>
      </div>

      <p className="impact-strip" aria-live="polite">
        {effectiveAmount > 0 ? (
          <>
            <strong>
              ${effectiveAmount.toLocaleString()}
              {suffix}
            </strong>{" "}
            — {customActive ? "every bit keeps live music close to home." : selected?.impact}
          </>
        ) : (
          "Choose an amount to see your impact."
        )}
      </p>

      <Button
        href={donateHref}
        variant="gold"
        size="lg"
        fullWidth
        disabled={effectiveAmount <= 0}
        track="donate_click"
        trackParams={{ location: "giving-module", amount: effectiveAmount, freq, custom: customActive }}
        aria-label={`Continue to give $${effectiveAmount}${suffix}`}
      >
        Continue to Give
      </Button>
      <p className="footnote mt-4">
        Secure giving through our donation partner. New West Symphony is a{" "}
        501(c)(3) nonprofit; gifts are tax-deductible as allowed by law.
      </p>
    </div>
  );
}
