import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { breadcrumbSchema } from "@/lib/schema";
import { heroImages, invitationFormats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Digital Wedding Invitations",
  description:
    "Animated digital wedding invitations in six regional formats — Kathiyawadi, Surati, Gujarati, Marwadi, Marathi and Tamil. Each with its own artwork, palette, language and ritual sequence, with muhurat countdown, venue map and RSVP built in.",
  alternates: { canonical: "/invitations" },
};

/**
 * Landing page for the digital invitation service.
 *
 * The invitations themselves are a separate Vite/React app. When
 * INVITE_APP_ORIGIN is set, next.config.ts rewrites /invitations to it and
 * this page is never reached — so it doubles as the SEO landing page and
 * the graceful fallback while that deployment is pending.
 */
export default function InvitationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Digital Invitations", path: "/invitations" },
        ])}
      />

      <PageHero
        image={heroImages.services}
        alt="Wedding mandap decorated for the ceremony"
        label="Digital invitations"
        lines={["One invite,", "six traditions."]}
      />

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="rule-gold" />
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              An animated invitation you send on WhatsApp — your rituals in the
              right order, the muhurat countdown, the venue map and RSVP built
              in. Pick the format your family celebrates in; every one carries
              its own artwork, palette, script and ceremony sequence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-charcoal">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <SectionHeading
            dark
            label="Choose your format"
            lines={["Every region,", "in its own hand."]}
          />

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
                    {format.state} · {format.region} · {format.design}
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

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <SectionHeading
            align="center"
            label="Want yours personalised?"
            lines={["Your names, your", "rituals, your dates."]}
          />
          <Reveal delay={0.2} y={12}>
            <p className="mx-auto mt-8 max-w-xl leading-relaxed text-ink-soft">
              Every format above is a working sample. Tell us the muhurat, the
              functions and the families, and we&rsquo;ll set your invitation in
              the same design.
            </p>
          </Reveal>
          <Reveal delay={0.3} y={12}>
            <Link
              href="/contact#enquiry-form"
              className="micro-label mt-10 inline-block rounded-full border border-gold px-8 py-4 text-gold transition-all duration-300 hover:bg-gold hover:text-ivory"
            >
              Inquire about an invitation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
