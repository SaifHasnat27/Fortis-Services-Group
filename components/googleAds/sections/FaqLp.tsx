"use client";

// Copy of the site FAQ (components/servicecards/faq.tsx), pointed at the
// LP refrigeration FAQ data. The site FAQ is untouched.
import { useState } from "react";
import { Plus } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { LP_FAQS } from "@/components/googleAds/lib/faqLpData";
import { H2_LP } from "@/components/googleAds/ui/styles";

export default function FaqLp({ title = "Frequently Asked Questions" }: { title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <SectionWrapper id="faq" className="bg-base-secondary">
      <div className="max-w-3xl">
        {title && (
          <h2 className={`${H2_LP} mb-14`}>{title}</h2>
        )}

        <dl className="divide-y divide-[var(--border)]">
          {LP_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 first:pt-0 last:pb-0">
                <dt>
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex justify-between items-center text-left gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)] group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-[var(--text-primary)] leading-snug group-hover:text-[var(--text-secondary)] transition-colors duration-[var(--transition-fast)]">
                      {faq.q}
                    </span>
                    <span className="shrink-0">
                      <Plus
                        className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-[var(--transition-base)] ${isOpen ? "rotate-45" : ""}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </dt>

                <dd
                  className="overflow-hidden transition-all duration-[var(--transition-base)] ease-out"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="pt-4 text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)]">
                    {faq.a}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </SectionWrapper>
  );
}
