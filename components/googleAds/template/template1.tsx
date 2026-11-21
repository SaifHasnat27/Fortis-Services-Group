import { LP_PAGES, type LpSlug } from "@/components/googleAds/lib/lpData";
import HeroLp from "@/components/googleAds/sections/HeroLp";
import ReviewsLp from "@/components/googleAds/sections/ReviewsLp";
import ProcessLp from "@/components/googleAds/sections/ProcessLp";
import CtaLp from "@/components/googleAds/sections/CtaLp";
import WhoWeWorkWithLp from "@/components/googleAds/sections/WhoWeWorkWithLp";
import WhyUsLp from "@/components/googleAds/sections/WhyUsLp";
import FormLp from "@/components/googleAds/sections/FormLp";
import FaqLp from "@/components/googleAds/sections/FaqLp";
import QuickContactLp from "@/components/googleAds/sections/QuickContactLp";

// Template 1: Google Ads landing page.
// Section designs live in sections/; per-page copy lives in lib/lpData.ts and is passed in here.
export default function Template1({ slug }: { slug: LpSlug }) {
  const { equipment, hero, process, cta } = LP_PAGES[slug];

  return (
    <div className="w-full bg-base-secondary">
      <HeroLp {...hero} />
      <ReviewsLp />
      <ProcessLp heading={process.heading} />
      <WhoWeWorkWithLp />
      <CtaLp heading={cta.heading} equipment={equipment} />
      <WhyUsLp />
      <FormLp />
      <FaqLp />
      <QuickContactLp />
    </div>
  );
}
