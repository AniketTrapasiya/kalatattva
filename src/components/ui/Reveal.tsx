"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { easeLuxe } from "@/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** distance in px to slide up from */
  y?: number;
  children: React.ReactNode;
}

/** The sitewide scroll-reveal: soft fade + rise, plays once. */
export default function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: easeLuxe, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
