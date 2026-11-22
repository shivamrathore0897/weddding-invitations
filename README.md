# Shivam & Muskan — Digital Wedding Invitation & Celebration Web Experience

> **Live Production Website:** [https://shivamrathore0897.github.io/weddding-invitations/](https://shivamrathore0897.github.io/weddding-invitations/)  
> **Target Date:** Saturday, 12 December 2026 | New Delhi, India

A bespoke, luxury interactive wedding celebration portal featuring an opening video invitation card, instant acoustic ceremony background music, interactive countdown, multi-day itinerary, venue navigation, and photo memories.

---

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Sass (SCSS) + CSS Modules & luxury typography tokens
- **Animations:** Framer Motion + Canvas Confetti + Hardware CSS Transitions
- **Icons:** Lucide React
- **Hosting & CI/CD:** GitHub Actions + GitHub Pages (Enforced HTTPS, Global Edge CDN)

---

## Quick Start (Local Development)

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node) or **pnpm** / **yarn**

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The local server starts at `http://localhost:5173/`. Vite Hot Module Replacement (HMR) is active — code and style edits will update instantaneously in the browser.

---

## How to Make a Production Build

To compile and package the entire website for deployment:

```bash
npm run build
```

### What this command does:
1. `tsc -b`: Runs the TypeScript project compiler in build mode to verify all types, props, and interfaces with zero errors.
2. `vite build`: Bundles and minifies all React components, compiles Sass stylesheets, applies CSS vendor prefixes, hashes assets, and outputs the production-ready distribution files to the `dist/` directory.

### Previewing the Production Build Locally
To test the exact production build before pushing:
```bash
npm run preview
```
This serves the compiled `dist/` folder on a local preview server (typically `http://localhost:4173/`).

---

## How to Deploy

### Automatic Deployment (GitHub Pages CI/CD)
The project is configured with a fully automated CI/CD pipeline via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

Whenever you push any updates to the `main` branch:
```bash
git add .
git commit -m "update wedding details and photography"
git push origin main
```
1. GitHub Actions automatically starts the `Deploy to GitHub Pages` workflow.
2. The runner spins up on Ubuntu, installs dependencies (`npm ci`), and builds the project (`npm run build`).
3. The generated `dist/` artifact is uploaded and deployed to GitHub Pages.
4. Your changes are live in **~45 to 60 seconds** at [https://shivamrathore0897.github.io/weddding-invitations/](https://shivamrathore0897.github.io/weddding-invitations/).

### Manual Deployment via GitHub Dashboard
If you ever want to re-trigger a deployment without making a new git commit:
1. Open your repository on GitHub: `https://github.com/shivamrathore0897/weddding-invitations`.
2. Click on the **Actions** tab at the top.
3. In the left sidebar, click **Deploy to GitHub Pages**.
4. Click the **Run workflow** dropdown on the right, select branch `main`, and click **Run workflow**.

---

## Hosting Plan, Duration & Free Tier Quotas

The website is hosted on **GitHub Pages**, which provides a **permanent free hosting tier**:

| Feature | Free Plan Details |
|---|---|
| **Duration / Expiration** | **Never expires (100% Free Forever)**. There is no 1-month or 1-year trial cutoff. |
| **Monthly Bandwidth** | **100 GB / month** (Comfortably handles 20,000 to 50,000+ guest visits). |
| **Site Storage Limit** | **1 GB** (Total production build bundle is ~410 KB JS/CSS + media assets). |
| **Build & CI/CD Limits** | **Unlimited** GitHub Actions minutes for public repositories. |
| **SSL / HTTPS** | Enforced SSL certificate provided and auto-renewed by GitHub. |
| **Custom Domain** | Supported for free (e.g., connect `shivamandmuskan.com` under Repo Settings → Pages). |

### How to Manage or Take Down the Deployment
- **Update site content:** Simply push new commits to `main`.
- **View Deployment Health:** Go to `https://github.com/shivamrathore0897/weddding-invitations/deployments`.
- **Take Down / Pause Hosting:** In your GitHub repo, go to **Settings** → **Pages** → click the three dots next to the active deployment → select **Unpublish**.

---

## Important: Public vs. Private Repository

> [!WARNING]
> **GitHub Pages Free Tier Requirement:**  
> On standard free personal GitHub accounts, **GitHub Pages is only available for public repositories**.  
> If you change this repository's visibility from **Public** to **Private**, GitHub Pages will automatically turn off and the site will display a 404 error (unless you have a paid GitHub Pro subscription at $4/mo).

### If you want to keep the source code Private for free:
You can keep the repository **Private** and deploy it for 100% free indefinitely using **Vercel** or **Cloudflare Pages**:
1. Keep or set the GitHub repo to **Private**.
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New Project** → select `weddding-invitations`.
4. Leave settings at default (Framework: Vite, Build: `npm run build`, Output: `dist`) → Click **Deploy**.
5. Vercel deploys private repositories for free forever with instant SSL and automatic git sync.

---

## Project Structure & Content Customization

```
weddding-invitations/
├── .github/workflows/
│   └── deploy.yml            # Automated CI/CD pipeline for GitHub Pages
├── public/
│   └── assets/
│       ├── audio/            # Background music (wedding-ambient.wav)
│       ├── images/           # Event, story, venue, and gallery photography
│       └── video/            # Invitation opening animation (MP4 & poster)
├── src/
│   ├── config/
│   │   └── wedding.ts        # All wedding text, couple bios, itinerary & venue data
│   ├── components/
│   │   ├── InvitationIntro/  # Opening card sequence & video overlay
│   │   ├── BackgroundMusic/  # Continuous ceremony audio player & harmonic synth
│   │   ├── Countdown/        # Real-time event countdown timer
│   │   ├── Gallery/          # Fullscreen photo lightroom viewer modal
│   │   ├── PetalCanvas/      # Falling floral petals canvas animation
│   │   └── AddToCalendar/    # Google, Apple, Outlook, iCal calendar integration
│   ├── sections/             # Hero, OurStory, Events, Venue, Gallery, Closing
│   ├── styles/               # Global tokens, luxury typography, animations
│   ├── App.tsx               # Root application coordinator
│   └── main.tsx              # DOM mounting entrypoint
├── package.json              # Project dependencies and script definitions
└── vite.config.ts            # Vite build configuration (base: './')
```

### Updating Wedding Text & Itinerary
To modify names, dates, ceremonies, timings, quotes, or venue addresses:
- Edit [`src/config/wedding.ts`](src/config/wedding.ts). All website data is centralized in this configuration object.
- Push the change to GitHub — the site will re-deploy automatically!
