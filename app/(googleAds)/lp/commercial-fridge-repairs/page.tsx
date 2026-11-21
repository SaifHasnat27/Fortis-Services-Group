import Template1 from "@/components/googleAds/template/template1";
import { buildLpMetadata } from "@/components/googleAds/lib/lpData";

export const metadata = buildLpMetadata("commercial-fridge-repairs");

export default function Page() {
  return <Template1 slug="commercial-fridge-repairs" />;
}
