import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

// Branded 1200×630 default OG card for every route without its own (§9).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0E1433",
          backgroundImage:
            "radial-gradient(1200px 600px at 80% -10%, rgba(30,42,110,0.85), rgba(14,20,51,0))",
        }}
      >
        <div
          style={{
            color: "#D6A954",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          New West Symphony
        </div>
        <div style={{ width: 96, height: 4, background: "#C0903F", margin: "32px 0" }} />
        <div style={{ color: "#FFFFFF", fontSize: 72, lineHeight: 1.05, fontWeight: 600, maxWidth: 900 }}>
          Your Symphony. Your Choice.
        </div>
        <div style={{ color: "#E4E0EE", fontSize: 34, marginTop: 24 }}>
          The Sound of California — live, close to home.
        </div>
      </div>
    ),
    size,
  );
}
