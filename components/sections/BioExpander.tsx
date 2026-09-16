"use client";

import { useId, useState } from "react";

interface BioExpanderProps {
  /** Paragraphs revealed by "Learn more". */
  paragraphs: string[];
  /** First name used in the toggle label, e.g. "Learn more about Elsje". */
  firstName: string;
}

/**
 * "Learn more" bio expander (FAQ-accordion collapse pattern: max-height +
 * opacity, with visibility keeping the collapsed text out of the a11y tree).
 * The toggle sits after the content in DOM order so it reads "Show less"
 * directly beneath the expanded text.
 */
export default function BioExpander({ paragraphs, firstName }: BioExpanderProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <div className="bio-more" data-open={open} id={id} aria-hidden={!open} inert={!open}>
        <div className="prose bio-more__inner">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="bio-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Show less" : `Learn more about ${firstName} →`}
      </button>
    </>
  );
}
