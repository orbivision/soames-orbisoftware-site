<p align="center">
  <a href="https://orbisoftware.com">
    <img alt="Soames" src="https://raw.githubusercontent.com/orbivision/soames-astro-theme/main/assets/soames-mark.svg" width="60" />
  </a>
</p>
<h1 align="center">
  soames-orbisoftware-site
</h1>

**This repo is [orbisoftware.com](https://orbisoftware.com)** — a static
[Astro](https://astro.build) front end built from WordPress content via
[WPGraphQL](https://www.wpgraphql.com/), using the
[`soames-astro-theme`](https://www.npmjs.com/package/soames-astro-theme) package.

> ### Don't start a new project from this repo
>
> It isn't a starter. What's here is specific to orbisoftware.com: several hundred lines of
> site-specific CSS that overrides the theme's colour scheme, and a Netlify configuration
> bound to one Netlify site.
>
> **Start from [`soames-astro-starter`](https://github.com/orbivision/soames-astro-starter)
> instead** — click *Use this template*.

## What's actually in here

Almost nothing, by design — the theme provides all routes, layouts, and components:

| | |
|---|---|
| `astro.config.mjs` | Registers the theme integration, pointed at the WordPress endpoint |
| `src/overrides/styles/site-overrides.css` | This site's own CSS, shadowing the theme's empty placeholder |
| `netlify.toml` | Build command, publish dir, Node version |

### The CSS override is doing real work

The Soames theme ships a forest-green + chartreuse colour scheme. orbisoftware.com keeps the
original red/orange, and `site-overrides.css` is what reverts it — surface by surface, since
the theme has no CSS custom properties for colour. `Base.astro` imports that file last, so
its rules win at equal specificity.

**A theme upgrade can silently break this.** If a new theme version restyles a surface the
override doesn't yet name, or names one at *higher* specificity than the override does, the
theme's colour wins regardless of file order. After any theme bump, check the navbar,
dropdowns (desktop and mobile), hamburger, title bars, buttons, links, footer, and the video
section's gradient.

## Local development

```bash
nvm use              # Node 22, from .nvmrc
npm install
npm run dev          # http://localhost:4321
```

You need a `.env` with the WordPress GraphQL endpoint — copy `.env.example`:

```
WORDPRESS_GRAPHQL_URL=https://orbivision.net/graphql
```

`.env` is git-ignored. Netlify supplies the same value as a build environment variable, so
`astro.config.mjs` loads the file only when it exists — and **throws** when the value is
missing entirely, rather than building against the wrong WordPress.

Content edits in WordPress show up on refresh. **Adding or removing** pages or posts changes
the set of routes, so restart `npm run dev` for those.

```bash
npm run build        # static output in dist/
npm run preview      # serve the production build locally
npm run check        # astro check (type-checks .astro/.ts/.tsx)
```

## WordPress notes

WordPress lives at **orbivision.net**, which 301s to orbisoftware.com — but `/graphql` and
`/wp-json` are excluded from that redirect, so both endpoints work directly.

Two things about this install are worth knowing:

- **Page content is entirely legacy `[soames-*]` shortcodes**, not Gutenberg blocks. The
  theme supports both, but the shortcode path is exercised by this site and not by
  soames.app — so it's the first thing to suspect if a page renders oddly after a theme bump.
- **Wordfence** 403s a GraphQL query whose first field is literally `pages`/`posts`; the
  theme aliases them (`wpPages:`) to get around it. Suspect Wordfence first on 403s.

## No test suite here

Unlike [`soames-site`](https://github.com/orbivision/soames-site), whose `main` is gated by a
required Playwright visual check, this repo has no tests. Rendering changes need a manual
pass over the pages.

## Deployment

Deployed by Git CD from `main`:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 22 |
| Environment | `WORDPRESS_GRAPHQL_URL` |

Because the output is static, publishing in WordPress doesn't change the live site until it
rebuilds.

## The rest of the ecosystem

| Repo | What it is |
|---|---|
| [`soames-astro-starter`](https://github.com/orbivision/soames-astro-starter) | **Start new sites here** — minimal template on the theme |
| [`soames-astro-theme`](https://github.com/orbivision/soames-astro-theme) | The theme itself; published to npm |
| [`soames-wordpress-plugin`](https://github.com/orbivision/soames-wordpress-plugin) | The WordPress side — blocks, settings, Knowledge Base |
| [`soames-site`](https://github.com/orbivision/soames-site) | soames.app, the project's own site |

Setup and authoring guides live in the [Knowledge Base](https://soames.app/docs/).
