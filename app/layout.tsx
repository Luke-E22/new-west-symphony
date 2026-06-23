import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/layout.css";
import "@/styles/sections.css";
import { fontVariables } from "./fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RouteFocus from "@/components/layout/RouteFocus";
import JsonLd from "@/components/JsonLd";
import ConsentAnalytics from "@/components/analytics/ConsentAnalytics";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <RouteFocus />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
