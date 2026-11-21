import Image from "next/image";
import { Phone, Star, BadgeCheck, Award, BadgeDollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ButtonLp from "@/components/googleAds/ui/ButtonLp";
import { BUSINESS } from "@/lib/constants";
import { H1_LP, LEAD_LP, ACCENT_LINE_LP } from "@/components/googleAds/ui/styles";

// Shared trust badges (same on all 3 pages).
const BADGES: { label: string; icon: LucideIcon }[] = [
  { label: "Rated 5 Stars on Google", icon: Star },
  { label: "ARC Licensed Technicians", icon: BadgeCheck },
  { label: "No Hidden Fees", icon: BadgeDollarSign },
  { label: "20 Years of Experience", icon: Award },
];

export default function HeroLp({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
}) {
  return (
    <section className="relative overflow-hidden bg-base-secondary py-12 md:py-20">
      {/* Below md only (no side image there): hero image behind the whole hero + dark gradient
          that fades into the page background at the bottom. md+: unchanged. */}
      <div aria-hidden="true" className="md:hidden">
        <Image
          src="/images/services/commercial-refrigeration-service.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 0px, 100vw"
          className="object-cover saturate-[0.6]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,11,0.8) 0%, rgba(10,10,11,0.9) 50%, var(--bg-secondary) 100%)",
          }}
        />
      </div>

      <div className="relative section-wrapper grid grid-cols-1 md:grid-cols-[3fr_2fr] lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-stretch">
        {/* Copy: sets the hero height */}
        <div className="flex flex-col justify-center">
          <h1 className={`${H1_LP} max-w-3xl`}>{heading}</h1>
          <p className={`${ACCENT_LINE_LP} mt-5`}>{eyebrow}</p>
          {/* White below md, where it sits on the background image; grey on desktop as before */}
          <p className={`${LEAD_LP} max-md:!text-[var(--text-primary)] mt-5 max-w-xl`}>{subheading}</p>

          {/* CTAs: full width on mobile, call first */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <ButtonLp
              variant="gPrimary"
              href={`tel:${BUSINESS.phoneRaw}`}
              icon={Phone}
              className="w-full sm:w-auto"
            >
              Call {BUSINESS.phone}
            </ButtonLp>
            <ButtonLp variant="gSecondary" href="#quote-form" className="w-full sm:w-auto">
              Get a Free Quote
            </ButtonLp>
          </div>

          {/* Trust badges */}
          {/* Mobile: 1 col. Tablet: 2x2. Desktop: one row, each badge sized to its text (wraps only if it can't fit) */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3 mt-10 max-w-xl lg:max-w-none">
            {BADGES.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="bg-base flex items-center gap-3 px-4 py-3 lg:whitespace-nowrap border-[length:var(--border-width)] border-[color:var(--border)]"
              >
                <Icon aria-hidden="true" className="w-4 h-4 stroke-[1.5] text-[var(--color-accent)] shrink-0" />
                <span className="text-[length:var(--font-size-sm)] text-[var(--text-primary)]">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image: desktop only (keeps the mobile hero short so the call button is above the fold).
            No fixed ratio: stretches to the copy column's height and crops to fit. */}
        <div className="hidden md:block relative min-h-[420px] overflow-hidden border-[length:var(--border-width)] border-[color:var(--border)]">
          <Image
            src="/images/services/commercial-refrigeration-service.webp"
            alt="Technician repairing commercial refrigeration"
            fill
            priority
            sizes="(min-width: 1024px) 35vw, 0px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
