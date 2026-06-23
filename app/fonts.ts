// Self-hosted brand fonts (Phase 0 / §10). next/font/google downloads and
// serves these from our own origin — no render-blocking Google request, no CLS.
// The CSS variables are consumed by styles/tokens/typography.css.
import { Cormorant_Garamond, Montserrat } from "next/font/google";

// Display serif — concert-poster headlines, prices, dates, pull-quotes (italic).
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

// Structural sans — body, UI, eyebrows, nav, buttons.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const fontVariables = `${cormorant.variable} ${montserrat.variable}`;
