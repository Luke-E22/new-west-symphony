import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/brand/SectionHeading";
import Button from "@/components/core/Button";
import BioExpander from "@/components/sections/BioExpander";
import { concertPerformanceLabels } from "@/lib/calendar";
import { EXTERNAL } from "@/lib/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { CONCERTS, getConcert, isConcertPast } from "@/lib/data";
import { concertArtists, hasProgramDocs, programFor } from "@/lib/data/programs";

/** Hourly, so the "posted closer to the concert" line retires once a concert has passed. */
export const revalidate = 3600;

export function generateStaticParams() {
  return CONCERTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concert = getConcert(slug);
  if (!concert) return { title: "Program not found" };
  return {
    ...buildMetadata({
      title: `${concert.title} Program`,
      description: `The digital program, program notes, and artists for ${concert.title}, ${concert.dateLabel}.`,
      path: `/concerts/${concert.slug}/program`,
    }),
    // Until the program itself is posted this page only repeats the concert page.
    ...(hasProgramDocs(concert.slug) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function ConcertProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = getConcert(slug);
  if (!concert) notFound();

  const { digitalProgram, notes = [], notesCredit } = programFor(slug);
  const artists = concertArtists(concert);
  const notYetPosted = !hasProgramDocs(concert.slug) && !isConcertPast(concert);

  const jumps = [
    { href: "#works", label: "The program" },
    ...(notes.length ? [{ href: "#notes", label: "Program notes" }] : []),
    ...(artists.length ? [{ href: "#artists", label: "The artists" }] : []),
  ];

  return (
    <>
      <section className="section band-navy program-head">
        <div className="container program-column">
          <SectionHeading as="h1" onDark eyebrow="Concert program" title={concert.title} />
          <ul className="program-head__dates">
            {concertPerformanceLabels(concert).map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          {digitalProgram && (
            <div className="hero__actions">
              <Button href={digitalProgram} variant="gold" size="lg">
                Open the Digital Program
              </Button>
            </div>
          )}
          {notYetPosted && (
            <p className="on-dark-muted mt-4">
              The digital program and program notes will be posted here closer to the
              concert.
            </p>
          )}
          <nav className="program-jump" aria-label="On this page">
            {jumps.map((jump) => (
              <a key={jump.href} href={jump.href} className="on-dark-link">
                {jump.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section anchor-target" id="works">
        <div className="container program-column">
          <SectionHeading eyebrow="The music" title="The program" />
          <ul className="program-list">
            {concert.programList.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="footnote">Program and artists are subject to change.</p>
        </div>
      </section>

      {notes.length > 0 && (
        <section className="section band-cream anchor-target" id="notes">
          <div className="container program-column">
            <SectionHeading eyebrow="Read along" title="Program notes" />
            {notesCredit && <p className="footnote mt-4">{notesCredit}</p>}
            {notes.map((note) => (
              <article className="program-note" key={note.title}>
                <h3 className="program-note__title">{note.title}</h3>
                {note.composer && <p className="program-note__by">{note.composer}</p>}
                <div className="prose">
                  {note.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section className="section anchor-target" id="artists">
          <div className="container program-column">
            <SectionHeading eyebrow="On stage" title="The artists" />
            <div className="artist-list mt-6">
              {artists.map((artist) => (
                <article className="artist-card" key={artist.name}>
                  {artist.photo && (
                    <div className="artist-card__photo">
                      <Image
                        src={artist.photo}
                        alt={artist.name}
                        fill
                        sizes="96px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className="artist-card__body">
                    <h3 className="artist-card__name">{artist.name}</h3>
                    {artist.role && <p className="artist-card__role">{artist.role}</p>}
                    {artist.bio && <p className="artist-card__bio">{artist.bio[0]}</p>}
                    {artist.bio && artist.bio.length > 1 && (
                      <BioExpander paragraphs={artist.bio.slice(1)} firstName={artist.name} />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section band-cream">
        <div className="container program-column text-center">
          <SectionHeading align="center" eyebrow="Keep the music playing" title="Loved the music?" />
          <div className="hero__actions" style={{ justifyContent: "center" }}>
            <Button
              href={EXTERNAL.donate}
              variant="gold"
              size="lg"
              track="donate_click"
              trackParams={{ location: "concert-program", concert: concert.slug }}
            >
              Make a Gift
            </Button>
            <Button
              href="/subscriptions"
              variant="ghost"
              size="lg"
              track="subscribe_click"
              trackParams={{ location: "concert-program", concert: concert.slug }}
            >
              Subscribe to the Season
            </Button>
          </div>
          <p className="mt-6">
            <Link href={`/concerts/${concert.slug}`} className="quiet-link">
              Back to concert details
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
