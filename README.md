# barneynapier.github.io

Personal site of Barnaby Napier — essays, book notes, and projects.
Built with [Astro](https://astro.build) and served from GitHub Pages.

## Content

- Essays live in `src/content/writing/*.md`
- Book notes live in `src/content/books/*.md` (covers in `public/book-covers/`)

To publish a new essay or book, add a markdown file to the relevant folder using
the frontmatter fields defined in `src/content.config.ts`. The filename becomes
the URL slug (e.g. `writing/risk.md` → `/writing/risk/`).

## Commands

| Command           | Action                                              |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the local dev server at `localhost:4321`      |
| `npm run build`   | Build the static site to `dist/`                    |
| `npm run preview` | Preview the production build locally                |
| `npm run deploy`  | Build and publish `dist/` to the `gh-pages` branch  |

GitHub Pages serves the site from the `gh-pages` branch, so `npm run deploy`
is all that's needed to go live.
