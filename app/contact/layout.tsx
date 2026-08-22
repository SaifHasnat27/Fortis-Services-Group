import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("contact");

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
