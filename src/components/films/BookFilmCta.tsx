import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Closing CTA — the booking pill to /contact. */
export default function BookFilmCta() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <SectionHeading
          label="Your Date Awaits"
          lines={["Let's make yours", "the next one."]}
          align="center"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-ink-soft">
            Wedding-season dates fill quickly. Tell us your functions — from
            sakharpuda to vidai — and we will hold the cameras for you.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-charcoal px-10 py-5 text-sm tracking-wide text-paper"
              >
                Book your film
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
