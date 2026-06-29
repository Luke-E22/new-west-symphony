import Image from "next/image";

type LogoVariant = "mark" | "white" | "lockup" | "primary" | "legacy";

interface LogoProps {
  variant?: LogoVariant;
  /** Rendered height in px; width is derived from the asset's aspect ratio. */
  height?: number;
  className?: string;
  preload?: boolean;
  alt?: string;
}

/** Real brand assets (keep) with intrinsic pixel dimensions for CLS-free sizing. */
const ASSETS: Record<
  LogoVariant,
  { src: string; w: number; h: number; alt: string }
> = {
  mark: { src: "/assets/logos/logo-nws-mark.png", w: 1459, h: 529, alt: "New West Symphony" },
  white: { src: "/assets/logos/logo-nws-white.png", w: 447, h: 447, alt: "New West Symphony" },
  lockup: { src: "/assets/logos/logo-nws-lockup.png", w: 1466, h: 703, alt: "New West Symphony" },
  primary: { src: "/assets/logos/logo-nws-primary.jpeg", w: 447, h: 447, alt: "New West Symphony" },
  legacy: { src: "/assets/logos/logo-nws-legacy.png", w: 1175, h: 474, alt: "New West Symphony Legacy Society" },
};

export default function Logo({
  variant = "mark",
  height = 42,
  className,
  preload = false,
  alt,
}: LogoProps) {
  const a = ASSETS[variant];
  const width = Math.round((a.w / a.h) * height);
  return (
    <Image
      src={a.src}
      width={width}
      height={height}
      alt={alt ?? a.alt}
      preload={preload}
      className={["logo", className].filter(Boolean).join(" ")}
      style={{ height, width: "auto" }}
    />
  );
}
