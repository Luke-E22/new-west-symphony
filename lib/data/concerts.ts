import type { Concert, PriceTier } from "./types";

/**
 * Standard single-ticket price tiers (§8c — representative; confirm before
 * publishing). Shared across the season; a concert may override.
 */
export const PRICE_TIERS: PriceTier[] = [
  { tier: "Premium Orchestra", price: "$95", amount: 95 },
  { tier: "Orchestra", price: "$75", amount: 75 },
  { tier: "Balcony", price: "$45", amount: 45 },
  { tier: "Student (with ID)", price: "$20", amount: 20 },
  { tier: "Family 4-Pack", price: "$120", amount: 120 },
];

/**
 * The REAL 2026 Masterpiece Series — six concerts (§8a).
 *
 * Pattern (from the confirmed Beethoven & Copland dates): Saturday 7 PM in
 * Thousand Oaks, Sunday 3 PM in Camarillo. Timezone offsets follow US Pacific
 * DST (PST −08:00; PDT −07:00 between Mar 8 and Nov 1, 2026).
 *
 * Concerts 1–3 (Rachmaninoff & Gershwin, Mozart and American Voices, Bernstein,
 * Brahms & Blues) carry `tbc: true` — conductor / guests / program are awaiting
 * confirmation from the program book (§8a). Concerts 4–6 keep their confirmed
 * details. All photography is placeholder (§Assets) — swap for real imagery.
 */
