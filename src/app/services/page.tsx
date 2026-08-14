import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { heroImages, services } from "@/lib/data";
import ServiceRow from "@/components/services/ServiceRow";
import Packages from "@/components/services/Packages";
import AddOns from "@/components/services/AddOns";
import RitualGlossary from "@/components/services/RitualGlossary";
import QuoteCta from "@/components/services/QuoteCta";

export const metadata: Metadata = {
  title: "Services & Packages",
  description:
    "Wedding photography & film services for Gujarati and Marathi celebrations — weddings, pre-weddings, shrimant & baby showers, garba nights, home functions and grand events. Three flexible collections: Aashirwad, Utsav and Sohala.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd data={servicesSchema()} />

      <PageHero
        image={heroImages.services}
        alt="Kanyadaan ritual at the mandap during a Gujarati wedding"
        label="What we shoot"
        lines={["From haldi hands", "to grand ballrooms."]}
      />

      {/* ── Editorial services list ─────────────────────────── */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="rule-gold" />
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              A single evening pooja at home, or a week of functions across two
              cities — six crafts, one promise: nothing precious gets missed.
            </p>
          </Reveal>

          <div className="mt-14 space-y-20 md:mt-20 md:space-y-32">
            {services.map((service, index) => (
              <ServiceRow key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Packages />
      <AddOns />
      <RitualGlossary />
      <QuoteCta />
    </>
  );
}
