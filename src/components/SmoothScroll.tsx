"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery Lenis smooth scrolling — skipped on touch devices & reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !finePointer) return;

    const lenis = new Lenis({ lerp: 0.11, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
