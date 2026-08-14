# Kalatattva — Content Checklist (what the studio still needs to send)

Everything on the site works today with verified placeholder photos.
Each item below replaces a placeholder with the real thing. Items are
ordered by impact.

## 1. Photos (highest impact)

Send **original exports, not Instagram downloads** — Instagram compresses
to 1080px; the site's full-screen heroes want 2000px+ JPEGs.

- **30–40 best photos** across the six categories:
  - Weddings (10–12) · Pre-wedding/engagement (6) · Shrimant & baby (4)
  - Garba/sangeet nights (4) · Home functions & poojas (6) · Grand events (6)
- **6 dramatic wide shots** for page heroes (dark or rich tones work best —
  the menu sits over them): home, gallery, films, services, about, contact
- **1 founder portrait** (Tejas) + **1–2 crew-at-work shots** for the About page

**How to deliver:** any drive link. Files dropped into
`public/images/gallery/` and `public/images/hero/` using the existing
file names replace the placeholders with zero code changes
(names are listed in `src/lib/data.ts`).

## 2. Films

- The **real YouTube channel URL** (site currently guesses
  `youtube.com/@kalatattvaphotography`)
- **4–6 YouTube video IDs** for the Films page, each with a title and
  one-line description (e.g. "Priya weds Raj — Wedding Highlights").
  Currently all four cards use a dummy ID. Swap in `src/lib/data.ts`.

## 3. Contact form (needed before launch)

- **Gmail App Password** for kalatattvaphotography@gmail.com so the
  enquiry form can send email — steps are in `.env.example`
  (Google Account → Security → 2-Step Verification → App passwords).
  Goes into Vercel → Project Settings → Environment Variables
  (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`).

## 4. Studio details to confirm (in `src/lib/site.ts`)

- **Street address** — currently a dummy ("Studio 12, Shreeji Complex, CG Road")
- **Stats** — confirm: 450+ weddings, 120+ cities & venues, crew of 10
- Founder title/spelling, and whether crew members should be named
  individually (site currently says "7–10 specialists", no names)

## 5. Testimonials

- **3–4 real family quotes** — name, function type, venue/city.
  Current four are invented placeholders (`src/lib/data.ts`).

## 6. Packages (Services page)

- **"Starting at ₹—" anchors** for the three collections
  (Aashirwad / Utsav / Sohala) — or say "keep price on request"
- Confirm what each collection includes (`src/components/services/Packages.tsx`)

## 7. Later / nice to have

- **Custom domain** — one env var (`NEXT_PUBLIC_SITE_URL`) switches the
  whole site over; the Vercel domain is used until then
- **Google Business Profile / WedMeGood / WeddingSutra** profile links —
  added to schema `sameAs` for local SEO
- **Google & Bing Search Console codes** — env vars are already wired
  (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`)
- **Celebrity/press mentions** — names, logos and written permission if a
  press section is wanted
- A fresh **social-share image** is auto-generated from the hero photo —
  regenerate once real photos arrive

## Note on Instagram

The office network blocks instagram.com, so media could not be pulled
from the profile automatically. Originals from the studio's archive are
better source material anyway (Instagram recompresses heavily). If an
Instagram pull is ever needed, run it from an unrestricted network.
