import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import SectionHeading from "@/components/ui/SectionHeading";

/** Closing call-to-action — centred heading + magnetic pill to /contact. */
export default function QuoteCta() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          align="center"
          label="Tell us your plans"
          lines={["Every wedding is", "its own story."]}
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-ink-soft">
            Share your dates and functions — we&apos;ll listen first, then build
            a collection around the way your family celebrates.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Magnetic>
              <Link
                href="/contact"
                className="group micro-label inline-flex items-center gap-3 rounded-full bg-charcoal px-10 py-5 text-paper transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gold hover:text-charcoal"
              >
                Get a custom quote
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
