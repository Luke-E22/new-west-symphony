import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import Card from "@/components/core/Card";
import BoardInterestForm from "@/components/sections/BoardInterestForm";
import BoardRoster from "@/components/sections/BoardRoster";
import { SkillIcon } from "@/components/Icons";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  TRUSTEE_DUTIES,
  BOARD_SKILLS,
  GOVERNANCE_CONTACT,
  INVOLVEMENT_LADDER,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Join Our Board",
  description:
    "Help lead the New West Symphony. Learn what directors do, who we're looking for, and express your interest in board service.",
  path: "/get-involved/board",
});

export default function BoardPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="hero hero--sm">
        <div className="hero__media">
          <Image
            src="/assets/photos/photo-hero-hall.jpg"
            alt="The New West Symphony performing to a full house"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">Board service</div>
            <hr className="hero__rule" />
            <h1 className="hero__title hero__title--md">
              Help lead your symphony&rsquo;s next chapter
            </h1>
            <p className="hero__lead">
              Our board of directors gives the New West Symphony its direction, its
              stability, and its reach into the community. If you love this music
              and want to help safeguard it, we&rsquo;d love to hear from you.
            </p>
            <div className="hero__actions">
              <Button href="#eoi" variant="gold" size="lg">
                Express Your Interest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Why serve */}
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Board service"
              title="Why serve"
              subtitle="A seat on the board is a chance to give back in a way few roles allow — shaping an institution that brings live orchestral music to thousands of neighbors every year."
            />
            <div className="prose mt-6">
              <p>
                Directors are the stewards of the symphony&rsquo;s mission. You
                help set strategy, safeguard the finances, and open doors across
                the region — all in service of keeping the orchestra on the stage
                and music in children&rsquo;s hands.
              </p>
              <p>
                You don&rsquo;t need to be a musician, and you don&rsquo;t need to
                be wealthy. What matters is a genuine love for the music, a
                willingness to advocate, and the time to show up. The rest we
                learn together.
              </p>
            </div>
          </div>
          <div>
            <div className="media-frame">
              <Image
                src="/assets/photos/photo-donate.jpg"
                alt="Supporters and directors gathered at a New West Symphony event"
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="caption">
              Board members and supporters at a season event — placeholder photography.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — What directors do */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="The role"
            title="What directors do"
            subtitle="Four expectations, plainly stated. We believe the best boards are the ones that know what they signed up for."
          />
          <div className="duties-grid mt-6">
            {TRUSTEE_DUTIES.map((duty) => (
              <Card key={duty.k} padding="var(--space-5)">
                <div className="minilabel">{duty.k}</div>
                <h3 className="program-card__t">{duty.t}</h3>
                <p className="program-card__b">{duty.b}</p>
              </Card>
            ))}
          </div>
          <p className="footnote mt-6">
            We&rsquo;re honest about the commitment up front: roughly six meetings
            a year, a personal gift that&rsquo;s meaningful to you, and your
            presence in the hall. No surprises.
          </p>
        </div>
      </section>

      {/* 4 — Who we're looking for */}
      <section className="section band-cream">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Fit"
              title="Who we're looking for"
              subtitle="A board is strongest when it reflects the community it serves. We welcome a range of skills, backgrounds, and perspectives."
            />
            <div className="chip-row mt-6">
              {BOARD_SKILLS.map((skill) => (
                <span className="chip" key={skill}>
                  <SkillIcon skill={skill} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Card padding="var(--space-6)">
              <div className="minilabel">From first concert to the board table</div>
              <ol className="ladder" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-4)" }}>
                {INVOLVEMENT_LADDER.map((step) => (
                  <li key={step.n} className="ladder-step">
                    <span className="ladder-step__n">{step.n}</span>
                    <div className="ladder-step__t">{step.t}</div>
                    <p className="ladder-step__b">{step.b}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* 5 — Current board */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Governance"
            title="Current board"
            subtitle="The directors who guide the New West Symphony today."
          />
          <div className="mt-6">
            <BoardRoster />
          </div>
          <div className="hero__actions mt-6" style={{ justifyContent: "center" }}>
            <Button href="/about" variant="link">
              Meet the orchestra &amp; staff →
            </Button>
          </div>
        </div>
      </section>

      {/* 6 — Express your interest */}
      <section className="section band-navy anchor-target" id="eoi">
        <div className="container split">
          <div>
            <SectionHeading
              onDark
              eyebrow="Get in touch"
              title="Express your interest"
              subtitle="Tell us a little about yourself and what draws you to the symphony. There's no formal application — this simply starts a conversation."
            />
            <div className="contact-card mt-6">
              <div className="minilabel">Your point of contact</div>
              <div className="roster-person__name" style={{ color: "var(--text-on-dark)" }}>
                {GOVERNANCE_CONTACT.name}
              </div>
              <div className="on-dark-muted">{GOVERNANCE_CONTACT.role}</div>
            </div>
          </div>
          <div>
            <BoardInterestForm />
          </div>
        </div>
      </section>
    </>
  );
}
