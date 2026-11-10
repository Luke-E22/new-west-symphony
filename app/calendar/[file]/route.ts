import { allCalendarEntries, buildIcs } from "@/lib/calendar";

const fileName = (id: string) => `${id}.ics`;

export function generateStaticParams() {
  return allCalendarEntries().map((entry) => ({ file: fileName(entry.id) }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const entry = allCalendarEntries().find((e) => fileName(e.id) === file);
  if (!entry) return new Response("Not found", { status: 404 });
  return new Response(buildIcs(entry), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      // "inline" lets iPhones open the Add to Calendar sheet directly.
      "Content-Disposition": `inline; filename="${file}"`,
    },
  });
}
