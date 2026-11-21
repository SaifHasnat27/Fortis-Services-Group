"use client";

/* ────────────────────────────────────────────────────────────────
   Shows 2 sectors at a time and loops through all 6 forever with the
   same fade swap as the reviews carousel. No dots, no pause.
   Desktop: 1 row x 2 columns. Mobile: 2 rows x 1 column.
   ──────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { UtensilsCrossed, Beer, ShoppingCart, HeartPulse, Factory, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { H2_LP, H3_ROW_LP, ICON_LP, ACCENT_LINE_LP } from "@/components/googleAds/ui/styles";

const SECTORS: { name: string; icon: LucideIcon }[] = [
  { name: "Restaurants & Cafes", icon: UtensilsCrossed },
  { name: "Pubs, Bars & Clubs", icon: Beer },
  { name: "Supermarkets & Grocers", icon: ShoppingCart },
  { name: "Aged Care", icon: HeartPulse },
  { name: "Manufacturing & Warehousing", icon: Factory },
  { name: "High Rise Offices", icon: Building2 },
];

const PER_VIEW = 2;
const GROUPS = Math.ceil(SECTORS.length / PER_VIEW);
const INTERVAL_MS = 3000;

export default function WhoWeWorkWithLp() {
  const [group, setGroup] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // Every 3s: card CONTENT fades out → next pair → fades in (same timings as the reviews carousel).
  // The card boxes themselves stay still. Loops forever.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gridRef.current) return;
      const contents = gridRef.current.querySelectorAll("[data-swap]");
      gsap
        .timeline()
        .to(contents, { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" })
        .call(() => setGroup((g) => (g + 1) % GROUPS))
        .to(contents, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" });
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [group]);

  const visible = SECTORS.slice(group * PER_VIEW, group * PER_VIEW + PER_VIEW);

  return (
    <SectionWrapper className="bg-base-secondary">
      <div className="mb-14">
        <h2 className={H2_LP}>Commercial Refrigeration Specialists</h2>
        <p className={`${ACCENT_LINE_LP} mt-5`}>Any Industry, Any Size</p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" aria-live="polite">
        {visible.map(({ name, icon: Icon }, slot) => (
          <div
            key={slot}
            className="bg-base p-5 md:p-7 border-[length:var(--border-width)] border-[color:var(--border)]"
          >
            {/* Height locked to the longest name: every sector stacked invisibly in one grid cell,
                so the card never changes size as names swap. */}
            <div className="grid items-center">
              {SECTORS.map((s) => (
                <div key={s.name} aria-hidden="true" className="col-start-1 row-start-1 invisible flex items-center gap-4">
                  <s.icon className={`${ICON_LP} shrink-0`} />
                  <span className={H3_ROW_LP}>{s.name}</span>
                </div>
              ))}
              <div data-swap className="col-start-1 row-start-1 flex items-center gap-4">
                <Icon aria-hidden="true" className={`${ICON_LP} shrink-0`} />
                <h3 className={H3_ROW_LP}>{name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
