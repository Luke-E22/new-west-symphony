import { localDateLabel, upcomingConcerts } from "./concerts";
import type { Concert } from "./types";

/**
 * Everything on the calendar that isn't a Masterpiece concert: fundraisers and
 * community performances. Facts are from NWS's calendar (newwestsymphony.org/events).
 * Add new events here; they sort into /events and the home page on their own,
 * and move to "Recent events" after they end.
 */

export interface EventVenue {
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
}

export interface SponsorshipLevel {
  name: string;
  price: string;
  perks: string[];
}

export interface SiteEvent {
  slug: string;
  title: string;
  kind: "Fundraising event" | "In the community";
  /** ISO 8601 with offset. For an event with no published time, use midday. */
  startDate: string;
  endDate?: string;
  /** "4–6:30 PM". Omit when no time is published. */
  timeLabel?: string;
  venue: EventVenue;
  summary: string;
  /** Paragraphs for the event's own page. An event without these has no page. */
  details?: string[];
  priceLabel?: string;
  /** Numeric price per ticket, for search engines. */
  price?: number;
  /** Primary action on the event page, usually the ticket form. */
  cta?: { label: string; href: string };
  /** A partner's page for the event, used when it has no page here. */
  externalUrl?: string;
  /** Concert that follows this event, by slug. */
  concertSlug?: string;
  contact?: { name: string; email: string; phone: string };
  sponsorship?: {
    href: string;
    levels: SponsorshipLevel[];
    contactNames: string;
    phone: string;
    emails: string[];
  };
}

const HOT_WINTERS_NIGHT_FORM =
  "https://newwestsymphony.my.salesforce-sites.com/donate/?dfId=a0nPB00000NrAGvYAN";

export const EVENTS: SiteEvent[] = [
  {
    slug: "hot-winters-night",
    title: "A Hot Winter’s Night",
    kind: "Fundraising event",
    startDate: "2026-12-05T16:00:00-08:00",
    endDate: "2026-12-05T18:30:00-08:00",
    timeLabel: "4–6:30 PM",
    venue: {
      name: "Fogo de Chão at the Lakes",
      street: "2250 Thousand Oaks Blvd",
      city: "Thousand Oaks",
      region: "CA",
      postalCode: "91362",
    },
    summary:
      "A year-end fundraising dinner with cocktails and music, right before Too Hot to Handel.",
    details: [
      "Start your concert night with dinner, signature cocktails, music, and good company at Fogo de Chão at the Lakes. Too Hot to Handel follows immediately after.",
      "Proceeds support New West Symphony and its education programs, including Symphonic Adventures student concerts, the Laby Harmony Project, and the Music Van.",
    ],
    priceLabel: "VIP dinner ticket: $400 per person",
    price: 400,
    cta: { label: "Buy Tickets", href: HOT_WINTERS_NIGHT_FORM },
    concertSlug: "too-hot-to-handel",
    contact: {
      name: "Patricia Jones",
      email: "pjones@newwestsymphony.org",
      phone: "805-444-7781",
    },
    sponsorship: {
      href: HOT_WINTERS_NIGHT_FORM,
      contactNames: "Patricia Jones or Janet Young",
      phone: "805-497-5800",
      emails: ["pjones@newwestsymphony.org", "jyoung@newwestsymphony.org"],
      levels: [
        {
          name: "Standing Ovation",
          price: "$25,000",
          perks: [
            "8 premium tickets to the dinner",
            "8 premium tickets to Too Hot to Handel",
            "Opportunity to sponsor a guest artist and a concert in the 2027 season",
            "8 premium tickets for the 2027 season",
            "Full-page ad in all concert programs",
            "Acknowledgment throughout the 2027 season",
          ],
        },
        {
          name: "Maestro",
          price: "$15,000",
          perks: [
            "6 premium tickets to the dinner",
            "6 premium tickets to Too Hot to Handel",
            "Opportunity to sponsor a guest artist and a concert in the 2027 season",
          ],
        },
        {
          name: "Firelight",
          price: "$10,000",
          perks: [
            "4 premium tickets to the dinner",
            "4 premium tickets to Too Hot to Handel",
            "Opportunity to sponsor a guest artist and a concert in the 2027 season",
          ],
        },
        {
          name: "Blue Note",
          price: "$5,000",
          perks: [
            "4 premium tickets to the dinner",
            "4 premium tickets to Too Hot to Handel",
            "Opportunity to sponsor a soloist during the year",
          ],
        },
        {
          name: "Encore",
          price: "$2,500",
          perks: [
            "Sponsor of the dinner and the concert",
            "2 premium tickets to the dinner",
            "2 premium tickets to Too Hot to Handel",
          ],
        },
      ],
    },
  },
  {
    slug: "summer-concerts-in-the-park-2026",
    title: "Summer Concerts in the Park",
    kind: "In the community",
    startDate: "2026-07-04T17:00:00-07:00",
    timeLabel: "5 PM",
    venue: {
      name: "Conejo Community Park",
      street: "1175 Hendrix Ave",
      city: "Thousand Oaks",
      region: "CA",
      postalCode: "91360",
    },
    summary:
      "A free Fourth of July concert with the orchestra and chorus, presented with the Conejo Recreation and Park District.",
    priceLabel: "Free",
    externalUrl: "https://www.crpd.org/celebrate-the-4th-of-july-with-conejo-recreation-park-district",
  },
  {
    slug: "sherwood-country-club-2026",
    title: "Sherwood Country Club Performance",
    kind: "In the community",
    startDate: "2026-07-03T12:00:00-07:00",
    venue: {
      name: "Sherwood Country Club",
      street: "320 W Stafford Rd",
      city: "Thousand Oaks",
      region: "CA",
      postalCode: "91361",
    },
    summary:
      "A patriotic program with New West Symphony principal brass and the Los Robles Children’s Choir, for Sherwood residents.",
    priceLabel: "Residents only",
  },
  {
    slug: "ronald-reagan-portrait",
    title: "The Ronald Reagan Portrait",
    kind: "In the community",
    startDate: "2026-06-27T18:00:00-07:00",
    timeLabel: "6 PM",
    venue: {
      name: "Ronald Reagan Presidential Library",
      street: "40 Presidential Dr",
      city: "Simi Valley",
      region: "CA",
      postalCode: "93065",
    },
    summary:
      "The world premiere of a new symphonic work with the Reagan Foundation, in the Air Force One Pavilion.",
    priceLabel: "$50 general admission, $150 premium",
    externalUrl: "https://www.reaganfoundation.org/events/an-a250-concert-at-the-reagan-library",
  },
];

