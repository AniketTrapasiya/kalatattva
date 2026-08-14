import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { site } from "@/lib/site";

/** Four studio stats with counting numerals and hairline separators. */
export default function StatsBand() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              y={18}
              className={[
                "border-line px-6 py-8 md:py-3",
                i % 2 === 1 ? "border-l" : "",
                i >= 2 ? "border-t md:border-t-0" : "",
                i > 0 ? "md:border-l" : "md:border-l-0",
              ].join(" ")}
            >
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="display-md block text-charcoal"
              />
              <span className="micro-label mt-4 block text-ink-soft">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
