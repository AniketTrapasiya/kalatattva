"use client";

import { motion } from "framer-motion";
import { easeLuxe } from "@/lib/motion";

interface HeadlineRevealProps {
  /** Each entry renders as one masked line. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** delay before the first line starts */
  delay?: number;
  /** if true, animates when scrolled into view instead of on mount */
  inView?: boolean;
}

const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

/**
 * Editorial line-mask reveal — each line rises out of an overflow-hidden
 * wrapper. Text is never at opacity 0, so the LCP element paints instantly.
 *
 * IMPORTANT: the in-view trigger lives on the OUTER tag and propagates to
 * the lines via variants. Never put whileInView on the clipped inner span —
 * an element fully clipped by overflow-hidden has zero visible area, so
 * IntersectionObserver never fires and the headline stays hidden.
 */
export default function HeadlineReveal({
  lines,
  as: tag = "h2",
  className = "",
  delay = 0,
  inView = false,
}: HeadlineRevealProps) {
  const MotionTag = motionTags[tag];

  const trigger = inView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.4 },
      }
    : { initial: "hidden", animate: "visible" };

  return (
    <MotionTag {...trigger} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: { duration: 1.1, ease: easeLuxe, delay: delay + i * 0.09 },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
