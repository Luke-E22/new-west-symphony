import type { MembershipTier } from "./types";

/**
 * Membership tiers — prices from the prototype (correct), seating zones from the
 * real §8b reconciliation. Membership is an ATTEND product, never a donation;
 * its CTAs route to MEMBERSHIP_PURCHASE_URL (lib/config), never the donate form.
 *
 * All tiers: reserve seats at $20 each, either venue, valid one year.
 */
export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    name: "Platinum",
    priceYear: "$600",
    priceAmount: 600,
    ticketsUpTo: 8,
    seating: "Premium seating",
    seatingByVenue: {
      to: "Founders Circle + Orchestra Center",
      cam: "Orchestra Premium",
    },
    memberEvents: "Premium & priority member events",
    extraTicketDiscount: "15% off additional tickets",
    badge: "Most rewarding",
    featured: true,
  },
  {
    name: "Gold",
    priceYear: "$400",
    priceAmount: 400,
    ticketsUpTo: 6,
    seating: "Preferred seating",
    seatingByVenue: {
      to: "Orchestra Left + Mezzanine Front",
      cam: "Mezzanine Premium",
    },
    memberEvents: "Select member events",
    extraTicketDiscount: "10% off additional tickets",
  },
  {
    name: "Silver",
    priceYear: "$300",
    priceAmount: 300,
    ticketsUpTo: 6,
    seating: "Standard seating zone",
    seatingByVenue: {
      to: "Orchestra Right + Mezzanine",
      cam: "Orchestra + Mezzanine",
    },
    memberEvents: "Select member events",
    extraTicketDiscount: "10% off additional tickets",
  },
  {
    name: "NextGen",
    priceYear: "$200",
    priceAmount: 200,
    ticketsUpTo: 6,
    seating: "Standard seating zone",
    seatingByVenue: { to: "Mezzanine", cam: "Mezzanine" },
    memberEvents: "Hosted networking & social events",
    extraTicketDiscount: "10% off additional tickets",
    badge: "Students",
    audience: "High-school & college students",
  },
  {
    name: "Family",
    priceYear: "$200",
    priceAmount: 200,
    ticketsUpTo: 12,
    seating: "Standard seating zone",
    seatingByVenue: { to: "Mezzanine", cam: "Mezzanine" },
    memberEvents: "Family-centered activities",
    extraTicketDiscount: "10% off additional tickets",
    badge: "Under 18",
    audience: "Households with kids under 18",
  },
];

export const MEMBER_STEPS = [
  {
    n: "01",
    t: "Choose your tier",
    b: "Pick the membership that fits how you like to attend — from NextGen and Family to Platinum. Your tier sets your seating zone and how many seats you can reserve.",
  },
  {
    n: "02",
    t: "Reserve seats at $20 each",
    b: "Whenever you want to attend, reserve your seats for a flat $20 each — any Masterpiece concert, at either venue. No fixed dates, no subscription package.",
  },
  {
    n: "03",
    t: "Enjoy member perks",
    b: "A dedicated concierge, member-only events, local business perks, and discounts on extra tickets — all year long.",
  },
];

export const MEMBER_BENEFITS = [
  {
    t: "Flexible seating",
    b: "Reserve seats when you want them at $20 each — your zone scales with your tier.",
  },
  {
    t: "Membership concierge",
    b: "A dedicated person to handle your seats, questions, and special requests.",
  },
  {
    t: "Member-only events",
    b: "Open rehearsals, artist receptions, and gatherings made for members.",
  },
  {
    t: "Local business perks",
    b: "Dining and retail offers from partners across Ventura County and the Conejo Valley.",
  },
  {
    t: "Discounts on extra tickets",
    b: "Bringing friends? Save 10–15% on additional single tickets all season.",
  },
  {
    t: "Use it at either venue",
    b: "One membership works in both Thousand Oaks and Camarillo, valid for a full year.",
  },
];

/** Single-open accordion content. The not-tax-deductible line is required (§8b/DoD). */
export const MEMBER_FAQS = [
  {
    q: "How does seat access work?",
    a: "Once you're a member, you reserve seats at a flat $20 each whenever you'd like to attend a Masterpiece concert — up to your tier's seat count. Just contact your concierge or reserve online; there are no fixed performance dates tied to your membership.",
  },
  {
    q: "Are the seats free?",
    a: "No. Membership is an attend product, not a donation — your tier fee unlocks the right to reserve seats at the discounted $20 price. It's the flexible middle path between single tickets and a full subscription.",
  },
  {
    q: "Do unused tickets roll over?",
    a: "They don't. Your seat allotment is for the current membership year and resets when you renew. Most members find their tier matches how often they actually attend.",
  },
  {
    q: "Is any of it tax-deductible?",
    a: "Membership is a purchase of attendance value, so it is generally not tax-deductible. If you'd like to make a charitable gift, our Support page is the place for that — and it's fully deductible as allowed by law.",
  },
  {
    q: "Can I use my membership at both venues?",
    a: "Yes. A single membership is valid at both the Bank of America Performing Arts Center in Thousand Oaks and Rancho Campana in Camarillo, for a full year. Note: Camarillo memberships are capped at 50 for this inaugural year.",
  },
  {
    q: "Can I upgrade my tier later?",
    a: "Absolutely. You can move up a tier at any point in your membership year and simply pay the difference — your concierge will handle it.",
  },
];

/** Surfaced as a real rule on the membership page (§8b). */
export const CAMARILLO_CAP_NOTE =
  "Camarillo memberships are capped at 50 for this inaugural year.";
