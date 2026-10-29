# Documentation Style Guide

> Lean port of gm-toolkit `docs/process/style-guide.md` (2026-10-28). Journal and decisions-log formats are left out; this repo uses `planned-work.md` and Decision Records instead.

<br/>

## Document Types

**Planned Work** (`docs/planned-work.md`) — the initiative tracker: Current Initiatives, Up Next, Backlog. See `session-modes.md` section 2.

**Architecture Page** (`docs/architecture/*.md`) — the durable "what it is" and "why it's shaped this way." `overview.md` is the front door; subsystem pages are split out from `templates/arch-page.md` when needed.

**Discovery Doc** (`docs/initiatives/discovery/*-discovery.md`) — written before implementation begins. Not updated after the fact — it is a planning artifact.

**Implementation Plan** (`docs/initiatives/implementation/*-plan.md`) — a phased plan, split by commit, with design rationale and open questions to resolve during implementation. Carries the Decision Record for execution-time decisions (append and reconcile). Updated as needed during implementation, but not after completion.

**Rules Page** (`docs/rules/*.md`) — a PF2e rule the code depends on, stated precisely, with its Archives of Nethys source link.

<br/>
<br/>

# Heading Levels

- `#` (H1) — major thematic sections
- `##` (H2) — subsections within a major section
- `###` (H3) — sub-subsections (phase names, individual mode descriptions)

**Spacing:** Use `<br/><br/>` before a new `#` section. Use a single `<br/>` between `##` sections.

<br/>
<br/>

# Writing Style

- Use ASD-STE100 Simplified Technical English
- Rationale is concise — sentence fragments are fine
- Em dash (`—`) separates a term from its description in bullet lists: `**Term** — description`
- Code identifiers (types, functions, files, flags) use backticks inline
- No trailing periods on table cell content
- `(planned)` suffix on items not yet implemented
- `(Planned)` suffix on section headings for future features

<br/>

## Bullet Lists vs Tables

Use **bullet lists** for: behaviors, principles, mode descriptions, progress items — anything prose-like.

Use **tables** for: decisions, features, questions, data — anything that benefits from structured columns.

<br/>
<br/>

# Section-Specific Guidance

## Decision Record (in plan docs)

Only record decisions where the rationale is non-obvious or where a meaningful alternative was rejected. Implementation details that follow naturally from prior decisions don't need their own entry. Append and reconcile: when execution overrides a planned decision, log the reversal and fix the plan body so it doesn't lie.

## Key Decisions (in architecture pages)

One bold lead-in per decision, then the rationale: `- **Decision** — rationale`. Organize by topic, not by date.

## Open Questions

For unresolved *design* questions only — not deferred implementation work. A question belongs here when the answer will meaningfully affect how a feature is built and we don't yet have an answer. Remove or resolve entries when a decision is made; log the decision in the relevant plan's Decision Record.

<br/>
<br/>

# Discovery Doc Style

## Heading Levels

- `#` — document title only
- `##` — major sections: named concepts (e.g. `## Odds Calculation`)
- `###` — sub-sections within a major section: Inputs, Steps, Outputs, Notes
- `####` — sub-sub-sections where needed

## Tone and Content

- Discovery docs describe intent and design, not implementation — write in terms of what the module does, not how the code does it
- Flag unresolved dependencies explicitly in Notes using `**Depends on X (planned)**`
- Cross-reference related discovery docs with blockquote links: `> Full breakdown in [file.md](file.md)`
- Do not update retroactively once implementation begins — post-implementation decisions belong in the plan's Decision Record
