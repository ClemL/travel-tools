"use client";

import { useDismiss, dismissId } from "./DismissProvider";

interface Props {
  scope: string;
  /** Stable text key — the item's own name or first line. */
  itemKey: string;
  /** What the checkbox means here: "known" for tips, "been" for places. */
  kind?: "known" | "been";
  children: React.ReactNode;
}

const LABEL = {
  known: { check: "I know this", hidden: "Marked as known" },
  been: { check: "Been here", hidden: "Marked as visited" },
} as const;

/**
 * Wraps one card. Ticking the box hides it, so the page collapses down to the
 * things still worth reading. Hidden items come back via the scope's Show
 * control, where they render dimmed with the box still ticked.
 */
export function Dismissible({ scope, itemKey, kind = "known", children }: Props) {
  const { hidden, loaded, toggle, revealed } = useDismiss();
  const id = dismissId(scope, itemKey);
  const isHidden = loaded && hidden.has(id);
  const showing = revealed.has(scope);

  if (isHidden && !showing) return null;

  return (
    <div className={`dismissible${isHidden ? " is-dismissed" : ""}`}>
      <label className="dismiss-toggle" title={LABEL[kind].check}>
        <input
          type="checkbox"
          checked={isHidden}
          onChange={() => toggle(id)}
          aria-label={`${LABEL[kind].check}: ${itemKey}`}
        />
        <span className="dismiss-text">{isHidden ? LABEL[kind].hidden : LABEL[kind].check}</span>
      </label>
      {children}
    </div>
  );
}

/** List-item variant, for bullet-style tips. */
export function DismissibleItem({ scope, itemKey, kind = "known", children }: Props) {
  const { hidden, loaded, toggle, revealed } = useDismiss();
  const id = dismissId(scope, itemKey);
  const isHidden = loaded && hidden.has(id);
  const showing = revealed.has(scope);

  if (isHidden && !showing) return null;

  return (
    <li className={`dismiss-li${isHidden ? " is-dismissed" : ""}`}>
      <input
        type="checkbox"
        checked={isHidden}
        onChange={() => toggle(id)}
        aria-label={`${LABEL[kind].check}: ${itemKey}`}
        title={LABEL[kind].check}
      />
      <span>{children}</span>
    </li>
  );
}

/**
 * Per-tab control. Only appears once something in the scope is hidden, so it
 * costs nothing until it is useful.
 */
export function DismissBar({ scope, noun = "items" }: { scope: string; noun?: string }) {
  const { countIn, revealed, toggleReveal, resetScope, loaded } = useDismiss();
  const count = loaded ? countIn(scope) : 0;
  if (count === 0) return null;
  const showing = revealed.has(scope);

  return (
    <div className="dismissbar">
      <span>
        <strong>{count}</strong> {noun} hidden
      </span>
      <button className="btn btn-small" onClick={() => toggleReveal(scope)}>
        {showing ? "Hide again" : "Show hidden"}
      </button>
      <button className="btn btn-small" onClick={() => resetScope(scope)}>
        Reset
      </button>
    </div>
  );
}
