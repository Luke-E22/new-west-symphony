import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import BoardRoster from "@/components/sections/BoardRoster";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/config";
import {
  ABOUT_STATS,
  CHRISTIE,
  CHORUS,
  ORCHESTRA_SECTIONS,
  ORCHESTRA_OPERATIONS,
  STAFF,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `New West Symphony has been the professional orchestra of ${SITE.serviceArea} since ${SITE.founded} — led by Music Director Michael Christie, with a full orchestra, chorus, and staff serving the region.`,
  path: "/about",
});

// Operations folks are shown under the orchestra; keep them out of the staff grid.
const opsNames = new Set(ORCHESTRA_OPERATIONS.map((o) => o.name));
const adminStaff = STAFF.filter((s) => !opsNames.has(s.name));

export default function AboutPage() {
  return (
    <>
      {/* 1 — Mission & story (white) */}
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading as="h1" eyebrow="About" title="Your orchestra, since 1995" />
            <p className="lead mt-6">
              New West Symphony is the professional orchestra of {SITE.serviceArea} —
              six Masterpiece concerts a year in Thousand Oaks and Camarillo, played by
              musicians from across Southern California for the audiences who live here.
            </p>
            <div className="prose mt-4">
              <p>
                Founded in {SITE.founded}, we set out to make exceptional orchestral
                music feel close to home — exceptional, and exceptionally close. That
                mission still guides every season: keep the playing first-rate, keep the
                seats within reach, and keep the music rooted in the community it serves.
              </p>
              <p>
                Beyond the concert hall, our education programs reach thousands of
                students each year, putting live music and instruments within reach of
                children across {SITE.serviceArea}.
              </p>
            </div>
          </div>
          <div className="media-frame">
            <Image
              src="/assets/photos/christie-conducting.jpg"
              alt="Michael Christie conducting the New West Symphony"
              fill
              preload
              quality={55}
              sizes="(max-width: 960px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* 2 — Music Director: Michael Christie (cream) */}
      <section className="section band-cream">
        <div className="container split">
          <div>
            <div className="maestro-portrait">
              <Image
                src={CHRISTIE.portrait}
                alt={`${CHRISTIE.name}, ${CHRISTIE.title}`}
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={CHRISTIE.title} title={CHRISTIE.name} />
            <div className="prose mt-6">
              {CHRISTIE.bio.map((para, i) => (
                <p key={i} className={i === 0 ? "lead" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Board of Directors (white) */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Leadership"
            title="Our Board of Directors"
            subtitle="A volunteer board guides the symphony's stewardship, governance, and growth across the region."
          />
          <div className="mt-6">
            <BoardRoster />
          </div>
          <div className="hero__actions mt-6" style={{ justifyContent: "center" }}>
            <Button href="/get-involved/board" variant="ghost">
              Join Our Board →
            </Button>
          </div>
        </div>
      </section>

      {/* 4 — The orchestra (cream) */}
      <section className="section band-cream">
        <div className="container">
          <SectionHeading
            eyebrow="On stage"
            title="The orchestra"
            subtitle="The musicians of the New West Symphony, by section."
          />
          <div
            className="media-frame mt-6"
            style={{ aspectRatio: "21 / 9", marginBottom: "var(--space-7)" }}
          >
            <Image
              src="/assets/photos/orchestra-performance.jpg"
              alt="The New West Symphony in performance"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="orchestra-grid mt-6">
            {ORCHESTRA_SECTIONS.map((sec) => (
              <div className="orchestra-section" key={sec.section}>
                <h3 className="orchestra-section__title">{sec.section}</h3>
                <ul className="roster-list">
                  {sec.members.map((m) => (
                    <li key={m.name}>
                      {m.name}
                      {m.role ? <span className="role">{m.role}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="orchestra-section">
              <h3 className="orchestra-section__title">Operations</h3>
              <ul className="roster-list">
                {ORCHESTRA_OPERATIONS.map((o) => (
                  <li key={o.name}>
                    {o.name}
                    <span className="role">{o.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — New West Symphony Chorus (white) */}
      <section className="section">
        <div className="container split">
          <div className="media-frame">
            <Image
              src="/assets/photos/nws-chorus.jpg"
              alt="The New West Symphony Chorus and soloists in performance"
              fill
              sizes="(max-width: 960px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="In voice"
              title="New West Symphony Chorus"
              subtitle={`Led by ${CHORUS.director}, ${CHORUS.directorTitle}.`}
            />
            <div className="prose mt-6">
              {CHORUS.description.map((para, i) => (
                <p key={i} className={i === 0 ? "lead" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Symphony staff (cream) */}
      <section className="section band-cream">
        <div className="container">
          <SectionHeading eyebrow="Behind the scenes" title="Symphony staff" />
          <div className="staff-grid mt-6">
            {adminStaff.map((s) => (
              <div className="staff-item" key={s.name}>
                <div className="staff-item__name">{s.name}</div>
                <div className="staff-item__title">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — At a glance (white) */}
      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="At a glance"
            title="The symphony, by the numbers"
          />
          <div className="stat-row mt-6" style={{ justifyContent: "center" }}>
            {ABOUT_STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat__num stat__num--navy">{s.n}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="footnote mt-4" style={{ textAlign: "center" }}>
            Some figures are approximate.
          </p>
        </div>
      </section>
    </>
  );
}
