import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/brand/SectionHeading";
import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { BenefitIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo/metadata";
import { MEMBERSHIP_PURCHASE_URL } from "@/lib/config";
import {
  MEMBERSHIP_TIERS,
  MEMBER_STEPS,
  MEMBER_BENEFITS,
  MEMBER_FAQS,
  CAMARILLO_CAP_NOTE,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Membership",
  description:
    "Membership is the flexible way to hear it all: reserve seats at a flat $20 each, whenever you want them, at either venue. Not a fixed subscription, and not a donation.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="hero hero--md">
        <div className="hero__media">
          <Image
            src="/assets/photos/photo-hero-hall.jpg"
            alt="A full concert hall before a New West Symphony performance"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">Membership · Your Symphony, Your Choice</div>
            <hr className="hero__rule" />
            <h1 className="hero__title">Your symphony, on your terms.</h1>
            <p className="hero__lead">
              Reserve seats at a flat $20 each, whenever you want them, at either venue —
              with member perks all year. Flexible access to the music you love, without a
              fixed package.
            </p>
            <p className="hero__clarifier">Not a fixed subscription. Not a donation.</p>
            <div className="hero__actions">
              <Button href="#memberTiers" variant="gold" size="lg">
                Become a Member
              </Button>
              <Button href="#memberHow" variant="ghost" size="lg" onDark>
                See how it works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — How it works */}
      <section className="section anchor-target" id="memberHow">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Three simple steps"
          />
          <div className="steps-grid mt-6">
            {MEMBER_STEPS.map((step) => (
              <Card accent key={step.n}>
                <div className="step-card__n">{step.n}</div>
                <div className="step-card__t">{step.t}</div>
                <p className="step-card__b">{step.b}</p>
              </Card>
            ))}
          </div>
          <div className="reassure">
            $20 a seat — the flat member price, every time.
          </div>
        </div>
      </section>

      {/* 3 — Choose your tier */}
      <section className="section band-cream anchor-target" id="memberTiers">
        <div className="container">
          <SectionHeading align="center" eyebrow="Membership" title="Choose your tier" />
          <div className="tier-grid mt-6">
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={tier.featured ? "tier-card tier-card--featured" : "tier-card"}
              >
                <div className="tier-card__cap">
                  <div className="tier-card__price">
                    {tier.priceYear}
                    <span>/ year</span>
                  </div>
                  <div className="tier-card__name">{tier.name}</div>
                  {tier.badge && (
                    <div>
                      <Badge tone={tier.featured ? "gold" : "navy"} solid={tier.featured}>
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="tier-card__body">
                  <div className="tier-feature">
                    <span className="tier-feature__k">Membership tickets</span>
                    <span className="tier-feature__v">
                      Up to {tier.ticketsUpTo} at $20 each
                    </span>
                  </div>
                  <div className="tier-feature">
                    <span className="tier-feature__k">Seating</span>
                    <span className="tier-feature__v">{tier.seating}</span>
                  </div>
                  <div className="tier-feature">
                    <span className="tier-feature__k">Member events</span>
                    <span className="tier-feature__v">{tier.memberEvents}</span>
                  </div>
                  <div className="tier-feature">
                    <span className="tier-feature__k">Extra tickets</span>
                    <span className="tier-feature__v">{tier.extraTicketDiscount}</span>
                  </div>
                </div>
                <div className="tier-card__cta">
                  <Button
                    href={MEMBERSHIP_PURCHASE_URL}
                    variant={tier.featured ? "gold" : "ghost"}
                    fullWidth
                  >
                    Choose {tier.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="footnote mt-6">
            NextGen is for high-school &amp; college students; Family is for households with
            kids under 18. {CAMARILLO_CAP_NOTE}
          </p>
          <p id="purchase-tbc" className="anchor-target footnote">
            Online membership purchase opens soon — call the box office to join now.
          </p>
        </div>
      </section>

      {/* 4 — Benefits beyond seats */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Membership" title="Benefits beyond seats" />
          <div className="benefits-grid mt-6">
            {MEMBER_BENEFITS.map((benefit) => (
              <div className="benefit-card" key={benefit.t}>
                <span className="icon-chip">
                  <BenefitIcon title={benefit.t} />
                </span>
                <div className="benefit-card__t">{benefit.t}</div>
                <p className="benefit-card__b">{benefit.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — FAQ */}
      <section className="section band-cream">
        <div className="container">
          <SectionHeading align="center" eyebrow="Good to know" title="Questions, answered" />
          <div className="mt-6">
            <FaqAccordion items={MEMBER_FAQS} />
          </div>
        </div>
      </section>

      {/* 6 — Closing CTA */}
      <section className="section band-navy">
        <div className="container">
          <SectionHeading
            onDark
            align="center"
            eyebrow="Membership"
            title="Ready when you are"
          />
          <div
            className="hero__actions"
            style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
          >
            <Button href={MEMBERSHIP_PURCHASE_URL} variant="gold" size="lg">
              Become a Member
            </Button>
            <Button href="/concerts" variant="ghost" size="lg" onDark>
              Browse the Season
            </Button>
          </div>
          <p className="text-center mt-6">
            <a href="/support" className="quiet-link quiet-link--on-dark">
              Prefer to give instead? Support the symphony →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
