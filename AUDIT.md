# New West Symphony — Quality Audit

**Scope:** desktop + mobile, all routes. **Method:** static analysis (6 parallel read-only audit passes + a false-positive critic) plus empirical Lighthouse (mobile + desktop), axe, and live responsive testing at 360 / 390 / 768 px against a production build. **Constraint honored:** annotations only — the sole code change made is `// TODO(audit P#)` comments + this file. Nothing was fixed.

---

## 1. Architecture snapshot

| | |
|---|---|
| **Framework** | Next.js **16.2.9**, React **19.2.4**, **App Router** |
| **Language** | TypeScript, `strict: true`, `@/*` alias |
| **Styling** | Hand-written CSS — `styles/{globals,components,layout,sections}.css` + `styles/tokens/` (design tokens as CSS custom properties). No Tailwind/CSS-modules/CSS-in-JS. |
| **Runtime deps** | `lucide-react`, `next`, `react`, `react-dom` only |
| **Routes (11 pages)** | `/`, `/about`, `/concerts`, `/concerts/[slug]` (SSG), `/education`, `/get-involved`, `/get-involved/board`, `/membership`, `/privacy`, `/support`, `/visit` + conventions (`layout`, `not-found`, `error`, OG/Twitter images, `sitemap`, `robots`, `manifest`, `fonts`) |
| **Rendering** | All Static except `/concerts/[slug]` (SSG) and per-concert OG/Twitter images (Dynamic) |
| **Boundaries** | All 11 `page.tsx` are Server Components; 10 `"use client"` leaves; 1 server action (`lib/actions/board.ts`) |
| **Fonts** | `next/font/google` (Cormorant Garamond + Montserrat), `display: swap` |

### Toolchain
| Check | Result |
|---|---|
| `eslint` | ✅ clean |
| `tsc --noEmit` | ✅ clean (strict) |
| `next build` (no env) | ❌ fails — `NEXT_PUBLIC_SITE_URL` required (intentional guard; **must be documented as a hard CI requirement**) |
| `next build` (env set) | ✅ succeeds |
| `npm audit` | 2 moderate (`postcss <8.5.10` XSS, transitive via Next; fix needs breaking downgrade) |

### Empirical results (production build)
| Page | Perf (mob) | Perf (desk) | A11y | BP | SEO | LCP (mob) | CLS |
|---|---|---|---|---|---|---|---|
| home | 92 | 81 | 100 | 100 | 100 | 3.4s | 0 |
| concerts | 90 | — | 100 | 100 | 100 | 3.6s | 0 |
| membership | 93 | 81 | 100 | 100 | 100 | 3.2s | 0 |
| support | 94 | — | 100 | 100 | 100 | 3.1s | 0 |
| board | 94 | — | 100 | 100 | 100 | 3.1s | 0 |
| concert-detail | 91 | — | 100 | 100 | 100 | 3.5s | 0 |

- **0 axe failures** on every page; **SEO + best-practices 100**; console clean; **CLS 0** everywhere.
- **LCP 3.1–3.6s on every page** (misses the 2.5s "good" bar) — home phase split: TTFB 453 · **Load-Delay 825** · Load-Time 419 · **Render-Delay 1672** ms → dominated by hydration + CSS bandwidth contention, *not* image bytes.
- **No horizontal overflow** at 360 / 768; header adapts cleanly (nav→hamburger ≤1240; CTAs drop ≤640).

---

## Remediation status (pass 1)

✅ **Fixed & verified:** the **P0** (dead donation field) + all **7 P1s** ($0 guard, 44px board links, placeholder contrast, FAQ collapsed-panel a11y, menu focus-restore, `global-error.tsx`, steps-grid tablet collapse) + quick perf wins (hero `quality={55}` ×4, `priority`→`preload` ×9). Verified: P0/$0 behavior in-browser, board links 44×44, steps-grid 2-col @768, FAQ panels `visibility:hidden`, focus returns to toggle, and Lighthouse a11y/BP/SEO **100** with **0 regressions** on home/support/membership/board.

⏳ **Remaining (18 `TODO(audit)` left):** the **LCP P1** (architectural — defer/lazy-hydrate client islands + critical CSS) and 17 **P2** polish items (hover states, dead CSS, FAQPage/`endDate` JSON-LD, e-news state, source-image down-res, etc.) — see the backlog below.

---

## 2. Executive summary — the 5 highest-impact fixes

