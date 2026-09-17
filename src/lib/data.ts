/**
 * ─────────────────────────────────────────────────────────────
 *  DUMMY CONTENT — every image below is a curated INDIAN
 *  wedding/function placeholder (sourced from Unsplash and
 *  Wikimedia Commons, visually verified) stored locally in
 *  /public/images so nothing depends on a remote CDN at runtime.
 *  These are stand-ins only — replace the files in /public/images
 *  with the studio's real photos before production, and swap the
 *  dummy YouTube `videoId`s when originals arrive.
 * ─────────────────────────────────────────────────────────────
 */

const g = (name: string) => `/images/gallery/${name}.jpg`;

export type Category =
  | "Wedding"
  | "Pre-Wedding"
  | "Shrimant & Baby Shower"
  | "Garba & Sangeet"
  | "Home Functions"
  | "Celebrity & Events";

export const categories: Category[] = [
  "Wedding",
  "Pre-Wedding",
  "Shrimant & Baby Shower",
  "Garba & Sangeet",
  "Home Functions",
  "Celebrity & Events",
];

export interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  /** relative visual weight in the masonry grid */
  tall?: boolean;
}

export const gallery: GalleryItem[] = [
  // ── Wedding ──────────────────────────────────────────────
  { src: g("wedding-01"), alt: "Bride and groom during the pheras at a Hindu wedding ceremony", category: "Wedding" },
  { src: g("wedding-02"), alt: "Kanyadaan ritual close-up at a Gujarati wedding", category: "Wedding" },
  { src: g("wedding-03"), alt: "Bridal gold jewellery laid out before the ceremony", category: "Wedding" },
  { src: g("wedding-04"), alt: "Wedding mandap with Ganesha backdrop at a destination venue", category: "Wedding" },
  { src: g("wedding-05"), alt: "Varmala moment lifted high in celebration", category: "Wedding" },
  { src: g("wedding-06"), alt: "Bride and groom exchanging varmala garlands", category: "Wedding", tall: true },
  { src: g("wedding-07"), alt: "Mala badal garland exchange during the wedding", category: "Wedding" },
  { src: g("wedding-08"), alt: "Garlands and mehndi hands — a varmala detail", category: "Wedding", tall: true },
  { src: g("wedding-09"), alt: "Flower-decked outdoor wedding mandap", category: "Wedding", tall: true },
  { src: g("wedding-10"), alt: "Anand karaj ceremony at a Sikh wedding", category: "Wedding" },
  { src: g("wedding-11"), alt: "Bride in procession with the aarti thali", category: "Wedding" },

  // ── Pre-Wedding ─────────────────────────────────────────
  { src: g("couple-01"), alt: "Bride-to-be in a red saree at a heritage temple", category: "Pre-Wedding", tall: true },
  { src: g("couple-02"), alt: "Couple showing their rings at the engagement ceremony", category: "Pre-Wedding" },
  { src: g("couple-03"), alt: "Mehndi-adorned hands wearing the engagement rings", category: "Pre-Wedding" },
  { src: g("couple-04"), alt: "Ring exchange close-up with chooda bangles", category: "Pre-Wedding" },
  { src: g("couple-05"), alt: "Bride and groom's hands joined, green bangles shining", category: "Pre-Wedding" },
  { src: g("couple-06"), alt: "Heritage temple scouted for a pre-wedding shoot", category: "Pre-Wedding", tall: true },

  // ── Shrimant & Baby Shower ──────────────────────────────
  { src: g("shrimant-01"), alt: "Newborn baby photoshoot tiny feet close-up", category: "Shrimant & Baby Shower" },
  { src: g("shrimant-02"), alt: "Annaprashan — baby's first rice ceremony with family", category: "Shrimant & Baby Shower" },
  { src: g("shrimant-03"), alt: "Dohale jevan celebrations with the whole family", category: "Shrimant & Baby Shower" },
  { src: g("shrimant-04"), alt: "Traditional ritual setup for the godh bharai", category: "Shrimant & Baby Shower" },

  // ── Garba & Sangeet ─────────────────────────────────────
  { src: g("garba-01"), alt: "Garba dancers mid-swirl in chaniya choli", category: "Garba & Sangeet", tall: true },
  { src: g("garba-02"), alt: "Dandiya raas in full swing at a navratri night", category: "Garba & Sangeet" },
  { src: g("garba-03"), alt: "A bride's garba night, in black and white", category: "Garba & Sangeet", tall: true },
  { src: g("garba-04"), alt: "Confetti bursts during the sangeet performance", category: "Garba & Sangeet" },

  // ── Home Functions ──────────────────────────────────────
  { src: g("homefn-01"), alt: "Bride showered in marigolds at her pithi ceremony", category: "Home Functions" },
  { src: g("homefn-02"), alt: "Bridal mehndi palms resting on silk", category: "Home Functions" },
  { src: g("homefn-03"), alt: "Haldi being applied during the morning ritual", category: "Home Functions" },
  { src: g("homefn-04"), alt: "Diyas arranged in a mandala for the evening pooja", category: "Home Functions" },
  { src: g("homefn-05"), alt: "Bride's palms full of fresh mehndi", category: "Home Functions", tall: true },
  { src: g("homefn-06"), alt: "An Om of tealights at the evening aarti", category: "Home Functions" },

  // ── Celebrity & Events ──────────────────────────────────
  { src: g("event-01"), alt: "Stage lights over a stadium-scale celebration", category: "Celebrity & Events", tall: true },
  { src: g("event-02"), alt: "Grand tent decor at a destination function", category: "Celebrity & Events", tall: true },
  { src: g("event-03"), alt: "Five-star ballroom set for a reception", category: "Celebrity & Events" },
  { src: g("event-04"), alt: "Classical dance performance under stage lights", category: "Celebrity & Events" },
  { src: g("event-05"), alt: "Dancers on stage at a grand sangeet", category: "Celebrity & Events" },
  { src: g("event-06"), alt: "Thousands of diyas at a riverside festival night", category: "Celebrity & Events" },
];

