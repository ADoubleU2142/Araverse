# Araverse — Project Brief

## 1. Project overview

**Araverse** is a personal art archive and public artistic portfolio for organizing, browsing, searching, maintaining, and presenting artwork created over many years.

The project originates from a real need: the artwork archive currently spans more than a decade and contains over 500 image files organized primarily by year. Older works are difficult to browse quickly or present coherently from a phone, photo gallery, or cloud drive.

Araverse should provide one central, structured place for the archive while also exposing a curated public-facing portfolio.

The application has two distinct purposes:

1. **Personal archive and management tool** for the owner.
2. **Public artistic portfolio** that can be shared with recruiters, potential art clients, friends, or anyone interested in the work.

Araverse is not intended to be a social network, marketplace, image editor, or general-purpose gallery platform.

## 2. Product goals

Araverse should allow the owner to:

- maintain a complete multi-year artwork archive;
- browse works primarily by year;
- organize works using collections, techniques, subjects, and metadata;
- quickly find older works;
- distinguish public and private artwork;
- distinguish Safe, Sensitive, and Mature content;
- maintain a curated artistic portfolio;
- maintain personal favorites;
- add and edit individual artworks;
- import and classify large groups of historical works efficiently;
- manage the archive without direct database editing;
- show artwork conveniently from a phone;
- share an individual image using normal device/browser sharing capabilities.

The public portfolio should allow visitors to:

- view a curated introduction to the owner's artwork;
- browse selected public collections;
- browse public works by year and technique where enabled;
- browse the portfolio selection;
- browse selected favorites if the owner chooses to expose them;
- search public artwork;
- open individual artwork in an image-focused viewer;
- access only content intended for public presentation.

## 3. Archive characteristics

The current archive:

- begins in **2015**;
- contains **500+ image files**;
- is organized primarily into year folders;
- contains artwork with many different aspect ratios;
- includes both traditional and digital work;
- includes Safe, Sensitive, and Mature content;
- includes public works as well as personal/private works;
- includes recurring projects and collections such as Inktober.

Original high-resolution files remain outside the application as the source archive.

Araverse stores optimized display versions suitable for web use.

## 4. Target devices

Araverse must be responsive from the beginning.

### Mobile

Mobile is the primary everyday owner experience.

Typical use cases include:

- finding an old drawing;
- showing artwork to someone in person;
- browsing a year or collection;
- adding a new artwork;
- editing metadata;
- temporarily hiding private or Mature works while showing the archive to another person;
- sharing an individual image through Messenger or another installed application where supported by the device/browser.

The mobile interface must be fully functional rather than a reduced desktop layout.

### Desktop

Desktop is particularly important for:

- initial archive import;
- bulk classification;
- archive maintenance;
- reviewing large galleries;
- portfolio/demo presentation;
- recruiter viewing;
- development and testing.

## 5. Application modes

Araverse has two main modes.

### Guest Mode

Guest Mode is the public artistic portfolio.

It is intended for:

- recruiters viewing the programming project;
- people interested in the artwork;
- potential art commissions or clients;
- friends or other people receiving the portfolio link.

Guest Mode is read-only.

There is no public registration.

Guest Mode does **not** expose the entire owner archive automatically. The owner decides which parts are suitable for public presentation.

Publicly exposed content may include:

- Portfolio;
- selected Collections;
- selected Years;
- selected Techniques;
- selected Favorites if desired;
- public search results;
- individual public artwork reachable from those views.

Private artwork is never visible.

Mature artwork is never visible in Guest Mode.

Sensitive artwork may be shown normally.

### Owner Mode

Owner Mode is the full personal archive and management environment.

It includes:

- the complete browsing experience;
- adding artwork;
- editing artwork;
- deleting artwork;
- bulk selection;
- bulk editing;
- managing collections;
- managing techniques and subjects;
- managing covers;
- setting Portfolio and Favorite flags;
- setting Public/Private visibility;
- setting content level;
- importing historical artwork;
- viewing private artwork when enabled;
- viewing Mature artwork when enabled.

