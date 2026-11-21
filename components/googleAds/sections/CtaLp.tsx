import { Phone } from "lucide-react";
import ButtonLp from "@/components/googleAds/ui/ButtonLp";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BUSINESS } from "@/lib/constants";
import { H2_LP, LEAD_LP, ACCENT_LINE_LP } from "@/components/googleAds/ui/styles";

// Design only. Heading + equipment word are per page (lib/lpData.ts → template → here).
// The subheading is built from `equipment` so it always matches the page.
export default function CtaLp({ heading, equipment }: { heading: string; equipment: string }) {
  const subheading = `Every hour your ${equipment} is down puts your stock at risk. Call us now and we'll get a licensed technician to your site as soon as possible.`;

  return (
    <SectionWrapper className="bg-base-secondary">
      <div className="card !p-10 md:!p-16 hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)] text-center flex flex-col items-center">
        <h2 className={`${H2_LP} max-w-3xl`}>{heading}</h2>
        <p className={`${ACCENT_LINE_LP} mt-5`}>24/7 Emergency Repairs Available</p>
        <p className={`${LEAD_LP} mt-5 max-w-2xl`}>{subheading}</p>
        <ButtonLp
          variant="gPrimary"
          size="lg"
          href={`tel:${BUSINESS.phoneRaw}`}
          icon={Phone}
          className="mt-10"
        >
          Call {BUSINESS.phone}
        </ButtonLp>
      </div>
    </SectionWrapper>
  );
}
