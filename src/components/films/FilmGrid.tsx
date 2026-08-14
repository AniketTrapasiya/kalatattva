"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { films, type Film } from "@/lib/data";
import { easeLuxe } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * NOTE: the `videoId`s in src/lib/data.ts are DUMMY placeholders —
 * swap them for the studio's real YouTube IDs and these cards will
 * embed the real films with zero code changes.
 *
 * Each card is a lightweight YouTube facade: a static thumbnail +
 * play button, swapped for the real iframe only on click, so the
 * page never loads YouTube's player script upfront.
 */

function FilmCard({ film, index }: { film: Film; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal delay={(index % 2) * 0.12} className="group">
      <article>
        <div className="relative aspect-video overflow-hidden bg-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${film.videoId}?autoplay=1`}
              title={film.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play film: ${film.title}`}
              className="absolute inset-0 block h-full w-full cursor-pointer"
            >
              <Image
                src={`https://i.ytimg.com/vi/${film.videoId}/hqdefault.jpg`}
                alt={`Thumbnail for ${film.title}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              {/* charcoal veil */}
              <span className="absolute inset-0 bg-charcoal opacity-45 transition-opacity duration-500 group-hover:opacity-30" />

              {/* center play control */}
              <span className="absolute inset-0 flex items-center justify-center">
                <Magnetic strength={0.35}>
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-charcoal md:h-20 md:w-20">
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-gold"
                      animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
                      transition={{
                        duration: 2.4,
                        ease: easeLuxe,
                        repeat: Infinity,
                        repeatDelay: 0.4,
                      }}
                    />
                    <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" />
                  </span>
                </Magnetic>
              </span>
            </button>
          )}
        </div>

        <h3 className="font-display mt-6 text-xl text-charcoal md:text-2xl">
          {film.title}
        </h3>
        <p className="micro-label mt-3 text-ink-soft">{film.meta}</p>
      </article>
    </Reveal>
  );
}

export default function FilmGrid() {
  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          label="Featured Films"
          lines={["A few favourite", "love stories."]}
        />
        <Reveal delay={0.15}>
          <div className="rule-gold mt-12" />
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {films.map((film, i) => (
            <FilmCard key={`${film.videoId}-${film.title}`} film={film} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
