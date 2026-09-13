"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDismiss, dismissId } from "./DismissProvider";

/** Long enough to read as confirmation, short enough not to feel like a wait. */
const CONFIRM_MS = 850;

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

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Ticking plays a brief green confirmation before the item is actually removed,
 * so the thing you clicked acknowledges the click instead of just vanishing.
 * Un-ticking is immediate — there is nothing to confirm.
 */
function useConfirmedToggle(id: string, isHidden: boolean) {
  const { toggle } = useDismiss();
  const [confirming, setConfirming] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    []
  );

  const onChange = useCallback(() => {
    if (confirming) return; // ignore double-clicks mid-animation
    if (isHidden || prefersReducedMotion()) {
      toggle(id);
      return;
    }
    setConfirming(true);
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setConfirming(false);
      toggle(id);
    }, CONFIRM_MS);
  }, [confirming, isHidden, id, toggle]);

  return { confirming, onChange };
}

function ConfirmMark({ label }: { label: string }) {
  return (
    <>
      {/* Drawn rather than a ✓ glyph: the character renders thin and small at
          any font size, and gets lost against the text underneath. */}
      <span className="dismiss-confirm-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span className="sr-only" role="status">
        {label}
      </span>
    </>
  );
}

/**
 * Wraps one card or callout. Ticking the box hides it, so the page collapses
 * down to the things still worth reading. Hidden items come back via the
 * scope's Show control, where they render dimmed with the box still ticked.
 */
export function Dismissible({ scope, itemKey, kind = "known", children }: Props) {
  const { hidden, loaded, revealed } = useDismiss();
  const id = dismissId(scope, itemKey);
  const isHidden = loaded && hidden.has(id);
  const { confirming, onChange } = useConfirmedToggle(id, isHidden);
  const showing = revealed.has(scope);

  if (isHidden && !showing) return null;

  return (
    <div
      className={`dismissible${isHidden ? " is-dismissed" : ""}${confirming ? " is-confirming" : ""}`}
    >
      <label className="dismiss-toggle" title={LABEL[kind].check}>
        <input
          type="checkbox"
          checked={isHidden || confirming}
          onChange={onChange}
          aria-label={`${LABEL[kind].check}: ${itemKey}`}
        />
        <span className="dismiss-text">{isHidden ? LABEL[kind].hidden : LABEL[kind].check}</span>
      </label>
      {confirming && <ConfirmMark label={LABEL[kind].hidden} />}
      {children}
    </div>
  );
}

/** List-item variant, for bullet-style tips. */
export function DismissibleItem({ scope, itemKey, kind = "known", children }: Props) {
  const { hidden, loaded, revealed } = useDismiss();
  const id = dismissId(scope, itemKey);
  const isHidden = loaded && hidden.has(id);
  const { confirming, onChange } = useConfirmedToggle(id, isHidden);
  const showing = revealed.has(scope);

  if (isHidden && !showing) return null;

  return (
    <li
      className={`dismiss-li${isHidden ? " is-dismissed" : ""}${confirming ? " is-confirming" : ""}`}
    >
      <input
        type="checkbox"
        checked={isHidden || confirming}
        onChange={onChange}
        aria-label={`${LABEL[kind].check}: ${itemKey}`}
        title={LABEL[kind].check}
      />
      <span>{children}</span>
      {confirming && <ConfirmMark label={LABEL[kind].hidden} />}
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
