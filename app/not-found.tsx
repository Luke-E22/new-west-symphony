import type { Metadata } from "next";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";

export const metadata: Metadata = {
  title: "Page not found · New West Symphony",
  robots: { index: false },
};

/** Branded 404 (§11/§12) — catches any old URL missed by the redirect map. */
export default function NotFound() {
  return (
    <section className="section band-cream">
      <div className="container section-heading--center" style={{ textAlign: "center" }}>
        <SectionHeading
          as="h1"
          align="center"
          eyebrow="404 · Lost the thread"
          title="This page has left the stage."
          subtitle="The page you're looking for may have moved in our recent refresh. Let's get you back to the music."
        />
        <div
          className="hero__actions"
          style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
        >
          <Button href="/concerts" variant="gold" size="lg">
            See the 2026 Season
          </Button>
          <Button href="/" variant="ghost" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
