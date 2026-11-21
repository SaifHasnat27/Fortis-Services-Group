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

const VARIANTS: Record<Variant, string> = {
  gPrimary: "btn-primary",
  gSecondary: "btn-outline",
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
