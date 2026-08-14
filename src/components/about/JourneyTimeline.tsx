"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { journey } from "@/lib/data";
import { easeLuxe } from "@/lib/motion";

/**
 * The journey — vertical timeline. A central gold line draws itself as
 * you scroll (scaleY from section scroll progress, origin top); steps
 * alternate left/right on desktop with a huge serif year, gold node
 * dots and a small image revealed with a transform clip + scale.
 */
export default function JourneyTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.78", "end 0.62"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  return (
    <div ref={trackRef} className="relative mt-12 md:mt-16">
      {/* base hairline */}
      <span
        aria-hidden
        className="absolute bottom-0 left-[9px] top-0 w-px -translate-x-1/2 bg-line md:left-1/2"
      />
      {/* gold line that draws with scroll */}
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-0 left-[9px] top-0 w-px origin-top -translate-x-1/2 bg-gold md:left-1/2"
      />

      <ol className="space-y-16 md:space-y-24">
        {journey.map((step, i) => {
          const left = i % 2 === 0;
          return (
            <li key={step.year} className="relative md:grid md:grid-cols-2 md:gap-x-24">
              {/* node dot */}
              <motion.span
                aria-hidden
                className="absolute left-[9px] top-3 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-gold ring-4 ring-ivory md:left-1/2 md:top-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: easeLuxe, delay: 0.2 }}
              />

              <motion.article
                className={`pl-12 md:pl-0 ${
                  left
                    ? "md:col-start-1 md:pr-4 md:text-right"
                    : "md:col-start-2 md:pl-4"
                }`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: easeLuxe }}
              >
                <p className="font-display text-[clamp(3.25rem,7vw,6.5rem)] leading-none tracking-tight text-charcoal">
                  {step.year}
                </p>
                <h3 className="font-display mt-5 text-2xl text-charcoal md:text-3xl">
                  {step.title}
                </h3>
                <p
                  className={`mt-4 max-w-md leading-relaxed text-ink-soft ${
                    left ? "md:ml-auto" : ""
                  }`}
                >
                  {step.text}
                </p>

                {/* small image — clip + scale reveal, transforms only */}
                <div
                  className={`mt-8 max-w-[18rem] overflow-hidden md:max-w-xs ${
                    left ? "md:ml-auto" : ""
                  }`}
                >
                  <motion.div
                    initial={{ y: "14%", scale: 1.16 }}
                    whileInView={{ y: "0%", scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.2, ease: easeLuxe, delay: 0.15 }}
                    className="will-change-transform"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={step.image}
                        alt={`${step.year} — ${step.title}`}
                        fill
                        sizes="(min-width: 768px) 320px, 75vw"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
