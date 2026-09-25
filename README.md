# Optima Star Technical Services — Website

A redesigned, fully animated React website for **Optima Star Technical Services LLC** (Dubai waterproofing & technical contracting).

Built with **React 18 + Vite**, **Framer Motion** (animations), **React Router** (pages) and **Lucide** (icons). No CSS framework — one hand-written stylesheet with design tokens.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # preview the production build
```

Requires Node.js 18 or newer.

## Pages

| Route        | Page                                                          |
|--------------|---------------------------------------------------------------|
| `/`          | Home: hero slideshow, services, cross-section, projects, process |
| `/about`     | Company story, mission, vision, chairman's message            |
| `/services`  | Waterproofing systems and all 13 services                     |
| `/projects`  | Filterable case studies with photo galleries and lightbox     |
| `/contact`   | Contact cards, Google Map, booking form                       |

## Animations included

- First-visit loader: water rises behind the logo, then the curtain lifts
- Water-blue curtain wipe between pages
- Hero: crossfading slideshow with slow zoom, line-by-line headline reveal, parallax, animated waves
- Infinite services marquee
- **Signature interactive cross-section** of a waterproofed basement: layers draw in, groundwater rises as you scroll, hovering a layer isolates it
- Expanding waterproofing gallery panels
- Word-by-word heading reveals, staggered cards, clip-path image reveals, parallax images
- Process timeline that fills as you scroll
- Sliding active-pill navigation, hide-on-scroll header, circular-reveal mobile menu
- Project filter with animated layout, swipeable photo carousels, lightbox
- Liquid-fill buttons, animated rain on CTA, scroll progress bar, back-to-top ring
- All motion respects the visitor's "reduce motion" setting

## Folder structure

```
src/
  data/site.js          ← ALL text, phone numbers, services, projects, image URLs
  styles/global.css     ← design tokens (colours, fonts) + all styles
  components/           ← Navbar, Footer, Hero, CrossSection, Booking form, etc.
  pages/                ← Home, About, Services, Projects, Contact, NotFound
  App.jsx               ← routes + page transitions
```

## Editing content

Everything the client will want to change is in **`src/data/site.js`**: phone numbers, email, address, services, project case studies, mission/vision text.

To add a project, copy one object in the `projects` array and change the fields. Add as many images as you like to its `images` array.

## Images

Images currently load from the live site (`https://www.optimastaruae.com/images/...`). Before launch, move them into this project:

1. Download the images into `public/images/` (keep the same file names).
2. In `src/data/site.js`, set `IMAGE_BASE = '/images'`.
3. For project photos, update the `projectImg(...)` paths or replace them with `/images/your-file.jpg`.

Each project currently shows three photos; the old site had 6–8 per project, so add the rest to each `images` array.

## Booking form

There's no backend required. On submit, the form validates the fields and opens **WhatsApp** with all the details pre-filled (with an email fallback). To receive submissions directly instead, edit `handleSubmit` in `src/components/Booking.jsx` to POST to Formspree, EmailJS or your own API.

## Colours & fonts

Set in `:root` at the top of `src/styles/global.css`:

| Token          | Hex       | Use                          |
|----------------|-----------|------------------------------|
| `--ink`        | `#0B1E2B` | Dark sections, text          |
| `--water`      | `#1FA2D4` | Accents, water               |
| `--water-deep` | `#0E6E9A` | Marquee, CTA, transitions    |
| `--concrete`   | `#EEF0EE` | Page background              |
| `--star`       | `#F2B632` | Primary buttons              |

Fonts: **Archivo** (expanded, headings) and **Public Sans** (body), loaded from Google Fonts in `index.html`.

## Deploying

- **Vercel**: import the repo, framework "Vite". `vercel.json` handles page routing.
- **Netlify**: build command `npm run build`, publish directory `dist`. `public/_redirects` handles routing.
- **cPanel / shared hosting**: upload the contents of `dist/`, and add an `.htaccess` rewrite so all routes serve `index.html`.

## Not yet included

The old site had a "Certificate" menu item with no content. Add a page in `src/pages/` and a link in `components/Navbar.jsx` once the certificates are available.

## Content updates (v2)

- **Waterproofing only**: substructure (with pile head treatment), wet area, combo roof, injection treatment, GRP lining. Edit them in `src/data/site.js → services`.
- **Recent projects** page (`/recent-projects`): edit the table in `site.js → recentProjects`.
- **Warranty** (10–20 years on SBS membrane): `site.js → warranty`.
- **Team**: `site.js → team`. Replace the `XX+` experience placeholders and add headshots to `public/images/team/`, then set `photo: local('team/name.jpg')`.
- **Photos** live in `public/images/`. Reference them with `local('file.jpg')` so they work under the `/Optima/` base path.
