# [Initiative Name] — Discovery

<!--
COPY THIS FILE TO: docs/initiatives/discovery/<ID>-<initiative-name>-discovery.md
  (<ID> is the planned-work ID as written, e.g. F.001-degree-of-success-odds-discovery.md)

A discovery doc captures the design for an initiative before implementation begins.
The shape varies by what's being designed — feature work and refactor work call for
different sections. Required sections are always present; optional sections are
included when relevant.

Delete these comments before writing.
-->

## In Plain Words

<!--
REQUIRED. Under 15 lines. Plain words for a reader who has not read the rest of
this doc: no project shorthand unless it is defined in the same sentence.

  - What: what this initiative does.
  - Why: the problem it solves, for the GM or for the codebase.
  - How it fits: where it sits in the project, and what it unblocks.

Every session on this initiative reads this section first (session-modes.md
section 7, Re-grounding).
-->

## Problem

<!--
REQUIRED. What is broken, missing, limiting, or worth investigating?

Name the gap or pain point, for the GM at the table. Be richer than the planned-work blurb.

Reference specific code paths, files, and line numbers where helpful.
-->

## Architecture Context

<!--
REQUIRED. List the architecture page(s) read for this initiative
(docs/architecture/ — start at docs/architecture/overview.md)
and pull out the Key Decisions that constrain this design. This is the push half of the push-not-pull decision system
(session-modes.md section 7): the binding rationale lives on the page this
section forces you to open.

If no page covers the relevant subsystem yet, say so — that's a signal the
wiki needs a page; note it in planned-work.md.
-->

## Design Summary

<!--
REQUIRED.

Name the chosen approach in a few paragraphs, with rationale.

This is the section a reader skims to understand "what are we doing about it."
-->

## Open Questions

<!--
REQUIRED. Anything unresolved that the Plan session needs to decide.

If there are no open questions, write "None." Don't omit the section.
-->

---

<!--
OPTIONAL SECTIONS BELOW. Include the ones relevant to this work; delete the rest
along with this comment. Add new sections freely — discovery docs are not
template-bound, and the work itself dictates what's needed.
-->

## Rules Model

<!--
The PF2e rules the design depends on, stated precisely, each with its Archives
of Nethys source link. Edge cases (natural 20/1, ±10 thresholds, minimum damage,
persistent damage) belong here, with how the design treats each.
-->

## Data Model

<!--
New data shapes: inputs, outputs, and intermediate results. Show JS object
shapes or function signatures where the shape is non-obvious.
-->

## Per-Area Design Details

<!--
One section per major component, flow, or sub-feature being touched. Use
descriptive names (e.g. "Odds Calculation", "Actor Data Read", "Results Window"),
not "Area 1 / Area 2".
-->

## Foundry Integration

<!--
What the design reads from or writes to Foundry: actors, items, PF2e system data,
settings, hooks, windows. Note anything that differs between v13 and v14.
-->

## User-Facing Impact

<!--
What does the GM see or do differently in Foundry?
-->

## Replaces / Retires

<!--
What existing code, types, patterns, or behaviors get removed or superseded.
-->

## Out of Scope

<!--
Explicit non-goals. Things that look like they're in scope but aren't. Deferred
work that should be filed in planned-work.md as a separate Backlog entry.
-->

## Reference Exemplars

<!--
Prior art (e.g. AnyDice, other Foundry modules), Key Decisions from related
architecture pages, similar patterns elsewhere in the codebase.
-->
