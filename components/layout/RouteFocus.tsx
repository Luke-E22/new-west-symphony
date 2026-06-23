"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * On navigation, move focus to the new page's <h1> and announce the page (§5/§11).
 * Skips the very first paint so we don't steal focus on initial load.
 */
export default function RouteFocus() {
  const pathname = usePathname();
  const first = useRef(true);
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const h1 = document.querySelector<HTMLElement>("main h1");
    if (h1) {
      h1.setAttribute("tabindex", "-1");
      h1.focus({ preventScroll: true });
      if (announcerRef.current) {
        announcerRef.current.textContent = `${h1.textContent ?? ""}. Page loaded.`;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      ref={announcerRef}
      className="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    />
  );
}
