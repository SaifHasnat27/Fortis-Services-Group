"use client";

import React, { useState, useRef, useEffect } from "react";

// ── Geoapify — free tier (3,000/day), no card attached. Hardcoded on purpose:
// this is a NEXT_PUBLIC-class value that ships to the browser either way, and
// an env var would need a matching Vercel entry or the field silently dies live.
const GEOAPIFY_KEY = "8d910f977e1b482a91810c8150a3e86b";
const ENDPOINT = "https://api.geoapify.com/v1/geocode/autocomplete";

const MIN_CHARS = 4;     // below this we never call out
const DEBOUNCE_MS = 300; // fires on typing pause, not per keystroke
const LIMIT = 5;

// Sydney CBD — biases results local without excluding the rest of AU.
const SYDNEY = "151.2093,-33.8688";

// ── Unit-number rescue ──────────────────────────────────────────────────────
// Geoapify runs on OpenStreetMap, which has no unit-level data for Australia
// (that lives in G-NAF). So "unit 5/21 george st" comes back as plain
// "21 George Street" — picking it would wipe the unit the customer typed.
// We re-attach whatever they typed rather than let the click destroy it.

// Australia Post: a forward slash may ONLY separate an apartment/flat/unit from
// the street number — it does NOT work for a floor. G-NAF likewise stores flat
// number and level number as separate fields. So dwellings collapse to "3/", but
// LEVEL (a floor) and LOT (a land parcel) keep their word, or the meaning changes:
// "Level 3, 100 Pitt St" is the third floor, NOT unit 3.
const DWELLING = "unit|apartment|apt|flat|shop|suite|u";
const KEEP_WORD = "level|floor|lot";

// "unit 5/", "apt 2 ", "level 3 " → the word, the number, and whether a slash followed.
const WORD_FORM = new RegExp(`^\\s*(${DWELLING}|${KEEP_WORD})\\s*\\.?\\s*(\\d+[a-z]?)\\s*[,]?\\s*(\\/?)`, "i");
// "5/21 ..." → bare number before a slash.
const SLASH_FORM = /^\s*(\d+[a-z]?)\s*\//;

const WORD_LABELS: Record<string, string> = { level: "Level", floor: "Floor", lot: "Lot" };

/**
 * Re-applies the sub-dwelling the customer typed onto the address they picked,
 * normalised to the Australian "3/1 Renown Street" form. Level/Lot keep their
 * word. Returns the suggestion untouched when there is no unit, or when the
 * suggestion isn't a street address (a suburb must never become "5/Bondi").
 */
function keepUnit(typed: string, suggestion: string): string {
  // Only street addresses start with a house number. Suburbs don't.
  if (!/^\d/.test(suggestion)) return suggestion;

  let num: string | null = null;
  let word = "";

  const m = typed.match(WORD_FORM);
  if (m) {
    word = m[1].toLowerCase();
    num = m[2];
  } else {
    const bare = typed.match(SLASH_FORM);
    if (bare) num = bare[1];
  }

  if (!num) return suggestion;

  // Level / Lot — keep the word, a slash would change what the address means.
  const label = WORD_LABELS[word];
  if (label) {
    const already = new RegExp(`^${label}\\s`, "i").test(suggestion);
    return already ? suggestion : `${label} ${num}, ${suggestion}`;
  }

  // Everything else is a dwelling → one canonical form: "3/1 Renown Street".
  if (suggestion.toLowerCase().startsWith(`${num.toLowerCase()}/`)) return suggestion;
  return `${num}/${suggestion}`;
}

interface AddressPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  placeholder?: string;
}

export default function AddressPicker({
  value,
  onChange,
  disabled,
  error,
  id = "location",
  placeholder = "Your suburb or address",
}: AddressPickerProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Set when a suggestion is picked, so the effect below doesn't immediately
  // re-query with the text it just wrote back into the field.
  const skipNextRef = useRef(false);

  // Close on outside click. Both events: mousedown alone fires late on iOS,
  // which can let a tap land on whatever sits under the panel.
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  // Debounced lookup. Any failure resolves to "no suggestions" — a dead
  // network must leave a plain, working text input behind.
  useEffect(() => {
    if (skipNextRef.current) {
      skipNextRef.current = false;
      return;
    }

    const query = value.trim();

    const timer = setTimeout(async () => {
      // Too short to search — clear whatever is left over and stop. Kept inside
      // the timeout, not the effect body: setState in an effect body triggers
      // cascading renders (react-hooks/immutability).
      if (query.length < MIN_CHARS) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      abortRef.current?.abort(); // drop the in-flight request, keep results ordered
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const url =
          `${ENDPOINT}?text=${encodeURIComponent(query)}` +
          `&filter=countrycode:au` +
          `&bias=proximity:${SYDNEY}` +
          `&limit=${LIMIT}&format=json&apiKey=${GEOAPIFY_KEY}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));

        const data = await res.json();
        const found: string[] = (data?.results ?? [])
          .map((r: { formatted?: string }) => r.formatted)
          .filter((f: unknown): f is string => typeof f === "string" && f.length > 0)
          // Every row ends ", Australia" — redundant when the query is AU-only,
          // and on a narrow phone it pushes the suburb out of view.
          .map((f: string) => f.replace(/,\s*Australia$/i, ""));

        // De-dupe: Geoapify can return the same formatted string twice.
        const unique = Array.from(new Set(found));

        setSuggestions(unique);
        setIsOpen(unique.length > 0); // nothing found = no dropdown at all
        setActiveIndex(-1);
      } catch {
        // Aborted or failed — stay silent, the typed text is still valid.
        setSuggestions([]);
        setIsOpen(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  // What the customer actually sees — and gets. Geoapify strips the unit, so we
  // paint it back on BEFORE rendering: the row reads the same as the finished
  // field, no surprise swap on click.
  const shown = suggestions.map((s) => keepUnit(value, s));

  const select = (address: string) => {
    skipNextRef.current = true;
    onChange(address);
    setIsOpen(false);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || shown.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % shown.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? shown.length - 1 : i - 1));
        break;
      case "Enter":
        // Only intercept Enter while a row is highlighted, so Enter otherwise
        // still submits the form as usual.
        if (activeIndex >= 0) {
          e.preventDefault();
          select(shown[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        inputMode="text"
        // Off, or the browser's own saved-address dropdown stacks on top of ours.
        autoComplete="off"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        className={`
          w-full
          px-4 py-3
          text-[var(--text-primary)]
          bg-base-secondary
          border border-[var(--border)]
          rounded-none
          text-sm leading-[var(--leading-normal)]
          placeholder:text-[var(--text-muted)]
          transition-all duration-[var(--transition-fast)]
          focus:outline-none
          focus:border-[var(--border-dark)]
          focus:ring-1 focus:ring-[var(--color-black)]
          hover:border-[var(--color-stone-400)]
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "border-red-600" : ""}
        `}
      />

      {isOpen && !disabled && shown.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-2 w-full bg-base border border-[var(--border)] shadow-lg max-h-60 overflow-y-auto"
        >
          {shown.map((address, i) => (
            <li key={address} role="none">
              <button
                id={`${id}-option-${i}`}
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                // Fires before the input's blur, so the click always registers.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(address)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`
                  block w-full text-left px-4 py-3 text-sm truncate
                  transition-colors duration-[var(--transition-fast)]
                  ${i === activeIndex
                    ? "bg-base-secondary text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)]"
                  }
                `}
              >
                {address}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
