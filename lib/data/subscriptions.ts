import { SITE, SUBSCRIPTION_PURCHASE, SUBSCRIPTION_SEASON, type SubscriptionPurchase } from "@/lib/config";
import { CONCERTS, localDateLabel } from "./concerts";
import { MEMBERSHIP_TIERS } from "./membership";
import type { VenueKey } from "./types";
import { VENUES } from "./venues";

/**
 * Season subscriptions: a fixed series of all six Masterpiece concerts, at one
 * venue, in the same seats every time. A different product from membership
 * (lib/data/membership.ts), which is a yearly allotment reserved concert by
 * concert. NWS's own line: "Only subscribers are guaranteed the same seats for
 * every concert."
 *
 * Benefits and the 20% figure are the published 2026 terms from
 * newwestsymphony.org/2026-masterpiece-series. TODO(NWS): confirm for 2027.
 */

export interface SubscriptionSeries {
  venueKey: VenueKey;
  /** "Saturday series" | "Sunday series" */
  label: string;
  /** "Saturdays at 7 PM" */
  when: string;
  /** "Thousand Oaks" */
  city: string;
  venueName: string;
  concerts: { slug: string; title: string; date: string }[];
  /** Absent until this venue's series is on sale. */
  purchase?: SubscriptionPurchase;
}

const SERIES_SCHEDULE: { venueKey: VenueKey; label: string; when: string }[] = [
  { venueKey: "to", label: "Saturday series", when: "Saturdays at 7 PM" },
  { venueKey: "cam", label: "Sunday series", when: "Sundays at 3 PM" },
];

/** Both series for the season on sale, with dates drawn from the concert data. */
export function subscriptionSeries(season: number = SUBSCRIPTION_SEASON): SubscriptionSeries[] {
  return SERIES_SCHEDULE.map(({ venueKey, label, when }) => ({
    venueKey,
    label,
    when,
    city: VENUES[venueKey].city,
    venueName: VENUES[venueKey].name,
    concerts: CONCERTS.filter((c) => c.season === season)
      .flatMap((c) =>
        c.performances
          .filter((p) => p.venueKey === venueKey)
          .map((p) => ({
            slug: c.slug,
            title: c.title,
            date: localDateLabel(p.startDate),
            start: new Date(p.startDate).getTime(),
          })),
      )
      .sort((a, b) => a.start - b.start)
      .map(({ slug, title, date }) => ({ slug, title, date })),
    purchase: SUBSCRIPTION_PURCHASE[venueKey],
  }));
}

export const SUBSCRIPTION_STEPS = [
  {
    n: "01",
    t: "Pick your series",
    b: "Saturday evenings in Thousand Oaks or Sunday afternoons in Camarillo. The same six concerts, on the day that suits you.",
  },
  {
    n: "02",
    t: "Choose your seats",
    b: "Pick your seats once. They are yours at every concert of the season.",
  },
  {
    n: "03",
    t: "Keep them next year",
    b: "Renew and your seats are guaranteed, or ask for a priority upgrade.",
  },
];

/** Titles double as icon keys in components/Icons.tsx (BENEFIT_ICONS). */
export const SUBSCRIPTION_BENEFITS = [
  {
    t: "Same seats, guaranteed",
    b: "Your seats are yours at every concert and guaranteed when you renew, or take a priority upgrade.",
  },
  {
    t: "Substantial savings",
    b: "Save up to 20% off single-ticket pricing when you subscribe for the season.",
  },
  {
    t: "Free ticket exchanges",
    b: "Need to switch concert days? No problem, and no fee.",
  },
  {
    t: "Lost ticket replacement",
    b: "Free replacements for lost or forgotten tickets, right up to performance time.",
  },
  {
    t: "A seat upgrade each season",
    b: "Once per season, try out a new section for one concert.",
  },
  {
    t: "Discounts for guests",
    b: "Bringing someone along? Take 20% off additional seats.",
  },
];

const membershipFrom = Math.min(...MEMBERSHIP_TIERS.map((t) => t.priceAmount));

/** Side-by-side for the page. Membership facts match NWS's published membership FAQ. */
export const SUBSCRIPTION_VS_MEMBERSHIP = [
  {
    label: "Best for",
    subscription: "Regulars who come to every concert and love their seats",
    membership: "Concertgoers who want to choose their nights and enjoy member perks",
  },
  {
    label: "Your seats",
    subscription: "The same seats at every concert, guaranteed",
    membership: "Reserved concert by concert in your tier’s seating zone. The same seats aren’t guaranteed",
  },
  {
    label: "Concerts",
    subscription: "All six Masterpiece concerts",
    membership: "As many or as few as you choose, up to your tier’s ticket allotment",
  },
  {
    label: "When and where",
    subscription: "One series: Saturdays in Thousand Oaks or Sundays in Camarillo",
    membership: "Either venue, any Masterpiece concert, subject to availability",
  },
  {
    label: "What you pay",
    subscription: "One price for the season, up to 20% below single tickets",
    membership: `A yearly tier fee from $${membershipFrom}, then $20 per seat`,
  },
  {
    label: "If plans change",
    subscription: "Free ticket exchanges to switch concert days",
    membership: "Reserve only the concerts you’ll attend. Unused tickets don’t roll over",
  },
  {
    label: "Next year",
    subscription: "Guaranteed same-seat renewal, or a priority upgrade",
    membership: "Valid for one year from purchase, then renew",
  },
  {
    label: "Extras",
    subscription: "20% off additional seats, free lost-ticket replacement, and one seat upgrade a season",
    membership: "A membership concierge, member events, local business perks, and 10–15% off additional tickets",
  },
];

/** From NWS's "Renew Your Subscription Online" guide. */
export const SUBSCRIPTION_RENEWAL_STEPS = [
  "Log in to the Patron Portal. Your username is your email address, and “Forgot Your Password?” will email you a temporary one.",
  "Open the “Subscription renewal” tab.",
  "Renew, ask to change your subscription, or let us know you won’t be renewing.",
];

export const SUBSCRIPTION_FAQS = [
  {
    q: "How is a subscription different from a membership?",
    a: "A subscription gives you the same seats at all six Masterpiece concerts. A membership gives you a yearly allotment of tickets that you reserve at $20 each, for the concerts you choose. Only subscribers are guaranteed the same seats for every concert.",
  },
  {
    q: "Do I have to choose a venue?",
    a: `Yes. The Saturday series plays at 7 PM at the ${VENUES.to.name} in Thousand Oaks, and the Sunday series plays at 3 PM at ${VENUES.cam.name} in Camarillo. Both series feature the same six concerts.`,
  },
  {
    q: "What if I can’t make one of my concerts?",
    a: `Subscribers exchange tickets for free, including switching concert days. Call the Ticket Office at ${SITE.ticketOfficeTollFree}.`,
  },
  {
    q: "What if I lose or forget my tickets?",
    a: "We’ll replace them for free, right up to performance time.",
  },
  {
    q: "Can I try sitting somewhere else?",
    a: "Yes. Once per season, subscribers can upgrade their seats to try out a new section for one concert.",
  },
  {
    q: "Can I buy extra tickets for friends or family?",
    a: "Yes. Subscribers get 20% off additional seats.",
  },
  {
    q: "How do I keep my seats next year?",
    a: `Subscribers are guaranteed their same seats when they renew, or a priority upgrade if they’d like to move. Renew online in the Patron Portal or call the Ticket Office at ${SITE.ticketOfficeTollFree}.`,
  },
];
