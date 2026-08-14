"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { easeLuxe } from "@/lib/motion";
import { categories, gallery, type Category } from "@/lib/data";

type Filter = "All" | Category;

const filters: Filter[] = ["All", ...categories];

const count = (f: Filter) =>
  f === "All" ? gallery.length : gallery.filter((g) => g.category === f).length;

/**
 * Filterable masonry gallery with a full-screen lightbox.
 * Items re-enter with a soft stagger whenever the filter changes.
 */
export default function GalleryGrid() {
  const [active, setActive] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items =
    active === "All" ? gallery : gallery.filter((g) => g.category === active);

  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((current) =>
        current === null ? null : (current + dir + items.length) % items.length
      ),
    [items.length]
  );

  // Keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [lightbox, step]);

  return (
    <section className="bg-ivory py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Filter pills ─────────────────────────────────── */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-line pb-6">
          {filters.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                onClick={() => {
                  setActive(filter);
                  setLightbox(null);
                }}
                className={`micro-label relative pb-2 transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-ink-soft hover:text-charcoal"
                }`}
              >
                {filter}
                <sup className="ml-1.5 text-[0.6rem] text-ink-soft/70">{count(filter)}</sup>
                {isActive && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-x-0 bottom-0 h-px bg-gold"
                    transition={{ duration: 0.5, ease: easeLuxe }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Editorial grid — dense flow, tall frames span two rows,
               so every filter fills left-to-right with no empty columns ── */}
        <div
          key={active}
          className="mt-10 grid grid-flow-dense grid-cols-1 auto-rows-[17rem] gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.button
              key={item.src}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeLuxe, delay: Math.min(i, 8) * 0.05 }}
              className={`group relative block overflow-hidden bg-cream text-left ${
                item.tall ? "row-span-2" : ""
              }`}
              aria-label={`Open ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="micro-label absolute inset-x-0 bottom-0 translate-y-3 p-5 text-paper opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
                {item.category}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeLuxe }}
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal/95 backdrop-blur-sm"
            data-lenis-prevent
            onClick={() => setLightbox(null)}
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <p className="micro-label text-paper/70">
                {String(lightbox + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                <span className="mx-3 text-paper/30">·</span>
                {items[lightbox].category}
              </p>
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="rounded-full border border-paper/25 p-2.5 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <motion.figure
              key={items[lightbox].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: easeLuxe }}
              className="relative mx-6 flex-1 md:mx-24"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.figure>

            <div
              className="flex items-center justify-between px-6 py-5 md:px-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="micro-label max-w-md truncate text-paper/50">
                {items[lightbox].alt}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="rounded-full border border-paper/25 p-2.5 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="rounded-full border border-paper/25 p-2.5 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