/** Look up a gallery item by its file name (e.g. "wedding-04"). */
export const galleryItem = (name: string) => {
  const item = gallery.find((item) => item.src === g(name));
  if (!item) throw new Error(`Unknown gallery image: ${name}`);
  return item;
};

/** Hero / featured images reused across pages */
export const heroImages = {
  home: "/images/hero/home.jpg",
  about: "/images/hero/about.jpg",
  gallery: "/images/hero/gallery.jpg",
  films: "/images/hero/films.jpg",
  services: "/images/hero/services.jpg",
  contact: "/images/hero/contact.jpg",
};

export interface Service {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: "wedding",
    title: "Wedding Photography & Films",
    description:
      "Complete coverage of Gujarati and Marathi weddings — from haldi and mehndi to pheras and vidaai. A full photo & film crew, candid + traditional coverage, and a cinematic highlight film.",
    includes: ["Candid photography", "Traditional coverage", "Cinematic film", "Drone coverage", "Same-day edit teaser", "Premium album"],
    image: g("wedding-01"),
  },
  {
    slug: "pre-wedding",
    title: "Pre & Post Wedding Shoots",
    description:
      "Story-driven couple shoots at locations you love — heritage steps of Ahmedabad, beaches of Goa, palaces of Udaipur — styled, directed and colour-graded like film stills.",
    includes: ["Location scouting", "Styling guidance", "Cinematic video", "Reels for Instagram", "Fine-art prints"],
    image: g("couple-01"),
  },
  {
    slug: "shrimant",
    title: "Shrimant & Baby Showers",
    description:
      "The godh bharai laughter, blessings of grandparents, the glow of a mother-to-be — captured softly and candidly, along with newborn and family sessions after the little one arrives.",
    includes: ["Ceremony coverage", "Family portraits", "Decor & detail shots", "Newborn sessions", "Highlight reel"],
    image: g("shrimant-03"),
  },
  {
    slug: "garba",
    title: "Garba, Sangeet & Navratri Nights",
    description:
      "Low-light specialists for high-energy nights — swirling chaniya cholis, dandiya clashes, stage performances and stadium-scale garba events, all in crisp, vivid frames.",
    includes: ["Multi-camera setup", "Stage & crowd coverage", "Performance films", "Instant social edits"],
    image: g("garba-01"),
  },
  {
    slug: "home-functions",
    title: "Home Functions & Poojas",
    description:
      "Griha pravesh, mundan, engagement at home, satyanarayan katha — small gatherings deserve beautiful memories too. Unobtrusive coverage that keeps the ritual sacred.",
    includes: ["Ritual documentation", "Family candids", "Detail & decor shots", "Same-week delivery"],
    image: g("homefn-01"),
  },
  {
    slug: "events",
    title: "Celebrity & Grand Events",
    description:
      "Trusted at Taj banquets, stadium stages and celebrity gatherings. Discreet, professional teams with experience handling security protocols, press needs and large productions.",
    includes: ["Large event teams", "Press-ready delivery", "Stage & broadcast angles", "NDA-friendly workflow"],
    image: g("event-01"),
  },
];

