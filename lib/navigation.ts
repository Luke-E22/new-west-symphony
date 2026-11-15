import { EXTERNAL, SOCIAL } from "@/lib/config";
import { EDUCATION_DETAIL } from "@/lib/data/education";

/**
 * Primary navigation: five menus, each opening a dropdown. Every page keeps a
 * place; the header's Buy Tickets, Become a Member, and Donate buttons stay as
 * they are. Each page is listed once, and each menu starts with its overview.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Opens another site in a new tab. */
  external?: boolean;
  /** A redirect route rather than a page, so it needs a full page load. */
  fullLoad?: boolean;
}

export interface NavGroup {
  key: string;
  label: string;
  columns: { heading?: string; links: NavLink[] }[];
  /** Path prefixes that mark this menu as the current section. */
  match: string[];
  /** Open the dropdown leftward, for menus near the right edge. */
  alignEnd?: boolean;
}

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "concerts",
    label: "Concerts & Tickets",
    match: ["/concerts", "/events", "/subscriptions", "/membership"],
    columns: [
      {
        heading: "Concerts",
        links: [
          { label: "This season", href: "/concerts" },
          { label: "Calendar of events", href: "/events" },
          { label: "Past concerts", href: "/concerts#past" },
        ],
      },
      {
        heading: "Tickets",
        links: [
          { label: "Subscriptions", href: "/subscriptions" },
          { label: "Membership", href: "/membership" },
          { label: "Renew a subscription", href: "/subscriptions#renew" },
          { label: "Patron login", href: EXTERNAL.patronLogin, external: true },
        ],
      },
    ],
  },
  {
    key: "visit",
    label: "Visit",
    match: ["/visit"],
    columns: [
      {
        links: [
          { label: "Venues, parking & access", href: "/visit" },
          { label: "Tonight’s program", href: "/program", fullLoad: true },
          { label: "Before & during the concert", href: "/events#around-every-concert" },
          { label: "Families & students", href: "/visit#families" },
        ],
      },
    ],
  },
  {
    key: "education",
    label: "Education",
    match: ["/education"],
    columns: [
      {
        links: [
          { label: "All programs", href: "/education" },
          ...EDUCATION_DETAIL.map((program) => ({
            label: program.name,
            href: `/education#${program.key}`,
          })),
        ],
      },
    ],
  },
  {
    key: "support",
    label: "Support",
    match: ["/support", "/get-involved"],
    columns: [
      {
        links: [
          { label: "Ways to give", href: "/support" },
          { label: "Adopt a Musician", href: "/support/adopt-a-musician" },
          { label: "Our sponsors", href: "/support/sponsors" },
          { label: "Become a sponsor", href: "/support/sponsors#become" },
          { label: "Volunteer", href: "/get-involved#volunteer" },
        ],
      },
    ],
  },
  {
    key: "about",
    label: "About",
    match: ["/about", "/press-room", "/get-involved/board"],
    alignEnd: true,
    columns: [
      {
        links: [
          { label: "Our story", href: "/about" },
          { label: "Michael Christie", href: "/about#music-director" },
          { label: "Leadership & board", href: "/about#leadership" },
          { label: "Orchestra & chorus", href: "/about#orchestra" },
          { label: "Join our board", href: "/get-involved/board" },
          { label: "Careers & auditions", href: "/get-involved#careers" },
          { label: "Press room", href: "/press-room" },
          { label: "Watch & listen", href: SOCIAL.youtube, external: true },
        ],
      },
    ],
  },
];

/** The menu whose section the page belongs to; the longest matching prefix wins. */
export function currentGroupKey(pathname: string): string | undefined {
  let best: { key: string; length: number } | undefined;
  for (const group of NAV_GROUPS) {
    for (const prefix of group.match) {
      const hit = pathname === prefix || pathname.startsWith(`${prefix}/`);
      if (hit && (!best || prefix.length > best.length)) best = { key: group.key, length: prefix.length };
    }
  }
  return best?.key;
}

/** True for the link to the page being viewed (same path, no section anchor). */
export const isCurrentLink = (pathname: string, href: string) =>
  !href.includes("#") && href === pathname;
