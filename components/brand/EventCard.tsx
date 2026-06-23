import Badge from "@/components/core/Badge";
import Button from "@/components/core/Button";

interface EventCardProps {
  series?: string;
  title: string;
  composers?: string;
  date: { month: string; day: string; weekday: string };
  time?: string;
  venue?: string;
  /** Concert detail or ticketing destination for the CTA. */
  href: string;
  ctaLabel?: string;
  soldOut?: boolean;
}

/**
 * The signature concert unit (§4): navy date rail, series Badge, serif title,
 * composers, venue, gold ticket CTA. Used in 3-up grids (home season strip,
 * "more this season").
 */
export default function EventCard({
  series,
  title,
  composers,
  date,
  time,
  venue,
  href,
  ctaLabel = "Buy Tickets",
  soldOut = false,
}: EventCardProps) {
  return (
    <div className="event-card event-card--interactive">
      <div className="event-card__rail" aria-hidden="true">
        <div className="event-card__month">{date.month}</div>
        <div className="event-card__day">{date.day}</div>
        <div className="event-card__weekday">{date.weekday}</div>
      </div>
      <div className="event-card__body">
        <div className="event-card__badges">
          {series && <Badge tone="gold">{series}</Badge>}
          {soldOut && (
            <Badge tone="navy" solid>
              Sold Out
            </Badge>
          )}
        </div>
        <h3 className="event-card__title">{title}</h3>
        {composers && <div className="event-card__composers">{composers}</div>}
        {(time || venue) && (
          <div className="event-card__meta">
            {[time, venue].filter(Boolean).join(" · ")}
          </div>
        )}
        <div className="event-card__cta">
          <Button
            href={href}
            variant={soldOut ? "ghost" : "gold"}
            size="sm"
            disabled={soldOut}
          >
            {soldOut ? "Join Waitlist" : ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
