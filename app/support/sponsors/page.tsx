import type { Metadata } from "next";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  CONCERT_SPONSORS,
  CONCERT_SPONSORS_YEAR,
  FOUNDATION_PARTNERS,
  SEASON_SPONSORS,
  SPONSORSHIP_CONTACT,
  SPONSORSHIP_LEVELS,
  SUMMERFEST_SPONSORS,
  THIRTY_FOR_THIRTY,
  type Sponsor,
  type SponsorGroup,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Our Sponsors",
  description:
    "New West Symphony thanks the individuals, businesses, and foundations whose sponsorship keeps live orchestral music and music education close to home.",
  path: "/support/sponsors",
});

const JUMPS = [
  { href: "#season", label: "Season" },
  { href: "#concerts", label: "Concerts" },
  { href: "#summerfest", label: "Summerfest" },
  { href: "#foundations", label: "Foundations" },
  { href: "#anniversary", label: "30 for 30" },
  { href: "#become", label: "Become a sponsor" },
];

function SponsorNames({ sponsors, featured }: { sponsors: Sponsor[]; featured?: boolean }) {
  return (
    <ul className={featured ? "sponsor-list sponsor-list--featured" : "sponsor-list"}>
      {sponsors.map((sponsor) => (
        <li key={sponsor.name}>
          {sponsor.name}
          {sponsor.note && <span className="sponsor-list__note">{sponsor.note}</span>}
        </li>
      ))}
    </ul>
  );
}

function SponsorGroups({ groups }: { groups: SponsorGroup[] }) {
  return (
    <div className="sponsor-groups mt-6">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="minilabel">{group.title}</h3>
          <SponsorNames sponsors={group.sponsors} featured={group.featured} />
        </div>
      ))}
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Support"
            title="Thank you to our sponsors"
            subtitle="These individuals, businesses, and foundations keep live orchestral music and music education close to home."
          />
          <nav className="sponsor-jump mt-6" aria-label="Sponsor groups">
            {JUMPS.map((jump) => (
              <a key={jump.href} href={jump.href} className="filter-chip">
                {jump.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section band-cream anchor-target" id="season">
        <div className="container">
          <SectionHeading eyebrow="Masterpiece Series" title="Season sponsors" />
          <SponsorGroups groups={SEASON_SPONSORS} />
        </div>
      </section>

      <section className="section anchor-target" id="concerts">
        <div className="container">
          <SectionHeading eyebrow={String(CONCERT_SPONSORS_YEAR)} title="Concert sponsors" />
          <SponsorGroups groups={CONCERT_SPONSORS} />
        </div>
      </section>

      <section className="section band-cream anchor-target" id="summerfest">
        <div className="container">
          <SectionHeading eyebrow="Summerfest" title="Summerfest sponsors" />
          <SponsorGroups groups={SUMMERFEST_SPONSORS} />
        </div>
      </section>

      <section className="section anchor-target" id="foundations">
        <div className="container">
          <SectionHeading eyebrow="Keeping our music alive" title="Foundation and government partners" />
          <SponsorGroups groups={FOUNDATION_PARTNERS} />
        </div>
      </section>

      <section className="section band-cream anchor-target" id="anniversary">
        <div className="container">
          <SectionHeading
            eyebrow="30th anniversary"
            title="30 for 30 donors"
            subtitle="Donors who marked our 30th anniversary season with one-time gifts, multi-year commitments, and planned gifts."
          />
          <div className="mt-6">
            <SponsorNames sponsors={THIRTY_FOR_THIRTY} />
          </div>
        </div>
      </section>

      <section className="section band-navy anchor-target" id="become">
        <div className="container">
          <SectionHeading
            onDark
            align="center"
            eyebrow="Join them"
            title="Become a sponsor"
            subtitle="We tailor every sponsorship, from recognition in the concert program to premium seats, rehearsal invitations, and time with the conductor and guest artists."
          />
          <div className="grid grid-2 mt-6">
            {SPONSORSHIP_LEVELS.map((group) => (
              <Card key={group.title} padding="var(--space-6)">
                <h3 style={{ font: "var(--type-h3)", color: "var(--text-strong)", margin: 0 }}>
                  {group.title}
                </h3>
                <ul className="price-list">
                  {group.levels.map((level) => (
                    <li key={level.name}>
                      <span>{level.name}</span>
                      <span className="price">{level.price}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Button
              href={`mailto:${SPONSORSHIP_CONTACT.email}?subject=Sponsoring%20New%20West%20Symphony`}
              target="_self"
              variant="gold"
              size="lg"
              track="donate_click"
              trackParams={{ location: "sponsors-become" }}
            >
              Email {SPONSORSHIP_CONTACT.name}
            </Button>
            <Button
              href={`tel:+1${SPONSORSHIP_CONTACT.phone.replace(/\D/g, "")}`}
              target="_self"
              variant="ghost"
              size="lg"
              onDark
            >
              Call {SPONSORSHIP_CONTACT.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
