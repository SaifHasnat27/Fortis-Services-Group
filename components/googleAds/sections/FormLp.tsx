// Wraps the existing site ContactForm (unchanged), so the quote_form
// GTM tracking comes with it. Only the section heading is LP-specific.
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactForm from "@/components/forms/ContactForm";
import { H2_LP, LABEL_ACCENT_LP } from "@/components/googleAds/ui/styles";

export default function FormLp() {
  return (
    <SectionWrapper id="quote-form" className="bg-base-secondary scroll-mt-[var(--nav-height)]">
      <div className="card !p-10 md:!p-12 hover:border-[var(--border-dark)] transition-colors duration-[var(--transition-fast)]">
        <h2 className={H2_LP}>Get a Free Quote</h2>
        <p className={`${LABEL_ACCENT_LP} mt-4 mb-8`}>No Obligation. No Hidden Fees</p>
        <ContactForm layout="wide" />
      </div>
    </SectionWrapper>
  );
}
