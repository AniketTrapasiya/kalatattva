"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeLuxe } from "@/lib/motion";
import Magnetic from "@/components/ui/Magnetic";
import { heroImages } from "@/lib/data";
import { site } from "@/lib/site";

/** One masked serif line — hand-rolled so the second line can carry a styled span. */
function MaskedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: easeLuxe, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Gentle parallax — the image trails the scroll by up to 12%.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden bg-charcoal">
      {/* Image: parallax wrapper + 1.12 → 1 settle. Never opacity-animated (LCP). */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeLuxe }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={heroImages.home}
            alt="Bride and groom during the pheras at a Hindu wedding ceremony"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Charcoal wash for nav + headline legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/60 via-charcoal/15 to-charcoal/85" />

      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-28 md:px-10 md:pb-32">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeLuxe, delay: 0.45 }}
            className="micro-label mb-6 text-paper/80"
          >
            Wedding Photography &amp; Films
          </motion.p>

          <h1 className="display-xl text-paper">
            <MaskedLine delay={0.55}>Shubh ghadi,</MaskedLine>
            <MaskedLine delay={0.67}>
              framed <em className="italic text-gold">forever.</em>
            </MaskedLine>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeLuxe, delay: 1.0 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6"
          >
            <Magnetic>
              <Link
                href="/contact#enquiry-form"
                className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-charcoal transition-colors duration-500 hover:bg-paper"
              >
                Inquire about your date
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Link href="/gallery" className="group relative pb-1 micro-label text-paper">
              View the gallery
              <span className="absolute bottom-0 left-0 h-px w-full bg-paper/40" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom strip: scroll cue + function types */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easeLuxe, delay: 1.3 }}
          className="border-t border-paper/15"
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-5 md:px-10">
            <p className="micro-label text-center text-paper/50">
              {site.cities.slice(0, 6).join("  ·  ")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
