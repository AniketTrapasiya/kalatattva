import Reveal from "@/components/ui/Reveal";

/** Cream philosophy band — one big italic serif pull-quote. */
export default function Philosophy() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal y={16}>
          <span
            aria-hidden
            className="font-display block text-6xl leading-none text-sindoor md:text-7xl"
          >
            &ldquo;
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="display-md mt-2 italic text-charcoal">
            When the mangalashtak begins and everyone holds their breath behind
            the antarpat — that is the frame we live for.
          </blockquote>
        </Reveal>
        <Reveal delay={0.22} className="mt-10">
          <p className="micro-label text-ink-soft">
            — the Kalatattva crew, on the frames they live for
          </p>
        </Reveal>
      </div>
    </section>
  );
}
