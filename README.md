# Salman Shaik — Portfolio

Personal portfolio for Salman Shaik, Systems & Infrastructure Engineer.

**Live:** https://salmanshaik67.github.io/portfolio/

Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.

## Changing your email or location (no code)

1. On GitHub, open the repo → **Settings → Secrets and variables → Actions → Variables tab → New repository variable**.
2. Add `VITE_EMAIL` and/or `VITE_LOCATION` with the new value (or edit them later the same way).
3. Go to **Actions → Deploy to GitHub Pages → Run workflow**. The live site updates in about a minute.

Delete a variable to fall back to the default in `src/data/portfolio.ts` (`LOCATION`, `EMAIL`).

## Editing content

All other content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).
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
