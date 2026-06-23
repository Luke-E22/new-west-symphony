import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { SocialIcon } from "@/components/Icons";
import ENewsSignup from "./ENewsSignup";
import { EXTERNAL, SITE, SOCIAL } from "@/lib/config";
import { VENUES } from "@/lib/data";

const SOCIALS = [
  { label: "Facebook", name: "facebook", href: SOCIAL.facebook },
  { label: "Instagram", name: "instagram", href: SOCIAL.instagram },
  { label: "YouTube", name: "youtube", href: SOCIAL.youtube },
  { label: "Spotify", name: "spotify", href: SOCIAL.spotify },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        {/* Col 1 — brand + tagline + socials */}
        <div className="footer-col">
          <Logo variant="white" height={56} />
          <p className="footer-col__tagline">{SITE.taglineShort}</p>
          <p>{SITE.serviceArea}.</p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-pill"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — venues */}
        <div className="footer-col">
          <h2 className="footer-col__title">Venues</h2>
          <address>
            <strong>{VENUES.to.city}</strong>
            <br />
            {VENUES.to.name}
            <br />
            {VENUES.to.hall}
            <br />
            {VENUES.to.street}, {VENUES.to.city}, {VENUES.to.region}{" "}
            {VENUES.to.postalCode}
          </address>
          <address style={{ marginTop: "var(--space-4)" }}>
            <strong>{VENUES.cam.city}</strong>
            <br />
            {VENUES.cam.name}
            <br />
            {VENUES.cam.street}, {VENUES.cam.city}, {VENUES.cam.region}{" "}
            {VENUES.cam.postalCode}
          </address>
        </div>

        {/* Col 3 — ticket office + links */}
        <div className="footer-col">
          <h2 className="footer-col__title">Ticket Office</h2>
          <p>
            {SITE.ticketOfficeHours}
            <br />
            <a href={`tel:${SITE.ticketOfficePhone.replace(/[^\d+]/g, "")}`}>
              {SITE.ticketOfficePhone}
            </a>
            <br />
            <a href={`mailto:${SITE.ticketOfficeEmail}`}>
              {SITE.ticketOfficeEmail}
            </a>
          </p>
          <ul className="footer-links" style={{ marginTop: "var(--space-4)" }}>
            <li>
              <a href={EXTERNAL.watchListen} target="_blank" rel="noopener noreferrer">
                Watch &amp; Listen
              </a>
            </li>
            <li>
              <a href={EXTERNAL.patronLogin} target="_blank" rel="noopener noreferrer">
                Patron login
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4 — e-news */}
        <div className="footer-col">
          <h2 className="footer-col__title">Stay in the loop</h2>
          <p>Season news, on-sale dates, and behind-the-scenes — a few times a year.</p>
          <ENewsSignup />
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>
          © 2026 {SITE.legalName} · A {SITE.nonprofitStatus} nonprofit · EIN{" "}
          {SITE.ein} · <Link href="/privacy">Privacy</Link>
        </span>
        <span>
          {SITE.musicDirector}, {SITE.musicDirectorTitle}
        </span>
      </div>
    </footer>
  );
}
