import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import EntityStatement from "@/components/home/EntityStatement";
import StatsBand from "@/components/home/StatsBand";
import RitualsBand from "@/components/home/RitualsBand";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesPreview from "@/components/home/ServicesPreview";
import FilmStrip from "@/components/home/FilmStrip";
import Testimonials from "@/components/home/Testimonials";
import InstaStrip from "@/components/home/InstaStrip";
import Marquee from "@/components/ui/Marquee";
import { marqueeWords } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <EntityStatement />
      <StatsBand />
      <RitualsBand />
      <FeaturedWork />
      <ServicesPreview />
      <FilmStrip />

      {/* Light marquee divider between the two story bands */}
      <div className="border-y border-line bg-ivory py-8" aria-hidden="true">
        <Marquee>
          {marqueeWords.map((word) => (
            <span key={word} className="mx-8 flex items-center gap-16">
              <span className="font-display text-4xl italic text-charcoal/15 md:text-5xl">
                {word}
              </span>
              <span className="h-2 w-2 rounded-full bg-gold/50" />
            </span>
          ))}
        </Marquee>
      </div>

      <Testimonials />
      <InstaStrip />
    </>
  );
}
