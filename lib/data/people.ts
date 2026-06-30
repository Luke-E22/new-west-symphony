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
