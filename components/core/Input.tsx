import type { ComponentProps, ReactNode } from "react";

interface InputProps {
  label?: ReactNode;
  hint?: string;
  error?: string;
  id?: string;
  /** Render a multiline textarea instead of an input. */
  multiline?: boolean;
  onDark?: boolean;
  className?: string;
}

/**
 * Labeled field (§4): uppercase tracked label, 4px field, gold focus ring,
 * optional error state. Pass-through props go to the control.
 */
export default function Input({
  label,
  hint,
  error,
  id,
  multiline = false,
  onDark = false,
  className,
  ...rest
}: InputProps &
  Omit<ComponentProps<"input"> & ComponentProps<"textarea">, "id">) {
  const wrapCls = [
    "field",
    error && "field--error",
    onDark && "field--on-dark",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  return (
    <div className={wrapCls}>
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          className="field__control"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...(rest as ComponentProps<"textarea">)}
        />
      ) : (
        <input
          id={id}
          className="field__control"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...(rest as ComponentProps<"input">)}
        />
      )}
      {hint && !error && (
        <span id={`${id}-hint`} className="field__error" style={{ color: "var(--text-muted)" }}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="field__error">
          {error}
        </span>
      )}
    </div>
  );
}
