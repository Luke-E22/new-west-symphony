/**
 * Press room content, ported from newwestsymphony.org/press-room/.
 *
 * The release PDFs used to live on the old WordPress install under
 * /wp-content/uploads/. That path redirects to "/" on this site, so the files
 * are mirrored into /public/assets/press and served from here instead —
 * otherwise every "Read the release" link would die at launch.
 *
 * Excluded on purpose: the three CEO-appointment items (two outlet articles and
 * the April 2026 announcement), to match the removal of the CEO from the site.
 * The 2019–2023 archive (65 WordPress sub-pages) was not migrated; /press-room/*
 * sub-paths redirect here.
 */

export interface PressItem {
  /** Sort key. The 2024 group has no published date, so day is "00". */
  date: string;
  /** The date as published. Null where the original showed only a year. */
  dateLabel: string | null;
  title: string;
  /** Second line of the original headline, where there was one. */
  subtitle?: string;
  excerpt: string;
  /** A mirrored PDF in /assets/press, or an external article. */
  href: string;
  external: boolean;
}

export const PRESS_ITEMS: PressItem[] = [
  {
    date: "2026-02-05",
    dateLabel: "February 5, 2026",
    title: "New West Symphony Presents “Mozart And American Voices”: A Genre-Defying Celebration Of Musical Storytelling",
    excerpt: "The New West Symphony (NWS), under the direction of Artistic and Music Director Michael Christie, announces its upcoming 2026 Masterpiece Series concert, “Mozart and American Voices.”…",
    href: "/assets/press/2026-02-new-west-symphony-presents-mozart-and.pdf",
    external: false,
  },
  {
    date: "2026-01-14",
    dateLabel: "January 14, 2026",
    title: "New West Symphony Launches Historic 2026 Season Celebrating America’s 250th Anniversary",
    excerpt: "Season Opener “Rachmaninoff & Gershwin” Features Pianist Janice Carissa and Works by Rachmaninoff, Gershwin, and Sousa…",
    href: "/assets/press/2026-01-new-west-symphony-launches-historic-2026.pdf",
    external: false,
  },
  {
    date: "2025-12-22",
    dateLabel: "December 22, 2025",
    title: "New West Symphony Announces 2026 Season and Receives NEA Grant for America250 Project",
    excerpt: "New West Symphony announced its 2026 season and confirmed it has been awarded a grant from the National Endowment for the Arts (NEA)…",
    href: "/assets/press/2025-12-new-west-symphony-announces-2026-season.pdf",
    external: false,
  },
  {
    date: "2025-11-10",
    dateLabel: "November 10, 2025",
    title: "New West Symphony Invites Audiences to a “Sparkling Winter Dreams” Celebration",
    excerpt: "The New West Symphony concludes its 2025 season with their radiant holiday program, “Winter Dreams.” This dazzling final concert, conducted by Michael Christie…",
    href: "/assets/press/2025-11-new-west-symphony-invites-audiences-to.pdf",
    external: false,
  },
  {
    date: "2025-10-17",
    dateLabel: "October 17, 2025",
    title: "New West Symphony: E.T. The Extra-Terrestrial in Concert",
    excerpt: "The New West Symphony continues its celebratory 30th Anniversary Season, “A Symphonic Odyssey,” with an extraordinary cinematic and musical event: E.T. The Extra-Terrestrial in Concert. Get ready to phone home….",
    href: "/assets/press/2025-10-new-west-symphony-e-t-the.pdf",
    external: false,
  },
  {
    date: "2025-09-22",
    dateLabel: "September 22, 2025",
    title: "New West Symphony Presents “Best of Beethoven”: A Symphonic Tapas Featuring Pianist Inna Faliks and the New West Symphony Chorus",
    excerpt: "The New West Symphony continues its celebratory 30th Anniversary Season performances, “A Symphonic Odyssey,” with two extraordinary performances dedicated to one of classical music’s most towering figures – Ludwig Von Beethoven…",
    href: "/assets/press/2025-09-new-west-symphony-presents-best-of.pdf",
    external: false,
  },
  {
    date: "2025-07-22",
    dateLabel: "July 22, 2025",
    title: "New West Symphony Strikes a High Note with Grant Awards for Youth Music Education",
    subtitle: "7 Grants Announced",
    excerpt: "New West Symphony is proud to announce that in 2025 the organization received seven grants totaling over $80,000 from various funders…",
    href: "/assets/press/2025-07-new-west-symphony-strikes-a-high.pdf",
    external: false,
  },
  {
    date: "2025-05-23",
    dateLabel: "May 23, 2025",
    title: "New West Symphony presents Third Annual Summerfest, June 9",
    subtitle: "“Dancing through the Decades” outdoor event to be held at Rancho de las Palmas in Moorpark, CA",
    excerpt: "Concert features classic rock legend Jason Scheff and All-Star Band performing pop, rock and jazz.",
    href: "/assets/press/2025-05-new-west-symphony-presents-third-annual.pdf",
    external: false,
  },
  {
    date: "2025-03-12",
    dateLabel: "March 12, 2025",
    title: "New West Symphony celebrates musical milestones with “Bohemian Rhapsody & Carmen” on April 5 & 6",
    excerpt: "In celebration of New West Symphony’s 30th anniversary, this program honors musical milestones: Bizet’s Carmen, Smetana’s Moldau, Bach Cantatas and popular hits Guest artists include Angels Vocal Art, Pepperdine Chamber Choir, Los Robles Children’s Choir and vocal soloists",
    href: "/assets/press/2025-03-new-west-symphony-celebrates-musical-milestones.pdf",
    external: false,
  },
  {
    date: "2025-02-06",
    dateLabel: "February 6, 2025",
    title: "New West Symphony continues its 30th Anniversary Season with “Carmina & Carnival” on March 1 & 2",
    excerpt: "Concert program includes Orff’s epic Carmina Burana, featuring New West Symphony musicians, the New West Symphony Chorus, Vieness Piano Duo, Los Robles Children’s Choir and State Street Ballet Saint-Saëns’ Carnival of Animals presented with actor/comedian Jim Meskimen and Vieness Piano Duo",
    href: "/assets/press/2025-02-new-west-symphony-continues-its-30th.pdf",
    external: false,
  },
  {
    date: "2025-01-07",
    dateLabel: "January 7, 2025",
    title: "New West Symphony kicks off its 30th Anniversary Season with “A Symphonic Odyssey” on Jan 25 & 26",
    excerpt: "Concerts feature Tchaikovsky’s brilliant Fourth Symphony and a world premiere in celebration of the Lunar New Year Multi-instrumentalist Hong Wang will perform a concerto written for Liquanqin (a new type of erhu, a Chinese two-stringed instrument) by composer Kui Dong",
    href: "/assets/press/2025-01-new-west-symphony-kicks-off-its.pdf",
    external: false,
  },
  {
    date: "2024-11-00",
    dateLabel: null,
    title: "New West Symphony presents festive Winter Spectacular concerts on December 7 & 8",
    excerpt: "Concerts feature the Los Robles Children’s Choir and vocal soloists Oscar-nonimated animated short film, “The Snowman,” to be presented with live orchestra Winterfest pre-concert dinner to support the Symphony’s artistic and education programs",
    href: "/assets/press/2024-11-new-west-symphony-presents-festive-winter.pdf",
    external: false,
  },
  {
    date: "2024-10-00",
    dateLabel: null,
    title: "New West Symphony presents pianist Lara Downes and Dvořák’s “New World” Symphony on November 2 & 3",
    excerpt: "Pianist and KUSC radio host Lara Downes performs 2024 GRAMMY®-winning composition “Rounds” by Jessie Montgomery Dvořák’s epic “New World” Symphony to be accompanied by stunning images by Joseph Sohm and pre-recorded narration by Hollywood Walk of Fame honoree William Shatner",
    href: "/assets/press/2024-10-new-west-symphony-presents-pianist-lara.pdf",
    external: false,
  },
  {
    date: "2024-09-00",
    dateLabel: null,
    title: "New West Symphony presents the music of Brahms, Ravel & Mendelssohn, plus a world premiere, on October 5 & 6",
    excerpt: "New West Symphony commissioned world premiere by LA‐based composer Derrick Skye Concertmaster Alyssa Park featured as violin soloist Pacific Festival Ballet collaborates with the orchestra in Brahms’ Hungarian Dances",
    href: "/assets/press/2024-09-new-west-symphony-presents-the-music.pdf",
    external: false,
  },
  {
    date: "2024-08-00",
    dateLabel: null,
    title: "New West Symphony announces 2025 Masterpiece Series celebrating its 30th Anniversary Season",
    excerpt: "Artistic & Music Director Michael Christie’s Contract Extended to 2029 Season Highlights include: Carmina Burana with the New West Symphony Chorus E.T. The Extra Terrestrial in Concert Selections from Bizet’s Carmen Also sprach Zarathustra (featured in 2001: A Space Odyssey) Beethoven Favorites Concert",
    href: "/assets/press/2024-08-new-west-symphony-announces-2025-masterpiece.pdf",
    external: false,
  },
  {
    date: "2024-06-00",
    dateLabel: null,
    title: "New West Symphony presents Summerfest, a dinner and rock concert fundraiser, on June 23, 2024",
    excerpt: "Outdoor event to be held at Rancho de las Palmas in Moorpark, CA Concert features classic rock legends Jason Scheff, Steve Porcaro, Rick Cowling and Phil X",
    href: "/assets/press/2024-06-new-west-symphony-presents-summerfest-a.pdf",
    external: false,
  },
];

/** Media enquiries. The old page named the CEO here; use the org contact. */
export const PRESS_CONTACT = {
  email: "symphony@newwestsymphony.org",
  phone: "805.497.5800",
} as const;
