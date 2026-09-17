@AGENTS.md

# Kalatattva — Project Context

Premium animated portfolio website for **Kalatattva Photography** (founder: Tejas Devani), a wedding photography & cinematography studio run by a talented crew of 7–10 specialists, shooting Gujarati and Marathi celebrations: weddings, pre/post-wedding shoots, shrimant & baby showers, garba nights, home functions, and celebrity/grand events (Taj hotels, stadiums). Based in Ahmedabad; serves Gujarat, Maharashtra, and destination venues.

**Copy rule (client mandate):** never mention individual years of experience or "duo/two partners" framing anywhere — the positioning is a team of 7–10, all equally talented.

The full research-backed design brief lives in `BRIEF.md` — read it before making design decisions.

## Stack

- **Next.js 16.3** App Router, `src/` dir, TypeScript — note the AGENTS.md warning above: Next 16 differs from older habits (async `params`, `priority` prop deprecated on `next/image` → use `loading="eager" fetchPriority="high"`, Turbopack default, docs in `node_modules/next/dist/docs/`)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css` via `@theme inline` — there is no `tailwind.config.js`)
- **framer-motion v13** for animations, **Lenis** for smooth scrolling
- **nodemailer** for the SMTP contact form (`src/app/api/contact/route.ts`)
- **lucide-react v1** — has NO brand icons; Instagram/YouTube/WhatsApp icons are custom in `src/components/icons.tsx`

## Commands

```bash
npm run dev      # dev server
npm run build    # production build (also the lint/typecheck gate)
npx tsc --noEmit # typecheck only
```

## Where everything lives

| What | Where |
|---|---|
| Brand, phone, email, socials, address, founders, stats | `src/lib/site.ts` — **single source of truth** |
| Gallery images, services, journey timeline, testimonials, films (YouTube IDs), FAQs | `src/lib/data.ts` (images resolve to local files in `public/images/{gallery,hero}/`) |
| **Theme colors — BOTH themes, edit here only** | `src/app/themes.css` (`ivory` default + `tattva` teal from the business card, via `data-theme` on `<html>`) |
| Theme registry for the toggle (ids, labels, swatches) | `src/lib/themes.ts` + `src/components/ThemeToggle.tsx` (in Header); saved theme applied pre-paint by an inline script in `layout.tsx` |
| Non-color design tokens (fonts, keyframes, type scale) | `src/app/globals.css` |
| Floating WhatsApp chat button (bottom-left, all pages) | `src/components/WhatsAppButton.tsx` (rendered in `(site)/layout.tsx`) |
| **Wedding invitations** (ported app — see below) | `src/invite/` + routes in `src/app/(invite)/invitations/[tradition]/` |
| Shared animation primitives | `src/components/ui/` (Reveal, HeadlineReveal, Magnetic, Marquee, SectionHeading, Counter, PageHero) |
| SEO structured data builders | `src/lib/schema.ts` + `src/components/JsonLd.tsx` |
| SMTP contact endpoint | `src/app/api/contact/route.ts` (env vars in `.env.local`, see `.env.example`) |
| Per-page components | `src/components/{home,gallery,about,films,services,contact}/` |

## Route groups — two layouts, on purpose

`src/app/layout.tsx` is the document shell only (`<html>`/`<body>`, fonts, pre-paint theme script). The chrome lives one level down:

- **`(site)/`** — every studio page. `(site)/layout.tsx` renders Header, Footer, SmoothScroll (Lenis) and WhatsAppButton. Add anything sitewide *here*, not in the root layout.
- **`(invite)/`** — the ported wedding invitations. Deliberately bare: no header, footer, Lenis or WhatsApp button, because an invitation is a guest-facing page that stands alone.

Both groups are URL-transparent — `(site)/about/page.tsx` is still `/about`.

## Wedding invitations (`src/invite/`)

A port of the standalone `weddingCard` Vite app: six regional presets (Kathiyawadi, Surati, Gujarati, Marwadi, Marathi, Tamil), each with its own artwork, palette, script, fonts and ritual sequence. One static route per tradition at `/invitations/<id>`; `(site)/invitations/page.tsx` is the landing page that indexes them.

**The two rules that keep it from breaking the studio site:**

1. **Every colour token is prefixed `inv-`** (`bg-inv-ivory`, `text-inv-gold`, …). Both apps define ivory/cream/gold with *different* values — unprefixed tokens would repaint the whole site.
2. **Every rule in `src/invite/invite.css` is scoped to `.invite-root`.** The active tradition's palette and `data-design` are set on that wrapper element (`TraditionScope`), never on `<html>` as the original did.

Other port notes:
- Fonts load via `next/font/google` in `src/invite/fonts.ts` (the original used 14 `@fontsource` packages), applied only on invitation routes.
- The route is the source of truth for the active tradition — selecting one navigates rather than mutating state, so invitations are shareable and indexable.
- Assets live in `public/images/invitations/`. Surati intentionally reuses the Kathiyawadi artwork.
- **Content is still sample data** — placeholder couples, venues and an unassigned phone number in `src/invite/data/traditions/*.ts`. RSVP and Wishes forms have no backend; they were non-functional in the source and remain so.

## Design system (do not deviate)

- **Palette:** eight semantic tokens defined per-theme in `src/app/themes.css` — ivory (bg), cream (alt bands), charcoal (dark bands — text on it is `paper`, never white), gold (accents/labels), sindoor (rare red accent, max one per view), line (hairlines). Tailwind classes: `bg-ivory`, `text-paper`, `border-line`, etc. Never hardcode hex values in components — always use the token classes so both themes work.
- **Type:** Fraunces (serif display — `.font-display`, `.display-xl/lg/md`), DM Sans (body), IBM Plex Mono (`.micro-label` uppercase tracked labels)
- **Motion:** ONE ease sitewide — `easeLuxe` `[0.16, 1, 0.3, 1]` from `src/lib/motion.ts`. Animate transform/opacity only. `whileInView` + `viewport={{ once: true }}`. Hover zooms: scale 1.04–1.06 on inner `<Image>` inside `overflow-hidden`.
- **`whileInView` gotcha:** never put it on an element that's translated fully outside an `overflow-hidden` ancestor — IntersectionObserver sees zero visible area and NEVER fires (headlines stay invisible, leaving blank gaps). Put the trigger on the unclipped parent and drive children via variants (`HeadlineReveal`, `ImageReveal` do this correctly — reuse them).
- The header is fixed and transparent over heroes with light text — **every page must open with a dark image hero** (use `PageHero`) or the nav becomes invisible.
- Never start the LCP hero image or `h1` at opacity 0 (LCP penalty); reveal via transform masks (`HeadlineReveal` does this).

## Dummy content — pending replacement by the client

Real contact details (phone +91 91572 19345, kalatattvaphotography@gmail.com, Instagram @kalatattvaphotography, founder Tejas Devani) are already in `src/lib/site.ts` from the business card. Still dummy:
1. Images — curated wedding placeholders stored locally in `public/images/{gallery,hero}/`; swap the files (keep names) or repoint `src/lib/data.ts`
2. YouTube `videoId`s in `src/lib/data.ts`
3. `public/og.jpg` — real social-share image (1200×630)
4. Crew photos + studio street address in `src/lib/site.ts`; YouTube channel URL unconfirmed
5. `.env.local` — real SMTP credentials (client will provide; never commit this file)
6. `NEXT_PUBLIC_SITE_URL` — the real domain, before deploying

## SEO/GEO conventions

- Every page exports `metadata` with `alternates.canonical`
- JSON-LD: base LocalBusiness `@graph` renders once in the root layout; pages add breadcrumbs/FAQ/video schema via `JsonLd`
- `sitemap.ts`, `robots.ts` (AI crawlers explicitly allowed), `manifest.ts`, `public/llms.txt`
- Copy uses real ritual names (pithi, hasta melap, vidai, sakharpuda, saptapadi, godh bharai) — keep this cultural specificity in any new copy
