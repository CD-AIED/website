# CD-AIED

A research-group website built with Astro, plain CSS, and Markdown, deployed to GitHub Pages.

Every article is compiled ahead of time into HTML. The published site does not render Markdown in the browser and requires no server or database.

The only browser JavaScript is a small enhancement for the team carousel. All content, profile links, native scrolling, and the full-team page work with JavaScript disabled. There are no remote fonts, trackers, social embeds, or CSS frameworks.

## Local development

Use Node.js 22.12 or newer (Node 24 is used in CI).

```bash
npm ci
npm run dev
```

Open the URL printed by Astro, normally <http://localhost:4321/website/>.

Useful commands:

```bash
npm run check    # Validate Astro and TypeScript files
npm run build    # Create the production site in dist/
npm run preview  # Preview the production build
```

## Write an article

Create `src/content/articles/my-article.md`:

```md
---
title: "My article"
description: "A short summary for article cards and search results."
pubDate: 2026-09-08
authors: "alice, bob"
tags:
  - Notes
cover: "./my-article-cover.jpg"
coverAlt: "Describe the cover for readers who cannot see it"
draft: true
---

Write the article here.
```

The content schema in `src/content.config.ts` validates frontmatter during the build. `authors`, `tags`, `cover`, `coverAlt`, `updatedDate`, and `draft` are optional. Drafts appear locally but are excluded from production pages, the homepage, and researcher article lists.

An author can be a single username (`authors: alice`), a comma-separated string (`authors: "alice, bob"`), or a YAML list (`authors: [alice, bob]`). Each username must match a researcher profile; the build fails for unknown authors. Bylines link the authors' full names to their profiles, in the supplied order. Omit `authors` to credit the group.

The original `first-note.md` is now a draft example with two authors and local images.

## Add a researcher

Create `src/content/researchers/alice.md`:

```md
---
username: alice
firstName: Alice
lastName: Example
role: Researcher
affiliation: University of Bucharest
summary: A short introduction for the team card.
order: 1
---

Write the biography in Markdown.

## Research interests

Describe their interests and link to selected work.
```

Only `username`, `firstName`, and `lastName` are required. Optional fields are `role`, `affiliation`, `summary`, `website` (full URL), `order` (defaults to 100), and `placeholder` (defaults to false). Profiles are sorted by `order`, then full name. Affiliation is per person, so researchers can belong to any institution.

The filename and username must match. Use lowercase letters, numbers, and hyphens. The profile URL is `/website/researchers/alice/`.

Add their photo at **`src/assets/images/researchers/alice.jpg`**. `.jpeg`, `.png`, and `.webp` are also supported. Astro processes these local images during the build. A neutral silhouette appears if there is no matching photo.

The same profile supplies the homepage carousel, full-team listing, profile page, and article bylines. Their published articles automatically appear on their profile.

The five `researcher-0N.md` files are labelled samples: replace them and remove `placeholder: true` when adding real people. If you rename a username, update its article references in the same commit.

## Article images

Keep article images beside the Markdown file, commit them to Git, and use a relative path:

```md
![Useful alternative text](./my-image.jpg)
```

Local images inside `src/` are handled by Astro's image pipeline. Relative paths avoid hardcoding the GitHub Pages base path. Files in `public/` are copied without optimization; URLs to them must include `/website/` for this deployment.

## Homepage content

Edit **`src/data/group.ts`** for the welcome text, research interests, projects, publications, and sponsors. Set `researchIsPlaceholder: false` when the real topics are ready.

For sponsor logos, import local assets and add entries such as:

```ts
import exampleLogo from '../assets/images/sponsors/example.svg';

export const sponsors: Sponsor[] = [
  { name: 'Example sponsor', logo: exampleLogo, url: 'https://example.org' },
];
```

Use the actual sponsor name for accessibility. The current marks are generic examples, not real endorsements. Replace or remove them. Logos preserve their aspect ratios and wrap on smaller screens.

Projects accept `title`, `description`, and an optional `url`. Publications accept `title`, `authors` (display text), `venue`, `year`, `url`, and an optional `abstract`. The homepage shows the five most recent publications, sorted by year. Abstracts use native `details`/`summary` controls. Both lists start empty.

## Keyboard and mobile behaviour

The carousel shows three people on desktop, two on tablets, and one on phones. It never auto-advances, loops, or hides profiles from assistive technology. A full-team page provides a regular grid.

Focus the list to use Left/Right, Home, and End. Tab reaches individual profile links and scrolls them into view. Previous/Next buttons retain focus at the ends and announce their disabled state. Without JavaScript, buttons stay hidden and native scrolling remains available. Printing expands the list.

Navigation uses lists of real links, with visible focus rings, a skip link, and natural tab order. Keep descriptive link text, alt text, and readable contrast when adding content.

## Publish

1. Set `draft: false` in the article frontmatter.
2. Commit the Markdown file and its images.
3. Push to `main`.

The workflow at `.github/workflows/deploy.yml` checks and builds the site, then deploys the generated static files to GitHub Pages. In the repository's **Settings → Pages**, the source must be set to **GitHub Actions** once.

The current deployment URL is configured as <https://cd-aied.github.io/website/> in `astro.config.mjs`. Update `site` and remove `base` there before moving to a custom domain.

## Customize

- Site title, description, and author: `src/consts.ts`
- Colors and typography: `src/styles/global.css`
- GitHub Pages URL/base path: `astro.config.mjs`
