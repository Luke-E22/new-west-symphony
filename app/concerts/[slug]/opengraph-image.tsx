import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getConcert } from "@/lib/data";
import { SITE } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "New West Symphony concert";

// Per-concert OG card (§9): the official poster beside the title, on navy.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = getConcert(slug);

  let poster = "";
  try {
    const rel = (concert?.poster ?? "/assets/concerts/poster-beethoven-copland.jpg").replace(/^\//, "");
    const file = await readFile(join(process.cwd(), "public", rel));
    poster = `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    poster = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#0E1433",
          padding: "60px",
        }}
      >
        {poster ? (
          <img
            src={poster}
            width={510}
            height={510}
            alt=""
            style={{ borderRadius: 16, objectFit: "cover" }}
          />
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: poster ? "56px" : "0px",
            maxWidth: 560,
          }}
        >
          <div style={{ color: "#D6A954", fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
            {`${SITE.name} · 2026 Season`}
          </div>
          <div style={{ width: 84, height: 4, background: "#C0903F", margin: "26px 0" }} />
          <div style={{ color: "#FFFFFF", fontSize: 58, lineHeight: 1.05, fontWeight: 600 }}>
            {concert?.title ?? "On Stage"}
          </div>
          <div style={{ color: "#E4E0EE", fontSize: 26, marginTop: 22 }}>
            {concert ? `${concert.dateLabel} · ${concert.venuesLabel}` : SITE.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
