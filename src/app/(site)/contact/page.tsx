import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import HeadlineReveal from "@/components/ui/HeadlineReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactForm from "@/components/contact/ContactForm";
import FaqAccordion from "@/components/contact/FaqAccordion";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { heroImages } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description: `Book ${site.name} for your wedding, pre-wedding, shrimant, garba night or home function. Call, WhatsApp or send your date — we reply within 24 hours. Based in ${site.address.city}, shooting across India.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd data={faqSchema()} />

      <PageHero
        image={heroImages.contact}
        alt="Bride showered in marigolds during her pithi ceremony"
        label="Get in touch"
        lines={["Let's plan", "your shubh din."]}
      />

      {/* ── Split: channels + form ─────────────────────────── */}
      <section id="enquiry-form" className="scroll-mt-24 bg-ivory py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
          <div>
            <HeadlineReveal
              inView
              as="h2"
              lines={["Tell us your date", "before someone", "else books it."]}
              className="display-md text-charcoal"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                Peak season fills quickly — especially the muhurat dates. Share your
                functions, from pithi and garba to hasta melap and vidai, and we&rsquo;ll
                confirm the same day whether we&rsquo;re free to be there.
              </p>
            </Reveal>
            <div className="mt-12">
            </div>
            <ContactChannels />
          </div>

          <Reveal delay={0.15} y={32}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ── Availability note ──────────────────────────────── */}
      <section className="bg-cream py-8">
        <Reveal y={12}>
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 md:px-10">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <p className="micro-label text-center text-charcoal">
              Now booking this season&rsquo;s weddings — dates for Nov–Feb go first.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            label="Good to know"
            lines={["Questions families", "ask us first"]}
          />
          <div className="mt-10 md:mt-12">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