/** Regular extras around each Masterpiece concert, from NWS's concert-experience page. */
export const CONCERT_EXTRAS = [
  {
    t: "Meet the Artists",
    b: "A free evening with Michael Christie and the guest artists a few days before each concert weekend at University Village Thousand Oaks, with a dessert reception and live music. Reserve at least 48 hours ahead at 805-241-3300.",
  },
  {
    t: "Hear & Now Live",
    b: "A free 30-minute talk about the music for ticket holders, one hour before each performance: Saturdays at 6 PM in Thousand Oaks and Sundays at 2 PM in Camarillo.",
  },
  {
    t: "Intermission Insights",
    b: "At each concert, Michael Christie leads a relaxed 10-minute Q&A with the artists.",
  },
];

export const getEvent = (slug: string): SiteEvent | undefined =>
  EVENTS.find((e) => e.slug === slug);

/** Events with enough detail to have their own page. */
export const eventPageSlugs = (): string[] =>
  EVENTS.filter((e) => e.details?.length).map((e) => e.slug);

const TWO_HOURS = 2 * 60 * 60 * 1000;
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

export function eventEndIso(e: SiteEvent): string {
  return e.endDate ?? new Date(new Date(e.startDate).getTime() + TWO_HOURS).toISOString();
}
const eventStart = (e: SiteEvent) => new Date(e.startDate).getTime();
const eventEnd = (e: SiteEvent) => new Date(eventEndIso(e)).getTime();

export const isEventPast = (e: SiteEvent, now: Date = new Date()) => eventEnd(e) < now.getTime();

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** The local date in the ISO string, without re-reading it in the runtime's timezone. */
function localDateParts(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return { year, weekday: WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()] };
}

/** "Sat, Dec 5" */
export function eventDateLabel(e: SiteEvent): string {
  return `${localDateParts(e.startDate).weekday}, ${localDateLabel(e.startDate)}`;
}

/** "Dec 5, 2026" */
export function eventDateWithYear(e: SiteEvent): string {
  return `${localDateLabel(e.startDate)}, ${localDateParts(e.startDate).year}`;
}

export const eventHref = (e: SiteEvent): string | undefined =>
  e.details?.length ? `/events/${e.slug}` : e.externalUrl;

/** One row of the combined calendar. */
export interface CalendarItem {
  key: string;
  kind: string;
  title: string;
  summary: string;
  railDate: { month: string; day: string; weekday: string };
  when: string;
  where: string;
  href: string;
  ctaLabel: string;
  start: number;
}

function concertItem(c: Concert): CalendarItem {
  return {
    key: `concert-${c.slug}`,
    kind: c.tag,
    title: c.title,
    summary: c.program,
    railDate: c.railDate,
    when: c.dateLabel,
    where: c.venuesLabel,
    href: `/concerts/${c.slug}`,
    ctaLabel: c.ticketsComingSoon ? "Tickets coming soon" : "Buy Tickets",
    start: new Date(c.performances[0].startDate).getTime(),
  };
}

function eventItem(e: SiteEvent): CalendarItem {
  const [month, day] = localDateLabel(e.startDate).split(" ");
  return {
    key: `event-${e.slug}`,
    kind: e.kind,
    title: e.title,
    summary: e.summary,
    railDate: {
      month: month.toUpperCase(),
      day,
      weekday: localDateParts(e.startDate).weekday,
    },
    when: [localDateLabel(e.startDate), e.timeLabel].filter(Boolean).join(" · "),
    where: e.venue.name,
    href: eventHref(e) ?? "/events",
    ctaLabel: "Event details",
    start: eventStart(e),
  };
}

/** Concerts and events together, soonest first, plus the past year's events. */
export function calendarItems(now: Date = new Date()): {
  upcoming: CalendarItem[];
  recent: SiteEvent[];
} {
  const t = now.getTime();
  const upcoming = [
    ...upcomingConcerts(now).map(concertItem),
    ...EVENTS.filter((e) => eventEnd(e) >= t).map(eventItem),
  ].sort((a, b) => a.start - b.start);
  const recent = EVENTS.filter((e) => eventEnd(e) < t && t - eventEnd(e) <= ONE_YEAR).sort(
    (a, b) => eventStart(b) - eventStart(a),
  );
  return { upcoming, recent };
}

/** The upcoming event, if any, that leads into this concert. */
export function eventBeforeConcert(slug: string, now: Date = new Date()): SiteEvent | undefined {
  return EVENTS.find((e) => e.concertSlug === slug && !isEventPast(e, now));
}
