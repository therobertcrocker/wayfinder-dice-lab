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

_None._

<br/>
<br/>

# Backlog

## Features

| ID | Item | Trigger | Detail |
|----|------|---------|--------|
| F.001 | Degree-of-success odds vs the party | -- | For an attack or effect, the chance it critically succeeds, succeeds, fails or critically fails against each party member |
| F.002 | Expected damage per turn | -- | How much damage per turn the party should expect from a creature |

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
- **F.001, F.002** — idea to weigh: keep the dice math in plain modules that do not touch Foundry globals, so `node --test` can test it outside Foundry.
