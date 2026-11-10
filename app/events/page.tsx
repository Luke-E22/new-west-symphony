import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/brand/EventCard";
import SectionHeading from "@/components/brand/SectionHeading";
import ConcertTabs from "@/components/sections/ConcertTabs";
import { buildMetadata } from "@/lib/seo/metadata";
import { BenefitIcon } from "@/components/Icons";
import { CONCERT_EXTRAS, calendarItems, eventDateWithYear, eventHref } from "@/lib/data";

/** Hourly, so finished events move to "Recent events" without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Calendar of Events",
  description:
    "Masterpiece concerts, fundraisers, and New West Symphony performances out in the community across Ventura County and the Conejo Valley.",
  path: "/events",
});

export default function EventsPage() {
  const { upcoming, recent } = calendarItems();

  return (
    <>
      <section className="hero hero--banner">
        <div className="hero__media">
          <Image
            src="/assets/photos/nws-chorus.jpg"
            alt="The New West Symphony and chorus performing on stage"
            fill
            preload
            quality={55}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__scrim hero__scrim--bottom" />
        <div className="container hero__banner-title">
          <h1 className="hero__title hero__title--md">Calendar of Events</h1>
          <p className="hero__lead">
            Masterpiece concerts, fundraisers, and the orchestra out in the community.
          </p>
        </div>
      </section>

      <ConcertTabs active="events" />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Coming up" title="On the calendar" />
          {upcoming.length > 0 ? (
            <div className="grid grid-3 mt-6">
              {upcoming.map((item) => (
                <EventCard
                  key={item.key}
                  series={item.kind}
                  title={item.title}
                  composers={item.summary}
                  date={item.railDate}
                  time={item.when}
                  venue={item.where}
                  href={item.href}
                  ctaLabel={item.ctaLabel}
                />
              ))}
            </div>
          ) : (
            <p className="lead mt-6">
              New dates are on the way. Join the e-news below to hear first.
            </p>
          )}
        </div>
      </section>

      <section className="section band-cream anchor-target" id="around-every-concert">
        <div className="container">
          <SectionHeading eyebrow="More than the music" title="Around every concert" />
          <div className="benefits-grid mt-6">
            {CONCERT_EXTRAS.map((extra) => (
              <div className="benefit-card" key={extra.t}>
                <span className="icon-chip">
                  <BenefitIcon title={extra.t} />
                </span>
                <div className="benefit-card__t">{extra.t}</div>
                <p className="benefit-card__b">{extra.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="This past year" title="Recent events" />
            <ul className="past-events mt-6">
              {recent.map((event) => {
                const href = eventHref(event);
                return (
                  <li key={event.slug}>
                    <span className="past-events__date">{eventDateWithYear(event)}</span>
                    <span className="past-events__title">
                      {href?.startsWith("/") ? (
                        <Link href={href}>{event.title}</Link>
                      ) : href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {event.title}
                        </a>
                      ) : (
                        event.title
                      )}
                    </span>
                    <span className="past-events__where">
                      {event.venue.name}, {event.venue.city}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
