/**
 * Sponsor recognition, as published on newwestsymphony.org (support/season-sponsors,
 * support/summerfest-sponsors, foundation-partners, 30for30, support/concert-sponsorship).
 * Names and dedications are recorded exactly as NWS lists them.
 * TODO(NWS): refresh when the 2027 sponsor list is set.
 */

export interface Sponsor {
  name: string;
  /** Dedication, e.g. "in loving memory of Art Beavens". */
  note?: string;
}

export interface SponsorGroup {
  title: string;
  /** Top levels are set larger. */
  featured?: boolean;
  sponsors: Sponsor[];
}

const names = (...list: string[]): Sponsor[] => list.map((name) => ({ name }));

export const SEASON_SPONSORS: SponsorGroup[] = [
  { title: "Grandioso Season Sponsor", featured: true, sponsors: names("Hammer-Hewson Associates") },
  { title: "Bravura Season Sponsors", featured: true, sponsors: names("John Shwope & Karen Dean Fritts, Ph.D.") },
  {
    title: "Largo Season Sponsors",
    sponsors: [
      { name: "Susan Burgos", note: "in loving memory of Art Beavens" },
      { name: "Linda & David Catlin" },
      { name: "Fran Elson", note: "in loving memory of Ed Elson" },
      { name: "Dr. Paul Finkel" },
      { name: "Michele & Dr. Russell Spoto" },
    ],
  },
  {
    title: "Crescendo Season Sponsors",
    sponsors: names("Sara Horner", "Barbara Meister", "William and Jewell Powell Foundation"),
  },
  {
    title: "Corporate Season Sponsors",
    sponsors: names(
      "Best Western PLUS Thousand Oaks Inn",
      "Divorcing Well Magazine",
      "IT Peace of Mind Provided by Un1teee",
      "Southern California Life Magazine",
    ),
  },
  { title: "Media Sponsors", sponsors: names("KCLU Radio", "N2 Publishing") },
];

export const CONCERT_SPONSORS_YEAR = 2025;

export const CONCERT_SPONSORS: SponsorGroup[] = [
  { title: "January · A Symphonic Odyssey", sponsors: names("Michele and Dr. Russell Spoto") },
  {
    title: "March · Carmina & Carnival",
    sponsors: names(
      "Athens Services",
      "Karen Finkel Passport to Adventures Fund",
      "Barbara Meister",
      "Nancy O’Reilly and Daughters Foundation",
    ),
  },
  { title: "April · Bohemian Rhapsody & Carmen", sponsors: names("Linda & David Catlin", "Visit Simi Valley") },
  {
    title: "October · Best of Beethoven",
    sponsors: [
      { name: "Jon Ives", note: "in memory of Ann Dale Evans" },
      { name: "Miriam Chase Wille and Karen Farrington" },
    ],
  },
  {
    title: "November · E.T. the Extra-Terrestrial",
    sponsors: names("Jewell Powell", "Rain Stewart Van Name", "University Village Thousand Oaks"),
  },
  { title: "December · Winter Dreams", sponsors: names("AmaWaterways", "Westlake Physical Therapy") },
];

