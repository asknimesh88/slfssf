# slfssf.com

Website of the Sri Lanka Forum for Small Scale Fisheries. Static site built with [Eleventy](https://www.11ty.dev/) (Node.js), hosted on Cloudflare Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:8080, reloads on save
npm run build    # writes the site to dist/
```

## Where things live

| To change | Edit |
|---|---|
| Email, phone, address, menu | `src/_data/site.json` |
| Committee members and bios | `src/_data/committee.json` (photo = file name in `src/assets/img`) |
| Publications list | `src/_data/publications.json` + PDF in `src/assets/docs/` |
| Press articles | `src/_data/press.json` |
| Page text | `src/*.njk`, `src/programmes/*.njk` |
| Layout, header, footer | `src/_includes/base.njk` |
| Styles | `src/assets/css/site.css` |

## Adding photos

Originals stay out of the repository (they live in the shared Google Drive export next to this folder, and in `raw/` for images taken from the old site). Add a line to the list in `scripts/images.cjs` pointing at the original, then run `npm run images`. It writes a resized WebP to `src/assets/img/`, which is what gets deployed.

## Deploy to Cloudflare Pages

Connect the repository in Cloudflare Pages with:

- Root directory: `/` (repository root)
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION=20` (or newer)

Or deploy from this machine without Git:

```bash
npm run build
npx wrangler pages deploy dist --project-name <your-pages-project>
```

Then add `slfssf.com` under the Pages project's Custom domains and remove it from the old project.