const SEASON: Omit<Concert, "poster">[] = [
  {
    slug: "rachmaninoff-gershwin",
    title: "Rachmaninoff & Gershwin",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    image: "/assets/photos/photo-c-rach.jpg",
    dateLabel: "Jan 24 & 25, 2026",
    railDate: { month: "JAN", day: "24", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2026-01-24T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2026-01-25T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Conductor to be announced",
    guests: "Soloist to be announced",
    program: "Rachmaninoff and Gershwin — full program to be confirmed.",
    programList: [
      "Rachmaninoff — orchestral work (TBC)",
      "Gershwin — orchestral work (TBC)",
    ],
    blurb:
      "The lush romanticism of Rachmaninoff meets the jazz-inflected American sound of Gershwin to open the new year.",
    priceTiers: PRICE_TIERS,
    tbc: true,
  },
  {
    slug: "mozart-american-voices",
    title: "Mozart and American Voices",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    image: "/assets/photos/photo-c-vienna.jpg",
    dateLabel: "Mar 7 & 8, 2026",
    railDate: { month: "MAR", day: "7", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2026-03-07T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2026-03-08T15:00:00-07:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Conductor to be announced",
    guests: "Guest artists to be announced",
    program:
      "Mozart paired with American voices — full program to be confirmed.",
    programList: [
      "Mozart — orchestral work (TBC)",
      "American composers — works to be announced",
    ],
    blurb:
      "Mozart's clarity and grace share the stage with bold American voices in a program that bridges centuries.",
    priceTiers: PRICE_TIERS,
    tbc: true,
  },
  {
    slug: "bernstein-brahms-blues",
    title: "Bernstein, Brahms & Blues",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    image: "/assets/photos/photo-c-family.jpg",
    dateLabel: "Apr 11 & 12, 2026",
    railDate: { month: "APR", day: "11", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2026-04-11T19:00:00-07:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2026-04-12T15:00:00-07:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Conductor to be announced",
    guests: "Guest artists to be announced",
    program:
      "Bernstein and Brahms with a blues current running through — full program to be confirmed.",
    programList: [
      "Bernstein — orchestral work (TBC)",
      "Brahms — orchestral work (TBC)",
      "Blues-inflected works to be announced",
    ],
    blurb:
      "The symphonic swagger of Bernstein, the depth of Brahms, and the soul of the blues in one electric night.",
    priceTiers: PRICE_TIERS,
    tbc: true,
  },
  {
    slug: "beethoven-copland",
    title: "Beethoven & Copland",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    image: "/assets/photos/photo-c-beethoven.jpg",
    dateLabel: "Oct 3 & 4, 2026",
    railDate: { month: "OCT", day: "3", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2026-10-03T19:00:00-07:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2026-10-04T15:00:00-07:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Francesco Lecce-Chong, conductor",
    guests: "Pacific Festival Ballet · Los Robles Children's Choir",
    program: "Copland: Appalachian Spring · Beethoven: Symphony No. 7",
    programList: [
      "Copland — Appalachian Spring",
      "Beethoven — Symphony No. 7",
    ],
    blurb:
      "American optimism meets Beethoven's most dance-driven symphony in a season-opening celebration of the nation's 250th.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "symphony-goes-to-cirque",
    title: "Symphony Goes to Cirque",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    image: "/assets/photos/photo-c-cirque.jpg",
    dateLabel: "Nov 7 & 8, 2026",
    railDate: { month: "NOV", day: "7", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2026-11-07T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2026-11-08T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    guests: "Troupe Vertigo, aerial cirque",
    program: "Saint-Saëns, Khachaturian & cinematic favorites",
    programList: [
      "Saint-Saëns — orchestral favorites",
      "Khachaturian — Sabre Dance and more",
      "Cinematic favorites with aerial cirque",
    ],
    blurb:
      "Aerialists soar above the orchestra in a gravity-defying spectacle the whole family will remember.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "too-hot-to-handel",
    title: "Too Hot to Handel",
    series: "Masterpiece Series",
    tag: "Holiday",
    image: "/assets/photos/photo-c-handel.jpg",
    dateLabel: "Dec 5 & 6, 2026",
    railDate: { month: "DEC", day: "5", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2026-12-05T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2026-12-06T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    guests:
      "NWS Chorus (Dr. Wyant Morton) · Alfreda Burke, soprano · Rodrick Dixon, tenor",
    program: "The jazz-gospel reinvention of Handel's Messiah",
    programList: [
      "Handel / Hayes — Too Hot to Handel: The Jazz-Gospel Messiah",
    ],
    blurb:
      "A soul-stirring gospel Messiah that turns the holidays into a community celebration.",
    priceTiers: PRICE_TIERS,
  },
];

/** Each concert's official square poster lives at /assets/concerts/poster-<slug>.jpg. */
export const CONCERTS: Concert[] = SEASON.map((c) => ({
  ...c,
  poster: `/assets/concerts/poster-${c.slug}.jpg`,
}));

export const getConcert = (slug: string): Concert | undefined =>
  CONCERTS.find((c) => c.slug === slug);

export const concertSlugs = (): string[] => CONCERTS.map((c) => c.slug);

/** Final performance datetime of a concert (its last show). */
function concertEnd(c: Concert): number {
  return new Date(c.performances[c.performances.length - 1].startDate).getTime();
}
function concertStart(c: Concert): number {
  return new Date(c.performances[0].startDate).getTime();
}

/**
 * Split the season into upcoming vs. past relative to `now` (defaults to the
 * render-time date). A concert counts as "past" only after its final show.
 * Upcoming is sorted soonest-first; past is sorted most-recent-first.
 */
export function splitSeason(now: Date = new Date()): {
  upcoming: Concert[];
  past: Concert[];
} {
  const t = now.getTime();
  const upcoming = CONCERTS.filter((c) => concertEnd(c) >= t).sort(
    (a, b) => concertStart(a) - concertStart(b),
  );
  const past = CONCERTS.filter((c) => concertEnd(c) < t).sort(
    (a, b) => concertStart(b) - concertStart(a),
  );
  return { upcoming, past };
}

/** Next upcoming concerts (for the home season strip). */
export function upcomingConcerts(now: Date = new Date()): Concert[] {
  return splitSeason(now).upcoming;
}

/** True once a concert's final performance has passed. */
export function isConcertPast(c: Concert, now: Date = new Date()): boolean {
  return concertEnd(c) < now.getTime();
}
