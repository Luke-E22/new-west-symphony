import type { DonationAmount, GivingProgram } from "./types";

/** Donations are a charitable gift — the separate, tax-deductible flow (§13). */

export const ONE_TIME_AMOUNTS: DonationAmount[] = [
  { value: 75, label: "$75", impact: "Sheet music for a full student section" },
  {
    value: 150,
    label: "$150",
    impact: "A child's instrument rental for a year",
    defaultSelected: true,
  },
  { value: 300, label: "$300", impact: "A Music Van visit to a local school" },
  {
    value: 500,
    label: "$500",
    impact: "Two students' tuition in the Laby Harmony Project",
  },
  {
    value: 1000,
    label: "$1,000",
    impact: "A young soloist's coaching for a full season",
  },
];

export const MONTHLY_AMOUNTS: DonationAmount[] = [
  {
    value: 10,
    label: "$10",
    impact: "Reaches 30 students a year through Symphonic Adventures",
  },
  {
    value: 25,
    label: "$25",
    impact: "Keeps an instrument in a child's hands every month",
    defaultSelected: true,
  },
  { value: 50, label: "$50", impact: "Funds a seat for a student at every concert" },
  { value: 100, label: "$100", impact: "Sustains a full education residency" },
];

export const GIVING_PROGRAMS: GivingProgram[] = [
  {
    name: "Adopt a Musician",
    blurb:
      "Sponsor a chair for the season and go behind the scenes with the player you support.",
  },
  {
    name: "The 30 Club",
    blurb:
      "A monthly giving circle — $30 a month keeps music education thriving year-round.",
  },
  {
    name: "The Baton Society",
    blurb:
      "Our leadership circle for gifts of $2,500+, with Maestro's-table experiences.",
  },
  {
    name: "The Legacy Society",
    blurb:
      "Remember the symphony in your estate plans and help keep live music here for generations.",
    isLegacy: true,
  },
];
