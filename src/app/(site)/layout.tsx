import { baseGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * The studio site chrome. Everything except the ported invitations renders here.
 *
 * This used to be the root layout; it moved into the (site) group so the
 * invitation routes under (invite) can render standalone, without site nav.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={baseGraph()} />
      <SmoothScroll />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
