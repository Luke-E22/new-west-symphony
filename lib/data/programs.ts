import { CHORUS, CHRISTIE } from "./ensemble";
import type { Concert, ConcertArtist, ConcertProgram } from "./types";

/**
 * Concert-night materials, keyed by concert slug. Everything is optional and
 * appears on /concerts/<slug>/program as soon as it is added here:
 *
 *   "best-of-tchaikovsky": {
 *     digitalProgram: "/assets/programs/2027-01-best-of-tchaikovsky.pdf",
 *     notes: [{ title: "1812 Overture", composer: "Pyotr Ilyich Tchaikovsky", paragraphs: ["…"] }],
 *   },
 *
 * Program PDFs live in public/assets/programs/. Use NWS's supplied text as is.
 *
 * Import this module directly from server code. It stays out of lib/data/index.ts
 * because that barrel reaches the browser, and notes run to thousands of words.
 */
export const CONCERT_PROGRAMS: Record<string, ConcertProgram> = {};

export const programFor = (slug: string): ConcertProgram => CONCERT_PROGRAMS[slug] ?? {};

/** True once a digital program or program notes have been posted. */
export function hasProgramDocs(slug: string): boolean {
  const { digitalProgram, notes } = programFor(slug);
  return Boolean(digitalProgram || notes?.length);
}

/**
 * Approved bios and headshots, keyed by the name as it's credited on the
 * concert. Add a returning guest once and every concert crediting them picks it
 * up. Artists often require their own approved bios, so only add supplied text.
 */
const ARTIST_PROFILES: Record<string, Omit<ConcertArtist, "name">> = {
  [CHRISTIE.name]: { photo: CHRISTIE.portrait, bio: CHRISTIE.bio },
  "New West Symphony Chorus": {
    role: `${CHORUS.director}, director`,
    bio: CHORUS.description,
  },
};

/** Credits written differently in the concert data than in the profiles above. */
const CREDIT_ALIASES: Record<string, string> = {
  "NWS Chorus (Dr. Wyant Morton)": "New West Symphony Chorus",
};

/** The people credited on a concert, with any bio we hold for them. */
export function concertArtists(concert: Concert): ConcertArtist[] {
  return [concert.conductor, concert.guests ?? ""]
    .join(" · ")
    .split("·")
    .map((credit) => credit.trim())
    .filter((credit) => credit && !/to be announced/i.test(credit))
    .map((credit) => {
      const comma = credit.lastIndexOf(",");
      const credited = comma === -1 ? credit : credit.slice(0, comma).trim();
      const role = comma === -1 ? undefined : credit.slice(comma + 1).trim();
      const name = CREDIT_ALIASES[credited] ?? credited;
      const profile = ARTIST_PROFILES[name];
      return { name, role: role ?? profile?.role, bio: profile?.bio, photo: profile?.photo };
    });
}
