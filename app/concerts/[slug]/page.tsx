import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/brand/SectionHeading";
import EventCard from "@/components/brand/EventCard";
import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { concertJsonLd } from "@/lib/seo/jsonld";
import { CONCERTS, VENUES, getConcert, isConcertPast } from "@/lib/data";
import { EXTERNAL, MEMBERSHIP_PURCHASE_URL } from "@/lib/config";

export function generateStaticParams() {
  return CONCERTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concert = getConcert(slug);
  if (!concert) return { title: "Concert not found" };
  return buildMetadata({
    title: concert.seoTitle ?? concert.title,
    description:
      concert.seoDescription ?? `${concert.blurb} ${concert.dateLabel}, ${concert.venuesLabel}.`,
    path: `/concerts/${concert.slug}`,
    // ogImage: null → use the per-concert opengraph-image.tsx + twitter-image.tsx
    // (branded 1200×630 cards) instead of the site default.
    ogImage: null,
  });
}

export default async function ConcertDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = getConcert(slug);
  if (!concert) notFound();

  const more = CONCERTS.filter((c) => c.slug !== concert.slug).slice(0, 3);
  const lowest = Math.min(...concert.priceTiers.map((t) => t.amount));
  // Prefer the real per-concert ticketing URL once NWS supplies it (audit M1);
  // until then fall back to the venue's provider URL (a placeholder).
  const ticketUrl =
    concert.ticketUrl ??
    (concert.venueKeys.includes("to")
      ? EXTERNAL.ticketsThousandOaks
      : EXTERNAL.ticketsCamarillo);
  const isPast = isConcertPast(concert);

  return (
    <>
      <JsonLd data={concertJsonLd(concert)} />

      {/* Hero */}
      <section className="hero hero--sm">
        <div className="hero__media">
          <Image
            src="/assets/photos/orchestra-performance.jpg"
            alt="The New West Symphony in performance"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <Badge tone={isPast ? "navy" : "gold"} solid>
              {isPast ? "Past concert" : concert.series}
            </Badge>
            <h1 className="hero__title hero__title--md" style={{ marginTop: "var(--space-4)" }}>
              {concert.title}
            </h1>
            <p className="hero__lead">{concert.program}</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container detail-body">
          {/* Left */}
          <div>
            <div className="info-grid">
              <div className="info-cell">
                <div className="info-cell__label">When</div>
                <div className="info-cell__value">
                  {concert.dateLabel}
                  <br />
                  {concert.timeLabel}
                </div>
              </div>
              <div className="info-cell">
                <div className="info-cell__label">Where</div>
                <div className="info-cell__value">
                  {concert.venueKeys.map((k) => (
                    <span key={k} style={{ display: "block" }}>
                      {VENUES[k].city}
                    </span>
                  ))}
                </div>
              </div>
              <div className="info-cell">
                <div className="info-cell__label">On the podium</div>
                <div className="info-cell__value">{concert.conductor}</div>
              </div>
            </div>

            <SectionHeading eyebrow="The Program" title="What to expect" />
            <p className="lead mt-6">{concert.blurb}</p>
            {concert.tbc && (
              <p className="footnote mt-4">
                Conductor, guest artists, and full program for this concert are still being
                confirmed from the program book.
              </p>
            )}
            <ul className="program-list">
              {concert.programList.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="lead">
              <strong>Guests:</strong> {concert.guests}
            </p>
            <div className="insight-note">
              <strong>Intermission Insights:</strong> join us one hour before curtain for a free
              pre-concert talk — the music makes more sense, and it&rsquo;s more fun.
            </div>

            <div className="getting-there">
              <div>
                <div className="minilabel">Getting there</div>
                <p className="muted">
                  Free parking at both venues, steps from the doors. Doors open 60 minutes ahead.
                </p>
              </div>
              <div>
                <div className="minilabel">Bring the family</div>
                <p className="muted">
                  Students $20 with ID and a $120 Family 4-Pack make a first concert easy.
                </p>
              </div>
            </div>
          </div>

          {/* Right — sticky ticket panel (desktop) */}
          <aside className="ticket-panel detail-ticket-desktop">
            <Card accent padding="var(--space-6)">
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  marginBottom: "var(--space-5)",
                }}
              >
                <Image
                  src={concert.poster}
                  alt={`${concert.title} — New West Symphony concert poster`}
                  fill
                  sizes="380px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              {isPast ? (
                <>
                  <h2 style={{ font: "var(--type-h2)", color: "var(--text-strong)", margin: 0 }}>
                    This concert has passed
                  </h2>
                  <p className="footnote mt-4">
                    Browse the rest of the 2026 season for upcoming dates.
                  </p>
                  <Button href="/concerts" variant="ghost" size="lg" fullWidth>
                    See upcoming concerts
                  </Button>
                </>
              ) : (
                <>
                  <div className="info-cell__label">Tickets from ${lowest}</div>
                  <h2 style={{ font: "var(--type-h2)", color: "var(--text-strong)", margin: "var(--space-2) 0 0" }}>
                    Choose your seats
                  </h2>
                  {/* Seating tiers are real categories; the 2026 single-ticket
                      prices are unconfirmed (audit H7), so we show the tiers and
                      a "from" anchor but not hard per-tier prices. */}
                  <ul className="price-list">
                    {concert.priceTiers.map((t) => (
                      <li key={t.tier}>
                        <span>{t.tier}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="footnote">
                    Seating tiers are representative; 2026 single-ticket prices are
                    subject to change.
                  </p>
                  <Button href={ticketUrl} variant="gold" size="lg" fullWidth track="buy_tickets_click" trackParams={{ location: "concert-detail", concert: concert.slug }}>
                    Buy Tickets
                  </Button>
                  <p className="footnote mt-4" style={{ textAlign: "center" }}>
                    <a href={MEMBERSHIP_PURCHASE_URL} className="quiet-link">
                      Members save up to 15% — join today
                    </a>
                  </p>
                </>
              )}
            </Card>
          </aside>
        </div>
      </section>

      {/* More this season */}
      <section className="section band-cream">
        <div className="container">
          <SectionHeading eyebrow="Keep listening" title="More this season" />
          <div className="grid grid-3 mt-6">
            {more.map((c) => (
              <EventCard
                key={c.slug}
                series={c.tag}
                title={c.title}
                composers={c.program}
                date={c.railDate}
                time={c.dateLabel}
                venue={c.venuesLabel}
                href={`/concerts/${c.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky Buy bar (upcoming only) */}
      {!isPast && (
        <div className="buy-bar">
          <span className="buy-bar__price">Tickets from ${lowest}</span>
          <Button href={ticketUrl} variant="gold" size="md" track="buy_tickets_click" trackParams={{ location: "concert-sticky-bar", concert: concert.slug }}>
            Buy Tickets
          </Button>
        </div>
      )}
    </>
  );
}
