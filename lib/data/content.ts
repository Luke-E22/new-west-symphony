/**
 * Misc structured page content lifted from the prototype's logic class, with
 * §8 reconciliation applied (service area, tagline). Impact stats (8,000+ / 12 /
 * 30 years) are illustrative (§8c) — confirm before publishing.
 */

export const IMPACT_STATS = [
  { n: "8,000+", label: "students reached each year" },
  { n: "12", label: "Title-I schools served" },
  { n: "30", label: "years of music at home" },
];

export const ABOUT_STATS = [
  { n: "1995", label: "founded" },
  { n: "6", label: "Masterpiece concerts a year" },
  { n: "8,000+", label: "students reached annually" },
  { n: "2", label: "community venues" },
];

/** Attend → Give → Volunteer → Lead (the involvement ladder, used in several places). */
export const INVOLVEMENT_LADDER = [
  { n: "01", t: "Attend", b: "Come to a concert. Fall for the music." },
  { n: "02", t: "Give", b: "Invest in keeping it close to home." },
  { n: "03", t: "Volunteer", b: "Lend your time and a skill." },
  { n: "04", t: "Lead", b: "Help govern from our board." },
];

export const TRUSTEE_DUTIES = [
  {
    k: "Give & Attend",
    t: "Show up, gladly",
    b: "Make a personal gift that's meaningful to you, and be in the hall — your presence sets the tone.",
  },
  {
    k: "Advocate",
    t: "Be a voice",
    b: "Open doors in the community and tell the symphony's story to people who should know it.",
  },
  {
    k: "Committee",
    t: "Lend a skill",
    b: "Serve on one committee — finance, education, development, or governance — where you're strong.",
  },
  {
    k: "Commitment",
    t: "~6 meetings/yr",
    b: "A board meeting roughly every other month, plus concerts. We're honest about the time up front.",
  },
];

export const BOARD_SKILLS = [
  "Finance",
  "Education",
  "Law",
  "Marketing",
  "Healthcare",
  "Technology",
  "Local business",
  "Arts & culture",
  "Fundraising",
  "Community voices",
];

export const VISIT_PERKS = [
  {
    t: "Intermission Insights",
    b: "A free pre-concert talk one hour before curtain — the music makes more sense, and it's more fun.",
  },
  {
    t: "Dine nearby",
    b: "Both venues sit minutes from local restaurants. Make it a full evening out with friends.",
  },
  {
    t: "Come early, stay easy",
    b: "Doors open 60 minutes ahead. Grab a drink, find your seats, and settle in.",
  },
];

export const INVOLVED_ROUTES = [
  {
    k: "Give time",
    name: "Volunteer",
    desc: "Usher a concert, staff an education event, or lend a hand backstage. Flexible, friendly, and fun.",
    cta: "Volunteer with us",
  },
  {
    k: "Partner",
    name: "Become a Sponsor",
    desc: "Put your business behind live music and education with corporate and foundation sponsorships.",
    cta: "Explore sponsorship",
  },
  {
    k: "Join us",
    name: "Careers & Auditions",
    desc: "Open staff positions and musician auditions for the New West Symphony and Chorus.",
    cta: "See opportunities",
  },
];

/** Home "why we matter locally" education chips. */
export const EDUCATION_CHIPS = [
  "Symphonic Adventures",
  "The Music Van",
  "Laby Harmony Project",
];
