import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { rituals } from "@/lib/data";

/**
 * Dark band — the real Gujarati & Marathi ceremony sequences, in order.
 * Content + GEO value: this is the cultural fluency families book us for.
 */
export default function RitualsBand() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 md:mb-14">
          <SectionHeading
            dark
            label="We know every ritual"
            lines={["From chandlo matli", "to the vidai."]}
          />
          <Reveal delay={0.2} y={12}>
            <Link
              href="/services"
              className="group micro-label relative inline-flex items-center gap-2 pb-1 text-paper"
            >
              The full ritual glossary
              <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 h-px w-full bg-paper/25" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
            </Link>
          </Reveal>
        </div>

        <Reveal y={12}>
          <p className="max-w-2xl leading-relaxed text-paper/60">
            Every function has one moment that never comes back. We shoot with
            the ritual&rsquo;s rhythm — never pausing a blessing, never missing
            the turn — because we grew up inside these celebrations.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-16 gap-y-12 md:mt-14 lg:grid-cols-2">
          {rituals.map((tradition, t) => (
            <div key={tradition.tradition}>
              <Reveal delay={t * 0.1} y={14}>
                <p className="micro-label border-b border-paper/15 pb-4 text-gold">
                  {tradition.tradition} celebrations
                </p>
              </Reveal>
              <ol>
                {tradition.items.map((ritual, i) => (
                  <Reveal key={ritual.name} delay={0.08 + i * 0.06} y={18}>
                    <li className="group flex gap-5 border-b border-paper/10 py-5 md:gap-7">
                      <span className="micro-label pt-1.5 text-paper/40 transition-colors duration-500 group-hover:text-gold">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-paper transition-colors duration-500 group-hover:text-gold md:text-2xl">
                          {ritual.name}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-paper/55">
                          {ritual.note}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
