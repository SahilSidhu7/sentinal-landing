# sentinal-landing

Marketing/landing site for [Sentinal (VibeSentinel)](https://github.com/SahilSidhu7/Sentinal) — split out of that repo's `/frontend` folder so it can be hosted independently on GitHub Pages.

Live at: **https://sahilsidhu7.github.io/sentinal-landing/**

## One-line install (for Sentinal itself)

This site also hosts Sentinal's bootstrap installer:

```bash
curl -fsSL https://sahilsidhu7.github.io/sentinal-landing/install.sh | bash
```

That script (`public/install.sh` here) just forwards to the canonical `scripts/install.sh` in [Sentinal](https://github.com/SahilSidhu7/Sentinal) at call-time, so it can't drift out of sync — see that repo's README for what it actually installs and the full CLI reference.

## Stack

React + Vite + Tailwind.

## Develop

```bash
npm install
npm run dev
```

## Deploy

Push to `main` — `.github/workflows/deploy.yml` builds and publishes to GitHub Pages automatically (`actions/deploy-pages`). `vite.config.ts`'s `base: '/sentinal-landing/'` matches this repo's Pages project-site path; change both together if the repo is ever renamed.