Owner Mode should extend the same application rather than use a completely separate admin interface.

## 6. Owner display controls

The owner needs quick display controls because Araverse may be opened on the owner's phone while another person is physically viewing the screen.

### Show Private

The owner can toggle whether Private artwork is currently visible in their own browsing session.

Turning this off does not change the artwork's stored visibility.

It simply hides Private works from the current owner view.

### Show Mature

The owner can toggle whether Mature artwork is currently visible.

Mature artwork should remain hidden from the normal owner browsing experience unless this option is enabled.

Sensitive artwork does not require a special reveal in Owner Mode.

## 7. Authentication

Araverse has one owner account.

Preferred approach:

- Supabase Auth;
- no public Sign Up;
- discreet Login entry for the owner;
- persistent authenticated session;
- anonymous visitors use Guest Mode.

A custom one-time activation system is not required unless a later implementation need appears.

## 8. Core entity: Artwork

Artwork is the central entity of Araverse.

Each artwork has exactly **one image**.

### Required states

Every Artwork must have:

- image;
- year;
- content level;
- visibility;
- gift type.

Only image and year normally require explicit user input.

Defaults:

- content level = `Safe`;
- visibility = `Public`;
- gift type = `None`.

Required business states must have explicit values. `NULL` must not implicitly mean Safe, Public, or None.

### Optional properties

An Artwork may contain:

- exact date;
- title;
- note/description;
- color mode;
- techniques;
- subjects;
- collections.

### Artwork flags

Artwork may independently be:

- Favorite;
- Portfolio.

These are first-class properties rather than user-created tags.

## 9. Dates

Year is the primary chronological property.

Every Artwork must have a year.

Exact date is optional.

When only the year is known, Araverse must not invent a full date.

## 10. Visibility

Visibility is independent from content level.

### Public

A Public artwork may be eligible for Guest Mode.

Public does not necessarily mean that every public artwork must appear everywhere in the Guest portfolio.

Default: `Public`.

### Private

Private artwork is available only to the authenticated owner.

Private artwork must never be exposed to Guest Mode.

## 11. Content levels

Every Artwork has one explicit content level.

### Safe

Normal work suitable for general presentation.

Default: `Safe`.

### Sensitive

Potentially stronger content, for example:

- horror;
- gore;
- lingerie;
- suggestive imagery.

Sensitive artwork may be displayed normally in Guest Mode if otherwise public and included in the public presentation.

### Mature

Adult content such as nudity or other work that should never appear unexpectedly.

Mature artwork:

- is never visible in Guest Mode;
- is hidden in Owner Mode unless `Show Mature` is enabled;
- is not represented by blurred placeholders in Guest Mode.

There is no public Mature-content reveal flow in the MVP.

## 12. Gift type

Gift status is separate from visibility.

Possible states:

- `None`;
- `Regular`;
- `Personal`.

A Personal gift is not automatically Private.

## 13. Techniques

Techniques describe **how or with what the artwork was created**.

Examples:

- Pencil;
- Markers;
- Colored Pencils;
- Charcoal;
- Ink;
- Line Art;
- Acrylic;
- Digital;
- Mixed Media.

An Artwork may have multiple Techniques.

Techniques must be dynamically manageable from the application.

Techniques are a major navigation category in both Owner Mode and, where enabled, Guest Mode.

## 14. Subjects

Subjects describe **what appears in the artwork**.

Examples:

- Human;
- Portrait;
- Animal;
- Cat;
- Dog;
- Flower;
- Landscape;
- Creature;
- Object.

An Artwork may have multiple Subjects.

Subjects must be dynamically manageable from the application.

Subjects are especially important for search and do not require a dedicated primary navigation tab in the MVP.

## 15. Color mode

Initial values may include:

- Color;
- Black & White;
- Black & White + Accent.

An Artwork has at most one primary Color Mode.

Color Mode may remain unset.

## 16. Collections

