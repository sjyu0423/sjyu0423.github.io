# SJ Yu — Personal Portfolio

Minimal personal portfolio for [SJ Yu](https://github.com/sjyu0423), built with Next.js (static export) for GitHub Pages.

Intended URL: `https://sjyu0423.github.io/`

## Stack

- Next.js (App Router) with `output: "export"`
- TypeScript
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Produce a static site in `out/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler |

## Editing projects

All project data lives in [`src/data/projects.ts`](src/data/projects.ts).

- Add, rename, reorder, or move projects between categories there.
- Set `websiteUrl` and/or `githubUrl` when ready. The UI prefers `websiteUrl`.
- Omit URLs to show the project without a clickable destination.
- Site-wide links (GitHub, optional resume) live in [`src/data/site.ts`](src/data/site.ts).

## GitHub Pages deployment

A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site and deploys the `out/` directory.

Before first deploy:

1. Push this repository to `sjyu0423.github.io` (or your chosen Pages source).
2. In the repository **Settings → Pages**, set the source to **GitHub Actions**.
3. Push to `main` (or run the workflow manually).

No repository `basePath` is configured — this assumes hosting at the domain root.
