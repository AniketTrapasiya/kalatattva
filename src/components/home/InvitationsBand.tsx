import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { invitationFormats } from "@/lib/data";

/**
 * Dark band — the digital invitation service. Each card opens that tradition's
 * full invitation at /invitations/<id>.
 */
export default function InvitationsBand() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 md:mb-14">
          <SectionHeading
            dark
            label="Digital invitations"
            lines={["Your invite, in", "your own tradition."]}
          />
          <Reveal delay={0.2} y={12}>
            <Link
              href="/invitations"
              className="group micro-label relative inline-flex items-center gap-2 pb-1 text-paper"
            >
              See every format
              <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 h-px w-full bg-paper/25" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
            </Link>
          </Reveal>
        </div>

        <Reveal y={12}>
          <p className="max-w-2xl leading-relaxed text-paper/60">
            An animated invitation you send on WhatsApp — with your rituals in
            order, the muhurat countdown, the venue map and RSVP built in. Six
            regional formats, each with its own artwork, palette and language.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {invitationFormats.map((format, i) => (
            <Reveal key={format.id} delay={(i % 3) * 0.08} y={20}>
              <Link
                href={`/invitations/${format.id}`}
                className="group flex h-full flex-col"
              >
                <span className="relative block aspect-4/3 overflow-hidden bg-charcoal/40">
                  <Image
                    src={format.image}
                    alt={`${format.label} wedding invitation design — ${format.design}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-bottom p-6 transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
                  />
                  <span className="absolute right-4 top-4 grid size-9 place-items-center border border-paper/20 text-paper/70 opacity-0 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:text-gold group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>

                <span className="mt-5 flex items-baseline justify-between gap-4 border-t border-paper/15 pt-4">
                  <span className="font-display text-2xl text-paper transition-colors duration-500 group-hover:text-gold">
                    {format.label}
                  </span>
                  <span
                    lang={format.nativeLang}
                    className="font-display text-xl text-gold/70"
                  >
                    {format.nativeLabel}
                  </span>
                </span>

                <span className="micro-label mt-2 block text-paper/40">
                  {format.region} · {format.design}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-paper/55">
                  {format.highlights}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
