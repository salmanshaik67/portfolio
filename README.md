# Salman Shaik — Portfolio

Personal portfolio for Salman Shaik, Systems & Infrastructure Engineer.

**Live:** https://salmanshaik67.github.io/portfolio/

Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Editing content

All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).
Location and email are the two constants at the top of the content section (`LOCATION`, `EMAIL`).
To add a photo, put it in `public/` and set `profile.portrait` (for example `'/portrait.jpg'`).

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

## Contact form

Without configuration, the form opens the visitor's email app (mailto). It never pretends to send.
To deliver messages directly, set `VITE_CONTACT_ENDPOINT` to any endpoint that accepts a JSON POST
of `{ name, email, message }` (for example a Formspree form URL):

- locally: copy `.env.example` to `.env`
- on GitHub Pages: repo **Settings → Secrets and variables → Actions → Variables**, add `VITE_CONTACT_ENDPOINT`

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which lints, typechecks, builds and deploys to GitHub Pages.
One-time setup: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
