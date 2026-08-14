"use client";

import { motion } from "framer-motion";
import { easeLuxe } from "@/lib/motion";

/** Soft page-entry transition on every route change. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeLuxe }}
    >
      {children}
    </motion.div>
  );
}
