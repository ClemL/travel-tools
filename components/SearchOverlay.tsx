"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { search, type SearchHit } from "@/lib/searchIndex";
import { CITIES, type CityId } from "@/lib/cities";

/** Wraps each case-insensitive match of `q` in <mark> without using innerHTML. */
function highlight(text: string, q: string) {
  const terms = q.trim().toLowerCase().split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return text;
  const pattern = new RegExp(`(${terms.map(escapeRe).join("|")})`, "ig");
  return text.split(pattern).map((part, i) =>
    terms.includes(part.toLowerCase()) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
  );
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Trims a long body down to the region around the first match. */
function snippet(body: string, q: string, max = 220): string {
  if (body.length <= max) return body;
  const first = q.trim().toLowerCase().split(/\s+/)[0] ?? "";
  const at = body.toLowerCase().indexOf(first);
  if (at < 0) return body.slice(0, max) + "…";
  const start = Math.max(0, at - 60);
  return (start > 0 ? "…" : "") + body.slice(start, start + max) + (start + max < body.length ? "…" : "");
}

export default function SearchOverlay({
  open,
  onClose,
  onJump,
}: {
  open: boolean;
  onClose: () => void;
  onJump: (tab: string, city: CityId | null) => void;
}) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const hits = useMemo(() => search(q), [q]);

  useEffect(() => setCursor(0), [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      // Focus after paint so the mobile keyboard opens reliably.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keep the highlighted row in view while arrowing through results.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (!open) return null;

  const jump = (hit: SearchHit) => {
    onJump(hit.tab, hit.city);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && hits[cursor]) {
      e.preventDefault();
      jump(hits[cursor]);
    }
  };

  return (
    <div className="search-backdrop" onClick={onClose} role="presentation">
      <div
        className="search-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search all content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="search-inputrow">
          <span aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="search"
            value={q}
            placeholder="Search everything — octopus, tipping, 270mm, typhoon…"
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search query"
            autoComplete="off"
          />
          <button className="btn" onClick={onClose} aria-label="Close search">
            Esc
          </button>
        </div>

        {q.trim().length >= 2 && (
          <p className="search-count">
            {hits.length === 0
              ? "No matches."
              : `${hits.length} result${hits.length === 1 ? "" : "s"}${hits.length === 40 ? "+" : ""}`}
          </p>
        )}

        <ul className="search-results" ref={listRef}>
          {hits.map((hit, i) => {
            const city = hit.city ? CITIES.find((c) => c.id === hit.city) : null;
            return (
              <li key={hit.id}>
                <button data-active={i === cursor} onMouseEnter={() => setCursor(i)} onClick={() => jump(hit)}>
                  <span className="search-meta">
                    <span className="pill pill-brand">{hit.tabLabel}</span>
                    {city && <span className="pill pill-neutral">{city.flag} {city.name}</span>}
                  </span>
                  <span className="search-title">{highlight(hit.title, q)}</span>
                  <span className="search-body">{highlight(snippet(hit.body, q), q)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {q.trim().length < 2 && (
          <div className="search-hint">
            <p className="muted small">
              Searches all 16 tabs at once — dishes, phrases, fares, neighborhoods, shops, emergency
              numbers. Try <strong>octopus</strong>, <strong>tipping</strong>, <strong>270mm</strong>,{" "}
              <strong>t8</strong>, <strong>chuseok</strong> or <strong>banchan</strong>.
            </p>
            <p className="muted small">
              ↑ ↓ to move · Enter to open · Esc to close
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
