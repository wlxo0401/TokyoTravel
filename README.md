# Trip Planner Template

<p align="center">
  <b>English</b> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.fr.md">Français</a>
</p>

A static travel-planning web app you deploy on GitHub Pages — no build tools.
**Use it as a starting point and shape your own trip-planning template with AI.**

> This repo is just an **example**. The data is filled in for a September 2026 Tokyo trip,
> but nothing is fixed. Use it as-is if you like it, or rework the destination, structure,
> design, and features to taste and build a better template. We're only a starting point.

## Why this exists

It starts from one observation: **you plan hard before a trip, but you don't rewrite the plan during it.**
Trips never go 100% to plan and things change — but you don't sit down and redo the itinerary mid-trip.
So this app treats planning as two separate phases.

- **Before the trip — planning**: build the itinerary with AI and load in what you'll need
  (places, links, candidates). Push to GitHub and it's live; share the link with your travel companions.
- **During the trip — reference (read-only)**: you don't edit the plan here. It's for
  **checking what you prepared and deciding fast on the spot.**
  - See today's route at a glance with date tabs
  - Browse candidate places per area with a priority only ("must / want / if there's time") — not a timetable
  - One tap for map directions (Naver for legs in Korea, Google for legs in Japan)
  - Check off places you've been to (saved locally on your device)

The plan isn't enforced. Instead of a fixed timetable, keep a loose order and a shortlist,
and pick as you go. That's what traveling is.

## Highlights

- No framework, bundler, or backend. Plain HTML/CSS/ES modules.
- Data and UI are separate — all trip info lives in a single `data/trip.js`.
- Light mode only, mobile-first (works on desktop too).

---

## Getting started

### 1. Clone & run locally

```bash
git clone https://github.com/<your-name>/<your-repo>.git
cd <your-repo>
python3 -m http.server 8000
# http://localhost:8000
```

Opening `index.html` directly in the browser breaks ES module loading, so always serve it
from a local server. (Any static server works — `npx serve`, etc., instead of `python3`.)

### 2. Make it your trip

The fastest path is to **hand it to AI**. Open the whole repo and say
"adapt this project for my trip to ___" — it'll work through `data/trip.js` and, if needed,
the layout, tab structure, and styling too.

This repo's working rules for AI assistants live in [`CLAUDE.md`](CLAUDE.md) — Claude Code
reads it automatically; point other tools at it.

### 3. Deploy (GitHub Pages)

1. Repo → **Settings → Pages**
2. **Source: Deploy from a branch**, Branch: `main` / `/(root)`
3. A few minutes later it's live at `https://<your-name>.github.io/<your-repo>/`
4. Share that link with your companions. After that, just push your changes and they go live automatically.

The `.nojekyll` file skips Jekyll processing. All asset paths are relative, so it works under a sub-path deploy.

## Caution

> [!WARNING]
> **Don't put sensitive data straight into the repo.** `data/trip.js` is committed and
> served publicly on GitHub Pages, and git history keeps it even after you delete it.
> Leave out booking references, passport/ID numbers, phone numbers, full home addresses,
> and door codes — share those with your companions through a private channel. Place
> names, areas, and map coordinates are fine.
