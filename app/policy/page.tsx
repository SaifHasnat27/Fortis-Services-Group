import { BUSINESS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS.name}`,
  description: `Read the ${BUSINESS.name} Privacy Policy to understand how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-base-secondary min-h-screen">
      <SectionWrapper className="py-20 md:py-28">
        <div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] mb-16">
            Privacy Policy
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
                1. Information We Collect
              </h2>
              <div className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)] space-y-3">
                <p>
                  When you submit our &ldquo;Get a Free Quote&rdquo; form or contact us directly, we may collect:
                </p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-[var(--text-muted)]">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your phone number</li>
                  <li>Your suburb or address</li>
                  <li>Any additional information you choose to provide in your message</li>
                </ul>
                <p>We only collect what you voluntarily give us.</p>
              </div>
            </div>

            {/* 2 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                2. How We Use Your Information
              </h2>
              <div className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)] space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-[var(--text-muted)]">
                  <li>Respond to your quote requests and inquiries</li>
                  <li>Communicate with you about our services</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
            </div>

            {/* 3 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                3. Information Sharing
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information only if required by law or to protect our legal rights.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                4. Data Security
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                We take reasonable steps to protect your personal information. However, no method of transmission over the internet is completely secure.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                6. Data Deletion
              </h2>
              <div className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)] space-y-4">
                <p>
                  You have the right to request deletion of your personal information. To request data deletion, contact us at:
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

            {/* 7 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                7. Your Rights
              </h2>
              <div className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)] space-y-3">
                <p>You may have certain rights regarding your personal information, including:</p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-[var(--text-muted)]">
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate data</li>
                  <li>The right to delete your data</li>
                </ul>
              </div>
            </div>

            {/* 8 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                8. Changes to This Policy
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)]">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
                9. Contact Us
              </h2>
              <div className="text-[var(--text-secondary)] text-sm leading-[var(--leading-relaxed)] space-y-4">
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
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
