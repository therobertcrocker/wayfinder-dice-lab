# Planned Work

The initiative tracker. How items move between sections is defined in [`process/session-modes.md`](process/session-modes.md) section 2. Promotion is always Robert's call.

<br/>

## Current Initiatives

| ID | Item | Type | Status |
|----|------|------|--------|

_None._

<br/>

## Up Next

| ID | Item | Type | Trigger | Detail |
|----|------|------|---------|--------|
| F.005 | Core dice engine | feature | ready | Exact distributions from a JS API: sums, keep highest/lowest, rerolls, exploding dice, outcome functions, `pf2e` preset, stats. See `docs/vision.md` |

<br/>
<br/>

# Backlog

## Features

| ID | Item | Trigger | Detail |
|----|------|---------|--------|
| F.001 | Degree-of-success odds vs the party | after F.005 | For an attack or effect, the chance it critically succeeds, succeeds, fails or critically fails against each party member |
| F.002 | Expected damage per turn | after F.005 | How much damage per turn the party should expect from a creature |
| F.003 | Compare options | after F.001, F.002 | Side by side odds or damage for different choices, for example "Strike twice" vs "cast a spell," or which save to target |
| F.004 | Encounter-level odds | after F.002 | Odds over HP and repeated turns, for example the chance a monster drops a PC in one round |
| F.006 | Formula strings | after F.005 | Parse Foundry-style formula strings (`2d20kh+15`, `2d6+4`) into core engine API calls |

## Bugfixes

_None._

## Docs

_None._

## Chores

| ID | Item | Trigger | Detail |
|----|------|---------|--------|
| C.001 | Code-style pass on the scaffold | needs triage | Decide the JSDoc and explanatory-comment policy (the scaffold has both; CLAUDE.md says no comments unless the WHY is non-obvious), then apply it to `scripts/` |

## Captured Ideas

- **F.001, F.002** — Robert stated these as use cases, not as a UX or UI design. Discovery decides the interaction shape.
