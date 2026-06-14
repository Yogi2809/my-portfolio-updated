# DNA Double Helix Background — Design

**Date:** 2026-06-14
**Owner:** Yogesh Mishra
**Status:** Approved (user picked Option 14, said "implement")

## Goal

Replace the plain obsidian background with a subtle, premium 3D DNA double-helix
that gives depth without hurting text readability.

## Approach

A fixed, full-viewport Three.js canvas behind all content (the project already
uses raw three.js for the hero graph, and three@0.184 is installed).

- **Geometry:** two helical strands of small spheres (InstancedMesh, ~64 per
  strand) — strand A green `#00ff87`, strand B magenta `#ff0055` — with thin
  teal connecting rungs every few segments. Vertical axis, ~3.2 turns, tall
  enough to bleed off the top/bottom edges.
- **Motion:** slow continuous rotation about the vertical axis (the twist),
  plus gentle mouse parallax (camera x + group tilt). Paused under
  `prefers-reduced-motion`.
- **Readability:** MeshBasicMaterial (no lighting), moderate opacity, thin
  strands over obsidian. Content cards use opaque surfaces, so the helix only
  shows through negative space — text stays crisp. Wrapper opacity tuned to keep
  it ambient, not loud.

## Layering

- `.dna-bg` canvas: `position: fixed; inset: 0; z-index: 0; pointer-events: none`.
- Body keeps obsidian bg (paints under the canvas).
- `.site-main` and `.footer`: `position: relative; z-index: 1` (above the helix).
- Nav stays `z-index: 100`. Hero force-graph (inside content) stays above the helix.

## Performance

InstancedMesh, single rAF loop, pixel ratio capped at 2, ~64 instances + ~22
rungs. Disposes geometry/materials/renderer on unmount. Resize handler.

## Files

- `src/components/DnaBackground.tsx` — the scene.
- `src/App.tsx` — mount `<DnaBackground />`, wrap content in `.site-main`.
- `src/styles/app.css` — layering rules.

## Deploy

Build clean → push to Yogi2809/my-portfolio-updated main → Vercel auto-deploy.
