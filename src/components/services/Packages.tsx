import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Collection {
  name: string;
  subtitle: string;
  features: string[];
  loved?: boolean;
}

const collections: Collection[] = [
  {
    name: "Aashirwad",
    subtitle: "one function, fully told",
    features: [
      "One lead photographer + one filmmaker",
      "Candid & traditional coverage",
      "Highlight film, 3–5 minutes",
      "Full edited online gallery",
      "Next-day teaser for family groups",
    ],
  },
  {
    name: "Utsav",
    subtitle: "the 2–3 day celebration",
    loved: true,
    features: [
      "Core photo + cinema crew, scaling to full strength",
      "Pithi, garba night & wedding day",
      "Cinematic highlight film",
      "Drone coverage where permitted",
      "Same-day edit for the reception",
      "Premium lay-flat album",
    ],
  },
  {
    name: "Sohala",
    subtitle: "the full multi-day epic",
    features: [
      "Full crew across every function",
      "Everything in Utsav, and then—",
      "Feature-length wedding film",
      "Heirloom albums for both families",
      "Priority editing & delivery",
    ],
  },
];

/** Charcoal grain band — the three named wedding collections. */
export default function Packages() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          dark
          label="Collections"
          lines={["Three ways", "to begin."]}
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl leading-relaxed text-paper/60">
            Every family celebrates differently — one evening at home, or a week
            across two cities. Start with the shape that fits, and we shape the
            rest around your functions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
          {collections.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.12} className="h-full">
              <article
                className={`relative flex h-full flex-col px-8 py-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-2 md:px-9 md:py-12 ${
                  c.loved ? "border border-gold" : "border border-paper/15"
                }`}
              >
                {c.loved && (
                  <span className="micro-label absolute -top-3 left-8 bg-sindoor px-3.5 py-1.5 text-[0.6rem] text-paper">
                    Most loved
                  </span>
                )}

                <h3 className="font-display text-3xl text-paper md:text-4xl">
                  {c.name}
                </h3>
                <p className="font-display mt-2 italic text-gold">
                  {c.subtitle}
                </p>

                <ul className="mt-8 flex-1 divide-y divide-paper/10 border-y border-paper/10">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className="micro-label py-3.5 text-[0.62rem] leading-relaxed text-paper/70"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="font-display mt-8 text-2xl text-paper">
                  Starting at <span className="text-gold">₹—</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-paper/50">
                  final quote after we hear your plans
                </p>

                <Link
                  href="/contact"
                  className="group micro-label mt-8 inline-flex items-center gap-2 text-gold"
                >
                  Build this with us
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
