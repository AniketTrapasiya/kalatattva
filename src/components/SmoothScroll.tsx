"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Fixed header height (src/components/Header.tsx) — used as scroll offset. */
const HEADER_OFFSET = 76;

/**
 * Buttery Lenis smooth scrolling — skipped on touch devices & reduced motion.
 *
 * Also owns #hash navigation. Lenis intercepts native scroll and keeps its
 * own virtual position, so a plain browser anchor-jump (or Next's router
 * scrolling on route change) gets silently overridden on the next Lenis
 * frame — the page snaps back to top. This effect re-fires on every
 * pathname/query change and drives the scroll itself (via Lenis when it's
 * active, native scrollIntoView otherwise), so <Link href="/contact#id">
 * works the same whether or not Lenis is running.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !finePointer) return;

    const lenis = new Lenis({ lerp: 0.11, autoRaf: true });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    return () => {
      delete (window as unknown as { lenis?: Lenis }).lenis;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    // Wait a tick for the route's content (and Lenis's measured height) to
    // settle before scrolling, otherwise the target offset is measured
    // against the previous page's layout.
    const id = window.setTimeout(() => {
      const target = document.getElementById(hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      const lenis = (window as unknown as { lenis?: { scrollTo: (v: number) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo(top);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 120);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
