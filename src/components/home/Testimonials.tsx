"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";
import { easeLuxe } from "@/lib/motion";

const ROTATE_MS = 6000;

/** Auto-rotating family quotes — one oversized serif voice at a time. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index];

  return (
    <section
      className="relative overflow-hidden bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="What families say"
    >
      <div className="mx-auto flex min-h-[55svh] w-full max-w-7xl flex-col justify-center px-6 py-16 md:px-10 md:py-24">
        <Reveal y={14}>
          <p className="micro-label mb-10 text-gold">Families, verbatim</p>
        </Reveal>

        {/* Fixed-height stage so rotation never shifts the layout */}
        <div className="relative min-h-[16rem] md:min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: easeLuxe }}
            >
              <p className="font-display max-w-4xl text-3xl leading-tight text-charcoal md:text-5xl">
                <span aria-hidden="true" className="mr-1 text-gold">
                  &ldquo;
                </span>
                {t.quote}
                <span aria-hidden="true" className="ml-1 text-gold">
                  &rdquo;
                </span>
              </p>
              <footer className="mt-8">
                <p className="text-sm font-medium text-charcoal">{t.name}</p>
                <p className="micro-label mt-1 text-ink-soft">{t.event}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Progress dashes */}
        <div className="mt-12 flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show quote ${i + 1}`}
              className="group py-2"
            >
              <span
                className={`block h-px transition-all duration-500 ease-luxe ${
                  i === index
                    ? "w-12 bg-gold"
                    : "w-6 bg-charcoal/20 group-hover:bg-charcoal/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
