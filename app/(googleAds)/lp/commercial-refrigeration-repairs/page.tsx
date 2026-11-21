import Template1 from "@/components/googleAds/template/template1";
import { buildLpMetadata } from "@/components/googleAds/lib/lpData";

export const metadata = buildLpMetadata("commercial-refrigeration-repairs");

export default function Page() {
  return <Template1 slug="commercial-refrigeration-repairs" />;
}
