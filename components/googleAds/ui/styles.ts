// LP type scale. One place for every text size on the Google Ads pages.
// Uses the size tokens from globals.css where one fits (read-only reference).
//
//   H1     40–64px   page title (hero only), clearly above H2
//   H2     36–48px   --font-size-display, every section heading
//   H3     24px      grid card titles  /  H3_ROW 18–20px row-style card titles
//   LEAD   16–18px   hero subheading, CTA paragraph
//   BODY   14px      --font-size-sm, card copy
//   LABEL  11px      --font-size-xs, eyebrows / small uppercase labels

/** Page title. Hero only. */
export const H1_LP =
  "font-[family-name:var(--font-display)] font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)]";

/** Section heading. Every section, including FAQ and CTA. Not bold (matches homepage). */
export const H2_LP =
  "font-[family-name:var(--font-display)] text-[length:var(--font-size-display)] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]";

/** Grid card title (same as homepage ServiceCards). */
export const H3_LP =
  "font-[family-name:var(--font-display)] text-[1.5rem] text-[var(--text-primary)] leading-snug text-left";

/** Row-style card title (same as homepage ICP / WhyUs). */
export const H3_ROW_LP =
  "font-[family-name:var(--font-display)] text-lg md:text-xl font-medium text-[var(--text-primary)] leading-snug text-left";

/** Lead paragraph: hero subheading, CTA paragraph. */
export const LEAD_LP =
  "text-base sm:text-lg text-[var(--text-secondary)] font-light leading-[var(--leading-relaxed)]";

/** Review quote (review cards). */
export const QUOTE_LP =
  "font-[family-name:var(--font-display)] italic font-light text-xl leading-[var(--leading-snug)] text-[var(--text-primary)]";

/** Card body copy. */
export const BODY_LP =
  "text-[length:var(--font-size-sm)] text-[var(--text-secondary)] font-light leading-[var(--leading-relaxed)] text-left";

/** Small uppercase label / eyebrow. */
export const LABEL_LP =
  "text-[length:var(--font-size-xs)] font-medium tracking-[0.18em] uppercase text-[var(--text-muted)]";

/** Accent label: teal snippet to brighten a section (eyebrows above H1/H2). */
export const LABEL_ACCENT_LP =
  "text-[length:var(--font-size-xs)] font-medium tracking-[0.18em] uppercase text-[var(--text-accent)]";

/** Hero accent line under the H1 (key selling point, e.g. "24/7 Emergency Repairs Sydney Wide"). */
export const ACCENT_LINE_LP =
  "text-sm sm:text-base font-semibold tracking-[0.21em] uppercase text-[var(--text-accent)]";

/** Card icon: accent, thin stroke, same as homepage ServiceCards / QuickContact. */
export const ICON_LP = "w-8 h-8 stroke-1 text-[var(--color-accent)]";
