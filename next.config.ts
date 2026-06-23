import type { NextConfig } from "next";
import { LEGACY_EXACT, LEGACY_PREFIX, VALID_ROUTES } from "./lib/redirects";

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
  images: {
    formats: ["image/avif", "image/webp"], // AVIF/WebP for every photograph (§10)
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
