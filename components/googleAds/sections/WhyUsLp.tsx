import { BadgeCheck, Clock, ShieldCheck, FileText, ClipboardCheck, CalendarCheck, Phone } from "lucide-react";
import ButtonLp from "@/components/googleAds/ui/ButtonLp";
import { BUSINESS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CardLp from "@/components/googleAds/ui/CardLp";
import { H2_LP, H3_ROW_LP, BODY_LP } from "@/components/googleAds/ui/styles";

const REASONS: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "ARC Licensed Technicians", desc: "All refrigerant work is done by Australian Refrigeration Council licensed technicians.", icon: BadgeCheck },
  { title: "24/7 Emergency Response", desc: "Day or night, weekends and public holidays. Breakdowns don't wait, and neither do we.", icon: Clock },
  { title: "Stock Loss Prevention", desc: "Urgent breakdowns are prioritised to restore safe temperatures as quickly as possible.", icon: ShieldCheck },
  { title: "Clear Upfront Quotes", desc: "You know the cost before work starts. No surprises on the invoice.", icon: FileText },
  { title: "Service Report Every Job", desc: "Every repair is documented, giving you a clear service history for each unit.", icon: ClipboardCheck },
  { title: "Preventative Maintenance", desc: "Regular servicing that catches faults early, so your refrigeration keeps running and breakdowns don't happen.", icon: CalendarCheck },
];

export default function WhyUsLp() {
  return (
    <SectionWrapper className="bg-base-secondary">
      <div className="mb-14">
        <h2 className={H2_LP}>Why Choose Fortis Services Group</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REASONS.map(({ title, desc, icon: Icon }, i) => (
          <CardLp key={title} index={i} className="!p-6 md:!p-7">
            {/* Icon + title on one row, description below */}
            <div className="flex items-center gap-3 mb-3">
              <Icon aria-hidden="true" className="w-6 h-6 stroke-[1.5] text-[var(--color-accent)] shrink-0" />
              <h3 className={H3_ROW_LP}>{title}</h3>
            </div>
            <p className={BODY_LP}>{desc}</p>
          </CardLp>
        ))}
      </div>

      <div className="mt-14">
        <ButtonLp variant="gPrimary" href={`tel:${BUSINESS.phoneRaw}`} icon={Phone} className="w-full sm:w-auto">
          Call {BUSINESS.phone}
        </ButtonLp>
      </div>
    </SectionWrapper>
  );
}