1. **P0 — The donation "Other amount" field is dead.** Typing a custom amount never changes `amount`, so `customActive` is always false and `effectiveAmount` keeps the *preset*. A donor who types $250 is sent to the payment partner with `amount=150`. Custom gifts (often the largest) silently get the wrong value. — `components/sections/GivingModule.tsx:23-25, 93-104`
2. **P1 — LCP 3.1–3.6s on every page (cross-device).** Render-delay-dominated, so it's structural (hydration + render-blocking CSS), not image bytes. Needs architectural work (defer/lazy-hydrate below-fold client components, split critical CSS). Quick wins available too: hero `quality` consistency + the `/about` preload omission. — measured; `app/*/page.tsx` heroes
3. **P1 — Board social links are 16×16px tap targets.** The LinkedIn/Instagram/Facebook/website links on board cards have no hit-area padding — far under the 44px the rest of the app enforces; fail WCAG 2.5.5/2.5.8 on phones. — `styles/sections.css:1072`
4. **P1 — Donation field placeholder fails contrast (1.83:1).** `.field__control::placeholder` is `--nws-stone` on white — unreadable for low-vision users on the primary giving CTA (and every other light-ground `Input`). — `styles/components.css:203`
5. **P1 — Shared-widget a11y + resilience gaps:** collapsed FAQ answers stay in the accessibility tree (screen readers hear all answers); the mobile menu doesn't restore focus when closed via ✕/backdrop; and there is **no `app/global-error.tsx`**, so any root-layout/Header/analytics render error shows Next's unbranded white screen. — `FaqAccordion.tsx`, `Header.tsx`, missing file

---

## 3. Findings by dimension (P0 → P2)

