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
    "New West Symphony is the professional orchestra of Ventura County and the Conejo Valley — six Masterpiece concerts a year across Thousand Oaks and Camarillo, plus music education reaching thousands of students.",
  serviceArea: "Ventura County and the Conejo Valley",
  ein: "77-0406042",
  nonprofitStatus: "501(c)(3)",
  founded: 1995,
  musicDirector: "Michael Christie",
  musicDirectorTitle: "Artistic & Music Director",
  // Canonical origin (canonical URLs, OG, sitemap, JSON-LD). Audit M2: a
  // production build MUST set NEXT_PUBLIC_SITE_URL — otherwise a staging build
  // would silently emit prod canonicals. Fail the build instead of falling back
  // to a hardcoded prod origin; dev keeps a harmless localhost default.
  url: (() => {
    const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (!fromEnv && process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL is required for a production build. Set it in the environment before running `next build`.",
      );
    }
    return fromEnv || "http://localhost:3000";
  })(),
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
 * The real 2026 Membership purchase form (launch blocker §1/§13, RESOLVED
 * Aug 2026). It lives on the same Salesforce donate app as the giving forms
 * but is its OWN form (dfId a0nPB00000J62aTYAR) — the §13 rule stands:
 * membership CTAs must never point at the charitable-donation form
 * (EXTERNAL.donate, a different dfId). Session _gl tracking tokens stripped.
 */
export const MEMBERSHIP_PURCHASE_URL =
  "https://newwestsymphony.my.salesforce-sites.com/donate/?dfId=a0nPB00000J62aTYAR";

/** External ticketing & giving providers (the site links out; it sells nothing). */
export const EXTERNAL = {
  // Tickets — venue-level fallbacks only. Every on-sale concert now carries
  // its real per-venue links (Concert.ticketUrls), so these are only reached
  // by a future concert that goes on sale before its links are entered.
  ticketsThousandOaks: "https://www.ticketmaster.com/",
  ticketsCamarillo: "https://newwestsymphony.my.salesforce-sites.com/ticket/",
  // Donations — the real regular-donation form (Salesforce dfId; the
  // GivingModule appends amount/frequency to it).
  donate:
    "https://newwestsymphony.my.salesforce-sites.com/donate/?dfId=a0n1J00001703lCQAQ",
  // Adopt-A-Musician campaign form — the real Salesforce form with the
  // campaign's dfId, taken from the live page (/support/adopt-a-musician/).
  adoptAMusician:
    "https://newwestsymphony.my.salesforce-sites.com/donate/?dfId=a0n5c00001DHwaBAAT",
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
