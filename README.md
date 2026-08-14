# Kalatattva — Wedding Photography & Films

A premium, animated portfolio website for **Kalatattva**, a wedding photography & cinematography studio — a talented crew of 7–10 specialists covering Gujarati and Marathi celebrations — weddings, pre-weddings, shrimant & baby showers, garba nights, home functions and grand events.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **framer-motion** and **Lenis** smooth scrolling. Contact form emails via **nodemailer** (SMTP).

## Quickstart

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). That's it — the site runs entirely on placeholder content until you swap in the real details.

## Contact form (SMTP) setup

The contact form (`/contact`) sends enquiries by email through SMTP. Configure it in `.env.local`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=your-email@gmail.com   # where enquiries arrive (defaults to SMTP_USER)
```

### Using Gmail

Gmail no longer accepts your normal password for SMTP — you need an **App Password**:

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** (required for app passwords).
3. Still under Security, open **App passwords** (or search "App passwords" in the account search bar).
4. Create a new app password (name it e.g. "Kalatattva website"), and copy the 16-character code.
5. Paste that code as `SMTP_PASS` in `.env.local` — keep `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=465`.

Any other SMTP provider (Zoho, Titan, your domain host's email, Resend SMTP, etc.) works the same way — just fill in that provider's host, port, username and password.

> Never commit `.env.local`. It is already gitignored.

## Where to replace the dummy content

Everything visible on the site is placeholder content, organised so you only ever edit two data files:

| File | What to change |
|---|---|
| `src/lib/site.ts` | **Single source of truth for the brand** — studio name, tagline, phone, WhatsApp number, email, studio address, cities served, Instagram/YouTube URLs, the founder and crew details, and the stats counters. |
| `src/lib/data.ts` | All page content — gallery images (with alt text and categories), the six services, the About-page journey timeline, testimonials, the films list (**replace the dummy YouTube `videoId`s with real ones**), and FAQs. |
| `public/og.jpg` | The social-share image (shown when the site is linked on WhatsApp, Instagram, etc.). Replace with a real photo, exactly **1200×630**. |
| `public/llms.txt` | The plain-text summary served to AI search engines. Update the studio details and confirm the URLs (currently `kalatattvaphotography.com`) match the real domain. |

## Adding real images

Two options, both fully supported:

1. **Local files (simplest):** drop images into `public/` (e.g. `public/photos/bride-01.jpg`) and use the path `/photos/bride-01.jpg` as the `src` in `src/lib/data.ts`.
2. **Any image host / CDN:** use the full `https://…` URL as the `src`, and add the host to `images.remotePatterns` in `next.config.ts`. Unsplash (`images.unsplash.com`) and YouTube thumbnails (`i.ytimg.com`) are already allowed:

```ts
// next.config.ts
remotePatterns: [
  // ...existing entries
  { protocol: "https", hostname: "your-cdn.example.com", pathname: "/**" },
],
```

Keep roughly the same aspect ratios as the placeholder images so the gallery and hero layouts stay balanced, and always write descriptive `alt` text — it doubles as image SEO.

## SEO checklist (before and after launch)

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com` in production env vars — it drives canonical URLs, the sitemap, robots.txt, Open Graph tags and JSON-LD schema.
- [ ] Replace all placeholder contact/brand details in `src/lib/site.ts` (these feed the LocalBusiness structured data).
- [ ] Verify the site in [Google Search Console](https://search.google.com/search-console) (domain property is easiest via DNS).
- [ ] Submit the sitemap in Search Console: `https://www.yourdomain.com/sitemap.xml`.
- [ ] Create/claim a [Google Business Profile](https://business.google.com) for the studio with the same name, address and phone as `site.ts` — this is the biggest lever for "wedding photographer in Ahmedabad" searches.
- [ ] Update `public/llms.txt` and `public/og.jpg` with real content.
- [ ] AI crawlers (ChatGPT, Perplexity, Claude) are already explicitly allowed in `robots.txt` — nothing to do there.

## Deploy to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository, and add the environment variables from `.env.local` (`SMTP_*`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`) in the project settings.
3. Click **Deploy**, then add your custom domain under Project → Settings → Domains.

Every push to the main branch redeploys automatically.

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build (also the lint/typecheck gate)
npm run start    # serve the production build
npx tsc --noEmit # typecheck only
```
