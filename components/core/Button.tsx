"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { track as sendGaEvent, type GaEvent } from "@/lib/analytics";

type Variant = "gold" | "solid" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Inverse treatment on dark grounds (heroes / navy bands). */
  onDark?: boolean;
  href?: string;
  onClick?: MouseEventHandler;
  /** GA4 conversion event to fire on click (no-op until consent + GA load). */
  track?: GaEvent;
  trackParams?: Record<string, unknown>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  id?: string;
  "aria-label"?: string;
}

function classes(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  onDark: boolean,
  extra?: string,
) {
  return [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
    onDark && "btn--on-dark",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

const isInternal = (href: string) => href.startsWith("/");
const isAnchor = (href: string) => href.startsWith("#");

/**
 * Editorial button (§4). Renders a Next <Link> for internal routes, a plain
 * <a> for in-page anchors / external URLs, and a <button> otherwise.
 * `gold` is the single primary action per view.
 */
export default function Button({
  children,
  variant = "solid",
  size = "md",
  fullWidth = false,
  onDark = false,
  href,
  onClick,
  track,
  trackParams,
  type = "button",
  disabled = false,
  className,
  target,
  rel,
  id,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const cls = classes(variant, size, fullWidth, onDark, className);

  const handleClick: MouseEventHandler = (e) => {
    if (track) sendGaEvent(track, trackParams);
    onClick?.(e);
  };

  if (href && !disabled) {
    if (isInternal(href)) {
      return (
        <Link href={href} className={cls} onClick={handleClick} id={id} aria-label={ariaLabel}>
          {children}
        </Link>
      );
    }
    const external = !isAnchor(href);
    return (
      <a
        href={href}
        className={cls}
        onClick={handleClick}
        id={id}
        aria-label={ariaLabel}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={handleClick}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
    >
      {children}
    </button>
  );
}