Collections represent deliberate artistic series or groups.

Examples:

- Inktober 2020;
- Inktober 2021;
- Rainbow Animals.

An Artwork may belong to multiple Collections.

A Collection may contain:

- name;
- optional description;
- optional custom cover;
- public portfolio visibility state;
- artworks.

The owner decides which Collections are available in Guest Mode.

### Collection cover

A Collection may have a manually uploaded custom cover.

If no custom cover exists, the first eligible Artwork is used.

No automatic collage generator is required.

## 17. Years

Years are a primary archive navigation structure.

Each Year view includes:

- year;
- artwork count;
- cover.

The owner may decide which Years are available in Guest Mode.

### Year cover

A Year may have a custom cover.

If no custom cover exists, the first eligible Artwork is used.

Artwork count is calculated automatically.

## 18. Portfolio

Portfolio is a curated system gallery representing works deliberately selected for artistic presentation.

It is based on an Artwork-level Portfolio flag rather than duplication into a manual Collection.

Portfolio is a central part of Guest Mode.

## 19. Favorites

Favorites represent the owner's personal favorite works.

Favorites are independent from Portfolio.

The owner may choose whether Favorites appear as a section in Guest Mode.

## 20. Guest Mode curation

Guest Mode is not an automatic mirror of all Public records.

The owner controls the public presentation.

The portfolio may expose:

- Portfolio;
- selected Collections;
- selected Years;
- selected Techniques;
- optionally Favorites.

Guest navigation must never provide a route into Private or Mature content.

## 21. Main navigation

Suggested mobile owner navigation:

- Home;
- Years;
- Collections;
- Techniques;
- Account.

For the owner, adding artwork should use a prominent `+` action rather than a permanent Add/Edit navigation section.

Editing is accessed from the current Artwork or management context.

Guest navigation may use the same visual structure while exposing only portfolio-approved sections.

## 22. Home

Home is an introduction and overview rather than an All Artworks page.

Possible content:

- Araverse identity;
- archive summary, e.g. `500+ artworks since 2015`;
- search;
- Portfolio / Featured works;
- selected Collections;
- Years;
- Techniques;
- optional Favorites.

Home must work as both the owner's starting point and the public artistic portfolio landing page.

## 23. Archive browsing philosophy

Araverse does not require a prominent public `All Artworks` view.

Meaningful browsing paths are preferred:

- Home;
- Portfolio;
- Years;
- Collections;
- Techniques;
- Search.

The owner may have an internal All Artworks management view if useful.

## 24. Gallery

Artwork galleries are image-first.

A masonry-style layout is preferred because artworks have different aspect ratios.

Images should not be aggressively cropped into identical tiles.

A Gallery may represent:

- a Year;
- a Collection;
- a Technique;
- Portfolio;
- Favorites;
- search results;
- owner management results.

## 25. Artwork viewer

Opening an Artwork uses an image-focused modal/lightbox.

Approximately 80% of the visual emphasis should remain on the artwork.

The viewer should support:

- close;
- large image;
- previous/next navigation where applicable;
- swipe navigation on mobile where practical;
- optional title;
- year or exact date;
- techniques;
- subjects;
- collections;
- optional note.

Metadata appears below the artwork and remains visually secondary.

Owner actions may include Edit, Favorite/Unfavorite, Add/Remove Portfolio, Visibility, Content Level, Delete, and Share/Save image where supported.

An individual public Artwork should still be addressable by URL.

## 26. Individual image sharing

Araverse does not implement scoped gallery-sharing links in the MVP.

The owner may want to send a **single artwork image** directly through Messenger, WhatsApp, or another application.

Where supported, Araverse may use native browser/device sharing capabilities such as the Web Share API.

If file sharing is unavailable, an owner-side Save/Download option may be used as a fallback.

No direct Messenger integration is required.

## 27. Search

Search should primarily include:

- Subjects;
- Titles;
- optionally Notes.

Most works do not have titles, so Subject search is essential.

