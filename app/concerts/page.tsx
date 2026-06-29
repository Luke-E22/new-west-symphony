import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/core/Button";
import VenueFilter from "@/components/sections/VenueFilter";
import { buildMetadata } from "@/lib/seo/metadata";
import { splitSeason } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "2026 Season",
  description:
    "Six Masterpiece concerts across the 2026 season, performed live in Thousand Oaks and Camarillo — browse the full lineup and choose your night.",
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
          <h1 className="hero__title hero__title--md">The 2026 Season</h1>
          <p className="hero__lead">
            Six Masterpiece concerts, one community — live orchestral music in
            Thousand Oaks and Camarillo, from your first night out to your favorite.
          </p>
        </div>
      </section>

      {/* 2 — Membership upsell */}
      <section className="section">
        <div className="container">
          <div className="upsell">
            <span className="medallion" aria-hidden="true">
              ♪
            </span>
            <p className="upsell__text">
              Going to more than two concerts this season? A membership pays for itself.
            </p>
            <Button href="/membership" variant="gold" size="lg">
              Explore Membership
            </Button>
          </div>
        </div>
      </section>

      {/* 3 — Venue filter + Upcoming / Past poster galleries */}
      <VenueFilter upcoming={upcoming} past={past} />
    </>
  );
}
