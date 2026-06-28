import {
  Armchair,
  BellRing,
  CalendarHeart,
  Store,
  TicketPercent,
  MapPin,
  Landmark,
  GraduationCap,
  Scale,
  Megaphone,
  HeartPulse,
  Cpu,
  Palette,
  HandCoins,
  Users,
  School,
  HeartHandshake,
  Bus,
  Piano,
  Mic,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------------------------------------- Social ------- */
// Lucide dropped brand marks, so these are hand-rolled monochrome glyphs
// (currentColor) for the footer social pills.
type SocialName =
  | "facebook"
  | "instagram"
  | "youtube"
  | "spotify"
  | "linkedin"
  | "website";

const SOCIAL_PATHS: Record<SocialName, string> = {
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  linkedin:
    "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  website:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  spotify:
    "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.119-.96-.539-.121-.421.12-.84.54-.96 4.561-1.021 8.52-.6 11.64 1.32.36.181.48.66.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.32-1.32 9.721-.66 13.44 1.621.361.179.481.78.301 1.199zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z",
};

export function SocialIcon({ name, size = 18 }: { name: SocialName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}

/* -------------------------------------------------- Benefit / Skill ------- */
// Lucide line icons — thin, monochrome (inherit currentColor), 18–24px.
const BENEFIT_ICONS: Record<string, LucideIcon> = {
  "Flexible seating": Armchair,
  "Membership concierge": BellRing,
  "Member-only events": CalendarHeart,
  "Local business perks": Store,
  "Discounts on extra tickets": TicketPercent,
  "Use it at either venue": MapPin,
};

export function BenefitIcon({ title, size = 24 }: { title: string; size?: number }) {
  const Icon = BENEFIT_ICONS[title] ?? CalendarHeart;
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}

const SKILL_ICONS: Record<string, LucideIcon> = {
  Finance: Landmark,
  Education: GraduationCap,
  Law: Scale,
  Marketing: Megaphone,
  Healthcare: HeartPulse,
  Technology: Cpu,
  "Local business": Store,
  "Arts & culture": Palette,
  Fundraising: HandCoins,
  "Community voices": Users,
};

export function SkillIcon({ skill, size = 18 }: { skill: string; size?: number }) {
  const Icon = SKILL_ICONS[skill] ?? Users;
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" />;
}

const EDUCATION_ICONS: Record<string, LucideIcon> = {
  "symphonic-adventures": School,
  "laby-harmony-project": HeartHandshake,
  "music-van": Bus,
  "quick-bowman": Piano,
  "intermission-insights": Mic,
};

export function EducationIcon({ programKey, size = 28 }: { programKey: string; size?: number }) {
  const Icon = EDUCATION_ICONS[programKey] ?? School;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
