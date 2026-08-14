import Reveal from "@/components/ui/Reveal";

/**
 * About intro — editorial two-column: oversized serif entity statement
 * on the left (GEO-friendly), how-we-work paragraphs on the right.
 */
export default function AboutIntro() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-6 lg:col-span-6">
          <Reveal y={16}>
            <p className="micro-label mb-6 text-gold">The studio</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-md text-charcoal">
              Kalatattva is a wedding photography &amp; film studio — a
              talented crew of seven to ten, telling Gujarati and Marathi
              wedding stories across Ahmedabad, Surat, Vadodara, Mumbai,
              Pune and Udaipur.
            </h2>
          </Reveal>
          <Reveal delay={0.18} className="mt-10">
            <div className="rule-gold" />
            <p className="micro-label mt-6 text-ink-soft">
              Based in Ahmedabad · Travelling wherever the baraat goes
            </p>
          </Reveal>
        </div>

        <div className="space-y-7 text-base leading-relaxed text-ink-soft md:col-span-5 md:col-start-8 md:pt-16">
          <Reveal delay={0.1}>
            <p>
              Some of us make photographs, some make films, one flies the
              drone, one chases the light. We shoot every wedding as one crew,
              one conversation — so your album and your film tell the same
              story instead of competing for it.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p>
              We know the rituals by heart — the moment pithi turns into
              laughter, the held breath before hasta melap, how suddenly the
              vidai arrives. Nobody asks your masi to pause a blessing so the
              camera can catch up.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p>
              And we photograph families, not poses. The frames you will keep
              forever happen when you forget we are there — mid-garba, quietly
              tearful at the saptapadi, hands joined at the godh bharai. Our
              job is simply to be standing in the right place when it happens.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
