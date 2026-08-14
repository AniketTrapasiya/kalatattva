import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const deliverables = [
  {
    no: "01",
    title: "3–5 min Trailer",
    text: "The one you'll share everywhere. Your whole day — pithi to vidai — distilled into a few breathless minutes the family will replay for years.",
  },
  {
    no: "02",
    title: "20–30 min Feature",
    text: "Every ritual, every speech. The hasta melap, the saptapadi, your father's trembling toast — the full story, kept whole for the day you want all of it back.",
  },
  {
    no: "03",
    title: "60–90 sec Reels",
    text: "Cut for Instagram. Vertical, punchy and set to the song everyone danced to — ready to post before the mehndi has even faded.",
  },
];

/** Cream band — the three films every couple takes home. */
export default function Deliverables() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          label="What You Receive"
          lines={["One wedding,", "three films."]}
        />

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {deliverables.map((d, i) => (
            <Reveal key={d.no} delay={i * 0.12}>
              <div className="border-t border-line pt-8">
                <p className="micro-label text-gold">{d.no}</p>
                <h3 className="font-display mt-5 text-2xl text-charcoal md:text-3xl">
                  {d.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
