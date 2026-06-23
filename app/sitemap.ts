import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { concertSlugs } from "@/lib/data";

const STATIC_ROUTES = [
  "",
  "/concerts",
  "/membership",
  "/support",
  "/visit",
  "/education",
  "/about",
  "/get-involved",
  "/get-involved/board",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/concerts" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/concerts" || path === "/membership" ? 0.9 : 0.7,
  }));

  const concertEntries: MetadataRoute.Sitemap = concertSlugs().map((slug) => ({
    url: `${SITE.url}/concerts/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...concertEntries];
}
