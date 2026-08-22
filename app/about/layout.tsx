import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("about");

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
