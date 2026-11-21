import { Phone } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ButtonLp from "@/components/googleAds/ui/ButtonLp";
import { BUSINESS } from "@/lib/constants";
import CardLp from "@/components/googleAds/ui/CardLp";
import { H2_LP, H3_LP, BODY_LP, LABEL_ACCENT_LP } from "@/components/googleAds/ui/styles";

// Design only. The heading is per page (lib/lpData.ts → template → here).
const STEPS = [
  {
    title: "Contact Us",
    desc: "Call us or submit our online form to tell us what problem you're facing.",
  },
  {
    title: "Approve the Price",
    desc: "Our team gives you an upfront quote. We only start if you accept it.",
  },
  {
    title: "Refrigeration Working Again",
    desc: "We repair your refrigeration and get it back to temperature.",
  },
];

export default function ProcessLp({ heading }: { heading: string }) {
  return (
    <SectionWrapper className="bg-base-secondary">
      <div className="mb-14">
        <h2 className={H2_LP}>{heading}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STEPS.map((step, i) => (
          <CardLp key={step.title} index={i}>
            <span className={`${LABEL_ACCENT_LP} mb-7`}>Step {String(i + 1).padStart(2, "0")}</span>
            <h3 className={`${H3_LP} mb-3`}>{step.title}</h3>
            <p className={BODY_LP}>{step.desc}</p>
          </CardLp>
        ))}
      </div>

      {/* Same pair as the hero: call first, full width on mobile */}
      <div className="flex flex-col sm:flex-row gap-4 mt-14">
        <ButtonLp variant="gPrimary" href={`tel:${BUSINESS.phoneRaw}`} icon={Phone} className="w-full sm:w-auto">
          Call {BUSINESS.phone}
        </ButtonLp>
        <ButtonLp variant="gSecondary" href="#quote-form" className="w-full sm:w-auto">
          Get a Free Quote
        </ButtonLp>
      </div>
    </SectionWrapper>
  );
}