Years, Collections, and Techniques already have structured navigation/filtering.

## 28. Filtering

Depending on context, useful filters may include:

- Year;
- Technique;
- Subject;
- Color Mode;
- Collection;
- Portfolio;
- Favorite;
- Content Level;
- Visibility for the owner.

Owner-only display toggles such as Show Private and Show Mature must remain distinct from permanent metadata changes.

## 29. Sorting

Historical artwork order must not depend on database creation time.

Preferred order:

1. exact date ascending, where known;
2. stable `sort_order`;
3. stable identifier as a deterministic final tie-breaker.

Conceptually:

```text
exact_date ASC NULLS LAST
sort_order ASC
stable_id ASC
```

Manual drag-and-drop ordering is not required in the MVP.

## 30. Initial archive import

The existing archive is organized into year folders.

Preferred workflow:

1. import/select a year folder;
2. automatically assign the year;
3. create one Artwork entry per valid image;
4. assign defaults: Safe, Public, None gift type;
5. preserve stable artwork order;
6. display imported works in the year management gallery;
7. classify groups through Bulk Mode;
8. edit individual exceptions afterward.

The owner must not complete 500 full forms manually.

## 31. Image optimization

The full source archive must never be committed to Git or placed in the application's `public` directory.

The repository contains only a small number of deliberately selected optimized demo/mock images during development.

The original archive remains local as the source-of-truth collection until migration.

For initial import, images may be batch resized/compressed locally on Linux.

For future normal uploads, client-side image optimization should be considered.

Exact dimensions, format, and quality are implementation details to determine through testing.

## 32. Bulk management

Bulk management is a core owner feature.

Useful bulk operations include:

- add/remove Technique;
- add/remove Subject;
- add/remove Collection;
- set Content Level;
- set Visibility;
- set/unset Portfolio;
- set/unset Favorite;
- set Gift Type.

Title, exact date, and Note remain primarily individual properties.

## 33. Adding a single artwork

Required explicit input:

- image;
- year.

Year may default to the current year but remains visible/editable.

Automatic defaults:

- Safe;
- Public;
- None gift type.

Optional input:

- exact date;
- title;
- note;
- Color Mode;
- Techniques;
- Subjects;
- Collections;
- Favorite;
- Portfolio;
- Visibility;
- Gift Type;
- Content Level.

New Techniques and Subjects can be created directly from this workflow.

## 34. Editing

All Artwork metadata remains editable.

Normal management must not require direct database access.

Collections, Techniques, Subjects, Guest curation, and covers should also be manageable through the application.

## 35. Covers

Years and Collections follow one rule:

1. use a custom cover if one exists;
2. otherwise use the first eligible Artwork.

No automatic collage generator or in-app cover editor is required.

## 36. Logical data relationships

This section describes the logical model only and intentionally does not define SQL.

- Every Artwork belongs to exactly one Year.
- An Artwork may have multiple Techniques.
- An Artwork may have multiple Subjects.
- An Artwork may belong to multiple Collections.
- Portfolio, Favorite, Visibility, Content Level, Gift Type, Color Mode, year, date, title, and note belong directly to Artwork or its immediate metadata model.
- A Year may have one optional custom cover.
- A Collection may have one optional custom cover.
- Years, Collections, Techniques, and optional Favorites may require a public-presentation state so the owner can decide whether they appear in Guest Mode.

The exact physical model is deferred until the Supabase design stage.

## 37. Dynamic classification

Techniques and Subjects must be extensible from the UI.

The application must not assume that the complete classification vocabulary is known beforehand.

## 38. Visual direction

Araverse should use a **dark navy / blue visual direction**.

General characteristics:

- very dark navy main background;
- slightly lighter navy surfaces;
- off-white primary text;
- blue-gray secondary text;
- restrained blue accent;
- generous whitespace;
- minimal visual noise.

Exact colors are intentionally not fixed yet.

The goal is a neutral dark environment where white paper stands out, black artwork remains distinguishable from the background, and colorful artwork provides most of the visual color.

