"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";

/**
 * Branded route error boundary (audit Low). Catches runtime errors in page
 * segments and offers a retry. Next 16 passes `unstable_retry` (not `reset`).
 * Root-layout errors are handled by the sibling app/global-error.tsx.
 */
export default function Error({
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
    <section className="section band-cream">
      <div className="container section-heading--center" style={{ textAlign: "center" }}>
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="Something went wrong"
          title="We hit a wrong note."
          subtitle="Something went wrong loading this page. Try again, or head back to the music."
        />
        <div
          className="hero__actions"
          style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
        >
          <Button onClick={() => unstable_retry()} variant="gold" size="lg">
            Try again
          </Button>
          <Button href="/" variant="ghost" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
