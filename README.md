<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8b7c8191-4b8a-4d9b-ace7-5a9be9553479

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the Gemini API key:
   - Vite SPA: `VITE_GEMINI_API_KEY` in `.env.local`
   - Next App Router (server): `GEMINI_API_KEY` in `.env.local`
3. Run the app:
   - Vite SPA: `npm run dev`
   - Next App Router: `npm run dev:next`

## Deploy to GitHub Pages

This repo auto-deploys the Vite SPA to GitHub Pages on pushes to `main` via `.github/workflows/gh-pages.yml`.

Manual deploy:

1. `pnpm install`
2. `pnpm deploy`
