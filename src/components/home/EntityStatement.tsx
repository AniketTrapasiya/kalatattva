import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * GEO entity statement — one crawlable serif paragraph that says
 * who the studio is, where it is based, and what it captures.
 */
export default function EntityStatement() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-5xl">
          <Reveal y={16}>
            <p className="micro-label mb-8 text-gold">The studio</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display-md text-charcoal/80">
              <strong className="font-medium text-charcoal">{site.name}</strong> is a
              wedding photography and film studio from{" "}
              <strong className="font-medium text-charcoal">Ahmedabad</strong>, telling{" "}
              <strong className="font-medium text-charcoal">Gujarati and Marathi</strong>{" "}
              wedding stories since 2014 — the pithi turning everyone yellow, garba
              circles at midnight, the hush of hasta melap, the tears of vidai — across{" "}
              <strong className="font-medium text-charcoal">Gujarat and Maharashtra</strong>,
              and at destination celebrations in{" "}
              <strong className="font-medium text-charcoal">Udaipur and Goa</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="rule-gold mt-14" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
