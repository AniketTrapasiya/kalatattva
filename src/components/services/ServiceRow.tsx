"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import type { Service } from "@/lib/data";

/**
 * One editorial service row — oversized image with scroll parallax + hover
 * zoom on one side, mono index / serif title / includes-chips on the other.
 * Rows alternate direction via the `index` prop.
 */
export default function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={ref}
      id={service.slug}
      className="grid scroll-mt-28 items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20"
    >
      {/* ── Image ─────────────────────────────────────────── */}
      <Reveal className={`md:col-span-7 ${flipped ? "md:order-2" : ""}`}>
        <div className="group relative aspect-[4/3] overflow-hidden bg-cream md:aspect-[5/4]">
          <motion.div
            style={{ y }}
            className="absolute inset-x-0 -inset-y-[9%] will-change-transform"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </motion.div>
        </div>
      </Reveal>

      {/* ── Text ──────────────────────────────────────────── */}
      <div className={`md:col-span-5 ${flipped ? "md:order-1" : ""}`}>
        <Reveal delay={0.1}>
          <p className="micro-label text-gold">
            {String(index + 1).padStart(2, "0")}
          </p>
        </Reveal>
        <Reveal delay={0.16} y={28}>
          <h2 className="display-md mt-5 text-charcoal">{service.title}</h2>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            {service.description}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="mt-8 flex max-w-md flex-wrap gap-2.5">
            {service.includes.map((item) => (
              <li
                key={item}
                className="micro-label rounded-full border border-line px-4 py-2 text-[0.62rem] text-ink-soft transition-colors duration-500 hover:border-gold hover:text-gold"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
