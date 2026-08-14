import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const founder = site.founders[0];

/**
 * The team — founder card + crew card. No individual years billed:
 * Kalatattva is a 7–10 person crew and everyone is a specialist.
 * Images are placeholders — swap for real team photos when available.
 */
const cards = [
  {
    image: "/images/hero/about.jpg",
    alt: `${founder.name} — ${founder.role} at ${site.name}`,
    name: founder.name,
    role: founder.role,
    text: founder.bio,
  },
  {
    image: "/images/gallery/wedding-05.jpg",
    alt: `The ${site.name} crew in the middle of a celebration`,
    name: "The crew",
    role: `${site.team.size} specialists on every big day`,
    text: site.team.description,
  },
];

export default function FounderCards() {
  return (
    <section className="bg-ivory pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          label="The team"
          lines={["Many lenses,", "one instinct"]}
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:gap-14">
          {cards.map((card, i) => (
            <Reveal key={card.name} delay={i * 0.15}>
              <article className="group transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display mt-7 text-2xl text-charcoal md:text-3xl">
                  {card.name}
                </h3>
                <p className="micro-label mt-3 text-gold">{card.role}</p>
                <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                  {card.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