export interface JourneyStep {
  year: string;
  title: string;
  text: string;
  image: string;
}

/** About page — the studio journey timeline (edit freely). */
export const journey: JourneyStep[] = [
  {
    year: "2014",
    title: "One camera, endless shaadis",
    text: "It began with a single DSLR and a cousin's wedding in Ahmedabad. The photos travelled through the whole family — and the phone hasn't stopped ringing since.",
    image: "/images/hero/about.jpg",
  },
  {
    year: "2017",
    title: "From weddings to the whole celebration",
    text: "Families asked us back — for shrimants, mundans, garba nights and home poojas. We learned that every function, big or small, has a heartbeat worth keeping.",
    image: g("homefn-01"),
  },
  {
    year: "2021",
    title: "One crew, one vision",
    text: "Photographers met filmmakers, and Kalatattva grew into a full crew — stills and cinema under one roof, covering weddings across Gujarat and Maharashtra.",
    image: "/images/hero/films.jpg",
  },
  {
    year: "2023",
    title: "The Taj, stadiums & celebrity nights",
    text: "From five-star banquets at the Taj to stadium garba with thousands dancing — our team grew, our gear grew, but the promise stayed the same: every frame, an art.",
    image: g("event-01"),
  },
  {
    year: "Today",
    title: "450+ weddings and counting",
    text: "Every season brings new families, new cities, new stories. Somewhere right now, a couple is watching their wedding film for the hundredth time. That's why we shoot.",
    image: g("wedding-04"),
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  event: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "They didn't just shoot our wedding, they lived it with us. My dadi cried watching the film — twice.",
    name: "Priya & Raj",
    event: "Wedding, Ahmedabad",
  },
  {
    quote: "Our garba night photos look like movie posters. The energy, the colours — exactly how it felt.",
    name: "The Shah Family",
    event: "Navratri Garba, Vadodara",
  },
  {
    quote: "From the shrimant to the baby's first photos, they've become our family photographers for life.",
    name: "Aishwarya & Mandar",
    event: "Shrimant & Newborn, Pune",
  },
  {
    quote: "Professional enough for a Taj ballroom, warm enough for a home pooja. Rare combination.",
    name: "Mehta Family",
    event: "Reception, Taj Skyline Ahmedabad",
  },
];

export interface Film {
  videoId: string; // YouTube video ID — replace with real ones
  title: string;
  meta: string;
  thumb?: string;
}

/**
 * DUMMY YouTube IDs — replace with the studio's real videos.
 * Any valid public YouTube ID will embed correctly.
 */
export const films: Film[] = [
  { videoId: "dQw4w9WgXcQ", title: "Priya weds Raj — Wedding Highlights", meta: "Wedding Film • Ahmedabad" },
  { videoId: "dQw4w9WgXcQ", title: "Sneha & Arjun — Udaipur Pre-Wedding", meta: "Pre-Wedding Film • Udaipur" },
  { videoId: "dQw4w9WgXcQ", title: "Navratri Nights — Stadium Garba Aftermovie", meta: "Event Film • Rajkot" },
  { videoId: "dQw4w9WgXcQ", title: "Aishwarya's Shrimant — A Mother's Glow", meta: "Shrimant Film • Pune" },
];

export interface Faq {
  q: string;
  a: string;
}

