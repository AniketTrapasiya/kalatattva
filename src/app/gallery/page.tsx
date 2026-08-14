import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { breadcrumbSchema } from "@/lib/schema";
import { heroImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery — Weddings, Garba Nights & Celebrations",
  description:
    "Browse Kalatattva's wedding photography gallery — Gujarati and Marathi weddings, pre-wedding shoots, shrimant & baby showers, garba nights, home functions and grand events across Gujarat, Maharashtra and destination venues.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />

      <PageHero
        image={heroImages.gallery}
        alt="Wedding mandap with Ganesha backdrop at a destination venue"
        label="The gallery"
        lines={["Every frame,", "a heartbeat."]}
      />

      <GalleryGrid />

      {/* ── Closing CTA ────────────────────────────────────── */}
      <section className="border-t border-line bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center md:px-10 md:py-20">
          <Reveal y={16}>
            <p className="micro-label mb-5 text-gold">Your story could be next</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display-md text-charcoal">
              These are other families&rsquo; treasures.
              <br />
              Let&rsquo;s make yours.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Magnetic>
              <Link
                href="/contact"
                className="micro-label inline-block rounded-full border border-gold px-10 py-5 text-gold transition-all duration-300 hover:bg-gold hover:text-ivory"
              >
                Inquire about your date
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
