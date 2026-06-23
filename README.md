# New West Symphony — website

Production rebuild of the New West Symphony marketing site from the
`design_handoff_nws_website` package. Replaces the dated WordPress/Divi site
(promotional text baked into JPEGs) with real typography over real photography.

**Stack:** Next.js 16 (App Router, TypeScript, Turbopack) · React 19 · global CSS
built from the handoff design tokens **verbatim** · self-hosted fonts via
`next/font`. No CMS wired yet — content is typed seed data in `lib/data/`,
shaped to drop into Sanity later.

## Run

```bash
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint (next lint was removed in Next 16)
```

Node 20+ required (built on 22). Set `NEXT_PUBLIC_SITE_URL` to the production
origin before launch (used for canonical URLs, OG, sitemap, JSON-LD).

## Structure

```
app/                     routes (App Router)
  layout.tsx             tokens + fonts, header/footer, skip link, RouteFocus, Organization JSON-LD
  page.tsx               Home
  concerts/              season listing (+ [slug] detail with MusicEvent JSON-LD + opengraph-image)
  membership/ support/ visit/ education/ about/
  get-involved/ get-involved/board/   hub + Join Our Board (form → server action)
  privacy/ not-found.tsx sitemap.ts robots.ts manifest.ts
components/ core/ brand/ layout/ sections/   7 DS components + shell + interactive sections
lib/ config.ts  data/  seo/  actions/
styles/ tokens/ (VERBATIM) globals.css components.css sections.css layout.css
public/assets/ logos/ (real) photos/ (placeholder — replace)
next.config.ts           301 redirect map + image formats
```

## Key decisions

- **Tokens are source of truth.** `styles/tokens/*.css` are copied verbatim from
  the handoff; the only change is `typography.css` family vars wired to
  `next/font` (the prescribed self-hosting integration). No hardcoded design
  values anywhere else.
- **Membership ≠ donation (hard rule).** Every "Become a Member" / "Choose
  {tier}" CTA reads `MEMBERSHIP_PURCHASE_URL` in `lib/config.ts`, never the
  donate form. See the launch blocker below.
- **Real 2026 season.** `lib/data/concerts.ts` has the real six Masterpiece
  concerts (not the prototype's invented ones). Concerts 1–3 are flagged `tbc`
  (conductor/guests/program awaiting the program book).
- **External integrations are links**, not flows: tickets → Ticketmaster /
  Salesforce Sites; donations → Salesforce; e-news → Mailchimp; board form →
  server action (`lib/actions/board.ts`) with honeypot.

## Launch blockers & follow-ups (need external inputs)

1. **Membership purchase flow (BLOCKER).** `MEMBERSHIP_PURCHASE_URL` is a
   temporary internal anchor (`/membership#purchase-tbc`). NWS must stand up a
   real Salesforce membership purchase object/form; swap the one constant.
2. **301 redirect map** (`next.config.ts`) is seeded from §9 — complete it from a
   crawl of the live WordPress site (artist/program/blog URLs) before cutover.
3. **CMS:** wire Sanity (schemas mirror `lib/data` types) and mark reads
   `use cache`.
4. **Analytics + consent:** GA4 + conversion events (`buy_tickets_click`,
   `become_member_click`, `donate_click`, `donation_amount_selected`,
   `membership_tier_selected`) gated behind a CCPA/CPRA consent banner.
5. **CI:** Lighthouse CI + axe + Playwright smoke tests (incl. the
   membership-CTA-not-donate assertion).
6. **Content:** replace placeholder photography (keep warm, people-first art
   direction) and the placeholder board/staff roster; confirm concerts 1–3
   details, single-ticket prices, impact stats, and Michael Christie's bio.
7. **Forms:** wire `lib/actions/board.ts` to a real email service + CRM; set the
   real Mailchimp list action in `lib/config.ts`.
8. **Fonts/brand:** confirm Cormorant Garamond + Montserrat with the client
   (reasoned matches, not confirmed official typefaces).
