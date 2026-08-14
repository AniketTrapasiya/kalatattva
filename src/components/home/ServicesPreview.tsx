"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";
import { easeLuxe } from "@/lib/motion";

/**
 * Editorial services index — numbered rows; on desktop a floating
 * image preview trails the cursor over the hovered row.
 */
export default function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section className="bg-ivory">
      <div
        ref={sectionRef}
        onMouseMove={onMove}
        className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 md:mb-12">
          <SectionHeading
            label="What we capture"
            lines={["Six crafts,", "one promise."]}
          />
          <Reveal delay={0.2} y={12}>
            <Link
              href="/services"
              className="group micro-label relative inline-flex items-center gap-2 pb-1 text-charcoal"
            >
              Services &amp; packages
              <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 h-px w-full bg-line" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
            </Link>
          </Reveal>
        </div>

        <div className="border-t border-line" onMouseLeave={() => setHovered(null)}>
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06} y={20}>
              <Link
                href="/services"
                onMouseEnter={() => setHovered(i)}
                className="group flex items-baseline gap-6 border-b border-line py-7 transition-colors duration-500 md:gap-10 md:py-9"
              >
                {/* Mobile thumb — desktop uses the floating preview */}
                <span className="relative block h-14 w-20 shrink-0 self-center overflow-hidden md:hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <span className="micro-label hidden w-10 shrink-0 text-ink-soft/70 md:block">
                  0{i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block text-2xl leading-snug text-charcoal transition-colors duration-500 group-hover:text-gold md:text-4xl">
                    {service.title}
                  </span>
                  <span className="mt-2 hidden max-w-xl text-sm leading-relaxed text-ink-soft md:block">
                    {service.includes.slice(0, 4).join("  ·  ")}
                  </span>
                </span>
                <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-gold opacity-0 transition-all duration-500 ease-luxe group-hover:translate-x-1 group-hover:opacity-100 md:block" />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Floating cursor preview (desktop, fine pointers only) */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: easeLuxe }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(pointer:fine)]:lg:block"
              aria-hidden="true"
            >
              <div className="relative -translate-y-1/2 translate-x-8 h-56 w-44 overflow-hidden shadow-2xl shadow-charcoal/25">
                {services.map((service, i) => (
                  <Image
                    key={service.slug}
                    src={service.image}
                    alt=""
                    fill
                    sizes="176px"
                    className={`object-cover transition-opacity duration-500 ${
                      hovered === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
