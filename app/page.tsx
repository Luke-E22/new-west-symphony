import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/brand/SectionHeading";
import EventCard from "@/components/brand/EventCard";
import Button from "@/components/core/Button";
import HeroCarousel from "@/components/sections/HeroCarousel";
import { buildMetadata } from "@/lib/seo/metadata";
import { EXTERNAL, MEMBERSHIP_PURCHASE_URL, SITE } from "@/lib/config";
import { upcomingConcerts, EDUCATION_CHIPS, IMPACT_STATS } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  bareTitle: true,
});

export default function HomePage() {
  const season = upcomingConcerts().slice(0, 3);

  return (
    <>
      {/* 1 — Hero carousel: season (LCP slide) · Adopt-A-Musician · membership.
          The page h1 lives OUTSIDE the carousel: inactive slides are
          aria-hidden, so an h1 inside slide 1 would vanish from the
          accessibility tree whenever another slide is showing. */}
      <h1 className="sr-only">
        {SITE.name} — the sound of California, close to home
      </h1>
      <HeroCarousel
        slides={[
          {
            label: "The 2026 season",
            content: (
              <section className="hero">
                <div className="hero__media">
                  {/* Note: Lighthouse's *simulated* (lantern) mobile LCP reads ~3.2s, but
                      under real throttling LCP is ~1.8s / perf 99 (render-delay 19ms, not
                      1703ms) — the lab figure is a lantern artifact, not a real bottleneck.
                      No architectural change warranted; monitor field/CrUX. — see AUDIT.md */}
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
                    <div className="hero__eyebrow">Your Symphony · Your Choice</div>
                    <hr className="hero__rule" />
                    <p className="hero__title">The sound of California, close to home.</p>
                    <p className="hero__lead">
                      Six Masterpiece concerts a year in Thousand Oaks and Camarillo — live
                      orchestral music, and the people of {SITE.serviceArea} gathered to hear it.
                    </p>
                    <div className="hero__actions">
                      <Button href="/concerts" variant="gold" size="lg">
                        Explore the 2026 Season
                      </Button>
                      <Button href="/visit" variant="ghost" size="lg" onDark>
                        Plan Your Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            ),
          },
          {
            label: "Adopt a Musician",
            content: (
              <section className="hero">
                <div className="hero__media">
                  <Image
                    src="/assets/photos/nws-chorus.jpg"
                    alt="The New West Symphony and chorus performing on stage"
                    fill
                    loading="eager"
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
                    <p className="hero__title hero__title--md">Adopt a Musician</p>
                    <p className="hero__lead">
                      Connect with your favorite instrument or musician in the orchestra —
                      meet your musician, join private receptions, and keep the music
                      playing.
                    </p>
                    <div className="hero__actions">
                      <Button
                        href="/support/adopt-a-musician"
                        variant="gold"
                        size="lg"
                        track="donate_click"
                        trackParams={{ location: "home-carousel", campaign: "adopt-a-musician" }}
                      >
                        Explore the Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            ),
          },
          {
            label: "Become a Member",
            content: (
              <section className="hero">
                <div className="hero__media">
                  <Image
                    src="/assets/photos/christie-conducting.jpg"
                    alt="Michael Christie conducting the New West Symphony"
                    fill
                    loading="eager"
                    quality={55}
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="hero__scrim" />
                <div className="container hero__inner">
                  <div className="hero__content">
                    <div className="hero__eyebrow">Membership · New for 2026</div>
                    <hr className="hero__rule" />
                    <p className="hero__title hero__title--md">
                      The most flexible way to hear it all
                    </p>
                    <p className="hero__lead">
                      Not a fixed subscription — reserve seats at a flat $20 each, whenever
                      you want them, at either venue, with member perks all year.
                    </p>
                    <div className="hero__actions">
                      <Button
                        href="/membership"
                        variant="gold"
                        size="lg"
                        track="become_member_click"
                        trackParams={{ location: "home-carousel" }}
                      >
                        Explore Membership
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            ),
          },
        ]}
      />

      {/* 1b — Adopt-A-Musician campaign banner (fundraising push) */}
      <Link
        href="/support/adopt-a-musician"
        className="campaign-band"
        aria-label="Adopt a Musician — explore the campaign"
      >
        <div className="container campaign-band__inner">
          <span className="campaign-band__note" aria-hidden="true">
            ♪
          </span>
          <p className="campaign-band__text">
            <strong>Adopt a Musician.</strong> Connect with your favorite chair in the
            orchestra — meet your musician, join private receptions, and keep the music
            playing.
          </p>
          <span className="campaign-band__cta">Explore the campaign →</span>
        </div>
      </Link>

      {/* 2 — Season highlight */}
      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <SectionHeading eyebrow="On Stage · 2026" title="Three nights to gather" />
            <Button href="/concerts" variant="link">
              View the full season →
            </Button>
          </div>
          <div className="grid grid-3">
            {season.map((c) => (
              <EventCard
                key={c.slug}
                series={c.tag}
                title={c.title}
                composers={c.program}
                date={c.railDate}
                time={c.dateLabel}
                venue={c.venuesLabel}
                href={`/concerts/${c.slug}`}
                ctaLabel={c.ticketsComingSoon ? "Tickets coming soon" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Membership feature block */}
      <section className="section">
        <div className="container">
          <div className="feature-panel">
            <div className="feature-panel__body">
              <SectionHeading
                onDark
                eyebrow="Membership · New for 2026"
                title="The most flexible way to hear it all"
              />
              <p className="on-dark-muted lead">
                Not a fixed subscription. Reserve seats at a flat $20 each, whenever you
                want them, at either venue — with member perks all year.
              </p>
              <div className="stat-row">
                <div className="stat">
                  <span className="stat__num">$20</span>
                  <span className="stat__label">per seat, every time</span>
                </div>
                <div className="stat">
                  <span className="stat__num">5</span>
                  <span className="stat__label">tiers from $200</span>
                </div>
                <div className="stat">
                  <span className="stat__num">2</span>
                  <span className="stat__label">community venues</span>
                </div>
              </div>
              <div className="hero__actions">
                <Button href={MEMBERSHIP_PURCHASE_URL} variant="gold" size="lg" track="become_member_click" trackParams={{ location: "home-hero" }}>
                  Become a Member
                </Button>
                <Button href="/membership" variant="ghost" size="lg" onDark>
                  Compare tiers
                </Button>
              </div>
            </div>
            <div className="feature-panel__media">
              <Image
                src="/assets/photos/christie-conducting.jpg"
                alt="Michael Christie conducting the New West Symphony"
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Why we matter locally */}
      <section className="section band-cream">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="In our community"
              title="Music that belongs to everyone here"
              subtitle="From a child's first concert to a free pre-show talk, we put live orchestral music within reach across the region."
            />
            <div className="chip-row mt-6">
              {EDUCATION_CHIPS.map((chip) => (
                <span className="chip" key={chip}>
                  <span className="note-glyph" aria-hidden="true">
                    ♪
                  </span>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="media-frame">
              <Image
                src="/assets/photos/education-harmony.jpg"
                alt="Students of the Laby Harmony Project performing together"
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="caption">
              Students of the Laby Harmony Project — putting instruments in young hands.
            </p>
            <div className="stat-cards mt-6">
              {IMPACT_STATS.map((s) => (
                <div className="stat-card" key={s.label}>
                  <span className="stat__num">{s.n}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="footnote mt-4">Education figures are approximate.</p>
          </div>
        </div>
      </section>

      {/* 5 — Get Involved teaser */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: "var(--space-8)" }}>
            <div className="split">
              <div>
                <SectionHeading
                  eyebrow="Get involved"
                  title="There's a place for you here"
                  subtitle="Every great symphony is built by its community — at every level of commitment."
                />
                <div className="chip-row mt-6">
                  {["Attend", "Give", "Volunteer", "Lead"].map((step, i, arr) => (
                    <span className="chip" key={step}>
                      {step}
                      {i < arr.length - 1 && (
                        <span aria-hidden="true" style={{ color: "var(--nws-stone)" }}>
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="hero__actions">
                  <Button href="/get-involved" variant="solid" size="lg">
                    Explore Get Involved
                  </Button>
                  <Button href="/get-involved/board" variant="ghost" size="lg">
                    Join Our Board
                  </Button>
                </div>
              </div>
              <div className="media-frame">
                <Image
                  src="/assets/photos/edu-symphonic.jpg"
                  alt="Schoolchildren at a New West Symphony education concert"
                  fill
                  quality={60}
                  sizes="(max-width: 960px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Support CTA */}
      <section className="section band-navy-deep">
        <div className="container">
          <SectionHeading
            onDark
            align="center"
            eyebrow="Your Symphony · Your Choice"
            title="Keep live music thriving close to home"
            subtitle="Ticket sales cover less than half of what it takes. Your gift puts instruments in children's hands and the orchestra on the stage."
          />
          <div
            className="hero__actions"
            style={{ justifyContent: "center", marginTop: "var(--space-7)" }}
          >
            <Button href={EXTERNAL.donate} variant="gold" size="lg" track="donate_click" trackParams={{ location: "home-closing" }}>
              Donate Today
            </Button>
            <Button href={MEMBERSHIP_PURCHASE_URL} variant="ghost" size="lg" onDark track="become_member_click" trackParams={{ location: "home-closing" }}>
              Become a Member
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
