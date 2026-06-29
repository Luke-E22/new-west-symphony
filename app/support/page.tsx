import type { Metadata } from "next";
import Image from "next/image";
import Logo from "@/components/brand/Logo";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import GivingModule from "@/components/sections/GivingModule";
import { buildMetadata } from "@/lib/seo/metadata";
import { EXTERNAL, SITE } from "@/lib/config";
import { GIVING_PROGRAMS } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Support",
  description:
    "Make a charitable gift to the New West Symphony — distinct from membership, fully tax-deductible, and the reason live orchestral music stays within reach across the region.",
  path: "/support",
});

export default function SupportPage() {
  const programs = GIVING_PROGRAMS.filter((p) => !p.isLegacy);
  const legacy = GIVING_PROGRAMS.find((p) => p.isLegacy);

  return (
    <>
      {/* 1 — Split hero */}
      <section className="section">
        <div className="container split">
          <div>
            <div className="media-frame">
              <Image
                src="/assets/photos/photo-donate.jpg"
                alt="A young student holding a violin at a New West Symphony education program"
                fill
                preload
                quality={55}
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="caption">
              A first instrument, made possible by donors — placeholder photography.
            </p>
          </div>
          <div className="legacy-card">
            <SectionHeading
              as="h1"
              onDark
              eyebrow="Support"
              title="Your gift puts an instrument in a child's hands"
            />
            <p className="on-dark-muted lead mt-4">
              Ticket sales cover less than half of what it takes to put a professional
              orchestra on the stage and music in classrooms across {SITE.serviceArea}.
              A charitable gift — separate from membership — closes the gap.
            </p>
            <div className="hero__actions">
              <Button href={EXTERNAL.donate} variant="gold" size="lg" track="donate_click" trackParams={{ location: "support-hero" }}>
                Donate Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Donation module + more ways to give */}
      <section className="section">
        <div className="container split">
          <div>
            <GivingModule />
          </div>
          <div>
            <SectionHeading eyebrow="Beyond a one-time gift" title="More ways to give" />
            <div className="card-grid mt-6">
              {programs.map((program) => (
                <div className="program-card" key={program.name}>
                  <div className="program-card__t">{program.name}</div>
                  <div className="program-card__b">{program.blurb}</div>
                  <Button href={EXTERNAL.donate} variant="link" track="donate_click" trackParams={{ location: "support-program-card", program: program.name }}>
                    Learn more →
                  </Button>
                </div>
              ))}
            </div>

            {legacy && (
              <div className="legacy-card mt-6">
                <Logo variant="legacy" height={40} />
                <div className="program-card__t mt-4" style={{ color: "var(--text-on-dark)" }}>
                  {legacy.name}
                </div>
                <p className="on-dark-muted mt-4">{legacy.blurb}</p>
                <div className="hero__actions">
                  <Button href={EXTERNAL.donate} variant="ghost" onDark track="donate_click" trackParams={{ location: "support-legacy" }}>
                    Plan your legacy
                  </Button>
                </div>
              </div>
            )}

            <p className="muted mt-6">
              There&rsquo;s a seat for you on our board, too.{" "}
              <Button href="/get-involved/board" variant="ghost" size="sm">
                Lead
              </Button>
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Stewardship & trust */}
      <section className="section band-cream">
        <div className="container trust-band text-center">
          <p className="pull-quote">
            Every gift is stewarded with care — toward the music, the musicians, and the
            students who carry it forward.
          </p>
          <p className="trust-row">
            {SITE.legalName} · {SITE.nonprofitStatus} nonprofit · EIN {SITE.ein} · Gifts are
            tax-deductible as allowed by law.
          </p>
        </div>
      </section>
    </>
  );
}
