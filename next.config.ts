import type { NextConfig } from "next";
import { LEGACY_EXACT, LEGACY_PREFIX, VALID_ROUTES } from "./lib/redirects";

/**
 * Security headers (audit H4). This is a fully static/SSG marketing site, so a
 * nonce-based CSP is deliberately avoided — nonces require dynamic rendering
 * (per the Next CSP guide) and would deopt every page. Instead: a static CSP
 * scoped to the site's real sources ('unsafe-inline' for Next's inline hydration
 * scripts and the app's inline style props; dev also needs 'unsafe-eval' + ws
 * for React Fast Refresh / HMR). External origins allowed: Mailchimp (the e-news
 * form posts directly to *.list-manage.com) and Google Analytics (H5). All other
 * third parties (Salesforce, Ticketmaster, social) are <a> navigations, not
 * resource loads, so they need no CSP entry.
 */
const isDev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.list-manage.com",
  "img-src 'self' data: blob: https://www.google-analytics.com",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.google-analytics.com`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: http://localhost:*" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com`,
  "frame-src 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

/**
 * 301 redirect map (audit B1 — launch blocker). Built from a full crawl of the
 * live WordPress sitemap (306 URLs). Every indexed old URL 301s to its new home
 * so search equity survives; unknown URLs fall through to the branded 404.
 *
 * skipTrailingSlashRedirect is on so the legacy (slashed) URLs hit their target
 * in ONE hop instead of the default 308 slash-strip → 301 two-hop chain. Because
 * of that, every redirect/route is matched in both slashed and non-slashed form.
 */
const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  poweredByHeader: false, // drop the X-Powered-By: Next.js info leak (H4)
  images: {
    formats: ["image/avif", "image/webp"], // AVIF/WebP for every photograph (§10)
    qualities: [50, 55, 75], // allow a lighter hero encode (audit H8); 75 default elsewhere
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    const rules: {
      source: string;
      destination: string;
      statusCode: 301 | 308;
    }[] = [];

    // Exact legacy URLs first (first match wins, so before the directory prefixes).
    for (const { source, destination } of LEGACY_EXACT) {
      rules.push({ source, destination, statusCode: 301 });
      rules.push({ source: `${source}/`, destination, statusCode: 301 });
    }
    // Directory groups: any sub-path (listed or not) collapses to one destination.
    for (const { source, destination } of LEGACY_PREFIX) {
      rules.push({ source, destination, statusCode: 301 });
      rules.push({ source: `${source}/`, destination, statusCode: 301 });
      rules.push({ source: `${source}/:path*`, destination, statusCode: 301 });
    }
    // Normalize a trailing slash on the live routes to the canonical form (one hop).
    for (const route of VALID_ROUTES) {
      rules.push({ source: `${route}/`, destination: route, statusCode: 308 });
    }
    return rules;
  },
};

export default nextConfig;
