import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const addOns = [
  {
    name: "Second shooter",
    note: "one lens on the ritual, another on the reactions",
  },
  {
    name: "Drone coverage",
    note: "the jaan, the venue, the whole celebration from above",
  },
  {
    name: "Traditional video",
    note: "full-length, start to finish, for the elders who want it all",
  },
  {
    name: "Premium album",
    note: "handbound lay-flat pages your grandchildren will turn",
  },
  {
    name: "Same-day edit",
    note: "a teaser film screened at your own reception",
  },
  {
    name: "Extra reels",
    note: "vertical edits ready for Instagram before the haldi fades",
  },
];

/** Two-column mono list of extras that bolt onto any collection. */
export default function AddOns() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading label="À la carte" lines={["Add to any", "collection."]} />

        <div className="mt-14 grid gap-x-16 sm:grid-cols-2 md:mt-20">
          {addOns.map((a, i) => (
            <Reveal key={a.name} delay={(i % 2) * 0.08}>
              <div className="flex items-baseline gap-6 border-b border-line py-6">
                <span className="micro-label text-[0.62rem] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="micro-label text-charcoal">{a.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {a.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