## 39. Development imagery

Stage 1 should use real artwork rather than generic placeholders.

A small set of approximately 12–20 optimized works should cover different aspect ratios, years, Techniques, Collections, Subjects, Safe/Sensitive examples, and both color and black-and-white work.

Mature artwork does not need to be committed merely to test UI behavior.

## 40. Routing direction

Initial routes may follow:

```text
/
/portfolio
/years
/years/:year
/collections
/collections/:slug
/techniques
/techniques/:slug
/artworks/:id
/search?q=...
```

An Artwork opened from a Gallery should use a lightbox while still having an addressable URL.

Expected behavior:

- opening Artwork changes the route;
- browser Back closes the Artwork and returns to the previous Gallery;
- previous scroll position should be preserved where practical;
- direct navigation to an Artwork URL must work.

## 41. Browser support

Target contemporary versions of Chrome, Firefox, Edge, Safari, and modern mobile browsers.

Legacy browser support is not required.

## 42. Hosting

Current deployment direction: **Netlify**.

Development remains local.

Production deployment should eventually connect to GitHub.

SPA fallback behavior must be configured correctly.

A custom domain may be connected later.

## 43. Technology stack

Current planned stack:

- React;
- TypeScript;
- Vite;
- React Router;
- CSS Modules;
- small global CSS layer;
- Supabase PostgreSQL;
- Supabase Auth;
- Supabase Storage;
- Supabase JavaScript client;
- Node.js for tooling;
- npm;
- Git;
- GitHub;
- Netlify;
- ESLint;
- Prettier.

Additional libraries should be introduced only when they solve a demonstrated need.

Not required initially:

- Redux;
- TanStack Query;
- Tailwind;
- large UI component frameworks;
- custom Node/NestJS backend;
- heavy lightbox libraries.

## 44. Development goals

Araverse should provide practical experience with React, TypeScript, component architecture, React Router, npm/package management, Vite, Git branches, GitHub Pull Requests, environment variables, Supabase, Auth, Storage, relational data, RLS, image handling, responsive design, deployment, and project documentation.

The project should not introduce technologies solely to make the stack appear larger.

## 45. Git and GitHub workflow

`main` represents the stable project state.

Meaningful features may use short-lived branches such as:

```text
feature/app-shell
feature/artwork-gallery
feature/collections
feature/auth
feature/bulk-import
```

Selected features should be merged through GitHub Pull Requests to practice branch → commit → push → Pull Request → diff review → merge.

Professional habits are desired without unnecessary solo-project bureaucracy.

## 46. Repository rules

Araverse lives in its own dedicated folder and Git repository.

The full artwork archive must not be committed.

Git should ignore at least:

```text
node_modules/
dist/
.env
.env.local
Rysunki/
```

The exact local archive folder name may differ.

Environment configuration may use `.env.example`.

Private credentials and service-role secrets must never be committed or exposed in browser code.

## 47. VS Code workspace

Araverse should normally be opened as its own VS Code workspace/folder.

Other projects should not be mixed into the same workspace while using an AI coding assistant unless there is a deliberate reason.

## 48. README strategy

A concise README should exist from the start and explain project purpose, status, stack, local setup, and point to this Project Brief.

Near completion it should become a portfolio-quality README containing problem, solution, screenshots, features, architecture, responsive behavior, technology choices, security/access approach, deployment, and lessons learned.

## 49. Implementation stages

### Stage 0 — Project setup

- Node/npm;
- React + TypeScript + Vite;
- Git;
- GitHub;
- `.gitignore`;
- ESLint;
- Prettier;
- README;
- Project Brief;
- local dev server;
- production build verification.

### Stage 1 — UI with mock data

Use real optimized artwork samples.

Build frontend data types, routing, responsive application shell, mobile and desktop navigation, Home, Portfolio, Years, Collections, Techniques, Galleries, Artwork lightbox, Search, responsive behavior, representative empty/loading/error states, and initial accessibility behavior.

