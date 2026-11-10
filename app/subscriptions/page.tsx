import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import FaqAccordion from "@/components/sections/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { BenefitIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { EXTERNAL, SITE, SUBSCRIPTION_SEASON } from "@/lib/config";
import {
  SUBSCRIPTION_BENEFITS,
  SUBSCRIPTION_FAQS,
  SUBSCRIPTION_RENEWAL_STEPS,
  SUBSCRIPTION_STEPS,
  SUBSCRIPTION_VS_MEMBERSHIP,
  subscriptionSeries,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Subscriptions",
  description: `Subscribe to all six ${SUBSCRIPTION_SEASON} Masterpiece concerts and keep the same seats at every one, in Thousand Oaks or Camarillo, with up to 20% off single-ticket prices.`,
  path: "/subscriptions",
});

const ticketOfficeTel = `tel:+1${SITE.ticketOfficeTollFree.replace(/\D/g, "")}`;

export default function SubscriptionsPage() {
  const series = subscriptionSeries();

  return (
    <>
      {/* 1 — Hero */}
      <section className="hero hero--md">
        <div className="hero__media">
          <Image
            src="/assets/photos/orchestra-performance.jpg"
            alt="Michael Christie conducting the New West Symphony before a full house"
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
            <div className="hero__eyebrow">
              Subscriptions · {SUBSCRIPTION_SEASON} Masterpiece Series
            </div>
            <hr className="hero__rule" />
            <h1 className="hero__title">Your seats, all season.</h1>
            <p className="hero__lead">
              Subscribe once and sit in the same seats at all six Masterpiece concerts,
              with up to 20% off single-ticket prices.
            </p>
            <p className="hero__clarifier">Not a membership. Not a donation.</p>
            <div className="hero__actions">
              <Button
                href="#series"
                variant="gold"
                size="lg"
                track="subscribe_click"
                trackParams={{ location: "subscriptions-hero" }}
              >
                Choose Your Series
              </Button>
              <Button href="#compare" variant="ghost" size="lg" onDark>
                Compare with Membership
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — How it works */}
      <section className="section">
        <div className="container">
          <SectionHeading align="center" eyebrow="How it works" title="Three simple steps" />
          <div className="steps-grid mt-6">
            {SUBSCRIPTION_STEPS.map((step) => (
              <Card accent key={step.n}>
                <div className="step-card__n">{step.n}</div>
                <div className="step-card__t">{step.t}</div>
                <p className="step-card__b">{step.b}</p>
              </Card>
            ))}
          </div>
          <div className="reassure">
            Only subscribers are guaranteed the same seats at every concert.
          </div>
        </div>
      </section>

      {/* 3 — The two series. Dates come from the concert data; each card shows
          its buy button once that venue's series is on sale (lib/config). */}
      <section className="section band-cream anchor-target" id="series">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow={`${SUBSCRIPTION_SEASON} Masterpiece Series`}
            title="Choose your series"
            subtitle="Every concert plays twice. Pick your day, and it’s yours for the season."
          />
          <div className="series-grid mt-6">
            {series.map((s) => (
              <article className="series-card" key={s.venueKey}>
                <div className="series-card__cap">
                  <div className="series-card__eyebrow">{s.label}</div>
                  <h3 className="series-card__title">{s.city}</h3>
                  <p className="series-card__meta">
                    {s.when}
                    <br />
                    {s.venueName}
                  </p>
                </div>
                <ol className="series-card__dates">
                  {s.concerts.map((c) => (
                    <li key={c.slug}>
                      <span className="series-card__date">{c.date}</span>
                      <Link href={`/concerts/${c.slug}`}>{c.title}</Link>
                    </li>
                  ))}
                </ol>
                <div className="series-card__cta">
                  {s.purchase ? (
                    <>
                      <Button
                        href={s.purchase.href}
                        variant="gold"
                        size="lg"
                        fullWidth
                        track="subscribe_click"
                        trackParams={{
                          location: "subscriptions-series",
                          venue: s.venueKey,
                          season: SUBSCRIPTION_SEASON,
                        }}
                      >
                        Subscribe in {s.city}
                      </Button>
                      {s.purchase.note && (
                        <p className="buy-option__when">{s.purchase.note}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="series-card__soon">
                        {SUBSCRIPTION_SEASON} subscriptions opening soon
                      </p>
                      <Button
                        href={ticketOfficeTel}
                        target="_self"
                        variant="ghost"
                        size="lg"
                        fullWidth
                        aria-label={`Call the Ticket Office about the ${s.city} series, ${SITE.ticketOfficeTollFree}`}
                      >
                        Call {SITE.ticketOfficeTollFree}
                      </Button>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="footnote mt-6 text-center">
            Program and artists are subject to change. Just want one night?{" "}
            <Link href="/concerts">Browse the concerts</Link>.
          </p>
        </div>
      </section>

      {/* 4 — Benefits */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Subscribers" title="What you get" />
          <div className="benefits-grid mt-6">
            {SUBSCRIPTION_BENEFITS.map((benefit) => (
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

      {/* 5 — Subscription vs membership. The explicit roles keep table semantics
          when the mobile layout restyles these elements as blocks. */}
      <section className="section band-cream anchor-target" id="compare">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Not sure which?"
            title="Subscription or membership"
            subtitle="Both put you in the hall. They work differently."
          />
          <div className="compare mt-6">
            <table className="compare__table" role="table">
              <caption className="sr-only">
                How a subscription compares with a membership
              </caption>
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" role="columnheader" className="compare__featured">
                    Subscription
                  </th>
                  <th scope="col" role="columnheader">
                    Membership
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {SUBSCRIPTION_VS_MEMBERSHIP.map((row) => (
                  <tr role="row" key={row.label}>
                    <th scope="row" role="rowheader">
                      {row.label}
                    </th>
                    <td role="cell" className="compare__featured" data-label="Subscription">
                      {row.subscription}
                    </td>
                    <td role="cell" data-label="Membership">
                      {row.membership}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-6">
            <Link href="/membership" className="quiet-link">
              See the membership tiers →
            </Link>
          </p>
        </div>
      </section>

      {/* 6 — Renewal for current subscribers */}
      <section className="section anchor-target" id="renew">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="Current subscribers" title="Renew your subscription" />
            <p className="lead mt-4">
              Keep your seats for another season. You can renew online in the Patron
              Portal.
            </p>
            <div className="hero__actions">
              <Button
                href={EXTERNAL.patronRenewal}
                variant="solid"
                size="lg"
                track="subscribe_click"
                trackParams={{ location: "subscriptions-renew" }}
              >
                Renew in the Patron Portal
              </Button>
            </div>
          </div>
          <div>
            <ol className="program-list program-list--numbered">
              {SUBSCRIPTION_RENEWAL_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="footnote">
              Need help logging in? Call the Ticket Office at{" "}
              <a href={ticketOfficeTel}>{SITE.ticketOfficeTollFree}</a> or email{" "}
              <a href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="section band-cream">
        <div className="container">
          <SectionHeading align="center" eyebrow="Good to know" title="Questions, answered" />
          <div className="mt-6">
            <FaqAccordion items={SUBSCRIPTION_FAQS} />
          </div>
          <JsonLd data={faqJsonLd(SUBSCRIPTION_FAQS)} />
        </div>
      </section>

      {/* 8 — Closing CTA */}
      <section className="section band-navy">
        <div className="container">
          <SectionHeading
            onDark
            align="center"
            eyebrow="Subscriptions"
            title="Same seats. All season."
          />
          <div
            className="hero__actions"
            style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
          >
            <Button
              href="#series"
              variant="gold"
              size="lg"
              track="subscribe_click"
              trackParams={{ location: "subscriptions-footer-cta" }}
            >
              Choose Your Series
            </Button>
            <Button href="/membership" variant="ghost" size="lg" onDark>
              Explore Membership
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
