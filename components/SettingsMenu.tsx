"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CITIES, DEFAULT_ENABLED } from "@/lib/cities";
import { useCity } from "./CityProvider";

/**
 * Settings button plus the panel it opens. The panel currently holds one
 * setting — which destinations are switched on — and is laid out so further
 * sections can be added beneath it.
 */
export default function SettingsMenu({ variant = "full" }: { variant?: "full" | "icon" }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    // Return focus to whichever button opened the panel.
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      {variant === "icon" ? (
        <button
          ref={triggerRef}
          className="btn btn-icon"
          onClick={() => setOpen(true)}
          aria-label="Settings"
          aria-haspopup="dialog"
        >
          ⚙️
        </button>
      ) : (
        <button ref={triggerRef} className="btn" onClick={() => setOpen(true)} aria-haspopup="dialog">
          <span aria-hidden="true">⚙️</span> Settings
        </button>
      )}
      {/* Portalled: the phone bar's backdrop-filter would otherwise trap the fixed overlay inside it. */}
      {open && createPortal(<SettingsPanel onClose={close} />, document.body)}
    </>
  );
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { isEnabled, setEnabled, resetEnabled, enableAll, enabledCities } = useCity();
  const panelRef = useRef<HTMLDivElement>(null);
  const onlyOne = enabledCities.length === 1;
  const atDefaults =
    enabledCities.length === DEFAULT_ENABLED.length && enabledCities.every((c) => DEFAULT_ENABLED.includes(c.id));

  useEffect(() => {
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("input, button")?.focus());
  }, []);

  // Listened for on the window rather than the panel: the action buttons
  // disable themselves once used, which drops focus to <body>, and Escape and
  // the focus trap still have to work from there.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>("input:not([disabled]), button:not([disabled])")];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="search-backdrop" onClick={onClose} role="presentation">
      <div
        className="search-panel settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-head">
          <h2 id="settings-title">Settings</h2>
          <button className="btn" onClick={onClose} aria-label="Close settings">
            Done
          </button>
        </div>

        <section className="settings-section" aria-labelledby="settings-destinations">
          <h3 id="settings-destinations">Destinations</h3>
          <p className="muted small">
            Switch off the places you are not visiting this time. They disappear from the city picker,
            clocks, comparisons and search. Nothing is deleted — switching one back on restores it,
            including anything you ticked off.
          </p>

          <ul className="settings-list">
            {CITIES.map((c) => {
              const on = isEnabled(c.id);
              const locked = on && onlyOne;
              return (
                <li key={c.id}>
                  <label className={`settings-row${on ? " is-on" : ""}`}>
                    <span className="settings-flag" aria-hidden="true">
                      {c.flag}
                    </span>
                    <span className="settings-name">
                      <strong>{c.name}</strong>
                      <span className="small muted">
                        {c.country} · {c.currency}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      role="switch"
                      className="switch"
                      checked={on}
                      disabled={locked}
                      onChange={(e) => setEnabled(c.id, e.target.checked)}
                      aria-describedby={locked ? "settings-lastone" : undefined}
                    />
                  </label>
                </li>
              );
            })}
          </ul>

          <p className="small muted settings-foot" id="settings-lastone" aria-live="polite">
            {onlyOne
              ? "At least one destination has to stay on."
              : `${enabledCities.length} of ${CITIES.length} destinations on.`}
          </p>

          <div className="settings-actions">
            <button className="btn btn-small" onClick={enableAll} disabled={enabledCities.length === CITIES.length}>
              Turn all on
            </button>
            <button className="btn btn-small" onClick={resetEnabled} disabled={atDefaults}>
              Reset to trip defaults
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
