import { EXTERNAL } from "@/lib/config";
import { VENUES } from "./venues";
import type { Concert, PriceTier, VenueKey } from "./types";

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
/** A concert's poster is derived from its slug unless it names one (the 2027
 *  placeholders share one "artwork to come" card). */
type SeasonEntry = Omit<Concert, "poster"> & { poster?: string };

/* Shared "artwork to come" poster for the 2027 season — swap per concert once
   NWS supplies the official art. */
const TBA_POSTER_2027 = "/assets/concerts/poster-tba-2027.jpg";

const SEASON: SeasonEntry[] = [
  {
    slug: "rachmaninoff-gershwin",
    title: "Rachmaninoff & Gershwin",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    season: 2026,
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
    season: 2026,
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
    season: 2026,
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
    season: 2026,
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
    season: 2026,
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
    season: 2026,
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

  /**
   * The 2027 Masterpiece Series, from NWS's renewal programming sheet
   * ("2027 Programming for renewal.docx", July 2026): six Saturday evenings
   * 7 PM at BAPAC (Thousand Oaks) + six Sunday afternoons 3 PM at RCPAC
   * (Camarillo). "All programming, guest artists and dates subject to change."
   *
   * Offsets follow US Pacific DST in 2027 (starts Mar 14, ends Nov 7) — the
   * November weekend straddles the change: Sat is PDT, Sun is PST.
   *
   * Tickets are not on sale yet (ticketsComingSoon); official 2027 artwork is
   * pending, so all six share the TBA poster. The renewal sheet lists the
   * Tchaikovsky Violin Concerto as "Op. 64" — that opus is the Fifth Symphony's
   * and the concerto is Op. 35, so the opus is omitted here rather than
   * reproducing the typo.
   */
  {
    slug: "best-of-tchaikovsky",
    title: "Best of Tchaikovsky",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    season: 2027,
    image: "/assets/photos/orchestra-performance.jpg",
    poster: TBA_POSTER_2027,
    ticketsComingSoon: true,
    dateLabel: "Jan 30 & 31, 2027",
    railDate: { month: "JAN", day: "30", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2027-01-30T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2027-01-31T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    program:
      "Musical favorites of Tchaikovsky — 1812 Overture, The Nutcracker, Swan Lake & more",
    programList: [
      "Tchaikovsky — 1812 Overture",
      "Tchaikovsky — Music from The Nutcracker & Swan Lake",
      "Tchaikovsky — Violin Concerto in D Major: Allegro vivacissimo",
      "Tchaikovsky — Souvenir de Florence: Allegro moderato",
      "Tchaikovsky — Symphony No. 5 in E Minor, Op. 64: Finale",
    ],
    blurb:
      "Three ballets, five concertos, seven symphonies, ten operas — it's hard to pick a favorite. Michael Christie leads a grand tour through the popular works of one of music's most revered and prolific composers.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "chopin-second",
    title: "Chopin Second",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    season: 2027,
    image: "/assets/photos/orchestra-performance.jpg",
    poster: TBA_POSTER_2027,
    ticketsComingSoon: true,
    dateLabel: "Mar 6 & 7, 2027",
    railDate: { month: "MAR", day: "6", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2027-03-06T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2027-03-07T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    guests: "Andrew von Oeyen, piano",
    program: "Chopin: Piano Concerto No. 2 · Beethoven: Symphony No. 2",
    programList: [
      "Chopin — Piano Concerto No. 2 in F Minor, Op. 21",
      "Bacewicz — Concerto for String Orchestra",
      "Lutosławski — Six Children's Songs",
      "Beethoven — Symphony No. 2 in D Major, Op. 36",
    ],
    blurb:
      "Chopin's poetic Second Piano Concerto meets the early Beethoven symphony that spoke to his classical instincts — with internationally renowned, Malibu-based virtuoso Andrew von Oeyen at the piano and Polish masterworks in between.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "rossini-meets-beethoven",
    title: "Rossini Meets Beethoven",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    season: 2027,
    image: "/assets/photos/orchestra-performance.jpg",
    poster: TBA_POSTER_2027,
    ticketsComingSoon: true,
    dateLabel: "Apr 10 & 11, 2027",
    railDate: { month: "APR", day: "10", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2027-04-10T19:00:00-07:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2027-04-11T15:00:00-07:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    guests: "New West Symphony Chorus",
    program:
      "Rossini: The Barber of Seville & William Tell · Beethoven: “Ode to Joy”",
    programList: [
      "Rossini — Overture to The Barber of Seville",
      "Rossini — Scenes from The Barber of Seville",
      "Rossini — Overture to William Tell",
      "Beethoven — Symphony No. 9 in D Minor, Op. 125, IV: “Ode to Joy”",
    ],
    blurb:
      "Two musical titans who admired each other from very different lives — one feted in grand palaces, the other working away in a leaking attic. Rossini's pinnacle overtures beside the immortal “Ode to Joy” finale of Beethoven's Ninth.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "star-wars",
    title: "Star Wars",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    season: 2027,
    image: "/assets/photos/orchestra-performance.jpg",
    poster: TBA_POSTER_2027,
    ticketsComingSoon: true,
    dateLabel: "Oct 9 & 10, 2027",
    railDate: { month: "OCT", day: "9", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2027-10-09T19:00:00-07:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2027-10-10T15:00:00-07:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    program: "John Williams' music from all nine episodes of the Skywalker saga",
    programList: [
      "Williams — Music from The Phantom Menace, Attack of the Clones, Revenge of the Sith, A New Hope, The Empire Strikes Back, Return of the Jedi, The Force Awakens, The Last Jedi, and The Rise of Skywalker",
    ],
    blurb:
      "It's hard to believe Star Wars premiered 50 years ago in 1977 — relive all nine episodes of the Skywalker saga in two hours of John Williams' Academy Award, BAFTA, Golden Globe, Grammy, and Saturn award-winning scores.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "beethoven-in-havana",
    title: "Beethoven in Havana",
    series: "Masterpiece Series",
    tag: "Masterpiece",
    season: 2027,
    image: "/assets/photos/orchestra-performance.jpg",
    poster: TBA_POSTER_2027,
    ticketsComingSoon: true,
    dateLabel: "Nov 6 & 7, 2027",
    railDate: { month: "NOV", day: "6", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      // DST ends 2am Sun Nov 7 2027: Saturday is PDT, Sunday afternoon is PST.
      { startDate: "2027-11-06T19:00:00-07:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2027-11-07T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    guests: "Joachim Horsley, piano",
    program: "Horsley: Beethoven in Havana · Beethoven: Symphony No. 7",
    programList: [
      "Key / Smith — The Star-Spangled Banner",
      "Wendel — Armed Forces March",
      "Horsley — Beethoven in Havana",
      "Beethoven — Symphony No. 7 in A Major, Op. 92",
    ],
    blurb:
      "Beethoven's joyful Seventh Symphony and a tribute to American military veterans — with Latin Grammy-nominated composer-pianist Joachim Horsley bringing Classical and Afro-Caribbean cultures together with utter delight.",
    priceTiers: PRICE_TIERS,
  },
  {
    slug: "winter-wonderland",
    title: "Winter Wonderland",
    series: "Masterpiece Series",
    tag: "Holiday",
    season: 2027,
    image: "/assets/photos/orchestra-performance.jpg",
    poster: TBA_POSTER_2027,
    ticketsComingSoon: true,
    dateLabel: "Dec 4 & 5, 2027",
    railDate: { month: "DEC", day: "4", weekday: "Sat" },
    timeLabel: "Sat 7 PM · Sun 3 PM",
    performances: [
      { startDate: "2027-12-04T19:00:00-08:00", venueKey: "to", timeLabel: "Sat 7 PM" },
      { startDate: "2027-12-05T15:00:00-08:00", venueKey: "cam", timeLabel: "Sun 3 PM" },
    ],
    venueKeys: ["to", "cam"],
    venuesLabel: "Thousand Oaks · Camarillo",
    conductor: "Michael Christie, conductor",
    guests: "New West Symphony Chorus · Los Robles Children's Choir",
    program: "Winter Spectacular — symphonic favorites meet holiday spirit",
    programList: [
      "Winter-inspired symphonic favorites and holiday classics",
      "Featuring the New West Symphony Chorus and Los Robles Children's Choir",
    ],
    blurb:
      "An annual New West Symphony holiday favorite — winter-inspired symphonic favorites meet holiday spirit in a program to launch the season, featuring the New West Symphony Chorus and Los Robles Children's Choir.",
    priceTiers: PRICE_TIERS,
  },
];

/** Each concert's official square poster lives at /assets/concerts/poster-<slug>.jpg. */
export const CONCERTS: Concert[] = SEASON.map((c) => ({
  ...c,
  poster: c.poster ?? `/assets/concerts/poster-${c.slug}.jpg`,
}));

/** Season years present in the data, soonest first (2026, 2027, …). */
export const SEASON_YEARS: number[] = [...new Set(CONCERTS.map((c) => c.season))].sort(
  (a, b) => a - b,
);

export const getConcert = (slug: string): Concert | undefined =>
  CONCERTS.find((c) => c.slug === slug);

export const concertSlugs = (): string[] => CONCERTS.map((c) => c.slug);

/** Where a venue's tickets are sold when a concert has no explicit link yet. */
const VENUE_TICKET_FALLBACK: Record<VenueKey, string> = {
  to: EXTERNAL.ticketsThousandOaks,
  cam: EXTERNAL.ticketsCamarillo,
};

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * "2026-01-24T19:00:00-08:00" → "Jan 24". The UTC offset is already baked into
 * the string, so the date part is the local one — slice it rather than building
 * a Date, which would re-interpret the instant in the runtime's timezone.
 */
function localDateLabel(iso: string): string {
  const [, month, day] = iso.slice(0, 10).split("-");
  return `${MONTHS_SHORT[Number(month) - 1]} ${Number(day)}`;
}

export interface TicketLink {
  venueKey: VenueKey;
  /** "Thousand Oaks" | "Camarillo" */
  city: string;
  /** When that venue's performance is, e.g. "Jan 24 · Sat 7 PM". */
  when?: string;
  href: string;
}

/**
 * The buy links for a concert — one per venue, in the concert's venue order.
 * The two halls sell through separate ticketing pages, so a concert playing
 * both offers two buys; a single-venue concert yields one.
 */
export function ticketLinks(concert: Concert): TicketLink[] {
  return concert.venueKeys.map((key) => {
    const perf = concert.performances.find((p) => p.venueKey === key);
    return {
      venueKey: key,
      city: VENUES[key].city,
      when: perf ? `${localDateLabel(perf.startDate)} · ${perf.timeLabel}` : undefined,
      href: concert.ticketUrls?.[key] ?? VENUE_TICKET_FALLBACK[key],
    };
  });
}

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
