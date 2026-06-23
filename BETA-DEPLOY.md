# Beta launch to Netlify

This is a **server-rendered Next.js 16 app** (the donation/board forms use server
actions, plus dynamic OG images and `next/image` optimization). That means it
**cannot** be deployed by dragging a folder of static files into Netlify — the
build has to run on Netlify's Next.js runtime. Use one of the two paths below.

> ⚠️ **Next.js 16 is very new.** Netlify's adapter (`@netlify/plugin-nextjs`)
> moves fast but may lag the latest Next release. If the Netlify build errors on
> an adapter/runtime issue, the reliable fallback for Next 16 is **Vercel**
> (`vercel` CLI or Git import) — same env vars apply.

---

## Required environment variables (set these in Netlify first)

In **Site settings → Environment variables**:

| Variable | Value for the beta | Why |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | your beta URL, e.g. `https://nws-beta.netlify.app` | **Required — the build fails without it.** Sets canonicals/OG/sitemap to the beta URL, not the real domain. |
| `SITE_NOINDEX` | `true` | Keeps Google from indexing the beta (it serves `Disallow: /` + `noindex`). **Remove this for the real launch.** |
| `NEXT_PUBLIC_GA_ID` | *(leave unset)* | No analytics on the beta unless you want it. |
| `BOARD_INTEREST_ENDPOINT` | *(optional)* | Where the "Join the board" form posts. Unset → the form shows an honest "not live yet" message instead of dropping leads. |

You can get the beta URL after the first deploy and then set `NEXT_PUBLIC_SITE_URL`
to it and redeploy, or pre-name the site (`nws-beta`) and use that URL up front.

---

## Path A — Netlify CLI (fastest, deploy from this folder)

```bash
# 1. one-time
npm install -g netlify-cli
cd new-west-symphony
npm install

# 2. log in + create/link a site
netlify login
netlify init        # create a new site, name it e.g. "nws-beta"

# 3. set the env vars (or do this in the dashboard)
netlify env:set NEXT_PUBLIC_SITE_URL "https://nws-beta.netlify.app"
netlify env:set SITE_NOINDEX "true"

# 4. build on Netlify + deploy to the live beta URL
netlify deploy --build --prod
```

## Path B — Git + Netlify (best for re-deploys / sharing)

1. Push this folder to a new GitHub repo (private is fine).
2. In Netlify: **Add new site → Import from Git**, pick the repo.
3. Netlify auto-detects Next.js (build command `npm run build`).
4. Add the env vars above, then **Deploy**.
5. Every push redeploys.

---

## After it's live

- Visit the beta URL and click through — confirm the forms, concert pages, and
  images render. The donation/board forms run as serverless functions.
- Check `https://<beta>/robots.txt` shows `Disallow: /` (noindex is active).
- Share the URL for review.

## When you're ready to replace the real site

- Point the real domain (`newwestsymphony.org`) at the deploy (Netlify Domain
  settings) **or** rebuild on your production host.
- Set `NEXT_PUBLIC_SITE_URL=https://newwestsymphony.org` and **remove
  `SITE_NOINDEX`** so the real site is indexable.
- Wire the remaining org-side values when ready: `MEMBERSHIP_PURCHASE_URL`,
  `NEXT_PUBLIC_GA_ID`, `BOARD_INTEREST_ENDPOINT`, real ticket prices/URLs.

This package is the full source minus `node_modules` / `.next` / `.git`
(Netlify reinstalls and rebuilds). `npm install` locally if you want to run it.
