/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit everything about the studio in ONE place.
 *  Contact details below come from the Kalatattva business card.
 * ─────────────────────────────────────────────────────────────
 */

/**
 * Production URL — set NEXT_PUBLIC_SITE_URL to the real domain before
 * deploying. Resilient on purpose: an EMPTY env var (common on Vercel)
 * falls back to the default, and a bare domain gets https:// prefixed —
 * `new URL(site.url)` in layout.tsx must never throw at build time.
 */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = rawSiteUrl
  ? (rawSiteUrl.startsWith("http") ? rawSiteUrl : `https://${rawSiteUrl}`).replace(/\/+$/, "")
  : "https://kalatattvaphotography.com";

export const site = {
  /** Brand name shown in the logo, titles and schema. */
  name: "Kalatattva",
  /** Logo wordmark split — "Kala" + italic gold "tattva". */
  tagline: "Weddings • Films • Forever",
  url: siteUrl,

  description:
    "Kalatattva Photography is a wedding photography & cinematography studio capturing Gujarati and Marathi weddings, pre-weddings, shrimant & baby showers, garba nights, home functions and celebrity events across India — from Taj hotels to stadium stages.",

  phone: "+91 91572 19345",
  whatsapp: "919157219345", // digits only, for wa.me link
  email: "kalatattvaphotography@gmail.com",

  address: {
    line: "Studio 12, Shreeji Complex, CG Road", // ← replace with real studio address
    city: "Ahmedabad",
    region: "Gujarat",
    postalCode: "380009",
    country: "IN",
  },

  /** Cities used for local SEO copy + schema areaServed. */
  cities: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Mumbai",
    "Pune",
    "Nashik",
    "Udaipur",
    "Goa",
  ],

  social: {
    instagram: "https://www.instagram.com/kalatattvaphotography",
    youtube: "https://www.youtube.com/@kalatattvaphotography", // ← confirm real channel
  },

  /**
   * NOTE: per the client, never bill individual years of experience —
   * Kalatattva is a crew of 7–10 talented specialists, all billed equally.
   */
  founders: [
    {
      name: "Tejas Devani",
      role: "Founder & Lead Photographer",
      bio: "From intimate home poojas to celebrity weddings at the Taj — Tejas believes every family has one photograph they will keep forever, and his job is to find it.",
    },
  ],

  /** The crew that shows up on every big day. */
  team: {
    size: "7–10",
    description:
      "Seven to ten specialists on every big day — candid and traditional photographers, cinematographers, a drone pilot, lighting hands and editors. All talented, all chasing the same thing: your story, told right.",
  },

  stats: [
    { value: 450, suffix: "+", label: "Weddings Captured" },
    { value: 10, suffix: "", label: "Talented Crew Members" },
    { value: 120, suffix: "+", label: "Cities & Venues" },
    { value: 1, suffix: "M+", label: "Moments Delivered" },
  ],
} as const;

export type Site = typeof site;
