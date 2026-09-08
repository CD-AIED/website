# Field Notes

A Markdown-first static publication built with Astro and deployed to GitHub Pages.

Every article is compiled ahead of time into HTML. The published site does not render Markdown in the browser and requires no server or database.

## Local development

Use Node.js 22.12 or newer (Node 24 is used in CI).

```bash
npm install
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
author: "Your name"
tags:
  - Notes
cover: "./my-article-cover.jpg"
coverAlt: "Describe the cover for readers who cannot see it"
draft: true
---

Write the article here.
```

The content schema in `src/content.config.ts` validates frontmatter during the build. `author`, `tags`, `cover`, `coverAlt`, `updatedDate`, and `draft` are optional. Drafts appear locally but are excluded from production.

### Add images

Keep article images beside the Markdown file, commit them to Git, and use a relative path:

```md
![Useful alternative text](./my-image.jpg)
```

Local images inside `src/` are handled by Astro's image pipeline. Files placed in `public/` can also be referenced from the site root, but they are copied without optimization.

## Publish

1. Set `draft: false` in the article frontmatter.
2. Commit the Markdown file and its images.
3. Push to `main`.

The workflow at `.github/workflows/deploy.yml` builds the site and deploys the generated static files to GitHub Pages. In the repository's **Settings → Pages**, the source must be set to **GitHub Actions** once.

The current deployment URL is configured as <https://cd-aied.github.io/website/> in `astro.config.mjs`. Update `site` and remove `base` there before moving to a custom domain.

## Customize

- Site title, description, and author: `src/consts.ts`
- Colors and typography: `src/styles/global.css`
- GitHub Pages URL/base path: `astro.config.mjs`
