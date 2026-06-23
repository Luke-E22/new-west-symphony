import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/brand/SectionHeading";
import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import { buildMetadata } from "@/lib/seo/metadata";
import { VENUES, VISIT_PERKS } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Visit",
  description:
    "Plan your night out with the New West Symphony — two welcoming community venues in Thousand Oaks and Camarillo, with accessible seating and a free pre-concert talk.",
  path: "/visit",
});

const VENUE_PHOTOS = {
  to: "/assets/venues/bofa-pac-thousand-oaks.jpg",
  cam: "/assets/venues/rancho-campana-camarillo.jpg",
} as const;

const mapsHref = (addressLine: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;

export default function VisitPage() {
  const venues = [VENUES.to, VENUES.cam];

  return (
    <>
      {/* 1 — Intro */}
      <section className="section">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="Visit"
            title="Plan your night out"
            subtitle="Two welcoming community venues — one in Thousand Oaks, one in Camarillo — both with accessible seating and an easy walk to your seat."
          />
        </div>
      </section>

      {/* 2 — Venue cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {venues.map((venue) => (
              <div className="venue-card" key={venue.key}>
                <div className="venue-card__media">
                  <Image
                    src={VENUE_PHOTOS[venue.key]}
                    alt={`${venue.name} in ${venue.city}`}
                    fill
                    sizes="(max-width: 960px) 100vw, 45vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="venue-card__body">
                  <h2 style={{ font: "var(--type-h3)", color: "var(--text-strong)", margin: 0 }}>
                    {venue.name}
                  </h2>
                  <div>
                    <Badge tone="navy">{venue.city}</Badge>
                  </div>
                  <p className="muted" style={{ margin: 0 }}>
                    {venue.street}
                    <br />
                    {venue.city}, {venue.region} {venue.postalCode}
                  </p>
                  <div className="venue-card__cols">
                    <div>
                      <div className="minilabel">Parking</div>
                      <p className="muted" style={{ margin: 0 }}>
                        {venue.parking}
                      </p>
                    </div>
                    <div>
                      <div className="minilabel">Accessibility</div>
                      <p className="muted" style={{ margin: 0 }}>
                        {venue.accessibility}
                      </p>
                    </div>
                  </div>
                  <div className="hero__actions">
                    <Button href={mapsHref(venue.addressLine)} variant="ghost">
                      Get directions
                    </Button>
                    <Button href="/concerts" variant="link">
                      What&rsquo;s playing →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Enhance your experience + family/student pricing */}
      <section className="section band-cream">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Enhance your experience"
              title="Make a full evening of it"
            />
            <ul className="program-list mt-6">
              {VISIT_PERKS.map((perk) => (
                <li key={perk.t}>
                  <strong>{perk.t}.</strong> {perk.b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card accent padding="var(--space-7)">
              <SectionHeading
                eyebrow="Welcome"
                title="Families & students welcome"
              />
              <ul className="price-list">
                <li>
                  <span>Students (with ID)</span>
                  <span className="price">$20</span>
                </li>
                <li>
                  <span>Family 4-Pack</span>
                  <span className="price">$120</span>
                </li>
                <li>
                  <span>Under 18</span>
                  <span className="price">50% off</span>
                </li>
              </ul>
              <Button href="/concerts" variant="gold" size="lg">
                Find a Concert
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
