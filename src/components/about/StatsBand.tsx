import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { site } from "@/lib/site";

/** Charcoal stats band with film grain — four counters from site.stats. */
export default function StatsBand() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-16 md:py-24">
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-16 px-6 md:grid-cols-4 md:px-10">
        {site.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} className="text-center">
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="display-lg block text-paper"
            />
            <p className="micro-label mt-5 text-gold">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
