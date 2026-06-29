/**
 * Content model (§6). These types describe the typed seed data in lib/data/*.
 * The shapes mirror the planned Sanity schemas so swapping the source later is
 * a data-fetch change, not a component change.
 */

export type VenueKey = "to" | "cam";

export interface Venue {
  key: VenueKey;
  name: string;
  /** Hall / theatre name, where distinct from the building. */
  hall?: string;
  city: string;
  street: string;
  region: string; // "CA"
  postalCode: string;
  /** One-line address used in compact UI. */
  addressLine: string;
  parking: string;
  accessibility: string;
}

export interface PriceTier {
  tier: string;
  price: string; // display string, e.g. "$95"
  amount: number; // numeric, for JSON-LD offers
}

/** A single performance of a concert at one venue / date / time. */
export interface Performance {
  /** ISO 8601 with timezone offset — used as MusicEvent startDate. */
  startDate: string;
  venueKey: VenueKey;
  /** Display time, e.g. "Sat 7 PM". */
  timeLabel: string;
}

export interface Concert {
  slug: string;
  title: string;
  series: string; // "Masterpiece Series" | "Family Concert"
  tag: string; // badge label: "Masterpiece" | "Holiday" | "Family"
  image: string; // /assets/photos/...
  poster: string; // /assets/concerts/poster-<slug>.jpg — official square concert art
  /** Human date range, e.g. "Jan 24 & 25, 2026". */
  dateLabel: string;
  /** Compact rail date for the EventCard. */
  railDate: { month: string; day: string; weekday: string };
  /** Combined display time, e.g. "Sat 7 PM · Sun 3 PM". */
  timeLabel: string;
  performances: Performance[];
  venueKeys: VenueKey[];
  venuesLabel: string;
  conductor: string;
  guests: string;
  program: string;
  /** Program broken into bullet lines for the detail page. */
  programList: string[];
  blurb: string;
  priceTiers: PriceTier[];
  /** Real per-concert ticketing URL (audit M1). TODO(NWS): set this on each
   *  concert; until then the page falls back to the venue provider homepage. */
  ticketUrl?: string;
  /** True when conductor/guests/program are not yet confirmed from the
   *  program book (real season concerts 1–3, §8a). */
  tbc?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MembershipTier {
  name: string;
  priceYear: string; // "$600"
  priceAmount: number;
  ticketsUpTo: number;
  seating: string;
  /** Seating zones per venue (§8b real seating). */
  seatingByVenue: { to: string; cam: string };
  memberEvents: string;
  extraTicketDiscount: string;
  badge?: string;
  audience?: string; // footnote qualifier, e.g. "HS / college students"
  featured?: boolean;
}

export interface GivingProgram {
  name: string;
  blurb: string;
  isLegacy?: boolean;
}

export interface DonationAmount {
  value: number;
  label: string;
  impact: string;
  defaultSelected?: boolean;
}


export interface EducationDetail {
  /** Anchor id + icon key, e.g. "music-van". */
  key: string;
  name: string;
  tagline: string;
  summary: string[];
  photo: string;
}

export interface PersonLink {
  kind: "linkedin" | "instagram" | "facebook" | "website";
  href: string;
}

export interface Person {
  name: string;
  role: string;
  /** Headshot path under /assets/board (real board photos). */
  photo?: string;
  /** Optional personal links shown on the board card. */
  links?: PersonLink[];
}

export interface OrchestraSection {
  section: string;
  members: { name: string; role?: string }[];
}

export interface StaffMember {
  name: string;
  title: string;
}

export interface ChorusInfo {
  director: string;
  directorTitle: string;
  description: string[];
}
