"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItem } from "@/lib/data";

/** One wedding day, in chronological frames. */
const frames = [
  { item: galleryItem("wedding-03"), caption: "The getting ready" },
  { item: galleryItem("homefn-03"), caption: "Haldi, and everyone glows" },
  { item: galleryItem("homefn-02"), caption: "Mehndi the night before" },
  { item: galleryItem("wedding-01"), caption: "Pheras by the sacred fire" },
  { item: galleryItem("wedding-06"), caption: "The first portrait as one" },
  { item: galleryItem("garba-02"), caption: "The floor belongs to family" },
  { item: galleryItem("homefn-04"), caption: "A thousand diyas to end the night" },
];

function StripHeading() {
  return (
    <SectionHeading
      dark
      label="The signature film"
      lines={["One wedding,", "told like cinema."]}
    />
  );
}

function Frame({
  frame,
  index,
  className = "",
  sizes,
}: {
  frame: (typeof frames)[number];
  index: number;
  className?: string;
  sizes: string;
}) {
  return (
    <figure className={`shrink-0 ${className}`}>
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={frame.item.src}
          alt={frame.item.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption className="micro-label mt-4 text-paper/60">
        <span className="text-gold">0{index + 1}</span>
        <span className="mx-2 text-paper/30">/</span>
        {frame.caption}
      </figcaption>
    </figure>
  );
}

/** Desktop: a pinned screen where scroll scrubs the day sideways. */
function DesktopStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [endX, setEndX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -endX]);

  useEffect(() => {
    const measure = () => {
      if (!rowRef.current) return;
      setEndX(Math.max(0, rowRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={sectionRef} className="relative hidden h-[340vh] lg:block">
      <div className="grain sticky top-0 flex h-screen flex-col justify-center overflow-hidden bg-charcoal">
        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex w-max items-center gap-12 px-10 will-change-transform"
        >
          <div className="w-[32vw] shrink-0 pr-8">
            <StripHeading />
            <p className="micro-label mt-8 text-paper/50">
              Keep scrolling — the day unfolds frame by frame
            </p>
          </div>
          {frames.map((frame, i) => (
            <Frame
              key={frame.item.src}
              frame={frame}
              index={i}
              sizes="(min-width: 1024px) 42vw, 80vw"
              className={
                i % 2 === 0 ? "h-[58vh] w-[40vw] max-w-2xl" : "mt-20 h-[44vh] w-[28vw] max-w-md"
              }
            />
          ))}
          <div className="w-[10vw] shrink-0" aria-hidden="true" />
        </motion.div>

        {/* Scrub progress hairline */}
        <div className="absolute inset-x-10 bottom-10 h-px bg-paper/15">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-px origin-left bg-gold"
          />
        </div>
      </div>
    </div>
  );
}

/** Mobile: the same day as a scroll-snap swipe row. */
function MobileStrip() {
  return (
    <div className="grain relative overflow-hidden bg-charcoal py-16 lg:hidden">
      <div className="px-6 md:px-10">
        <StripHeading />
        <p className="micro-label mt-6 text-paper/50">Swipe through the day</p>
      </div>
      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {frames.map((frame, i) => (
          <figure key={frame.item.src} className="w-[78vw] max-w-sm shrink-0 snap-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={frame.item.src}
                alt={frame.item.alt}
                fill
                sizes="78vw"
                className="object-cover"
              />
            </div>
            <figcaption className="micro-label mt-4 text-paper/60">
              <span className="text-gold">0{i + 1}</span>
              <span className="mx-2 text-paper/30">/</span>
              {frame.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function FilmStrip() {
  return (
    <section aria-label="One wedding, told like cinema">
      <DesktopStrip />
      <MobileStrip />
    </section>
  );
}