A small static preview of owner controls may be included where useful, but Auth and persistence are not implemented yet.

### Stage 2 — Supabase model and integration

Translate the logical model into a reviewed database design, create the Supabase project, integrate the client, configure Storage strategy, replace relevant mock data with backend data, and establish secure Public/Private access foundations.

### Stage 3 — Owner management

Implement Auth, owner session, Add/Edit Artwork, upload, dynamic Techniques and Subjects, Collections, content levels, visibility, Portfolio/Favorite management, covers, and individual image Share/Save behavior.

### Stage 4 — Historical migration and bulk tools

Implement local image optimization, year-folder import, automatic year assignment, stable ordering, default states, bulk selection/classification, and progressive import of the full archive.

### Stage 5 — Guest portfolio and security

Implement public Guest Mode, public curation of Years/Collections/Techniques/Favorites, Portfolio presentation, strict Private exclusion, strict Mature exclusion, RLS review, anonymous/public query rules, and security verification.

### Stage 6 — Polish and deployment

Perform responsive polish, accessibility review, loading/error UX, production build testing, Netlify deployment, GitHub deployment workflow, final README, screenshots, portfolio presentation, and cleanup.

## 50. Decisions intentionally deferred

The following are deferred until their implementation stage:

- physical PostgreSQL tables;
- SQL constraints;
- exact RLS policies;
- Storage bucket structure;
- exact image dimensions and compression settings;
- pagination;
- caching;
- exact authentication UI;
- responsive breakpoints;
- exact visual tokens/colors;
- indexes;
- detailed accessibility implementation.

## 51. Known architectural limitation

Araverse intentionally uses a Vite SPA rather than server-side rendering.

This may provide weaker SEO, per-Artwork social previews, and dynamic metadata than a server-rendered framework such as Next.js.

This is an accepted trade-off because the current educational goal is to learn React + TypeScript clearly without introducing Next.js prematurely.

## 52. MVP scope

The MVP includes:

- responsive Owner Mode;
- responsive Guest Mode;
- owner authentication;
- one image per Artwork;
- Years;
- optional exact dates;
- Titles;
- Notes;
- Techniques;
- Subjects;
- Color Mode;
- Collections;
- Portfolio;
- Favorites;
- Public/Private visibility;
- Safe/Sensitive/Mature levels;
- Gift Type;
- owner Show Private toggle;
- owner Show Mature toggle;
- curated Guest portfolio;
- Home;
- Years view;
- Collections view;
- Techniques view;
- image-first galleries;
- Artwork lightbox;
- addressable Artwork URLs;
- Search;
- filtering;
- single Artwork creation;
- Artwork editing;
- dynamic Technique/Subject creation;
- historical year-folder import;
- Bulk Mode;
- custom Year covers;
- custom Collection covers;
- first-Artwork cover fallback;
- individual owner-side image sharing/saving;
- dark navy visual direction;
- real-artwork development assets;
- secure Guest access;
- Mature exclusion from Guest Mode;
- Netlify deployment.

## 53. Explicitly outside the MVP

Unless a real need appears, the following are not required:

- social accounts;
- followers;
- visitor likes;
- comments;
- public uploads;
- public registration;
- ecommerce;
- artwork ratings;
- image editing;
- automatic collage generation;
- AI artwork classification;
- automatic Technique/Subject recognition;
- multiple images per Artwork;
- complicated analytics;
- DRM;
- direct Messenger integration;
- dedicated Subject navigation tab;
- scoped gallery share links;
- guest Mature reveal;
- custom Node/NestJS backend;
- SSR/Next.js.

## 54. Product principle

Araverse should remain:

> **A private long-term art archive with a curated public artistic portfolio built on top of it.**

The private archive is optimized for organization, retrieval, management, and personal use.

The public Guest Mode is optimized for presentation.

New functionality should solve a real archive, browsing, management, or presentation problem.

Features should not be added solely to increase project size or technology count.
