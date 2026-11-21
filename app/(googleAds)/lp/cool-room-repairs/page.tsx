import Template1 from "@/components/googleAds/template/template1";
import { buildLpMetadata } from "@/components/googleAds/lib/lpData";

export const metadata = buildLpMetadata("cool-room-repairs");

export default function Page() {
  return <Template1 slug="cool-room-repairs" />;
}
