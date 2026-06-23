import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import { EducationIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo/metadata";
import { EDUCATION_DETAIL, EDUCATION_OVERVIEW } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Education",
  description:
    "Music education at the New West Symphony — Symphonic Adventures, the Laby Harmony Project, the Music Van, the Quick Bowman Piano Competition, and Intermission Insights, reaching thousands of students a year.",
  path: "/education",
});

export default function EducationPage() {
  return (
    <>
      {/* 1 — Banner hero */}
      <section className="hero hero--banner">
        <div className="hero__media">
          <Image
            src="/assets/photos/education-harmony.jpg"
            alt="Students of the Laby Harmony Project performing together"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>
        <div className="hero__scrim hero__scrim--bottom" />
        <div className="container hero__banner-title">
          <h1 className="hero__title hero__title--md">
            We believe live music is for everyone
          </h1>
        </div>
      </section>

      {/* 2 — Overview */}
      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Music education"
            title="Reaching the next generation"
            subtitle={EDUCATION_OVERVIEW}
          />
        </div>
      </section>

      {/* 3 — Program jump-nav */}
      <section className="section-tight">
        <div className="container">
          <nav className="edu-nav" aria-label="Education programs">
            {EDUCATION_DETAIL.map((p) => (
              <a key={p.key} href={`#${p.key}`} className="edu-nav-card">
                <span className="edu-nav-card__icon">
                  <EducationIcon programKey={p.key} />
                </span>
                <span className="edu-nav-card__name">{p.name}</span>
                <span className="edu-nav-card__tag">{p.tagline}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 4 — Program detail sections */}
      {EDUCATION_DETAIL.map((p, i) => {
        const cream = i % 2 === 0;
        const imageRight = i % 2 === 1;
        const media = (
          <div className="media-frame" key="media">
            <Image
              src={p.photo}
              alt={`${p.name} — New West Symphony education`}
              fill
              sizes="(max-width: 960px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        );
        const text = (
          <div key="text">
            <SectionHeading eyebrow={p.tagline} title={p.name} />
            <div className="prose mt-6">
              {p.summary.map((para, j) => (
                <p key={j} className={j === 0 ? "lead" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        );
        return (
          <section
            key={p.key}
            id={p.key}
            className={`section anchor-target${cream ? " band-cream" : ""}`}
          >
            <div className="container split">
              {imageRight ? [text, media] : [media, text]}
            </div>
          </section>
        );
      })}

      {/* 5 — Support CTA */}
      <section className="section">
        <div className="container">
          <div className="legacy-card">
            <SectionHeading
              onDark
              align="center"
              eyebrow="Make it possible"
              title="Your gift funds this"
              subtitle="Tickets cover only part of what it takes. Every dollar you give puts an instrument in a child's hands and the orchestra in front of a classroom that has never heard one live."
            />
            <div
              className="hero__actions"
              style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
            >
              <Button href="/support" variant="gold" size="lg">
                Support Education
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
