import type { Metadata } from "next";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/config";
import { PRESS_CONTACT, PRESS_ITEMS } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Press Room",
  description: `Press releases and news coverage from ${SITE.name} — season announcements, concert releases, and grant news for ${SITE.serviceArea}.`,
  path: "/press-room",
});

export default function PressRoomPage() {
  const items = [...PRESS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* 1 — Header */}
      <section className="section">
        <div className="container container-narrow">
          <SectionHeading
            as="h1"
            eyebrow="Press room"
            title="News & press releases"
            subtitle="Announcements from the New West Symphony, and coverage of the orchestra across the region. Journalists are welcome to use these materials."
          />
        </div>
      </section>

      {/* 2 — Releases */}
      <section className="section-tight">
        <div className="container container-narrow">
          <ol className="press-list">
            {items.map((item) => (
              <li className="press-item" key={item.href}>
                {item.dateLabel && (
                  <time className="press-item__date" dateTime={item.date}>
                    {item.dateLabel}
                  </time>
                )}
                <h2 className="press-item__title">{item.title}</h2>
                {item.subtitle && <p className="press-item__sub">{item.subtitle}</p>}
                <p className="press-item__excerpt">{item.excerpt}</p>
                <a
                  className="press-item__link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.external ? "Read the article" : "Read the release (PDF)"} →
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 — Media contact */}
      <section className="section band-cream">
        <div className="container container-narrow text-center">
          <SectionHeading
            align="center"
            eyebrow="Media enquiries"
            title="Contact us"
            subtitle="For interviews, photography, or additional materials, please get in touch."
          />
          <div className="press-contact mt-6">
            <a href={`mailto:${PRESS_CONTACT.email}`}>{PRESS_CONTACT.email}</a>
            <span aria-hidden="true">·</span>
            <a href={`tel:+1${PRESS_CONTACT.phone.replace(/\D/g, "")}`}>
              {PRESS_CONTACT.phone}
            </a>
          </div>
          <p className="footnote mt-4">
            {SITE.legalName} · 2100 Thousand Oaks Blvd, Suite D, Thousand Oaks, CA 91362
          </p>
          <div className="hero__actions mt-6" style={{ justifyContent: "center" }}>
            <Button href="/about" variant="ghost">
              About the symphony →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
