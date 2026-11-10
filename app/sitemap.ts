import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { concertSlugs, eventPageSlugs } from "@/lib/data";
import { hasProgramDocs } from "@/lib/data/programs";

const STATIC_ROUTES = [
  "",
  "/concerts",
  "/membership",
  "/subscriptions",
  "/events",
  "/support/sponsors",
  "/support",
  "/visit",
  "/education",
  "/about",
  "/get-involved",
  "/get-involved/board",
  "/press-room",
  "/privacy",
  "/support/adopt-a-musician",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/concerts" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/concerts" || path === "/membership" || path === "/subscriptions" ? 0.9 : 0.7,
  }));

  const concertEntries: MetadataRoute.Sitemap = concertSlugs().map((slug) => ({
    url: `${SITE.url}/concerts/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const eventEntries: MetadataRoute.Sitemap = eventPageSlugs().map((slug) => ({
    url: `${SITE.url}/events/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Only programs with real content; the rest are noindexed until posted.
  const programEntries: MetadataRoute.Sitemap = concertSlugs().filter(hasProgramDocs).map((slug) => ({
    url: `${SITE.url}/concerts/${slug}/program`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...concertEntries, ...eventEntries, ...programEntries];
}
