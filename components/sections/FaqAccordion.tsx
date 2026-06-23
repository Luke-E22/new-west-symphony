"use client";

import { useId, useState } from "react";

interface FaqAccordionProps {
  items: { q: string; a: string }[];
  /** Index open by default (-1 for all closed). */
  defaultOpen?: number;
}

/** Single-open FAQ accordion (§7). Enter/Space toggle; + rotates 45° to ×. */
export default function FaqAccordion({ items, defaultOpen = 0 }: FaqAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div className="faq-item" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                id={btnId}
                type="button"
                className="faq-item__q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="faq-item__a"
              data-open={isOpen}
            >
              <div className="faq-item__a-inner">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
