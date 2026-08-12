import type { Person } from "./types";

/**
 * Board of Directors — the real roster (headshots pulled from
 * newwestsymphony.org/about/board). Order centers Luke Erickson (4th of 7).
 */
export const BOARD_MEMBERS: Person[] = [
  { name: "Anthony Vasquez", role: "Chair", photo: "/assets/board/anthony-vasquez.jpg" },
  { name: "Cathy Lichtenberger, Ed.D.", role: "Director", photo: "/assets/board/cathy-lichtenberger.jpg" },
  { name: "Phil Lichtenberger", role: "Director", photo: "/assets/board/phil-lichtenberger.jpg" },
  {
    name: "Luke Erickson",
    role: "Director",
    photo: "/assets/board/luke-erickson-v3.jpg",
    links: [
      { kind: "linkedin", href: "https://www.linkedin.com/in/luke-erickson/" },
      { kind: "facebook", href: "https://www.facebook.com/luke.e.erickson" },
      { kind: "website", href: "https://lukeerickson.com" },
    ],
  },
  { name: "Marijane Unter", role: "Director", photo: "/assets/board/marijane-unter.png" },
  { name: "Gary Wartik", role: "Director", photo: "/assets/board/gary-wartik-v5.jpg" },
  { name: "Erin Pohl", role: "Director", photo: "/assets/board/erin-pohl.png" },
];

/**
 * Board of Advisors — advisors counsel the board without serving on it, so
 * they're listed by name only: no photos, no roles, no JSON-LD (they aren't
 * members of the governing body).
 */
export const BOARD_OF_ADVISORS: string[] = [
  "Betsy Chess",
  "Karl Klessig",
  "Jordan Laby",
  "Karen Dean Fritts, Ph.D.",
  "Paul Finkel, M.D.",
];

/**
 * Honored past presidents / board chairs, oldest first. Listed as given by
 * NWS; the record has gaps (2014–2018, and 2022 to the current chair), so
 * don't infer continuity from adjacent rows. Karl Klessig appears here and in
 * BOARD_OF_ADVISORS — a former chair now advising is intentional, not a dupe.
 */
export const PAST_CHAIRS: { name: string; years: string }[] = [
  { name: "Lawrence Blomquist", years: "1995–1996" },
  { name: "Tracy Susman", years: "1996–1997" },
  { name: "William Bang", years: "1997–1999" },
  { name: "Miriam Chase Wille", years: "1999–2000" },
  { name: "Judy Linton", years: "2000–2002" },
  { name: "Rick Newberger", years: "2002–2007" },
  { name: "Len Linton", years: "2007–2010" },
  { name: "Jennifer Zobelein", years: "2010–2012" },
  { name: "Karl Klessig", years: "2012–2014" },
  { name: "Kim Woods", years: "2018–2020" },
  { name: "Dwight Brown", years: "2020–2022" },
  { name: "Bob Lugari", years: "2022" },
];

/** Named contact on the Join Our Board form — the Board Chair. */
export const GOVERNANCE_CONTACT: Person = {
  name: "Anthony Vasquez",
  role: "Board Chair",
};

/** Decorative gradient avatars — fallback only (real headshots are used now). */
export const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#3a2418,#6B4A2A)",
  "linear-gradient(135deg,#1E2A6E,#3A4A9E)",
  "linear-gradient(135deg,#7A2230,#A85A48)",
  "linear-gradient(135deg,#2A2438,#4F6B52)",
  "linear-gradient(135deg,#8A6526,#C0903F)",
];
