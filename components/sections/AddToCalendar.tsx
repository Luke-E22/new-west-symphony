import Button from "@/components/core/Button";
import { googleCalendarUrl, type CalendarEntry } from "@/lib/calendar";

/** One date with its two calendar options: an .ics file, or Google's web form. */
export default function AddToCalendar({ entry }: { entry: CalendarEntry }) {
  const trackParams = { entry: entry.id };
  return (
    <div className="add-cal">
      <span className="add-cal__when">{entry.label}</span>
      <span className="add-cal__links">
        <Button
          href={`/calendar/${entry.id}.ics`}
          target="_self"
          variant="link"
          size="sm"
          aria-label={`Add ${entry.label} to Apple or Outlook calendar`}
          track="add_to_calendar"
          trackParams={{ ...trackParams, calendar: "ics" }}
        >
          Apple / Outlook
        </Button>
        <Button
          href={googleCalendarUrl(entry)}
          variant="link"
          size="sm"
          aria-label={`Add ${entry.label} to Google Calendar`}
          track="add_to_calendar"
          trackParams={{ ...trackParams, calendar: "google" }}
        >
          Google
        </Button>
      </span>
    </div>
  );
}
