"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { easeLuxe } from "@/lib/motion";
import Magnetic from "@/components/ui/Magnetic";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/films", label: "Films" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easeLuxe, delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-line/60 bg-ivory/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 md:px-10">
          <Link href="/" className="group relative z-50" aria-label={`${site.name} — home`}>
            <span
              className={`font-display text-2xl tracking-tight transition-colors duration-500 ${
                open ? "text-paper" : scrolled ? "text-charcoal" : "text-paper"
              }`}
            >
              Kala<span className="italic text-gold">tattva</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`micro-label relative transition-colors duration-300 hover:text-gold ${
                    scrolled ? "text-charcoal" : "text-paper"
                  } ${active ? "text-gold" : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
            <ThemeToggle className={scrolled ? "text-charcoal" : "text-paper"} />
            <Magnetic>
              <Link
                href="/contact"
                className="micro-label rounded-full border border-gold px-6 py-3 text-gold transition-all duration-300 hover:bg-gold hover:text-ivory"
              >
                Inquire
              </Link>
            </Magnetic>
          </nav>

          {/* Mobile: theme toggle + burger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle className={open || !scrolled ? "text-paper" : "text-charcoal"} />
            <button
              onClick={() => setOpen(!open)}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className={`h-px w-7 ${open ? "bg-paper" : scrolled ? "bg-charcoal" : "bg-paper"}`}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className={`h-px w-7 ${open ? "bg-paper" : scrolled ? "bg-charcoal" : "bg-paper"}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 38px)" }}
            transition={{ duration: 0.7, ease: easeLuxe }}
            className="grain fixed inset-0 z-40 flex flex-col justify-between bg-charcoal px-6 pb-10 pt-32"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {nav.map((item, i) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: easeLuxe, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className={`font-display block py-2 text-5xl ${
                        pathname === item.href ? "italic text-gold" : "text-paper"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between border-t border-paper/15 pt-6"
            >
              <p className="micro-label text-paper/60">{site.address.city}, India</p>
              <div className="flex gap-5">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5 text-paper/80" />
                </a>
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <YoutubeIcon className="h-5 w-5 text-paper/80" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
