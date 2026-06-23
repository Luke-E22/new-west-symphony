import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  /** 3px gold top rule. */
  accent?: boolean;
  /** Hover lift (3px) + deeper shadow. */
  interactive?: boolean;
  padding?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/** Warm paper surface, sand hairline, soft navy-tinted shadow (§4). */
export default function Card({
  children,
  accent = false,
  interactive = false,
  padding = "24px",
  className,
  style,
  id,
}: CardProps) {
  const cls = [
    "card",
    accent && "card--accent",
    interactive && "card--interactive",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div id={id} className={cls} style={{ padding, ...style }}>
      {children}
    </div>
  );
}
