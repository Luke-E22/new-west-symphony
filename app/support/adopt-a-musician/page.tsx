import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import { buildMetadata } from "@/lib/seo/metadata";
import { EXTERNAL, SITE } from "@/lib/config";
import { ADOPTION_LEVELS } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Adopt-A-Musician",
  description:
    "Adopt A Musician connects you with your favorite instrument or musician in the New West Symphony — meet your musician, join private receptions, and support the orchestra.",
  path: "/support/adopt-a-musician",
});

/** Campaign contact, from the live page — Patricia Jones, Director of Special Projects. */
const CONTACT = {
  name: "Patricia Jones",
  phone: "(805) 435-2775",
  email: "pjones@newwestsymphony.org",
};

const BENEFITS = [
  "Meet with your adopted musician",
  "Exclusive invitations to private rehearsal receptions",
  "Private events where you can mingle with and get to know your adopted musician",
  "Recognition in the concert programs — and much more",
];

export default function AdoptAMusicianPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="hero hero--sm">
        <div className="hero__media">
          <Image
            src="/assets/photos/orchestra-performance.jpg"
            alt="Musicians of the New West Symphony performing on stage"
            fill
            preload
            quality={55}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">Support · Fundraising campaign</div>
            <hr className="hero__rule" />
            <h1 className="hero__title hero__title--md">Adopt a Musician</h1>
            <p className="hero__lead">
              Connect with your favorite instrument or musician in the orchestra —
              and keep the music playing across {SITE.serviceArea}.
            </p>
            <div className="hero__actions">
              <Button
                href={EXTERNAL.adoptAMusician}
                variant="gold"
                size="lg"
                track="donate_click"
                trackParams={{ location: "adopt-hero", campaign: "adopt-a-musician" }}
              >
                Adopt a Musician
              </Button>
              <Button href="#levels" variant="ghost" size="lg" onDark>
                See adoption levels
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — What it is */}
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="The program"
              title="Your seat at the heart of the orchestra"
              subtitle="Adopt A Musician connects you with your favorite instrument or musician in the orchestra."
            />
            <ul className="program-list mt-6">
              {BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="muted mt-4">
              All proceeds directly support the orchestra&rsquo;s continued operations
              and maintain its educational outreach to our community.
            </p>
            <div className="hero__actions">
              <Button href="/about#orchestra" variant="link">
                Meet the musicians of the orchestra →
              </Button>
            </div>
          </div>
          <div>
            <div className="media-frame">
              <Image
                src="/assets/photos/nws-chorus.jpg"
                alt="The New West Symphony on stage with chorus"
                fill
                quality={60}
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="caption">
              Every chair on stage is a musician you can adopt for the season.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Adoption levels */}
      <section className="section band-cream anchor-target" id="levels">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Adoption levels"
            title="Choose your chair"
            subtitle="Adopt a musician today with a secure donation — pick the level that fits."
          />
          <div className="grid grid-4 mt-6 adopt-levels">
            {ADOPTION_LEVELS.map((l) => (
              <Card key={l.level} accent padding="var(--space-6)">
                <div className="adopt-level__amount">{l.amount}</div>
                <div className="adopt-level__name">{l.level}</div>
              </Card>
            ))}
          </div>
          <div className="hero__actions mt-6" style={{ justifyContent: "center" }}>
            <Button
              href={EXTERNAL.adoptAMusician}
              variant="gold"
              size="lg"
              track="donate_click"
              trackParams={{ location: "adopt-levels", campaign: "adopt-a-musician" }}
            >
              Adopt a Musician
            </Button>
          </div>
          <p className="footnote mt-4" style={{ textAlign: "center" }}>
            Adoptions are processed as secure, tax-deductible donations. {SITE.legalName}{" "}
            · {SITE.nonprofitStatus} nonprofit · EIN {SITE.ein}.
          </p>
        </div>
      </section>

      {/* 4 — Contact */}
      <section className="section band-navy">
        <div className="container text-center">
          <SectionHeading
            onDark
            align="center"
            eyebrow="Questions?"
            title="We'd love to make the introduction"
            subtitle="For more information about adopting a musician, contact us directly."
          />
          <p className="lead mt-6" style={{ color: "var(--text-on-dark)" }}>
            {CONTACT.name} ·{" "}
            <a href={`tel:+1${CONTACT.phone.replace(/\D/g, "")}`} className="on-dark-link">
              {CONTACT.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${CONTACT.email}`} className="on-dark-link">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
