"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { easeLuxe } from "@/lib/motion";
import HeadlineReveal from "@/components/ui/HeadlineReveal";

/**
 * Inner-page hero — full-bleed image with settle + scroll parallax,
 * mono label and masked serif headline over a charcoal wash.
 */
export default function PageHero({
  image,
  alt,
  label,
  lines,
  children,
}: {
  image: string;
  alt: string;
  label: string;
  lines: string[];
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[68svh] items-end overflow-hidden bg-charcoal"
    >
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeLuxe }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-44 md:px-10 md:pb-20">
        <motion.p
          className="micro-label mb-6 text-gold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeLuxe, delay: 0.15 }}
        >
          {label}
        </motion.p>
        <HeadlineReveal as="h1" lines={lines} className="display-lg text-paper" delay={0.2} />
        {children}
      </div>
    </section>
  );
}
