import { BUSINESS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${BUSINESS.name}`,
  description: `Read the ${BUSINESS.name} Terms & Conditions governing use of our website and services.`,
};

export default function TermsPage() {
  return (
    <div className="bg-base-secondary min-h-screen">
      <SectionWrapper className="py-20 md:py-28">
        <div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] mb-16">
            Terms &amp; Conditions
          </h1>

          {/* Sections */}
          <div
            className="card mt-10 mb-10"
            style={{ transform: "none", transition: "none" }}
          >
          <div className="space-y-12">

            {/* 1 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                1. About These Terms
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                These Terms apply to your use of the {BUSINESS.name} website. By using our site, you agree to these Terms.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                2. Our Services
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                {BUSINESS.name} provides asset compliance and management, 24/7 reactive maintenance, and integrated trade services across {BUSINESS.serviceArea}.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                3. Quotes
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                We may revise a quote if site conditions or scope of works differ from what was advised.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                4. Project Terms
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                All work is subject to a separate written quote and agreement. A detailed, job specific contract with full terms and conditions will be provided before any work commences. These website Terms do not govern any maintenance, compliance, or trade work performed by {BUSINESS.name}.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                5. Payments
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                A deposit may be required to secure your booking. Payment details will be specified in the written quote and agreement.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                To the fullest extent permitted by law, {BUSINESS.name} shall not be liable for any damages resulting from your use of this website or reliance on information contained herein.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                7. Website Disclaimer
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                The information on this website is for general purposes only. While we strive to keep it accurate, we make no guarantees about its completeness or reliability.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                8. Changes
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                We may update these Terms at any time. Changes apply immediately.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                9. Contact
              </h2>
              <div className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)] space-y-4">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="group flex items-center gap-2.5 text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-150" />
                    {BUSINESS.email}
                  </a>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="group flex items-center gap-2.5 text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-150" />
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>
            </div>

          </div>
          </div>

          {/* Last updated */}
          <p className="mt-16 text-xs">
            <span className="text-[var(--text-primary)]">Last updated:</span>{" "}
            <span className="text-[var(--text-secondary)]">6 June 2026</span>
          </p>

        </div>
      </SectionWrapper>
    </div>
  );
}
