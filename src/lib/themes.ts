/**
 * Theme registry — ids must match the [data-theme="…"] blocks in
 * src/app/themes.css (the single file that owns all colors).
 * `swatch` is only used to paint the toggle button preview.
 */

export const THEME_STORAGE_KEY = "kalatattva-theme";

export const themes = [
  { id: "ivory", label: "Ivory & Gold", swatch: ["#faf7f0", "#b08d4a"] },
  { id: "tattva", label: "Kalatattva Teal", swatch: ["#f4f7f5", "#16332c"] },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const defaultTheme: ThemeId = "ivory";

/** Inline <head> script — applies the saved theme before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t&&t!=="${defaultTheme}")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
