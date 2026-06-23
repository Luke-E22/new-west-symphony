import type { Metadata } from "next";
import SectionHeading from "@/components/brand/SectionHeading";
import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import { buildMetadata } from "@/lib/seo/metadata";
import { INVOLVED_ROUTES, INVOLVEMENT_LADDER } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Get Involved",
  description:
    "Volunteer, sponsor, audition, or join our board — there's a place for everyone in the New West Symphony community, at every level of commitment.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      {/* 1 — Intro + featured banner */}
      <section className="section">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Get involved"
            title="Help your symphony thrive"
            subtitle="Every great symphony is built by the people around it. Whether you have an hour, a skill, or a seat at the table to offer, there's a way to be part of live music close to home."
          />

          <div className="featured-banner" style={{ marginTop: "var(--space-8)" }}>
            <div>
              <Badge tone="gold" solid>
                Featured
              </Badge>
              <h2
                style={{
                  font: "var(--type-h2)",
                  color: "var(--text-on-dark)",
                  margin: "var(--space-3) 0 var(--space-2)",
                }}
              >
                Join Our Board
              </h2>
              <p className="on-dark-muted" style={{ maxWidth: "52ch" }}>
                Lend your judgment, your network, and your love of music to govern
                the symphony and shape its future.
              </p>
            </div>
            <Button href="/get-involved/board" variant="gold" size="lg">
              Explore Board Service
            </Button>
          </div>
        </div>
      </section>

      {/* 2 — Ways to get involved */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {INVOLVED_ROUTES.map((route) => (
              <Card key={route.name} interactive>
                <div className="minilabel">{route.k}</div>
                <h3
                  style={{
                    font: "var(--type-h3)",
                    color: "var(--text-strong)",
                    margin: "var(--space-2) 0 var(--space-3)",
                  }}
                >
                  {route.name}
                </h3>
                <p className="muted">{route.desc}</p>
                <Button variant="link">{route.cta} →</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — The involvement ladder */}
      <section className="section band-cream">
        <div className="container">
          <SectionHeading align="center" eyebrow="Find your level" title="The involvement ladder" />
          <div className="ladder">
            {INVOLVEMENT_LADDER.map((step, i) => (
              <div
                key={step.t}
                className={i === 3 ? "ladder-step ladder-step--lead" : "ladder-step"}
              >
                <div className="ladder-step__n">{step.n}</div>
                <div className="ladder-step__t">{step.t}</div>
                <div className="ladder-step__b">{step.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
