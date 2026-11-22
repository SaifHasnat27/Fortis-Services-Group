import type { LucideIcon } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   Google Ads LP button (plain link button).
   gPrimary   → existing .btn-primary (teal) from globals.css
   gSecondary → existing .btn-outline from globals.css

   Tracking: same as the existing site buttons. A plain <a href> —
   GTM picks up tel: / mailto: / WhatsApp clicks by their URL.
   ──────────────────────────────────────────────────────────────── */

type Variant = "gPrimary" | "gSecondary";
type Size = "md" | "lg";

/* Shared hover shine (CSS only, no JS): a soft diagonal light streak sweeps across once.
   Sits behind the text (isolate + -z-10). Off for prefers-reduced-motion. */
const SHINE = [
  "relative overflow-hidden isolate",
  "before:content-[''] before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-z-10",
  "before:-skew-x-12 before:bg-linear-to-r before:from-transparent before:via-white/45 before:to-transparent",
  "before:-translate-x-full hover:before:translate-x-[500%]",
  "before:transition-transform before:duration-700 before:ease-out",
  "motion-reduce:before:hidden",
].join(" ");

/* gPrimary: 1px border (same as gSecondary at rest, no change on hover) so both buttons are
   the exact same size; same 1px lift; fill stays bright teal (no murky darken). */
const PRIMARY = [
  "btn-primary",
  "border border-[var(--border-dark)]",
  "transition-[transform,background-color] duration-300 ease-out",
  "hover:!bg-[var(--color-accent)] hover:-translate-y-px motion-reduce:hover:translate-y-0",
  SHINE,
].join(" ");

/* gSecondary: existing .btn-outline hover only (border to white, 1px lift). No shine. */
const SECONDARY = "btn-outline";

const VARIANTS: Record<Variant, string> = {
  gPrimary: PRIMARY,
  gSecondary: SECONDARY,
};

const SIZES: Record<Size, string> = {
  md: "",
  lg: "!text-base md:!text-lg !px-10 !py-5",
};

export default function ButtonLp({
  variant = "gPrimary",
  size = "md",
  href,
  icon: Icon,
  className = "",
  children,
}: {
  variant?: Variant;
  size?: Size;
  href: string;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={`${VARIANTS[variant]} ${SIZES[size]} ${className}`}>
      {Icon && <Icon aria-hidden="true" className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />}
      {children}
    </a>
  );
}
