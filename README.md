# Araverse

Araverse is a long-term personal art archive with a curated public artistic
portfolio built on top of it.

The application is being developed as a responsive personal archive for
organizing, browsing, managing, and presenting artwork created since 2015.

## Project status

Stage 1 — UI with local data — complete.

The current frontend demonstrates the public Guest Mode with selected,
optimized artwork samples. Data is currently defined locally in TypeScript;
authentication, persistence, and storage integration have not been implemented
yet.

Next: Stage 2 — Supabase model and integration.

## Current features

- responsive dark navy interface with desktop and mobile navigation;
- curated Home and Portfolio views;
- browsing by Years, Collections, and Techniques;
- search by title, subject, source, and optional note;
- Color Mode filtering;
- image-first responsive galleries using real optimized WebP artwork;
- addressable artwork URLs and gallery-context lightbox;
- Previous/Next navigation with keyboard and mobile swipe support;
- linked artwork metadata;
- loading, missing-image, empty, 404, and application error states;
- initial accessibility behavior including keyboard navigation, focus
  management, skip link, reduced-motion support, and dynamic document titles;
- strict frontend Guest Mode exclusion of Private and Mature artwork.

## Stack

- React
- TypeScript
- Vite
- React Router
- CSS Modules
- npm
- ESLint
- Prettier
- Git and GitHub

Planned for later stages: Supabase and Netlify.

## Local development

### Requirements

- Node.js 22 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run lint` — check the code with ESLint
- `npm run format` — format files with Prettier
- `npm run format:check` — verify formatting
- `npm run preview` — preview the production build locally

Before committing, run:

```bash
npm run format:check
npm run lint
npm run build
```

## Project documentation

See [araverse-project-brief.md](./araverse-project-brief.md) for the current
product scope, architecture direction, and implementation stages.

## Artwork files

The original artwork archive is private and is not stored in this repository.
Only deliberately selected and optimized development assets may be committed.
