import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("services");

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
