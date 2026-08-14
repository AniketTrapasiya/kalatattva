import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Ritual {
  term: string;
  text: string;
}

/**
 * Each entry is written as a self-contained, quotable answer:
 * what the ritual is + how the studio photographs it.
 */
const gujaratiRituals: Ritual[] = [
  {
    term: "Pithi",
    text: "The turmeric ceremony where family takes turns blessing the couple with haldi paste — we shoot it close and candid: yellow palms, flying smears, aunties mid-laugh.",
  },
  {
    term: "Mameru",
    text: "The maternal uncle's gift-giving ritual before a Gujarati wedding — we frame the saris, the sweets and the mama's proud, misty eyes.",
  },
  {
    term: "Jaan",
    text: "The groom's procession arriving at the venue, dhol leading the way — we cover it from inside the dancing and above it, so the energy survives into the film.",
  },
  {
    term: "Hasta melap",
    text: "The moment the bride's and groom's hands are joined at the mandap — one camera stays on the joined hands, a second on both sets of parents watching.",
  },
  {
    term: "Garba & raas",
    text: "The circling dance nights of a Gujarati wedding — we work low light without harsh flash, freezing chaniya choli twirls and dandiya clashes at full speed.",
  },
  {
    term: "Vidai",
    text: "The bride's farewell to her parents' home — we keep our distance, capture the tears honestly, and never ask anyone to do it again for the camera.",
  },
  {
    term: "Shrimant / godh bharai",
    text: "The Gujarati baby-shower blessing for a mother-to-be — we photograph it softly: the lap full of gifts, grandmothers whispering blessings, the glow.",
  },
];

const marathiRituals: Ritual[] = [
  {
    term: "Sakharpuda",
    text: "The Marathi engagement, sealed with a packet of sugar — we capture the exchange, the first shy rings and both families' happy relief in one frame.",
  },
  {
    term: "Kelvan",
    text: "The pre-wedding meal and blessing hosted at each family's home — we shoot it like the family dinner it is: warm, informal, everyone at the table.",
  },
  {
    term: "Halad",
    text: "The Marathi turmeric ceremony, haldi brushed on with mango leaves — we go close on hands and faces while a second camera catches the laughter around them.",
  },
  {
    term: "Mangalashtak",
    text: "The sung verses that open a Marathi wedding — we photograph the couple listening on either side of the antarpat as the anticipation builds verse by verse.",
  },
  {
    term: "Antarpat",
    text: "The silk cloth held between bride and groom until the final blessing — we position for the exact second it drops and the couple sees each other.",
  },
  {
    term: "Saptapadi",
    text: "The seven steps taken around the sacred fire, each with its own vow — we follow every step in firelight without ever crossing into the ritual space.",
  },
  {
    term: "Grihapravesh",
    text: "The bride's first entry into her new home, tipping the rice kalash at the threshold — we frame it from inside the house, rice mid-air.",
  },
  {
    term: "Dohale jevan",
    text: "The Marathi baby-shower feast, the mother-to-be seated on a flower-decked swing — we photograph the floral jewellery, the food and the teasing that comes with it.",
  },
];

function RitualColumn({ heading, rituals }: { heading: string; rituals: Ritual[] }) {
  return (
    <div>
      <Reveal>
        <p className="micro-label text-gold">{heading}</p>
        <div className="rule-gold mt-5" />
      </Reveal>
      <dl className="mt-10 space-y-8">
        {rituals.map((r, i) => (
          <Reveal key={r.term} delay={Math.min(i * 0.05, 0.2)}>
            <dt className="font-display text-xl text-charcoal md:text-2xl">
              {r.term}
            </dt>
            <dd className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-soft">
              {r.text}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}

/** Cream band — the Gujarati & Marathi ritual glossary. */
export default function RitualGlossary() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          label="Rituals, fluently"
          lines={["We speak", "your rituals."]}
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">
            Half of wedding photography is knowing what happens next. We grew up
            inside these ceremonies — so while others ask what an antarpat is,
            we&apos;re already standing where it drops.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-12 lg:gap-20">
          <RitualColumn heading="Gujarati weddings" rituals={gujaratiRituals} />
          <RitualColumn heading="Marathi weddings" rituals={marathiRituals} />
        </div>
      </div>
    </section>
  );
}
