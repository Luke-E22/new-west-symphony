"use client"; // global-error replaces the root layout, so it must be a Client
// Component and render its own <html>/<body> + import its own styles/fonts.

import { useEffect } from "react";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/layout.css";
import "@/styles/sections.css";
import { fontVariables } from "./fonts";

/**
 * Branded last-resort boundary (audit P1). Catches errors thrown in the root
 * layout / Header / ConsentAnalytics / font loading — which app/error.tsx (which
 * renders inside the layout) cannot reach — so those never fall through to
 * Next's unbranded default error screen. Next 16 passes `unstable_retry`.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <section className="section band-cream">
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ font: "var(--type-display-s)", color: "var(--text-strong)", margin: 0 }}>
              We hit a wrong note.
            </h1>
            <p className="lead mt-4" style={{ color: "var(--text-muted)" }}>
              Something went wrong loading the page. Try again, or head back to the
              music.
            </p>
            <div
              className="hero__actions"
              style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
            >
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={() => unstable_retry()}
              >
                Try again
              </button>
              {/* Plain <a> (full reload), not <Link>: global-error replaces the
                  root layout, so the App Router context isn't guaranteed — a hard
                  navigation reliably escapes the broken state. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className="btn btn--ghost btn--lg">
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