export const SUMMERFEST_SPONSORS: SponsorGroup[] = [
  { title: "Diamond Sponsor", featured: true, sponsors: names("Hammer-Hewson Investments") },
  { title: "Emerald Sponsor", featured: true, sponsors: names("Frances Elson") },
  { title: "Ruby Sponsors", sponsors: names("Susan Burgos", "John Shwope & Karen Dean Fritts, Ph.D.") },
  {
    title: "Gold Sponsors",
    sponsors: names(
      "Miriam Chase Wille & Karen Farrington",
      "Joan Marcy & Paul Finkel, M.D.",
      "Jewell Powell",
      "Michele & Dr. Russell Spoto",
    ),
  },
  {
    title: "Silver Sponsors",
    sponsors: names(
      "David & Linda Catlin",
      "Nancy Israel",
      "Nickie Kubasak",
      "Rain Stewart Van Name",
      "Visit Simi Valley",
    ),
  },
  {
    title: "Bronze Sponsors",
    sponsors: names(
      "Michael DiGaetano",
      "John W. Gay",
      "George & Patricia Jones",
      "Music Freqs",
      "Joan & Robert Piccioni",
      "Premier America Credit Union",
      "Natalia Staneva & Eugene Yankevich",
      "University Village Thousand Oaks",
      "Westlake Physical Therapy",
    ),
  },
  {
    title: "In-Kind Experience Sponsors",
    sponsors: names(
      "AmaWaterways",
      "Roger & Marilyn Benson",
      "Mark & Debi Cassar",
      "D&A Estate Wine",
      "DJ’s Catering",
      "Devon Geyer",
      "Guitar Center Music Foundation",
      "Milford Jones, owner of Carrara’s Restaurant and Cafes",
      "Ann Krasner",
      "Joan & Craig Plassmeyer",
      "Betsy Martin, Lucy Pet Products",
      "Vicky Rathje",
      "Sherwood Country Club",
      "Karen Shin",
      "Yealands Estate Winery",
      "Oksana & Dr. Kim Zussman, Breezy Hill Winery",
    ),
  },
];

export const FOUNDATION_PARTNERS: SponsorGroup[] = [
  {
    title: "Live music in the region",
    sponsors: names(
      "California Arts Council",
      "City of Thousand Oaks",
      "The Colburn Foundation",
      "William and Jewell Powell Foundation",
    ),
  },
  {
    title: "Music education for young people",
    sponsors: names(
      "City of Agoura Hills",
      "City of Camarillo",
      "D’Addario Foundation",
      "Julius Gius Memorial Rotary Foundation",
      "Meadowlark Service League",
      "Mechanics Bank",
      "Music Freqs",
      "Nancy O’Reilly and Daughters Family Foundation",
      "The Rosalinde and Arthur Gilbert Foundation",
      "Rotary Club of Thousand Oaks",
      "Sherwood Cares",
      "Smith-Hobson Foundation",
      "TOArts",
      "Ventura Unified School District",
      "Westlake Women’s Club",
      "Williams-Corbett Foundation",
    ),
  },
];

export const THIRTY_FOR_THIRTY: Sponsor[] = names(
  "Saralee M. Baldwin",
  "Celina Biniaz",
  "Keets and Hugh Cassar",
  "Linda and David Catlin",
  "Betsy Chess",
  "Dr. Paul Finkel",
  "Angelique Friend and David Esquibias, Esq.",
  "Karen Dean Fritts and John Shwope",
  "John Hammer",
  "Cynthia and Paul Idell",
  "Patricia and George Jones",
  "Laby Family Foundation",
  "Eileen Laspa",
  "Cathy and Phil Lichtenberger",
  "Jeri Nowlen",
  "Nancy O’Reilly",
  "Anthony P. Spohr",
  "Michele and Dr. Russell Spoto",
  "Mucci Taylor",
  "Anthony Vasquez",
  "Debra and Paul Vaughan",
  "Miriam Wille",
);

export const SPONSORSHIP_LEVELS = [
  {
    title: "Season sponsorship",
    levels: [
      { name: "Grandioso", price: "$100,000" },
      { name: "Bravura", price: "$50,000" },
      { name: "Largo", price: "$25,000" },
      { name: "Crescendo", price: "$15,000" },
    ],
  },
  {
    title: "Concert sponsorship",
    levels: [
      { name: "Guest Artist Sponsor", price: "$10,000 and up" },
      { name: "Mezzo Forte", price: "$10,000 and up" },
      { name: "Fortissimo", price: "$5,000" },
    ],
  },
];

export const SPONSORSHIP_CONTACT = {
  name: "Patricia Jones",
  phone: "(805) 435-2775",
  email: "pjones@newwestsymphony.org",
};