/** FAQ — also rendered as FAQPage JSON-LD for SEO/GEO. */
export const faqs: Faq[] = [
  {
    q: "Which cities do you cover for wedding photography?",
    a: "We are based in Ahmedabad and regularly shoot across Gujarat and Maharashtra — Surat, Vadodara, Rajkot, Mumbai, Pune, Nashik — plus destination weddings in Udaipur, Goa and beyond. Travel is available anywhere in India.",
  },
  {
    q: "Do you shoot Gujarati and Marathi wedding rituals?",
    a: "Yes — that's our speciality. From Gujarati garba, pithi and hast melap to Marathi sakhar puda, halad chadavane and saptapadi, we know each ritual's key moments so nothing precious is missed.",
  },
  {
    q: "What is included in a wedding package?",
    a: "A typical package includes a full crew of photographers and cinematographers, candid and traditional coverage, a cinematic highlight film, full-length edit, drone coverage where permitted, and a premium album. Every package is customised — tell us your functions and we'll build one for you.",
  },
  {
    q: "How big is the Kalatattva team on a wedding day?",
    a: "A typical wedding is covered by a crew of 7–10 talented specialists — candid and traditional photographers, cinematographers, a drone pilot and lighting support — so no ritual, guest or angle gets missed. Smaller functions get a right-sized team.",
  },
  {
    q: "Do you cover shrimant, baby showers and small home functions?",
    a: "Absolutely. Shrimant (godh bharai), baby showers, mundan, griha pravesh, engagement at home — we cover intimate functions with the same care as grand weddings.",
  },
  {
    q: "How soon do we get our photos and films?",
    a: "You receive a same/next-day teaser for social media, edited photo previews within a week, and the complete gallery and films within 4–6 weeks depending on season.",
  },
  {
    q: "Can you handle large venues like Taj hotels or stadium events?",
    a: "Yes. Our team has covered banquets at Taj properties, stadium-scale garba nights and celebrity events — including multi-camera setups, stage coverage and NDA-friendly workflows.",
  },
  {
    q: "How do we book Kalatattva for our wedding?",
    a: "Share your date and functions through the contact form, WhatsApp or a call. We confirm availability, share a custom quote, and a small advance locks your dates.",
  },
];

export interface Ritual {
  name: string;
  note: string;
}

/**
 * The rituals band on the home page — real Gujarati & Marathi wedding
 * ceremony sequences, in order. Keep this cultural specificity.
 */
export const rituals: { tradition: string; items: Ritual[] }[] = [
  {
    tradition: "Gujarati",
    items: [
      { name: "Chandlo Matli", note: "The rishta is sealed — a vermilion chandlo and a matli full of blessings." },
      { name: "Mameru", note: "Mama arrives with the panetar sari, bangles and a procession of love." },
      { name: "Pithi", note: "Turmeric on skin, laughter everywhere — everyone leaves a little yellow." },
      { name: "Jaan & Ponkhvu", note: "The baraat lands; saasu-ma welcomes the groom — and tweaks his nose." },
      { name: "Hasta Melap", note: "Behind the antarpat, two hands are joined and the room holds its breath." },
      { name: "Mangal Pheras & Vidai", note: "Four vows around the sacred fire, then the hardest goodbye of all." },
    ],
  },
  {
    tradition: "Marathi",
    items: [
      { name: "Sakhar Puda", note: "A packet of sugar, and two families become one — sweetly official." },
      { name: "Kelvan", note: "The kuldevta's blessing and one last feast at home before the big day." },
      { name: "Halad Chadavane", note: "Haldi touched to skin with mango leaves — the glow begins." },
      { name: "Mangalashtak", note: "The antarpat trembles as the whole hall sings the couple together." },
      { name: "Saptapadi", note: "Seven steps around the agni, each one a promise." },
      { name: "Grihapravesh", note: "The measure of rice tips over the threshold — Laxmi walks in." },
    ],
  },
];

export interface InstaPost {
  /** Instagram shortcode — the post lives at instagram.com/p/<shortcode>/ */
  shortcode: string;
  src: string;
  alt: string;
}

/**
 * REAL posts pulled from @kalatattvaphotography — refresh occasionally
 * by saving new post images to /public/images/insta/<shortcode>.jpg.
 */
