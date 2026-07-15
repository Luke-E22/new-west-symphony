"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

interface HeroCarouselProps {
  /** Server-rendered slides (each a full <section className="hero">). */
  slides: { label: string; content: ReactNode }[];
}

const ROTATE_MS = 8000;

/* prefers-reduced-motion, hydration-safe (same pattern as the GA consent
   store): the server snapshot says "no preference", the client corrects on
   mount, and changes to the OS setting propagate live. */
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Home hero carousel (W3C APG carousel pattern, "grouped slides" variant).
 * The slides arrive server-rendered so the first slide — the LCP image — is in
 * the initial HTML exactly as the static hero was; this component only toggles
 * which one is visible.
 *
 * Auto-rotates every 8s; pauses while hovered (real mice only — touch taps
 * emulate mouseenter and must not wedge the pause) or while focus is within,
 * stops permanently once the user picks a slide, and never rotates for
 * prefers-reduced-motion users. Hover and focus are tracked separately so a
 * passing mouse can't cancel a keyboard user's focus-pause — rotation while a
 * slide CTA has focus would inert the slide and drop their focus to <body>.
 *
 * DOM order puts the controls (pause first) BEFORE the slides: a screen-reader
 * user meets "Pause slide rotation" before any content that could change under
 * their reading cursor (APG requirement behind WCAG 2.2.2). CSS keeps the
 * controls visually at the bottom.
 */
export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const rotating = playing && !hoverPaused && !focusPaused && !reducedMotion;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [rotating, slides.length]);

  // A deliberate slide choice means "I'm reading this one" — stop rotating.
  const pick = useCallback((index: number) => {
    setPlaying(false);
    setActive(index);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => pick((active + dir + slides.length) % slides.length),
    [active, pick, slides.length],
  );

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHoverPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHoverPaused(false);
      }}
      onFocus={() => setFocusPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusPaused(false);
      }}
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touchStart.current) return;
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        touchStart.current = null;
        // Horizontal must dominate, or a diagonal page-scroll flick that starts
        // on the hero would change slides and kill autoplay.
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="hero-carousel__controls">
        {!reducedMotion && (
          <button
            type="button"
            className="hero-carousel__pause"
            aria-label={playing ? "Pause slide rotation" : "Resume slide rotation"}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "❚❚" : "▶"}
          </button>
        )}
        <div className="hero-carousel__dots">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Go to slide: ${slide.label}`}
              aria-current={i === active || undefined}
              className={
                i === active
                  ? "hero-carousel__dot hero-carousel__dot--active"
                  : "hero-carousel__dot"
              }
              onClick={() => pick(i)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--prev"
        aria-label="Previous slide"
        onClick={() => step(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--next"
        aria-label="Next slide"
        onClick={() => step(1)}
      >
        ›
      </button>

      <div className="hero-carousel__track" aria-live={rotating ? "off" : "polite"}>
        {slides.map((slide, i) => (
          <div
            key={slide.label}
            className={
              i === active
                ? "hero-carousel__slide hero-carousel__slide--active"
                : "hero-carousel__slide"
            }
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.label} (${i + 1} of ${slides.length})`}
            aria-hidden={i !== active}
            inert={i !== active}
          >
            {slide.content}
          </div>
        ))}
      </div>
    </div>
  );
}
