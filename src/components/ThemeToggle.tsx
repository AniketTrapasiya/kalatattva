"use client";

import { useEffect, useState } from "react";
import { defaultTheme, THEME_STORAGE_KEY, themes, type ThemeId } from "@/lib/themes";

/**
 * Theme switch — a split disc showing the palette you'd switch TO.
 * Cycles through the themes registered in src/lib/themes.ts.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeId>(defaultTheme);

  // Read the theme the inline head script applied before hydration.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    const known = themes.find((t) => t.id === attr);
    if (known) setTheme(known.id);
  }, []);

  const currentIndex = themes.findIndex((t) => t.id === theme);
  const next = themes[(currentIndex + 1) % themes.length];

  const toggle = () => {
    setTheme(next.id);
    if (next.id === defaultTheme) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", next.id);
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next.id);
    } catch {
      /* private mode — theme just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next.label} theme`}
      title={`Switch to ${next.label}`}
      className={`group flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors duration-300 hover:border-gold ${className}`}
    >
      <span className="relative block h-4 w-4 overflow-hidden rounded-full ring-1 ring-black/10 transition-transform duration-500 ease-luxe group-hover:rotate-180">
        <span className="absolute inset-0" style={{ background: next.swatch[0] }} />
        <span
          className="absolute inset-0"
          style={{ background: next.swatch[1], clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
      </span>
    </button>
  );
}
