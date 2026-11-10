"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";
import { ticketLinks, type Concert, type VenueKey } from "@/lib/data";

type Filter = "all" | VenueKey;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Venues" },
  { key: "to", label: "Thousand Oaks" },
  { key: "cam", label: "Camarillo" },
];

/**
 * The card has room for one buy. With a venue filter active we know which hall
 * they mean, so link straight into its ticketing; otherwise the two halls sell
 * separately and there's no single right answer — send them to the concert page
 * to choose rather than silently picking one.
 */
function cardBuy(c: Concert, venue: Filter) {
  const links = ticketLinks(c);
  if (links.length === 1) return links[0].href;
  if (venue !== "all") return links.find((l) => l.venueKey === venue)?.href;
  return undefined;
}

function PosterCard({
  c,
  past,
  venue,
  hasProgram,
}: {
  c: Concert;
  past: boolean;
  venue: Filter;
  hasProgram: boolean;
}) {
  const buyHref = cardBuy(c, venue) ?? `/concerts/${c.slug}`;
  // Only promise program notes where some have actually been posted.
  const moreHref = hasProgram ? `/concerts/${c.slug}/program` : `/concerts/${c.slug}`;
  const moreLabel = hasProgram ? "Program & notes" : "Concert details";
  return (
    <article className={past ? "poster-card poster-card--past" : "poster-card"}>
      <a href={`/concerts/${c.slug}`} className="poster-card__media">
        <Image
          src={c.poster}
          alt={`${c.title} — New West Symphony concert poster`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 380px"
          style={{ objectFit: "cover" }}
        />
        {past && (
          <span className="poster-card__flag">
            <Badge tone="navy" solid>
              Past concert
            </Badge>
          </span>
        )}
      </a>
      <div className="poster-card__body">
        <div className="poster-card__date">
          {c.dateLabel} · {c.timeLabel}
        </div>
        <div className="poster-card__venues">{c.venuesLabel}</div>
        <div className="poster-card__cta">
          {past ? (
            <Button href={moreHref} variant="ghost" size="sm">
              {moreLabel}
            </Button>
          ) : c.ticketsComingSoon ? (
            <>
              <span className="poster-card__soon">Tickets coming soon</span>
              <Button href={`/concerts/${c.slug}`} variant="link" size="sm">
                Concert details →
              </Button>
            </>
          ) : (
            <>
              <Button
                href={buyHref}
                variant="gold"
                size="sm"
                track="buy_tickets_click"
                trackParams={{ location: "concerts-list", concert: c.slug, venue }}
              >
                Buy Tickets
              </Button>
              <Button href={moreHref} variant="link" size="sm">
                {moreLabel} →
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Concerts listing (§7 venue filter) reworked as a poster gallery split into
 * Upcoming and Past sections. The parent computes the split by date; this
 * component filters both by venue with a live count.
 */
export default function VenueFilter({
  upcoming,
  past,
  programSlugs,
}: {
  upcoming: Concert[];
  past: Concert[];
  /** Concerts with a posted program or notes. */
  programSlugs: string[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visUpcoming = useMemo(
    () => (filter === "all" ? upcoming : upcoming.filter((c) => c.venueKeys.includes(filter))),
    [filter, upcoming],
  );
  const visPast = useMemo(
    () => (filter === "all" ? past : past.filter((c) => c.venueKeys.includes(filter))),
    [filter, past],
  );
  const total = visUpcoming.length + visPast.length;

  // Upcoming spans more than one season once a future one is announced, so it's
  // grouped rather than run together. visUpcoming is already soonest-first, so
  // each group keeps its order.
  const upcomingSeasons = useMemo(() => {
    const bySeason = new Map<number, Concert[]>();
    for (const c of visUpcoming) {
      const list = bySeason.get(c.season) ?? [];
      list.push(c);
      bySeason.set(c.season, list);
    }
    return [...bySeason.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([season, concerts]) => ({ season, concerts }));
  }, [visUpcoming]);

  return (
    <>
      <div className="filter-bar">
        <div className="container filter-bar__inner" role="group" aria-label="Filter concerts by venue">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="filter-chip"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
          <span className="filter-count" aria-live="polite">
            {total} {total === 1 ? "concert" : "concerts"}
          </span>
        </div>
      </div>

      <div className="container section">
        {upcomingSeasons.map(({ season, concerts }) => (
          <section
            key={season}
            aria-labelledby={`season-${season}-heading`}
            style={{ marginBottom: "var(--space-9)" }}
          >
            <div className="section-heading" style={{ marginBottom: "var(--space-6)" }}>
              {/* A season whose tickets aren't on sale is a save-the-date, not a sale. */}
              <div className="section-heading__eyebrow">
                {concerts.every((c) => c.ticketsComingSoon) ? "Save the date" : "On sale now"}
              </div>
              <hr className="section-heading__rule" />
              <h2 className="section-heading__title" id={`season-${season}-heading`}>
                {season} Season
              </h2>
            </div>
            <div className="poster-grid">
              {concerts.map((c) => (
                <PosterCard key={c.slug} c={c} past={false} venue={filter} hasProgram={programSlugs.includes(c.slug)} />
              ))}
            </div>
          </section>
        ))}

        {visPast.length > 0 && (
          <section aria-labelledby="past-heading">
            <div className="section-heading" style={{ marginBottom: "var(--space-6)" }}>
              <div className="section-heading__eyebrow">From the season</div>
              <hr className="section-heading__rule" />
              <h2 className="section-heading__title" id="past-heading">
                Past concerts
              </h2>
            </div>
            <div className="poster-grid">
              {visPast.map((c) => (
                <PosterCard key={c.slug} c={c} past venue={filter} hasProgram={programSlugs.includes(c.slug)} />
              ))}
            </div>
          </section>
        )}

        {total === 0 && (
          <p className="lead text-center muted">No concerts at this venue. Try another filter.</p>
        )}
      </div>
    </>
  );
}
