import type { Metadata } from "next";
import { SITE } from "@/lib/config";

interface PageMetaInput {
  title: string;
  description: string;
  /** Route path, e.g. "/membership". Used for the canonical URL. */
  path: string;
  /** When true, use the title as-is (don't append the site name). */
  bareTitle?: boolean;
  /**
   * OG/Twitter image. Defaults to the branded card at /opengraph-image. Pass
   * `null` on routes that own a file-based opengraph-image (concert detail) so
   * their per-route card is used instead of the default.
   */
  ogImage?: string | null;
}

/**
 * Per-route metadata (§9): title + description + canonical + Open Graph +
 * Twitter card. Both og:image and twitter:image default to the branded
 * 1200×630 card served at /opengraph-image (so dimensions are accurate). Next's
 * root opengraph-image file convention does NOT cascade to nested routes, so we
 * set the default here for every page. Concert routes carry their own
 * opengraph-image.tsx + twitter-image.tsx, which Next gives higher priority,
 * overriding this default with a per-concert card. metadataBase (root layout)
 * resolves the relative URL.
 */
const OG_CARD = "/opengraph-image";

export function buildMetadata({
  title,
  description,
  path,
  bareTitle = false,
  ogImage = OG_CARD,
}: PageMetaInput): Metadata {
  const fullTitle = bareTitle ? title : `${title} · ${SITE.name}`;
  const canonical = path === "/" ? "/" : path;
  const images = ogImage
    ? { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }
    : {};
  const twImages = ogImage ? { images: [ogImage] } : {};
  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: fullTitle,
      description,
      url: canonical,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...twImages,
    },
  };
}
