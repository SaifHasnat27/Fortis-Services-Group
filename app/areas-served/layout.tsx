import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("areasServed");

export default function AreasServedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
