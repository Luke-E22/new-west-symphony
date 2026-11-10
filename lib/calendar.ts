import { SITE } from "@/lib/config";
import {
  CONCERTS,
  EVENTS,
  VENUES,
  eventDateLabel,
  eventEndIso,
  localDateLabel,
  type Concert,
  type SiteEvent,
} from "@/lib/data";

/**
 * Add-to-calendar support: one entry per concert performance or timed event,
 * served as an .ics file (Apple, Outlook) from /calendar/<id>.ics or opened as a
 * prefilled Google Calendar event. All times go out in UTC, so no timezone
 * definitions are needed and daylight-saving weekends stay correct.
 */

export interface CalendarEntry {
  id: string;
  /** "Sat, Jan 30 · 7 PM · Thousand Oaks" */
  label: string;
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
  url: string;
}

const CONCERT_LENGTH_MS = 2 * 60 * 60 * 1000; // matches the JSON-LD endDate

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function concertEntries(concert: Concert): CalendarEntry[] {
  return concert.performances.map((perf) => {
    const venue = VENUES[perf.venueKey];
    const [day, ...time] = perf.timeLabel.split(" ");
    const url = `${SITE.url}/concerts/${concert.slug}`;
    return {
      id: `${concert.slug}-${slugify(venue.city)}`,
      label: `${day}, ${localDateLabel(perf.startDate)} · ${time.join(" ")} · ${venue.city}`,
      title: `${concert.title} · ${SITE.name}`,
      start: perf.startDate,
      end: new Date(new Date(perf.startDate).getTime() + CONCERT_LENGTH_MS).toISOString(),
      location: `${venue.name}, ${venue.addressLine}`,
      description: `${concert.blurb} Concert details: ${url}`,
      url,
    };
  });
}

/** "Sat, Jan 30 · 7 PM · Thousand Oaks", one per performance. */
export const concertPerformanceLabels = (concert: Concert): string[] =>
  concertEntries(concert).map((e) => e.label);

/** An event needs a published time to go on a calendar. */
export function eventEntry(event: SiteEvent): CalendarEntry | undefined {
  if (!event.timeLabel) return undefined;
  const { venue } = event;
  const url = `${SITE.url}/events/${event.slug}`;
  return {
    id: event.slug,
    label: `${eventDateLabel(event)} · ${event.timeLabel} · ${venue.city}`,
    title: `${event.title} · ${SITE.name}`,
    start: event.startDate,
    end: eventEndIso(event),
    location: `${venue.name}, ${venue.street}, ${venue.city}, ${venue.region} ${venue.postalCode}`,
    description: `${event.summary} Details: ${url}`,
    url,
  };
}

export function allCalendarEntries(): CalendarEntry[] {
  return [
    ...CONCERTS.flatMap(concertEntries),
    ...EVENTS.map(eventEntry).filter((e): e is CalendarEntry => Boolean(e)),
  ];
}

/** Only performances still ahead are worth offering. */
export function upcomingConcertEntries(concert: Concert, now: Date = new Date()): CalendarEntry[] {
  return concertEntries(concert).filter((e) => new Date(e.start).getTime() > now.getTime());
}

/** 2027-01-31T03:00:00.000Z becomes 20270131T030000Z */
const utcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escapeText = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

const encoder = new TextEncoder();

/** RFC 5545 folding: 75 octets per line, never splitting a multi-byte character. */
function fold(line: string): string {
  const parts: string[] = [];
  let current = "";
  let size = 0;
  let limit = 75;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (size + bytes > limit) {
      parts.push(current);
      current = "";
      size = 0;
      limit = 74; // continuation lines start with a space
    }
    current += char;
    size += bytes;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function buildIcs(entry: CalendarEntry, now: Date = new Date()): string {
  const host = new URL(SITE.url).hostname;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${SITE.name}//Website//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${entry.id}@${host}`,
    `DTSTAMP:${utcStamp(now.toISOString())}`,
    `DTSTART:${utcStamp(entry.start)}`,
    `DTEND:${utcStamp(entry.end)}`,
    `SUMMARY:${escapeText(entry.title)}`,
    `LOCATION:${escapeText(entry.location)}`,
    `DESCRIPTION:${escapeText(entry.description)}`,
    `URL:${entry.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(fold)
    .join("\r\n");
}

export function googleCalendarUrl(entry: CalendarEntry): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: entry.title,
    dates: `${utcStamp(entry.start)}/${utcStamp(entry.end)}`,
    details: entry.description,
    location: entry.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