### 3.1 Performance & Core Web Vitals
| P | Location | What → Fix |
|---|---|---|
| **P1** | *(measured — all pages)* | **LCP 3.1–3.6s**, render-delay-dominated. → Architectural: `dynamic()`-defer/lazy-hydrate below-the-fold client islands (`FaqAccordion`, `GivingModule`, `VenueFilter`, `ConsentAnalytics`); reduce render-blocking CSS (one ~58KB stylesheet). Image tuning alone won't reach 2.5s. |
| P2 | `app/concerts/[slug]/page.tsx:65` · `app/education/page.tsx:22` · `app/get-involved/board/page.tsx:30` · `app/support/page.tsx:29` | Full-bleed heroes encode at default **q75** while home/concerts/membership use **q55** (whitelisted in `next.config`). → Add `quality={55}` for consistent LCP-path byte savings. |
| P2 | `app/about/page.tsx:55` | `/about` section-1 hero omits the `priority`/`preload` hint every other hero sets. *(Critic: it's a 45vw split image, not the LCP element — consistency fix, not an LCP fix.)* → Add `preload` + `quality={55}`. |
| P2 | `app/page.tsx:29` (+8 sites) | `priority` is **deprecated in Next 16** in favor of `preload` (docs line 293; still aliased at runtime, not broken). → Rename `priority`→`preload` across the 9 hero call sites + `Logo.tsx`. |
| P2 | `public/assets/photos/*` | Source masters are 1.2–2.2 MB (×9). next/image optimizes delivery, but they bloat the deploy and slow cold-cache optimization. → Down-res masters to ≤2560px / ~300–600 KB (asset-prep, not code). |
| P2 | `lib/data/giving` / `unused-javascript` | ~28 KB unused + ~13 KB legacy JS reported by Lighthouse (minor). → Low priority; revisit if client islands are split. |

### 3.2 Mobile & responsive
| P | Location | What → Fix |
|---|---|---|
| **P1** | `styles/sections.css:1072` | `.roster-person__link` wraps a 16px icon with **no hit area** → ~16×16px board social links. → `min-width:44px; min-height:44px; align-items/justify-content:center`. |
| **P1** | `styles/sections.css:685` | `.steps-grid` (membership "How it works") stays **3 columns from 641–960px** — not in the 960px collapse like its siblings. → Add to the 960px media block (collapse to 1fr). |
| P2 | `components/sections/GivingModule.tsx:101` | Custom-amount input `style={{minHeight:40}}` overrides the 44px control height (one control donors type into). → Remove the override / raise to 44. |
| P2 | `styles/sections.css:1329,1361` | Dead `grid-template-columns` rules on `.roster`/`.stat-row` (both `display:flex`) — no-ops; the "force N-up" control silently does nothing. → Remove dead rules (layout already wraps correctly). |
| P2 | `styles/sections.css:352-417` | `.concert-row*` ruleset (~65 lines, fixed `240px 1fr`, no 641–960px fallback) is **unreferenced** (list uses `.poster-*`). → Remove dead CSS. |
| P2 | `styles/sections.css:851` | FAQ panel `max-height:320px` can clip a long answer on narrow screens with no scroll. → Use a generous max-height or `grid-template-rows: 0fr→1fr`. *(also A11y 3.3)* |

*No horizontal overflow at 360/390/768; header/nav patterns are correct; filter chips, buttons, inputs, menu toggle all ≥44px. Footer text links (~17px) and `.btn--link` CTAs (~35px) are below 44px but adequately spaced (Lighthouse `target-size` passes) — P2.*

### 3.3 Accessibility (WCAG 2.1 AA)
| P | Location | What → Fix |
|---|---|---|
| **P1** | `styles/components.css:203` | `.field__control::placeholder` = `--nws-stone` on white = **1.83:1** (needs 4.5:1). Hits the donation custom-amount field + every light-ground `Input`. → Change to `var(--text-muted)` (5.69:1) — one token fixes all. |
| **P1** | `components/sections/FaqAccordion.tsx:39-47` | Collapsed answers are only CSS-hidden (`max-height:0`), so they **stay in the a11y tree** (each as a `role="region"`); SR users hear all answers regardless of `aria-expanded`. → Add `hidden`/`aria-hidden` to closed panels (also drops the extra regions). |
| **P1** | `components/layout/Header.tsx:121-133` | Focus is restored to the toggle only on **Escape** — not on ✕ or backdrop close, dropping focus to `<body>`. → Route all three dismiss paths through one handler that calls `toggleRef.current?.focus()`. |
| P2 | `components/layout/Header.tsx:103` | Hamburger `aria-label="Open menu"` is static even when open. → `aria-label={open ? "Close menu" : "Open menu"}`. |
| P2 | `styles/sections.css:851` | (See 3.2) fixed-height FAQ clipping is also a content-loss/reflow a11y risk. |

*Confirmed strong: 1 `<h1>`/page, landmarks present, alt text correct (decorative logo `alt=""`), focus-visible ring global, route-focus to `<h1>` (with `tabindex=-1` ring suppressed), forms labeled (`htmlFor`/`id`) with `aria-invalid`/`aria-describedby`. **`prefers-reduced-motion` IS honored** — `styles/globals.css:118-130` neutralizes scroll-behavior + animation/transition durations for all elements. axe = 0 failures, a11y 100 mobile + desktop.*

### 3.4 SEO
| P | Location | What → Fix |
|---|---|---|
| P2 | `lib/seo/jsonld.ts:44` | `MusicEvent` has `startDate` but no `endDate` (recommended). → Add `endDate` (start + duration) per performance. |
| P2 | `app/membership/page.tsx:186` | 6 visible FAQ Q&As but no **FAQPage JSON-LD**. → Add `faqJsonLd(MEMBER_FAQS)` + `<JsonLd>`. |
| P2 | `lib/seo/jsonld.ts:80` | Offers omit price + `offers.url` falls back to the detail page (deliberate, `TODO(NWS)`). → Add price + real `ticketUrl` once NWS confirms. |
| P2 | `app/get-involved/board/page.tsx:167` | Board roster has no Person/ItemList markup. → Optional `ItemList` of board members. |

*Strong: per-page `title`+`description` via `buildMetadata`, OG + Twitter (incl. dynamic per-concert images), Organization + MusicEvent JSON-LD, canonical via `metadataBase`, valid `sitemap.ts`/`robots.ts` with `SITE_NOINDEX` handling.*

### 3.5 UX & design polish
| P | Location | What → Fix |
|---|---|---|
| **P0** | `components/sections/GivingModule.tsx:23-25, 93-104` | **Dead custom-amount field** (see Exec #1). Also causes a **visual desync**: the preset card keeps its gold ring while the typed value shows in "Other" — two amounts appear selected. → On custom `onChange`/`onFocus`, set `amount` to a non-preset sentinel so `customActive` activates; verify highlight + `effectiveAmount` + impact strip track the typed value. |
| **P1** | `components/sections/GivingModule.tsx:121` | "Continue to Give" has **no `$0` guard**; after the P0 fix, clearing the field links to `?amount=0` ("Continue to give $0"). → `disabled={effectiveAmount <= 0}`. |
| **P1** | `app/global-error.tsx` *(missing)* | No global error boundary — root-layout/`Header`/`ConsentAnalytics`/font errors fall through to Next's unbranded white screen. → Add a branded `global-error.tsx` (renders its own `<html><body>`, `reset` retry). |
| P2 | `components/sections/GivingModule.tsx:34` | `donateHref` template string breaks if `EXTERNAL.donate` ever has its own query (double `?`). → Build with `URL`/`URLSearchParams`. |
| P2 | `styles/sections.css:436,876,907,821` | `.filter-chip`, `.seg-toggle__btn`, `.amount-card`, `.faq-item__q` declare `cursor:pointer`+`transition` but have **no `:hover` rule** — flat on hover, inconsistent with cards/nav. → Add `:hover` affordances. |
| P2 | `components/layout/ENewsSignup.tsx:21-46` | Optimistic "Thanks!" shows regardless of success; input stays editable + button stuck. → Disable input/button after submit or time-box the label. |

### 3.6 Code quality & best practices
| P | Location | What → Fix |
|---|---|---|
| P2 | `lib/data/types.ts:100-104` | `EducationProgram` interface is unused (dead export). → Delete. |
| P2 | `components/core/Card.tsx:20` | `padding = "24px"` hardcoded default bypasses the token scale. → Default to `var(--space-6)`. |
| P2 | `GivingModule.tsx:101`, `Header.tsx:106` | Magic numbers (`minHeight:40`, `fontSize:22`) bypass tokens. → Move to a token/class. |
| ✅ | env / secrets | **No secret leaks:** only `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_GA_ID` are public; `BOARD_INTEREST_ENDPOINT`/`TOKEN` are server-only (correct). No `any`/`@ts-ignore`/unsafe `!`. tsc + eslint clean. |
| P2 | `package.json` / build | The `NEXT_PUBLIC_SITE_URL` build guard will fail any CI that doesn't set it — document as a required env. `npm audit`: 2 moderate (postcss, transitive). |

---

## 4. Prioritized action backlog

| # | P | Area | File | Effort |
|---|---|---|---|---|
| 1 | **P0** | UX | `components/sections/GivingModule.tsx` (custom-amount logic) | **S** |
| 2 | **P1** | UX | `components/sections/GivingModule.tsx` ($0 guard) | S |
| 3 | **P1** | A11y/Mobile | `styles/sections.css:1072` (board link 44px) | S |
| 4 | **P1** | A11y | `styles/components.css:203` (placeholder contrast) | S |
| 5 | **P1** | A11y | `components/sections/FaqAccordion.tsx` (collapsed in a11y tree) | S |
| 6 | **P1** | A11y | `components/layout/Header.tsx` (focus restore on close) | S |
| 7 | **P1** | UX | `app/global-error.tsx` (add branded boundary) | S |
| 8 | **P1** | Mobile | `styles/sections.css:685` (steps-grid 960px) | S |
| 9 | **P1** | Perf | below-fold client islands + critical CSS (LCP) | **L** |
| 10 | P2 | Perf | hero `quality={55}` consistency (4 pages) | S |
| 11 | P2 | Perf | `priority`→`preload` rename (9 sites) | S |
| 12 | P2 | Perf | down-res source masters | M |
| 13 | P2 | A11y | hamburger/`aria-label` state | S |
| 15 | P2 | SEO | `endDate` + `FAQPage` JSON-LD | M |
| 16 | P2 | UX | hover states (filter-chip/seg-toggle/amount-card/faq-q) | S |
| 17 | P2 | UX | e-news success/error state | M |
| 18 | P2 | UX | `donateHref` via URLSearchParams | S |
| 19 | P2 | Mobile | FAQ `max-height` clipping | S |
| 20 | P2 | Mobile | remove dead CSS (`.roster`/`.stat-row`/`.concert-row*` grid rules) | S |
| 21 | P2 | Code | `EducationProgram` dead export; `Card`/magic-number tokens | S |
| 22 | P2 | Build | document `NEXT_PUBLIC_SITE_URL` CI requirement; track postcss advisory | S |

### Could not verify (out of static/lab scope)
- Real-user (field/CrUX) LCP vs the lab 3.1–3.6s; lab uses the harshest Moto-G/slow-4G profile.
- iOS Safari / Firefox / real-device rendering (tested via headless Chrome + emulation only).
- Whether the Mailchimp embed actually subscribes (cross-origin `target=_blank`, no success callback).
- Production CDN headers / image-optimizer cold-cache behavior on the real host.
