import { SITE, SOCIAL } from "@/lib/config";
import { VENUES } from "@/lib/data";
import type { Concert } from "@/lib/data";

const abs = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Site-wide PerformingGroup / Organization (§9). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["PerformingGroup", "MusicGroup", "NGO"],
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: abs("/assets/logos/logo-nws-primary.jpeg"),
    description: SITE.description,
    foundingDate: String(SITE.founded),
    email: SITE.ticketOfficeEmail,
    telephone: SITE.ticketOfficePhone,
    areaServed: SITE.serviceArea,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.youtube],
    location: [VENUES.to, VENUES.cam].map((v) => ({
      "@type": "Place",
      name: v.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: v.street,
        addressLocality: v.city,
        addressRegion: v.region,
        postalCode: v.postalCode,
        addressCountry: "US",
      },
    })),
  };
}

/**
 * One MusicEvent per performance of a concert (§9) — eligible for Google event
 * rich results. Each carries the venue Place, performer, and ticket offer.
 */
export function concertJsonLd(concert: Concert) {
  const url = abs(`/concerts/${concert.slug}`);

  return concert.performances.map((perf) => {
    const v = VENUES[perf.venueKey];
    return {
      "@context": "https://schema.org",
      "@type": "MusicEvent",
      name: concert.title,
      description: concert.blurb,
      startDate: perf.startDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [abs(concert.image)],
      url,
      location: {
        "@type": "Place",
        name: v.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: v.street,
          addressLocality: v.city,
          addressRegion: v.region,
          postalCode: v.postalCode,
          addressCountry: "US",
        },
      },
      performer: [
        { "@type": "PerformingGroup", name: SITE.name },
        ...(concert.conductor && !concert.conductor.toLowerCase().includes("announced")
          ? [{ "@type": "Person", name: concert.conductor.replace(/,.*$/, "") }]
          : []),
      ],
      organizer: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
      // No price/priceCurrency until 2026 single-ticket prices are confirmed
      // (audit H7) — never publish a fabricated price to Google. url +
      // availability keep the offer valid. offers.url points at the real
      // ticketing page once provided, else the concert detail page (audit M1).
      // TODO(NWS): add price once confirmed.
      offers: {
        "@type": "Offer",
        url: concert.ticketUrl ?? url,
        availability: "https://schema.org/InStock",
      },
    };
  });
}
