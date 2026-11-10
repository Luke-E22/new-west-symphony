import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/brand/SectionHeading";
import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import JsonLd from "@/components/JsonLd";
import AddToCalendar from "@/components/sections/AddToCalendar";
import { eventEntry } from "@/lib/calendar";
import { buildMetadata } from "@/lib/seo/metadata";
import { eventJsonLd } from "@/lib/seo/jsonld";
import { eventDateLabel, eventDateWithYear, eventPageSlugs, getConcert, getEvent, isEventPast } from "@/lib/data";

/** Hourly, so the ticket panel retires on its own once the event has passed. */
export const revalidate = 3600;

export function generateStaticParams() {
  return eventPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return buildMetadata({
    title: event.title,
    description: `${event.summary} ${eventDateWithYear(event)}, ${event.venue.name}.`,
    path: `/events/${event.slug}`,
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event?.details?.length) notFound();

  const past = isEventPast(event);
  const concert = event.concertSlug ? getConcert(event.concertSlug) : undefined;
  const calendar = past ? undefined : eventEntry(event);
  const { venue, sponsorship, contact } = event;

  return (
    <>
      <JsonLd data={eventJsonLd(event)} />

      <section className="hero hero--sm">
        <div className="hero__media">
          <Image
            src="/assets/photos/nws-chorus.jpg"
            alt="The New West Symphony and chorus performing on stage"
            fill
            preload
            quality={55}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <Badge tone={past ? "navy" : "gold"} solid>
              {past ? "Past event" : event.kind}
            </Badge>
            <h1 className="hero__title hero__title--md" style={{ marginTop: "var(--space-4)" }}>
              {event.title}
            </h1>
            <p className="hero__lead">{event.summary}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-body event-body">
          <div>
            <div className="info-grid">
              <div className="info-cell">
                <div className="info-cell__label">When</div>
                <div className="info-cell__value">
                  {eventDateLabel(event)}
                  {event.timeLabel && (
                    <>
                      <br />
                      {event.timeLabel}
                    </>
                  )}
                </div>
              </div>
              <div className="info-cell">
                <div className="info-cell__label">Where</div>
                <div className="info-cell__value">
                  {venue.name}
                  <br />
                  {venue.street}, {venue.city}
                </div>
              </div>
              {event.priceLabel && (
                <div className="info-cell">
                  <div className="info-cell__label">Tickets</div>
                  <div className="info-cell__value">{event.priceLabel}</div>
                </div>
              )}
            </div>

            <SectionHeading eyebrow="The evening" title="What to expect" />
            <div className="prose mt-6">
              {event.details.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "lead" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            {concert && (
              <div className="concert-extra">
                <div>
                  <div className="minilabel">The concert that follows</div>
                  <p className="concert-extra__title">{concert.title}</p>
                  <p className="muted">{concert.dateLabel}</p>
                </div>
                <Button href={`/concerts/${concert.slug}`} variant="ghost">
                  Concert Details
                </Button>
              </div>
            )}
          </div>

          <div className="ticket-panel">
            <Card accent padding="var(--space-6)">
              {past ? (
                <>
                  <h2 style={{ font: "var(--type-h2)", color: "var(--text-strong)", margin: 0 }}>
                    This event has passed
                  </h2>
                  <p className="footnote mt-4">See what&rsquo;s coming up next.</p>
                  <Button href="/events" variant="ghost" size="lg" fullWidth>
                    Calendar of Events
                  </Button>
                </>
              ) : (
                <>
                  <div className="info-cell__label">Reserve your seat</div>
                  {event.priceLabel && (
                    <h2 style={{ font: "var(--type-h3)", color: "var(--text-strong)", margin: "var(--space-2) 0 var(--space-4)" }}>
                      {event.priceLabel}
                    </h2>
                  )}
                  {event.cta && (
                    <Button
                      href={event.cta.href}
                      variant="gold"
                      size="lg"
                      fullWidth
                      track="buy_tickets_click"
                      trackParams={{ location: "event-detail", event: event.slug }}
                    >
                      {event.cta.label}
                    </Button>
                  )}
                  {calendar && (
                    <div className="save-date save-date--panel">
                      <div className="minilabel">Add to your calendar</div>
                      <AddToCalendar entry={calendar} />
                    </div>
                  )}
                  {contact && (
                    <p className="footnote">
                      To reserve by phone or email, contact {contact.name} at{" "}
                      <a href={`tel:+1${contact.phone.replace(/\D/g, "")}`}>{contact.phone}</a> or{" "}
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                    </p>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </section>

      {sponsorship && !past && (
        <section className="section band-cream">
          <div className="container">
            <SectionHeading
              align="center"
              eyebrow="Sponsorship"
              title="Sponsor the evening"
              subtitle="Sponsorships support New West Symphony and its education programs."
            />
            <div className="tier-grid mt-6">
              {sponsorship.levels.map((level) => (
                <div className="tier-card" key={level.name}>
                  <div className="tier-card__cap">
                    <div className="tier-card__price">{level.price}</div>
                    <div className="tier-card__name">{level.name}</div>
                  </div>
                  <div className="tier-card__body">
                    <ul className="sponsor-perks">
                      {level.perks.map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="hero__actions" style={{ justifyContent: "center" }}>
              <Button
                href={sponsorship.href}
                variant="gold"
                size="lg"
                track="donate_click"
                trackParams={{ location: "event-sponsorship", event: event.slug }}
              >
                Buy a Sponsorship
              </Button>
            </div>
            <p className="footnote mt-6 text-center">
              For more information, contact {sponsorship.contactNames} at{" "}
              <a href={`tel:+1${sponsorship.phone.replace(/\D/g, "")}`}>{sponsorship.phone}</a>,{" "}
              {sponsorship.emails.map((email, i) => (
                <span key={email}>
                  {i > 0 && " or "}
                  <a href={`mailto:${email}`}>{email}</a>
                </span>
              ))}
              .
            </p>
          </div>
        </section>
      )}

      <section className="section-tight">
        <div className="container text-center">
          <Link href="/events" className="quiet-link">
            See the full calendar of events →
          </Link>
        </div>
      </section>
    </>
  );
}
