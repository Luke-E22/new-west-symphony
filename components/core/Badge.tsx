import type { ReactNode } from "react";

type Tone = "neutral" | "navy" | "gold" | "success";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  solid?: boolean;
  className?: string;
}

/** Tiny tracked-caps category / status marker (§4). One per card. */
export default function Badge({
  children,
  tone = "neutral",
  solid = false,
  className,
}: BadgeProps) {
  const cls = [
    "badge",
    `badge--${tone}`,
    solid && "badge--solid",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={cls}>{children}</span>;
}
