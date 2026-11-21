// Wraps the existing site QuickContact (unchanged). Only the heading is LP-specific.
import SectionWrapper from "@/components/ui/SectionWrapper";
import QuickContact from "@/components/contact/QuickContact";
import { H2_LP } from "@/components/googleAds/ui/styles";

export default function QuickContactLp() {
  return (
    <SectionWrapper className="bg-base-secondary" id="quick-contact">
      <h2 className={`${H2_LP} mb-3`}>Contact Us Anytime</h2>
      <QuickContact />
    </SectionWrapper>
  );
}
