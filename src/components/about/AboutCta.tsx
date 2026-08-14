import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";

/** Closing CTA — centered heading and a magnetic pill to the contact page. */
export default function AboutCta() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <SectionHeading
          align="center"
          label="Say hello"
          lines={["Every great story", "starts with chai"]}
        />
        <Reveal delay={0.2} className="mt-12">
          <Magnetic>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-charcoal px-8 py-4 text-sm tracking-wide text-paper transition-colors duration-500 hover:bg-gold"
            >
              Meet us over chai
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
