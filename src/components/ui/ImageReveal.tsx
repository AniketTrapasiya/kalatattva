"use client";

import { motion } from "framer-motion";
import { easeLuxe } from "@/lib/motion";

/**
 * Curtain-wipe reveal — the clip opens bottom-to-top while the content
 * settles from a slight zoom. The in-view trigger sits on the OUTER,
 * unclipped wrapper and drives both layers via variants (an element
 * hidden by its own clip still intersects, but children of clipped
 * ancestors never do — see HeadlineReveal).
 */
export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className={`relative ${className}`}
    >
      <motion.div
        className="h-full w-full will-change-[clip-path]"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.1, ease: easeLuxe, delay },
          },
        }}
      >
        <motion.div
          className="h-full w-full will-change-transform"
          variants={{
            hidden: { scale: 1.15 },
            visible: {
              scale: 1,
              transition: { duration: 1.5, ease: easeLuxe, delay },
            },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
