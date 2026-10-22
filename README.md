# NTUIA Website

Source for **https://ntuia.org**, built with React + Vite and hosted free on GitHub Pages.

## Run locally

Requires Node.js 20 or newer (`nvm use` picks the version from `.nvmrc`).

```bash
npm install
npm run dev
```

Open http://localhost:5173.

### Working on the remote server over SSH

The live-reload dev server shows a blank page through an SSH tunnel, so use the auto-rebuilding preview instead:

```bash
npm run remote
```

On your own computer, open a tunnel and browse to http://localhost:4173. Refresh after each change.

```bash
ssh -N -L 4173:localhost:4173 ak@140.112.12.186
```

## Build and preview

```bash
npm run build
npm run preview
```

## Where to edit content

| What | File |
| --- | --- |
| Name, tagline, email, phone, address, social links | `src/data/site.js` |
| Events | `src/data/events.js` |
| News posts | `src/data/news.js` |
| Gallery images | `public/images/` and `src/data/gallery.js` |
| Mission, vision, values, committee | `src/pages/About.jsx` |
| Logo and favicon | `public/logo.svg`, `public/favicon.svg` |
| Colours and layout | `src/styles/global.css` |

All text and images are placeholders. Replace them before launch.

## Deploy

Every push to `main` builds and deploys automatically through `.github/workflows/deploy.yml`.
See [DEPLOYMENT.md](DEPLOYMENT.md) for the one-time GitHub Pages and GoDaddy DNS setup.