export const instaPosts: InstaPost[] = [
  { shortcode: "DZrTmSIjLgr", src: "/images/insta/DZrTmSIjLgr.jpg", alt: "Bride and groom close-up — a moment between vows" },
  { shortcode: "DZzQl20DIPV", src: "/images/insta/DZzQl20DIPV.jpg", alt: "Keyur & Priyanka — wedding editorial" },
  { shortcode: "DZQOYrSDKcq", src: "/images/insta/DZQOYrSDKcq.jpg", alt: "Priyank & Gayatri — bride in red lehenga" },
  { shortcode: "DZsU3megc8j", src: "/images/insta/DZsU3megc8j.jpg", alt: "Bride Nency — portrait series" },
  { shortcode: "DZNntUZM5dv", src: "/images/insta/DZNntUZM5dv.jpg", alt: "Couple portrait under the palms" },
  { shortcode: "DZ-EFD5DIfW", src: "/images/insta/DZ-EFD5DIfW.jpg", alt: "Nirav & Dhara — wedding story" },
];

/** Marquee strip words used in animated section dividers. */
export const marqueeWords = [
  "Weddings",
  "Pre-Wedding",
  "Shrimant",
  "Garba Nights",
  "Baby Showers",
  "Home Functions",
  "Celebrity Events",
  "Films",
];

/* ─────────────────────────────────────────────────────────────
 *  DIGITAL WEDDING INVITATIONS
 *  A separate companion app (Vite/React) served at /invitations.
 *  Each preset is a full animated invite — its own artwork,
 *  palette, script, rituals and language. Deep-linked with
 *  ?tradition=<id>, matching the invite app's own query param.
 * ───────────────────────────────────────────────────────────── */

export interface InvitationFormat {
  /** matches the `tradition` id in the invitation app */
  id: string;
  label: string;
  /** the tradition's own script — rendered as a native-language accent */
  nativeLabel: string;
  /** lang attribute so screen readers switch voice correctly */
  nativeLang: string;
  state: string;
  region: string;
  /** the design language of that preset, e.g. "Patola heritage" */
  design: string;
  /** ritual sequence, kept in the family's own vocabulary */
  highlights: string;
  image: string;
}

export const invitationFormats: InvitationFormat[] = [
  {
    id: "kathiyawadi",
    label: "Kathiyawadi",
    nativeLabel: "કાઠિયાવાડી",
    nativeLang: "gu",
    state: "Gujarat",
    region: "Saurashtra",
    design: "Abhla folk",
    highlights: "Mandvo · Mameru · Pithi · Raas & dayro · Hast melap",
    image: "/images/invitations/kathiyawadi-720.webp",
  },
  {
    id: "surati",
    label: "Surati",
    nativeLabel: "સુરતી",
    nativeLang: "gu",
    state: "Gujarat",
    region: "South Gujarat",
    design: "Zari & diamond",
    highlights: "12 rituals over 4 days · Mameru · Ponkh & ghari night · Hast melap",
    image: "/images/invitations/surati-720.webp",
  },
  {
    id: "gujarati",
    label: "Gujarati",
    nativeLabel: "ગુજરાતી",
    nativeLang: "gu",
    state: "Gujarat",
    region: "Central Gujarat",
    design: "Patola heritage",
    highlights: "Ganesh sthapana · Mehndi · Pithi · Garba night · Godhuli hast melap",
    image: "/images/invitations/gujarati-720.webp",
  },
  {
    id: "marwadi",
    label: "Marwadi",
    nativeLabel: "मारवाड़ी",
    nativeLang: "hi",
    state: "Rajasthan",
    region: "Marwar",
    design: "Rajputana royal",
    highlights: "Haldi · Mayra · Mehendi & sangeet · Nikasi · Phere · Vidaai",
    image: "/images/invitations/marwadi-720.webp",
  },
  {
    id: "marathi",
    label: "Marathi",
    nativeLabel: "मराठी",
    nativeLang: "mr",
    state: "Maharashtra",
    region: "Pune",
    design: "Paithani silk",
    highlights: "Devdevak · Haldi · Seemant pujan · Antarpat · Swagat samarambh",
    image: "/images/invitations/marathi-720.webp",
  },
  {
    id: "tamil",
    label: "Tamil",
    nativeLabel: "தமிழ்",
    nativeLang: "ta",
    state: "Tamil Nadu",
    region: "Madurai",
    design: "Temple & kolam",
    highlights: "Pandhakkal · Nichayathartham · Janavasam · Muhurtham · Reception",
    image: "/images/invitations/tamil-720.webp",
  },
];
