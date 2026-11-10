import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/core/Button";
import ConcertTabs from "@/components/sections/ConcertTabs";
import VenueFilter from "@/components/sections/VenueFilter";
import { buildMetadata } from "@/lib/seo/metadata";
import { concertSlugs, splitSeason } from "@/lib/data";
import { hasProgramDocs } from "@/lib/data/programs";

/**
 * ISR: this page is prerendered, so the upcoming/past split (computed from the
 * date at render time) would otherwise stay frozen at the last deploy. Regenerate
 * at most hourly so a concert moves to “Past concerts” within an hour of its final performance
 * without a redeploy; between regenerations it is served from cache as before.
 */
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Concerts",
  description:
    "Six Masterpiece concerts a season, performed live in Thousand Oaks and Camarillo — browse what's coming up and choose your night.",
  path: "/concerts",
});

export default function ConcertsPage() {
  const { upcoming, past } = splitSeason();

  return (
    <>
      {/* 1 — Photo banner hero */}
      <section className="hero hero--banner">
        <div className="hero__media">
          <Image
            src="/assets/photos/christie-conducting.jpg"
            alt="The New West Symphony performing under Michael Christie"
            fill
            preload
            quality={55}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__scrim hero__scrim--bottom" />
        <div className="container hero__banner-title">
          <h1 className="hero__title hero__title--md">Concerts</h1>
          <p className="hero__lead">
            Six Masterpiece concerts a season, one community — live orchestral music
            in Thousand Oaks and Camarillo, from your first night out to your favorite.
          </p>
        </div>
      </section>

      <ConcertTabs active="concerts" />

      {/* 2 — Membership upsell */}
      <section className="section">
        <div className="container">
          <div className="upsell">
            <span className="medallion" aria-hidden="true">
              ♪
            </span>
            <p className="upsell__text">
              Going to more than two concerts this season? A membership pays for itself.
              Coming to all six? Subscribe and keep the same seats.
            </p>
            <div className="upsell__actions">
              <Button href="/membership" variant="gold" size="lg">
                Explore Membership
              </Button>
              <Button
                href="/subscriptions"
                variant="ghost"
                size="lg"
                track="subscribe_click"
                trackParams={{ location: "concerts-upsell" }}
              >
                Explore Subscriptions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Venue filter + Upcoming / Past poster galleries */}
      <VenueFilter upcoming={upcoming} past={past} programSlugs={concertSlugs().filter(hasProgramDocs)} />
    </>
  );
}
