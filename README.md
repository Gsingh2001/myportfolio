# Gurmanpreet Singh — Portfolio

A modern, minimal personal portfolio built with **React + Vite + Tailwind CSS**.

## Tech Stack

- **React 18** — UI library
- **React Router 6** — Client-side routing for project case-study pages
- **Vite 5** — Lightning-fast build tool & dev server
- **Tailwind CSS 3** — Utility-first CSS
- **Recharts** — Charts (trajectory plots, cluster scatter, loss curves)
- **Lucide React** — Icon set
- **Google Fonts** — Inter + JetBrains Mono

## Routes

- `/` — Single-page portfolio (Hero, About, Skills, Projects, Experience, Education, Awards, Contact)
- `/projects/astraios` — Project Astraios case study (per-scene trajectory charts)
- `/projects/medlinguists` — MedLinguists case study (pipeline, capabilities, sample report)
- `/projects/algonauts` — Algonauts Challenge 2023 case study (training curves, reconstruction grid)
- `/projects/travelai` — TravelAI case study (cluster scatter, personas, sample recommendations)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Hot reload is enabled.

### 3. Build for production

```bash
npm run build
```

The optimized output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── index.html              # HTML entry point
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind theme & content paths
├── postcss.config.js       # PostCSS pipeline
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Root component
    ├── index.css           # Tailwind directives + globals
    ├── data.js             # All portfolio content (single source of truth)
    ├── pages/
    │   ├── Home.jsx
    │   └── ProjectDetail.jsx
    └── components/
        ├── Navbar.jsx
        ├── ScrollToTop.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── Experience.jsx
        ├── Education.jsx
        ├── Awards.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        └── projects/
            ├── AstraiosDetail.jsx
            ├── MedLinguistsDetail.jsx
            ├── AlgonautsDetail.jsx
            └── TravelAIDetail.jsx
```

## SPA Hosting Note

Because the site uses client-side routing, deployment hosts need an SPA fallback so deep links like `/projects/astraios` work on refresh:

- **Vercel / Netlify** — auto-detected, no config needed.
- **Cloudflare Pages** — add a `_redirects` file with `/*  /index.html  200`.
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` after build, or use `HashRouter`.

## Customising Content

All copy, links, skills, and projects live in **`src/data.js`**. Edit that one file to update the entire site — no component code needs to change.

```js
// src/data.js
export const personal = {
  name: "Your Name",
  role: "Your Role",
  email: "you@example.com",
  // ...
}
```

## Customising Theme

Brand colours, fonts, and animations are defined in **`tailwind.config.js`** under `theme.extend`. The default palette is a neutral "ink" greyscale designed for a modern minimal look.

## Deployment

This is a static site after build — deploy `dist/` to any host:

- **Vercel** — `vercel` (zero config)
- **Netlify** — drag and drop `dist/`
- **GitHub Pages** — push `dist/` to `gh-pages` branch
- **Cloudflare Pages** — connect repo, build command `npm run build`, output dir `dist`

## License

© Gurmanpreet Singh. All rights reserved.
