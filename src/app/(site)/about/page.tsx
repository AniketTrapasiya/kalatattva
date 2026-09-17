import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/JsonLd";
import AboutIntro from "@/components/about/AboutIntro";
import FounderCards from "@/components/about/FounderCards";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import StatsBand from "@/components/about/StatsBand";
import Philosophy from "@/components/about/Philosophy";
import AboutCta from "@/components/about/AboutCta";
import { heroImages } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About — The Crew Behind Kalatattva",
  description:
    "Meet Kalatattva — a talented crew of 7–10 photographers, cinematographers, drone pilots and editors capturing Gujarati and Marathi weddings across Ahmedabad, Surat, Vadodara, Mumbai, Pune and Udaipur.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        image={heroImages.about}
        alt="The Kalatattva photographers at work, cameras raised"
        label="About the studio"
        lines={["Many lenses.", "One story."]}
      />

      <AboutIntro />

      <FounderCards />

      {/* The journey — vertical timeline with a scroll-drawn gold line */}
      <section className="border-t border-line bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading
            label="The journey"
            lines={["From one camera", "to every celebration"]}
          />
          <JourneyTimeline />
        </div>
      </section>

      <StatsBand />

      <Philosophy />

      <AboutCta />
    </>
  );
}
