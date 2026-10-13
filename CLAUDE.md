# TOTO India: Premium Homepage Concept

A redesigned homepage for **TOTO India** (https://in.toto.com/) built as a pitch to show TOTO how much more premium their site could feel while keeping their branding. It is a **concept, not an official TOTO site**, and it stays marked that way (footer note, `noindex`) until TOTO signs off.

Structure reference: the TOTO Global homepage (https://www.toto.com/en/index.htm). The React app (`src/App.jsx`) follows its section order (key-visual slider, Featured, About us, TOTO Cleanovation, Product, facilities) with India content and links.

Design reference for the level of polish: Carysil (https://carysil-sand.vercel.app/, repo https://github.com/vijaysingh60/Carysil). Borrow its restraint and editorial rhythm, not its colours or fonts. The hero (diptych: photo + frosted copy panel) and the Products mega menu are modelled directly on Carysil's, in TOTO colours.

`public/index-editorial.html` is the earlier editorial version of the homepage (hero photo, Collections, NEOREST band, Design strip, hotel references). It is kept for comparison and still uses some images that the React page does not. It is plain HTML and is served as-is at `/index-editorial.html`.

## Stack

- **React 19 + Vite**, plain JSX (no TypeScript, no router, no state library). Converted from the single static page on request; it renders pixel-identical to it.
- Dependencies are only `react`, `react-dom`, and (dev) `vite` + `@vitejs/plugin-react`. No UI kits, animation or carousel libraries: the slider and reveals are hand-written. Keep it that way unless explicitly asked.
- All styles are one global stylesheet, `src/index.css`, carried over unchanged from the static page. Components use those class names; there are no CSS modules or CSS-in-JS.
- Only external requests: Google Fonts (Poppins, plus a 4-glyph Noto Serif JP subset).
- Hosted free on Vercel; Vercel builds it with `npm run build` and serves `dist/`.

```
index.html                 Vite entry: <head> meta, fonts, noindex, the `js` class script, #root
src/main.jsx               mounts <App /> in StrictMode, imports index.css
src/App.jsx                section order (follows toto.com/en/index.htm)
src/data.js                ALL copy, links and image metadata; edit content here, not in components
src/index.css              the whole design system: tokens, components, motion, breakpoints
src/components/
  Icons.jsx                SVG sprite (incl. the TOTO wordmark), <Icon>, <Arrow>, <Logo>
  Reveal.jsx               <Reveal as=… delay=…>: shared IntersectionObserver fade-up + 1.5s safety net
  SectionHead.jsx          eyebrow + h2 + optional link; pad() for 01–07 numbering
  Header.jsx               header, mobile menu (Esc, scroll lock, hover/click/keyboard); hosts the mega menu
  MegaMenu.jsx             Products mega menu (Browse → Categories → Series → Preview)
  KeyVisuals.jsx           the hero: full-bleed photo + frosted copy panel (after Carysil), 4 manual key visuals
  Sections.jsx             Featured, About, Cleanovation, Products, Visit, Support
  Footer.jsx               footer, socials, region picker
public/assets/img/*.webp   optimised photography (og.jpg is the social preview); served as-is, filenames kept
public/assets/favicon.svg  TOTO "T" mark on ink
public/robots.txt          Disallow all while in concept
public/index-static.html   the pre-React static version of this page (reference; safe to delete)
public/index-editorial.html  earlier editorial version, kept for comparison
vite.config.js             base './' (relative build), dev server on 127.0.0.1:4173
vercel.json                framework vite, output dist; headers: noindex while in concept, cache for /assets
.claude/launch.json        `npm run dev` for Claude Code previews (port 4173)
```

Images are referenced through `img('file.webp')` from `src/data.js`, which prefixes Vite's `BASE_URL`, so the build works at the domain root or in a sub-folder. Because the bundle is an ES module, the built page needs a web server; opening `dist/index.html` from disk does not work.

**Hooks the DOM keeps on purpose:** `#top`, `.hero-copy.is-current`, `[data-go]`, `[data-prev]`, `[data-next]` and `[data-panel]` match the static page and are used by automated checks. The `js` class on `<html>` is set in `index.html` before React mounts, so reveal and slider styles never flash.

## Brand rules (keep TOTO's identity)

**Logo.** The official TOTO wordmark is inlined once as `<symbol id="logo">` (paths copied from in.toto.com's `logo.svg`) and reused with `<use href="#logo">`. It uses `fill="currentColor"`, so it follows the header colour. Never redraw, stretch, recolour with gradients, or replace it with text.

**Colour tokens** (defined on `:root`, always use the variable, never a new hex):

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F6F7F7` | page base, porcelain white |
| `--mist` | `#EDF2F5` | TOTO India's own surface tint, used for the Visit band and image placeholders (hairlines on it use `--line-mist` `#C9D3DA`) |
| `--white` | `#FFFFFF` | About us band |
| `--ink` / `--ink-2` / `--ink-3` | `#141719` / `#50585E` / `#6B7379` | text: primary / body / meta |
| `--line` | `#DCE2E6` | hairline dividers |
| `--night` / `--night-2` / `--night-line` | `#0E1113` / `#171B1E` / `#262C30` | dark sections and footer |
| `--blue` | `#3088CE` | **TOTO India brand blue**, decorative only: eyebrow rule, focus ring |
| `--blue-deep` | `#1E6BAA` | same hue at AA contrast: hover states, button hover fill |

Blue is an accent, not a fill. Use it sparingly (a rule, a hover, a focus ring). Primary buttons are ink; they turn `--blue-deep` on hover.

**Typography.** Poppins is TOTO India's existing typeface, so it stays.
- Display / H2: Poppins 300, tight negative tracking (`.hero-title`, `.h2`).
- Body: Poppins 400, 16px / 1.7, `--ink-2`.
- Eyebrows, buttons, nav: Poppins 500, 11.5 to 12.5px, uppercase, `.14em` to `.2em` tracking.
- `東洋陶器` (Tōyō Tōki, TOTO's 1917 founding name) is the only Japanese text and the only use of Noto Serif JP. The font request is subset with `&text=` to just those four glyphs. If you add Japanese characters, add them to the `text=` parameter too.

**Product names** are written the way TOTO writes them: NEOREST, WASHLET, ECOWASHER, CEFIONTECT, TORNADO FLUSH, EWATER+, ACTILIGHT, G Selection, Flotation Tub, TOTO Cleanovation.

## Design principles

- Quiet luxury: generous whitespace (`--section` padding), large light headlines, hairline dividers, square corners (only chips and social icons are round).
- Every section opens the same way: `.eyebrow` (blue rule + small caps label), then `.h2`, then optional `.link` on the right.
- Rhythm of backgrounds: photo + frosted night panel (hero) → paper (Featured) → white (About us) → night (Cleanovation) → paper (Products) → mist (Visit) → paper (Help) → night footer. Keep alternating light/dark this way when adding sections.
- Numbered items (`01`–`07`, `.num-sm`) for cards, rows, tiles, the tech list and help tiles.
- Photography does the selling. No stock imagery (the current in.toto.com uses stock photos for Contact/FAQ; that is one of the things this concept fixes).

## Motion rules (premium, never busy)

Allowed, and already implemented:
1. Hero photographs settle from `scale(1.06)` over 2.6s and cross-fade (.9s) when they become current; the copy fades up 14px in a short stagger (on load and on every slide change).
2. `.reveal` elements fade up 16px once, when scrolled into view (IntersectionObserver). Stagger with `style="--d:80ms"`.
3. Image hover zoom to `1.04` over 1.4s; arrow nudges 4px on link hover.
4. Header is always the frosted porcelain bar (`.site-header.is-solid`, `rgba(246,247,247,.92)` + blur), from the very top of the page (requested). It turns fully solid `--paper` while the Products mega menu is open. It hides on scroll down and returns on scroll up, after Carysil (requested): always shown within 88px of the top, while a menu is open and when keyboard focus enters it; otherwise a downward move of more than 14px slides it up (`.is-hidden`, .45s ease-in) and an upward move of more than 10px brings it back (.55s ease-out). Logic in `Header.jsx`.
6. Mega menu: Categories/Series lists fade in 6px from the left on change; preview images cross-fade (.6s).
5. Hero autoplay (requested): each key visual shows for 6.5s, then cross-fades to the next and loops. The active tab's line fills over that time (`kvProgress`); its `animationend` advances the slide, so the timer and the line can never drift apart. A pause/play button sits beside the arrows (WCAG 2.2.2). Hovering or focusing the copy panel holds it. With reduced motion there is no autoplay and no pause button. Tabs, arrows, arrow keys and mostly-horizontal swipes (50px) still work and loop.
7. Hero pin (requested, copied from Carysil's diptych): `.hero` is 200svh tall and `.hero-stage` is sticky for one screen of scroll. Over that runway the frosted panel slides left to `-110%` with a power2.in curve (`p²`) and the photo scales to 1.04, eased towards the scroll position like a .55s scrub. Hand-written in `KeyVisuals.jsx` (no GSAP). With reduced motion there is no pin and nothing moves. Tabbing into the panel while it is off-screen scrolls back to the top so it returns.

Not allowed (the hero pin and hero autoplay above are the approved exceptions): parallax, scroll-jacking, other autoplaying carousels or sliders, marquees, count-up numbers, custom cursors, page-transition effects, bouncing or spring easings.

Always:
- Respect `prefers-reduced-motion` (the existing media query switches everything off).
- Keep the reveal safety net: if the observer never reports within 1.5s, everything is revealed. Content must never be stuck invisible.
- Use the shared easing `--ease`.

## Page map

| Section | id | Notes |
|---|---|---|
| Header + Products mega menu | `#header`, `#panel-products` | after Carysil: search row (submits to in.toto.com search), then Browse (8 groups) → Categories → Series → Preview card. Data in `megaMenu` (`src/data.js`), all taken from in.toto.com category pages; only WASHLET, Smart Toilet (NEOREST) and Faucet series have a Series list. Hover opens on mouse (90ms intent delay on Browse); click/Enter toggles on touch/keyboard; focus also switches groups; Esc closes. Preview images load only after the first open. Below 1280px the preview card hides |
| Mobile menu | `#mobile-menu` | below 1100px; locks page scroll while open |
| Hero | `#top` | after Carysil's diptych: full-bleed photo, copy on a frosted night panel (`rgba(14,17,19,.66)` + blur) aligned to the header logo. 4 key visuals: NEOREST (holds the `<h1>`), TOTO Cleanovation, Brand purpose, Design ("Understated presence"). They advance automatically (motion rule 5) with a pause button. Each has a white primary button (turns `--blue-deep` on hover) and a ghost "Visit the showroom" button. All copies share one grid cell so the panel never jumps; hidden ones are `inert`. Below 860px the panel becomes a bottom sheet and `posSm` sets the photo crop. On scroll the hero pins for one screen while the panel slides off left (motion rule 7) |
| Featured | `#featured` | 4 cards (3:4): TOTO Stories, Inspiration, Global reference, Design; swipe row on phones |
| About us | `#about` | 東洋陶器 founding mark, 4 link rows with thumbnails (Brand purpose, About TOTO Group, Our journey, News & events), 4 stats |
| TOTO Cleanovation | `#cleanovation` | 4 tall tiles with captions (Cleanovation, WASHLET, CLEAN SYNERGY, touchless) + tech row: CEFIONTECT, TORNADO FLUSH, EWATER+, ACTILIGHT |
| Products | `#products` | wide NEOREST banner (models AS · LS · NX · WX), 6 tiles (3:2), category chips |
| Visit | `#showroom` | Delhi Showroom split + "TOTO in Japan": TOTO Museum, TOTO GALLERY·MA, experience TOTO |
| Help | `#support` | Where to buy, Catalogue, Customer care, FAQs |
| Footer | | product / company / support links, region picker, socials, concept note |

Every link points at the **live in.toto.com page** it replaces, so the concept is clickable end to end. Content that only exists globally (TOTO Stories, Global reference, touchless, the Japan facilities) links to toto.com / jp.toto.com.

Breakpoints: `1100px` (nav → menu button, 4 → 2 columns), `860px` (split layouts stack, hero panel moves to the bottom), `640px` (phone: swipe rows, full-width buttons).

## Content and facts

Copy must stay factual. Do not invent specs, prices, addresses, phone numbers, awards or opening hours. Current facts and where they come from:

- Founded 1917 in Kitakyushu, Japan, as Tōyō Tōki (東洋陶器).
- WASHLET introduced 1980; **70 million+** units shipped worldwide (TOTO press release, 9 Dec 2025, milestone reached Nov 2025).
- NEOREST: **4 million+** units shipped worldwide (as of March 2025).
- Made in India at the Halol, Gujarat plant since **2014** (operations began Aug 2014).
- Delhi Showroom: TOTO's flagship in New Delhi, **800+ products** on display, including G Selection showers (May 2026 press). The exact address is deliberately not on the page, because it could only be confirmed from third-party listings. Link to `/delhi-showroom/` instead.
- NEOREST models shown on in.toto.com: AS, LS, NX, WX.
- Brand purpose quote ("Create an enriched and more comfortable lifestyle and culture.") is TOTO's own wording.
- experience TOTO is TOTO's public restroom in the arrivals lobby of Narita International Airport Terminal 1 (toto.com/en/experiencetoto). TOTO Museum is in Kitakyushu; TOTO GALLERY·MA is TOTO's architecture gallery in Tokyo (its photo is credited © Nacasa & Partners Inc. on the page).
- Reference hotels (used in `index-editorial.html`): Le Meurice, Hôtel Plaza Athénée, The Peninsula London and 7132 Hotel appear in TOTO Europe's references; the "Also at" list is from in.toto.com (its misspelling "Baredessono" is corrected to Bardessono).

## Images

All photography belongs to TOTO and its partners, and was taken from TOTO's own sites (in.toto.com, toto.com, eu.toto.com, asia.toto.com) **for this pitch only**. Before any production launch, get the original high-resolution files from TOTO's marketing team and swap them in under the same filenames.

| File | Source | Size |
|---|---|---|
| `hero.webp` | eu.toto.com key visual (kv-04), top 62px cropped to remove the pavilion ceiling behind the white header | 1920×922 |
| `neorest-lineup.webp` | toto.com/en/neorest | 1920×720 |
| `col-neorest.webp` | eu.toto.com NEOREST header, 3:4 crop | 886×1182 |
| `col-washlet.webp` | eu.toto.com, 3:4 crop | 711×948 |
| `col-tub.webp` | eu.toto.com Flotation Tub, 3:4 crop | 900×1201 |
| `col-shower.webp` | asia.toto.com shower, 3:4 crop | 475×633 |
| `tech.webp` | toto.com/en/purpose, 1:1 crop | 1000×1000 |
| `design.webp` | toto.com/en/gb_faucet banner | 1475×398 |
| `hotel-*.webp` | eu.toto.com references, 3:4 crops | 760×1014 |
| `showroom.webp` | in.toto.com Delhi showroom | 929×805 |
| `og.jpg` | hero, 1200×630 | |
| `kv-cleanovation.webp` | toto.com/en/cleanovation main visual | 1550×872 |
| `kv-purpose.webp` | toto.com/en/purpose (Sustainable) | 1920×1080 |
| `kv-design.webp` | toto.com/en/gb_faucet G Selection banner, 16:9 crop | 1422×800 |
| `feat-stories.webp` | toto.com/en/purpose (Carbon Neutral), 3:4 crop | 810×1080 |
| `feat-design.webp` | toto.com/en/gb_shower matte black faucet, 3:4 crop above the Red Dot badge | 812×1082 |
| `clean-cleanovation.webp`, `clean-touchless.webp` | toto.com/en/purpose strategy images, 3:4 | 960×1280 |
| `clean-synergy.webp` | toto.com/en/cleanovation clean-synergy (TORNADO FLUSH), 3:4 crop | 408×544 |
| `prod-washlet.webp` | toto.com/en/washletplus, 3:2 | 1000×667 |
| `prod-faucet.webp`, `prod-basin.webp` | toto.com/en/gb_lavatory colour spaces, 3:2 | 1000×666 |
| `prod-shower.webp` | toto.com/en/gb_shower, 3:2 | 1000×667 |
| `prod-public.webp` | toto.com/en/experiencetoto, 3:2 | 1000×667 |
| `about-*.webp` | toto.com Global homepage About us / News thumbnails (`about-group` from toto.com/en/corporate) | 333×222, 480×360 |
| `visit-*.webp` | toto.com Global homepage facility thumbnails (`visit-gallery` cropped above its credit line) | 420×275 |

The React page loads about 1.6 MB of images. `col-shower`, `tech`, `design` and `hotel-meurice/peninsula/7132` are only used by `index-editorial.html`.

Image conventions: WebP at quality 68–84, max 1920px wide, cards 3:4. Always set `width`/`height` attributes; `loading="lazy" decoding="async"` on everything except the hero (which is preloaded with `fetchpriority="high"`). Keep total image weight around 2 MB or less. Pillow with WebP support (`python -m pip install pillow`) is enough to crop and export.

Note: in.toto.com sits behind an AWS WAF that blocks scripted downloads, and hotlinking from it would break, so images are always self-hosted in `assets/img`.

## Accessibility checklist

Skip link, one `<h1>`, landmarks (`header`, `nav`, `main`, `footer`), descriptive `alt` on every content image (empty `alt` for decorative ones), `aria-expanded` on the panel and menu toggles, Esc to close, visible `:focus-visible` ring in TOTO blue, AA contrast for text (use `--blue-deep`, not `--blue`, behind white text), no horizontal scroll at 320px and up.

## Run locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4173 (hot reload). To check the production build:

```bash
npm run build
```

```bash
npm run preview
```

The preview runs at http://localhost:4174.

## Deploy to Vercel (free Hobby plan)

**Option A: GitHub + Vercel dashboard (recommended)**
1. Push this folder to a new GitHub repository.
2. On https://vercel.com/new, import the repo.
3. Framework Preset: **Vite** (picked up automatically from `vercel.json`: build `npm run build`, output `dist`).
4. Deploy. Each push to `main` redeploys automatically.

**Option B: Vercel CLI**
```bash
npx vercel
```
Follow the prompts (log in, link a new project, accept defaults), then publish to production:
```bash
npx vercel --prod
```

**After the first deploy:** in `index.html` replace the relative `og:image` (`assets/img/og.jpg`) with the full URL, e.g. `https://<project>.vercel.app/assets/img/og.jpg`, and add a matching `og:url`, so WhatsApp, LinkedIn and email previews show the hero image.

**Going live for real (only once TOTO approves):** remove the `robots` meta tag in `index.html`, the `X-Robots-Tag` header in `vercel.json`, and the `Disallow` in `public/robots.txt`; remove the footer concept note (`src/components/Footer.jsx`); swap in licensed images (same filenames in `public/assets/img`).

## When editing

- Content changes go in `src/data.js`; layout changes go in the components; styling goes in `src/index.css`.
- Reuse the existing classes and tokens before adding new ones; match the comment style (section banners in CSS, short why-comments in JS/JSX).
- Keep `npm run build` passing, with no console errors or React warnings in `npm run dev`.
- After any change, check 375px, 768px and 1440px widths, with reduced motion on and off, and confirm there is no horizontal scroll and no console errors.
