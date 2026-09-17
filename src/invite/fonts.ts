/**
 * Fonts for the ported invitations.
 *
 * The standalone app pulled 14 @fontsource packages in its entry file. Here they load
 * through next/font/google instead — self-hosted, preconnect-free and subset per family —
 * and are applied only on the invitation routes, so the studio site never downloads them.
 *
 * Each family exposes a CSS variable that the tradition presets reference by name
 * (see src/invite/data/traditions/*.ts and invite.css).
 */
import {
  Arima,
  Bodoni_Moda,
  Cinzel,
  Eczar,
  Great_Vibes,
  Italiana,
  Jost,
  Noto_Serif_Devanagari,
  Noto_Serif_Gujarati,
  Noto_Serif_Tamil,
  Pinyon_Script,
  Playfair_Display,
  Rozha_One,
} from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana-f",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

const rozha = Rozha_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
  display: "swap",
});

const eczar = Eczar({
  subsets: ["latin", "devanagari"],
  variable: "--font-eczar",
  display: "swap",
});

const arima = Arima({
  subsets: ["latin", "tamil"],
  variable: "--font-arima",
  display: "swap",
});

const notoGu = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-noto-gu",
  display: "swap",
});

const notoDev = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-dev",
  display: "swap",
});

const notoTa = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-ta",
  display: "swap",
});

/** Every invitation font variable, for the wrapper element's className. */
export const inviteFontVars = [
  playfair.variable,
  jost.variable,
  italiana.variable,
  pinyon.variable,
  rozha.variable,
  bodoni.variable,
  cinzel.variable,
  greatVibes.variable,
  eczar.variable,
  arima.variable,
  notoGu.variable,
  notoDev.variable,
  notoTa.variable,
].join(" ");
