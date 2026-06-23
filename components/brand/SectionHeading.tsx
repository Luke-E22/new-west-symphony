import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  /** Render the title as an <h1> (default <h2>). One <h1> per page. */
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}

/**
 * The signature opener (§4): tracked-caps eyebrow → 56px gold rule → serif
 * title. Reproduced on every section.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  onDark = false,
  as = "h2",
  className,
  id,
}: SectionHeadingProps) {
  const cls = [
    "section-heading",
    align === "center" && "section-heading--center",
    onDark && "section-heading--on-dark",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const Title = as;
  return (
    <div className={cls} id={id}>
      {eyebrow && <div className="section-heading__eyebrow">{eyebrow}</div>}
      <hr className="section-heading__rule" />
      <Title className="section-heading__title">{title}</Title>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
