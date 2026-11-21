import type { Metadata } from "next";

// Every page under app/(googleAds)/ is a Google Ads landing page: noindex, nofollow.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function GoogleAdsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
