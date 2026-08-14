# KALATATTVA — Design + Content Brief
Next.js (App Router) + Tailwind + Framer Motion. One-line positioning: a crew of 7–10 specialist storytellers — Gujarati & Marathi weddings shot like editorials. (Client mandate: never mention individual years of experience or duo/two-partner framing.)

---

## 1) Visual Direction

**Lane: warm ivory editorial luxury** (KT Merry / Jose Villa aesthetic, culturally warmed). Photography-first, chrome-minimal, Swiss-grid whitespace (30–40% of homepage empty). Dark sections used as accents, not a toggle — no half-optimized dark mode.

**Palette (Tailwind tokens):**
- `ivory` #FAF7F0 — page background
- `cream` #F1EAE0 — alternate section band / card surface
- `charcoal` #1C1A17 — primary text + dark "film" sections (never pure black)
- `ink-soft` #57514A — secondary text
- `gold` #B08D4A — accent: rules, micro-labels, hover states, button borders (use sparingly)
- `sindoor` #8A2E2B — single deep-red accent derived from haldi/kanku imagery: link hover, active filter, one CTA max per view
- `line` #E3DACB — hairline borders/dividers
- On charcoal sections: text #EDE8E0, never #FFF

**Typography (Google Fonts, two families + one accent):**
- Display: **Fraunces** (variable, optical size 144, SOFT 0) — high-contrast Canela-class serif. Headlines at `clamp(3rem, 9vw, 11rem)`; italic for couple names/pull-quotes.
- Body/UI: **DM Sans** — 16–18px body, 1.6 line-height.
- Micro/meta accent: **IBM Plex Mono** — 11–13px, uppercase, `tracking-[0.18em]` for nav labels, captions, dates, venue lines.
- Gujarati/Marathi phrases: keep in Latin transliteration in display type; if native script is used (e.g. શુભ / शुभ), load **Baloo 2** (Gujarati) / **Tiro Devanagari Marathi** for those spans only.

**Layout style:** oversized serif headlines vs tiny mono labels (editorial magazine contrast); justified-rows galleries (equal row height, native aspect ratios, 6–8px gutters — never square crops, masonry only for the mixed-orientation garba/celebrity sets); full-bleed 100vh hero; alternating one-up/two-up rows on story pages with one deliberate asymmetric "one-three" cluster; designed footer with a charcoal color shift, repeated CTA, Instagram strip.

---

## 2) Page Map

**Home** — (1) 100vh hero: muted 15–25s film loop or full-bleed still, one-line positioning + single "Inquire" CTA (persistent in nav); (2) entity statement, 40–60 words ("Kalatattva is a wedding photography studio — a crew of talented specialists based in Ahmedabad, photographing Gujarati and Marathi weddings across Gujarat and Maharashtra since [year]"); (3) stat/proof strip: 450+ weddings · 10 talented crew members · Taj properties · stadium events · celebrity work; (4) 3 featured stories (title + 2-line intro + cover); (5) services teaser grid (6 tiles); (6) two testimonials (named, with venue); (7) Instagram strip; (8) footer CTA.

**Stories** (`/stories`) — filterable index: Weddings / Pre-Wedding / Post-Wedding / Garba Nights / Shrimant & Baby Showers / Home Functions / Celebrity. Justified-rows grid, 15–25 curated covers.

**Story detail** (`/stories/[slug]`) — full-bleed opener, couple names in italic Fraunces, 2–3 line love-story intro, mono metadata line (date · venue · city), 40–60 images in editorial rows, one pull-quote, embedded film if available, prev/next story nav.

**Films** (`/films`) — YouTube/Vimeo embeds per story; deliverables explained: 3–5 min trailer + 20–30 min feature + reels.

**Services** (`/services` + one page each) — Gujarati Weddings · Maharashtrian Weddings · Pre/Post-Wedding · Shrimant, Dohale Jevan & Baby Showers · Garba & Sangeet Nights · Destination & Hotel Weddings. Each page: 300–500+ words, ritual glossary (Gujarati: pithi/haldi, mameru, garba/raas, jaan, hasta melap, vidai, shrimant/godh bharai; Marathi: sakharpuda, kelvan, halad, mangalashtak, antarpat, saptapadi, grihapravesh, dohale jevan), real gallery from that occasion, mini-FAQ, WhatsApp CTA. **Packages** on services index: named collections — **Aashirwad** (single function), **Utsav** (2–3 day wedding), **Sohala** (full multi-day + film) — with "starting at ₹X" anchors + custom-quote CTA. Add-ons listed: second shooter, drone, traditional video, album, same-day edit.

**About** — studio story: many lenses, one story; a crew of 7–10 specialists led by founder Tejas Devani; who-does-what on a wedding day; team portraits. Never mention individual years of experience (studio-history dates like "since 2014" are fine).

**Press & Celebrities** — press/badge logos (WedMeGood, WeddingSutra), celebrity shoots (with permission), venue list (Taj properties, stadiums).

**FAQ** — the five: price range, delivery timeline (photos 4–8 weeks, film 3–4 months), travel policy, team size per event, raw files/advance.

**Contact** — WhatsApp-first; form captures date, city, venue, list of functions, one side/both sides.

**Nav (6 items):** Stories · Films · Services · About · Press · Contact — minimal top bar gaining an ivory background on scroll; "Inquire" pill always visible.

---

## 3) Animations (prioritized; Framer Motion + Lenis)

