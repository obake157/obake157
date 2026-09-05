# RY Cube Trainer

I like solving 3x3 cubes, and I wanted one project in this portfolio to come from a hobby instead of a business requirement.

**RY Cube Trainer** is a small browser-based tool for learning move notation and practicing useful algorithms. The first version focuses on understanding commands such as `R`, `U`, `F`, prime moves and double turns, then seeing what those sequences actually do to the cube.

## What it does

- interactive 3x3 cube net with a real cube state;
- buttons for the basic face turns and their inverse moves;
- accepts sequences such as `R U R' U'`;
- scramble and reset controls;
- a short beginner roadmap;
- useful algorithms with a plain-language explanation of when they are used;
- a small practice mode;
- remembers which algorithms the user marked as learned.

## Why I built it this way

I did not want the first version to be an automatic solver. My goal was to make the notation less abstract.

The cube engine stores each sticker with a position and a direction in 3D coordinates. A face turn rotates the stickers in that layer and the interface redraws the six faces. That keeps the cube state separate from the HTML and makes it possible to add a 3D view later without rewriting the move logic.

## Run locally

There is no build step and no backend in this version.

Clone/download the project and open `index.html` in a modern browser.

You can also serve the folder with any simple static server, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Useful notation

- `R`, `L`, `U`, `D`, `F`, `B` — clockwise quarter turn of that face;
- `'` — inverse/counter-clockwise turn, for example `R'`;
- `2` — half turn, for example `U2`.

Clockwise is always considered while looking directly at the face being turned.

## Algorithms included

The current set includes a few sequences I consider useful to recognize early:

- Sexy Move — `R U R' U'`
- Right middle-layer insertion
- Left middle-layer insertion
- Yellow cross
- Sune
- T-permutation

This is a trainer, not a claim that these six sequences alone solve every 3x3 case.

## Files

- `index.html` — page structure;
- `styles.css` — layout and responsive styling;
- `cube.js` — cube-state and move engine;
- `app.js` — UI, training controls and saved progress.

## Next ideas

- animated 3D cube;
- full beginner layer-by-layer lessons;
- timer and solve history;
- algorithm categories and search;
- guided exercises that ask the user to choose the next move.

---

Built as a personal hobby project for my public portfolio.
