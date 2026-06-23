/**
 * New West Symphony — site configuration & external integration points.
 *
 * The site processes no money or auth itself (§1). Every outbound commerce /
 * auth action is a link to an external provider, centralized here so staff can
 * swap a single value when an org-side flow changes.
 */

export const SITE = {
  name: "New West Symphony",
  legalName: "New West Symphony Association",
  shortName: "NWS",
  // Live primary tagline (§8c) — not the prototype's placeholder.
  tagline: "Your Symphony. Your Choice. The Sound of California.",
  taglineShort: "Exceptional music, exceptionally close.",
  description:
    "New West Symphony is the professional orchestra of Ventura County and the Conejo Valley — six Masterpiece concerts a year across Thousand Oaks and Camarillo, plus music education for 8,000+ students.",
  serviceArea: "Ventura County and the Conejo Valley",
  ein: "77-0406042",
  nonprofitStatus: "501(c)(3)",
  founded: 1995,
  musicDirector: "Michael Christie",
  musicDirectorTitle: "Artistic & Music Director",
  // Set to the production origin before launch (used for canonical URLs, OG,
  // sitemap, JSON-LD). Override with NEXT_PUBLIC_SITE_URL in the environment.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://newwestsymphony.org",
  ticketOfficeHours: "Tue–Fri 10–4",
  ticketOfficePhone: "(805) 497-5800",
  ticketOfficeEmail: "boxoffice@newwestsymphony.org",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/newwestsymphony",
  instagram: "https://www.instagram.com/newwestsymphony",
  youtube: "https://www.youtube.com/@newwestsymphony",
  spotify: "https://open.spotify.com/",
} as const;

/**
 * LAUNCH BLOCKER (§1, resolved as: placeholder constant, flagged TBC).
 *
 * NWS's only membership purchase URL today is the Salesforce DONATE form with a
 * membership code — but the hard rule (§13, DoD) is that membership CTAs must
 * NEVER hit the donation form. Until NWS stands up a real membership purchase
 * flow (separate Salesforce object/form), every "Become a Member" / "Choose
 * {tier}" CTA points HERE — an internal, clearly-temporary anchor — never the
 * donate form. A Playwright test asserts this value is not the donate URL.
 *
 * TODO(NWS): replace with the real Salesforce membership purchase URL.
 */
export const MEMBERSHIP_PURCHASE_URL = "/membership#purchase-tbc";

/** External ticketing & giving providers (the site links out; it sells nothing). */
export const EXTERNAL = {
  // Tickets — Ticketmaster for Thousand Oaks (BAPAC), Salesforce Sites for Camarillo.
  ticketsThousandOaks: "https://www.ticketmaster.com/",
  ticketsCamarillo: "https://nws.my.salesforce-sites.com/tickets",
  // Donations — the Salesforce donation form (the separate, tax-deductible flow).
  donate: "https://nws.my.salesforce-sites.com/donate",
  // Existing Salesforce patron portal (kept live through cutover, §11).
  patronLogin: "https://nws.my.salesforce-sites.com/patron",
  // Watch & Listen.
  watchListen: SOCIAL.youtube,
  // E-news provider (Mailchimp) — the real NWS list (us11).
  mailchimpAction:
    "https://newwestsymphony.us11.list-manage.com/subscribe/post?u=6108ebc14d0199c8156ec732e&id=f8617be2d3",
  // Mailchimp honeypot field name is b_<u>_<id>.
  mailchimpHoneypot: "b_6108ebc14d0199c8156ec732e_f8617be2d3",
  // Board "Express Interest" fallback contact, shown if lead delivery isn't
  // configured (audit H6). TODO(NWS): set a dedicated governance inbox — the box
  // office is a temporary relay until then.
  boardInterestEmail: "boxoffice@newwestsymphony.org",
} as const;

/** Primary navigation — 6 core items + Membership beside Concerts (§global arch). */
export const NAV = [
  { label: "Concerts", href: "/concerts" },
  { label: "Membership", href: "/membership" },
  { label: "Visit", href: "/visit" },
  { label: "Support", href: "/support" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Education", href: "/education" },
  { label: "About", href: "/about" },
] as const;