**P0 — must ship:**
1. **Hero:** image at `scale: 1.12 → 1` settling over 1.2s on load; on scroll, `useScroll` + `useTransform` parallax ≤10% viewport. Headline: line-masked reveal (lines in `overflow-hidden` wrappers, `y: 100% → 0`, 0.08s stagger, one ease token `[0.16, 1, 0.3, 1]` reused sitewide). **Never start the LCP image/h1 at opacity 0** — reveal via transform/mask (documented 3s LCP penalty otherwise).
2. **Gallery entrances:** fade + `y: 32px → 0`, `whileInView` with `viewport={{ once: true }}`, `staggerChildren: 0.09`.
3. **Image hover:** `scale: 1.04` on the inner img inside `overflow-hidden`, 500ms.
4. **Reveal-on-scroll everywhere else:** single reusable `<Reveal>` component, fade + 24px translate, once-only.

**P1 — signature moves (pick exactly these two, no more):**
5. **Cursor "View" label** over gallery items — small lerped follower (~0.12) showing "View"/"Drag"; native cursor stays visible; disabled on touch.
6. **Lightbox morph:** View Transitions API shared-element thumbnail→fullscreen (`view-transition-name` pairs), crossfade fallback.

**P2 — texture:**
7. Horizontal-scroll featured strip on Home for one curated series (pinned, scrubbed translateX, progress cue); replace with scroll-snap swipe carousel on mobile.
8. Slow marquee of press/venue logos (CSS transform loop, pause on hover, `aria-hidden` duplicate).
9. Magnetic effect on the Inquire button only (≤25% displacement).

**Rules:** Lenis for smooth scroll (moderate lerp, destroy on unmount); animate transform/opacity only; `will-change` sparingly; no preloader; global `prefers-reduced-motion` path (instant fades); simplify/disable parallax and pinning on mobile.

---

## 4) SEO/GEO Checklist

- [ ] **JSON-LD @graph** per page, @id cross-linked: `LocalBusiness` (`@type: ["LocalBusiness","ProfessionalService"]` — no Photographer type exists) with name, url, telephone, email, PostalAddress, GeoCoordinates, areaServed (City array), openingHoursSpecification, priceRange, image/logo, sameAs (Instagram, GBP, WedMeGood/WeddingSutra); **a Person node** for founder Tejas Devani (jobTitle, worksFor → business @id, sameAs); WebSite + WebPage; BreadcrumbList on inner pages; FAQPage where visible Q&A exists (markup still aids AI extraction post-deprecation); Service nodes per offering; ImageObject with creator/creditText/copyrightNotice/license + acquireLicensePage (Licensable badge); VideoObject for films. Validate with Rich Results Test.
- [ ] **Next.js metadata:** `metadataBase` + title template (`%s | Kalatattva`) in root layout; `generateMetadata` per dynamic route; **`alternates.canonical` on every page**; OG/Twitter 1200×630 (dynamic via `ImageResponse` for stories); titles 50–60 chars with keyword + city; descriptions 140–160 chars with booking CTA.
- [ ] **`app/sitemap.ts`** with accurate lastModified + image entries for galleries; **`app/robots.ts`** allowing OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot/Claude-SearchBot (GPTBot training-block is a separate decision); sitemap referenced in robots; submit to GSC + Bing (Bing feeds ChatGPT Search).
- [ ] **GEO content:** direct answer in first 40–60 words of every page; plain entity statement on Home/About; question-shaped H2s with self-contained 2–4 sentence answers; concrete numbers and "starting at" prices; `llms.txt` at root (cheap insurance).
- [ ] **City/venue pages:** only genuinely served cities, each with unique local proof (real shoots, named venues, local testimonials) — no templated swaps; venue pages ("Wedding photography at Taj [Property]") are the highest-intent long-tail play.
- [ ] **Images:** kebab-case descriptive filenames (`priya-rohan-hasta-melap-taj-ahmedabad-014.jpg`), alt ≤125 chars describing the scene with natural location/ritual keywords, `alt=""` decorative; AVIF/WebP, 2400–2560px masters, responsive srcset + blur placeholders.
- [ ] **CWV:** LCP ≤2.5s — `next/image` `priority` + `fetchpriority="high"` on hero, never lazy-load it; lazy-load everything below fold; explicit dimensions everywhere (CLS ≤0.1); self-hosted preloaded fonts with `font-display: swap`; server-rendered galleries, minimal client JS (INP ≤200ms); measure at p75 via CrUX.
- [ ] **Off-site:** GBP ("Photographer" category), exact NAP match with footer + schema, review generation with owner replies, WedMeGood/WeddingSutra listings, venue-blog features.

---

## 5) Copy Tone + Headlines

**Tone:** warm, emotionally fluent, culturally native — ritual names written the way families say them; proof-first, price-second; sparing transliterated Gujarati/Marathi phrases as texture (never full sentences); zero camera jargon outside FAQ. Aspirational serif headlines, human sans body, mono facts.

**Headlines/taglines:**
1. "Shubh ghadi, framed forever." *(hero)*
2. "Two lenses. One story. Seventeen years of lagna sohalas." *(about/stat strip)*
3. "From the first sakharpuda to the last vidai — we're already family."
4. "Where the garba never ends." *(garba nights service)*
5. "Tame khoob khush raho — and we'll make sure you remember exactly how it felt." *(testimonials/footer)*
6. "Haldi on hands, happy tears in every frame."
7. "Godh bharai to grihapravesh — every blessing, beautifully kept." *(shrimant/baby shower service)*
8. "Your baraat deserves an epic. Your quiet moments deserve us." *(films)*

**Body-copy register example:** "When the mangalashtak begins and everyone holds their breath behind the antarpat — that is the frame we live for."