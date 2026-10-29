# Session Modes & Initiative Flows

> Lean port of gm-toolkit `docs/process/session-modes.md` (2026-10-28). Arc, Refactor and Effort flows are left out until this repo needs them; port them from gm-toolkit at that time.

## 1 — Purpose

This document describes how work moves through Wayfinder Dice Lab, from "this might be worth doing" to "shipped." It defines the **modes** of work (Discovery, Plan, Execution), the **artifacts** they produce (Concept, Discovery doc, Plan), the **flows** that combine them per work type (feature, bugfix, docs, chore), and the **discipline** that keeps each mode honest.

**Read this before:**
- Starting a new initiative — to confirm which flow applies
- Promoting an item from `planned-work.md` to Up-Next or Current
- Proposing a change to the process itself

**Audience:** Robert and Claude, working together. This is the substantive guide; `CLAUDE.md` carries only a pointer and the routing table.

## 2 — The Initiative Lifecycle

Every initiative passes through the same stages, regardless of type. All stages are tracked in `docs/planned-work.md` until the initiative ships.

### Stage 1 — Backlog

Lands in the **Backlog** section of `planned-work.md`, grouped into per-type subsections (Features, Bugfixes, Docs, Chores). Each table has columns:

- **ID** — stable identifier; the prefix encodes the type: `F.` feature, `B.` bugfix, `D.` docs, `C.` chore
- **Item** — short title
- **Trigger** — one of `--` (no gate), `ready` (scoped, can be promoted), `after <ID>`, `when <condition>`, `needs triage` (cause not known)
- **Detail** — one-line context, problem, or rationale

Prose notes attached to a row (an idea to weigh, not a decision) go in the Backlog's **Captured Ideas** subsection, after the tables.

The ID prefix determines which flow applies when the item is eventually worked (see section 3). Backlog items are unordered. They sit until their trigger fires.

### Stage 2 — Up Next

Promoted into the **Up Next** table when the trigger condition is close or already met. Items move (not copied) from Backlog — Up Next is the prioritized queue, not a projection. Single table; columns ID / Item / Type / Trigger / Detail.

Promotion from Backlog to Up Next is Robert's explicit call.

### Stage 3 — Current Initiative

Promoted into the **Current Initiatives** table at the top of `planned-work.md` and given a full write-up further down in the same file. The table is the index; each row links to the write-up.

The write-up is the initiative's **Concept** artifact — the basic idea, recorded before any Discovery happens. It adds:

- **Problem** — what's broken or missing
- **Approach** — how we plan to address it
- **Unlocks** — what becomes possible once it lands
- **Trigger** — copied from the Backlog/Up Next entry
- **Status** — `In-Progress` (capped at 2–3 at any time) or `Blocked` (with a required `by:` note naming the blocker)

Promotion from Up Next to Current Initiative is Robert's explicit call. The write-up is drafted at promotion time, not in advance.

### Stage 4 — Done

When all execution phases land and the branch is merged:

1. Remove the row from the Current Initiatives table and the write-up from `planned-work.md`
2. Propose a version bump if warranted (per CLAUDE.md, Collaboration 10 — in this repo a release ships to the game server)

### Minor items

Bugfix (`B.`) and chore (`C.`) items may skip Stages 2 and 3 entirely — they go straight from Backlog to a single execution session and are removed when done.

### Promotion is manual

Movement between stages is always Robert's explicit call, not automatic. Claude may *suggest* a promotion ("this feels ready for Up Next") but does not execute it without confirmation.

## 3 — Routing by Type

| Type | Flow | When to use |
|------|------|-------------|
| `feature` | Feature Flow (section 4) | New capability, new domain concept, new user-visible behavior. Default when in doubt. |
| `bugfix` | Bugfix Flow (section 5) | Existing behavior is wrong. Tiered by severity. |
| `docs` | Docs & Chore Flow (section 6) | Documentation work — new docs, restructures, doc-only edits. |
| `chore` | Docs & Chore Flow (section 6) | Mechanical maintenance — dependency bumps, tooling config, cleanup. No design decisions. |

**Not in use yet:** `arc`, `refactor`, and multi-effort initiatives. If a piece of work needs one, stop and port that flow from gm-toolkit's `session-modes.md` first.

**Mis-routing is recoverable.** If an initiative is partway through one flow and turns out to be a different type, change the ID prefix, move to the appropriate flow, and add a note in `planned-work.md` explaining the reroute.

### Types × artifacts at a glance

| Type | Concept | Discovery | Plan | Execution |
|------|---------|-----------|------|-----------|
| **Feature** | planned-work write-up | Always (1–2 sessions) | Single-file plan | Hand-off sets scope; default one phase per session |
| **Bugfix** | Backlog row only | Never (diagnosis = first half of Plan) | Skipped (trivial) or lightweight (non-trivial) | Single session |
| **Docs** | Backlog row | Skipped — docs discover-at-write | Skipped | One session per doc |
| **Chore** | Backlog row only | Never | Never | Single session |

## 4 — Feature Flow

Feature work follows three modes in sequence: **Discovery → Plan → Execution.** Each mode is its own session (or several). Each produces a specific artifact. Boundaries between modes are strict — see section 7.

### Discovery (1–2 sessions)

**Goal:** understand the problem space, survey relevant existing code and PF2e rules, identify approach options, surface tradeoffs and open questions.

**Artifact:** `docs/initiatives/discovery/<ID>-<initiative-name>-discovery.md` — see template at `docs/process/templates/discovery.md`.

**Session ends when:** the discovery doc is written and Robert has signed off. Do not begin planning in the same session.

### Plan (1–2 sessions)

**Goal:** turn the discovery doc into an executable plan — work broken into phases and commits, each phase sized for one execution session (section 7, Execution scope).

**Artifact:** `docs/initiatives/implementation/<ID>-<initiative-name>-plan.md` — see template at `docs/process/templates/implementation-plan.md`.

**Work breakdown levels.**

| Level | Is | Artifact | Size rule |
|---|---|---|---|
| Initiative | One branch, one discovery doc, one merge | The plan | None |
| Phase | One execution session | `### Phase` section | About 800 lines |
| Commit | One reviewable unit that builds green | `#### Commit` section | Split only at a real seam |
| Task | One edit, as literal code | `##### Task` section | — |

A plan with phases opens its Work Breakdown with an **Overview** list: each phase, each commit's conventional message, and each commit's task count. Keep it in sync with the body when execution changes the breakdown.

**Session ends when:** the plan is written and Robert has signed off. Do not begin execution in the same session.

### Execution (N sessions)

**Goal:** implement the phase the hand-off names (section 7, Execution scope).

**Activities:**
- Read the implementation plan, focused on the tasks of the commits in scope
- Read the relevant current code (it may have shifted since the plan was written)
- Implement the tasks
- Commit using conventional commit format (per CLAUDE.md)
- If the work surfaces a scope change, pause and discuss before proceeding

**Session ends when:** the last commit in the session's scope lands.

### Pre-Merge Checklist

Before merging the feature branch, run the checklist in CLAUDE.md (Collaboration, item 9):

1. Senior-engineer code review of the branch
2. Promote durable decisions from the plan's Decision Record into `Key Decisions` in `docs/architecture/`
3. Update planned-work doc (remove the initiative; capture deferred items that surfaced)
4. Move the initiative's discovery and plan docs to their `completed/` subdirectories

## 5 — Bugfix Flow

Bugfix work is **tiered** — most bugfixes skip Discovery and Plan entirely.

### Trivial Bugfix (single Execution session)

Use when the root cause is known or trivially diagnosable, the fix is describable in one sentence, it touches one file or a few obviously related files, and there is one reasonable fix approach.

Flow: **Backlog → Execution → Done.** Single session: diagnose (if needed), fix, commit (`fix: <description>`), update tests.

### Non-Trivial Bugfix (lightweight plan + Execution)

Use when the root cause needs investigation, there are multiple plausible fixes with meaningful tradeoffs, the fix touches several files, or regression risk is non-trivial.

Flow: **Backlog → Plan → Execution → Done.** The plan is a single section in `docs/initiatives/implementation/<ID>-<bugfix-name>-plan.md` covering:

- **Root cause** — what's actually wrong
- **Fix approach** — the chosen approach, with brief rationale if alternatives existed
- **Test plan** — how the fix is verified, and what regression coverage is added

If investigation reveals the bug is a structural problem, stop and re-route as a feature (section 3).

## 6 — Docs & Chore Flow

### Docs

Flow: **Backlog → Execution → Done.** No Discovery, no Plan. Conventional commit prefix: `docs:`. If a docs initiative clearly needs more than one session, port gm-toolkit's multi-effort docs flow first.

### Chore

Mechanical maintenance — dependency bumps, tooling config, formatting passes, cleanup. No design decisions. Single execution session. Flow: **Backlog → Execution → Done.** Conventional commit prefix: `chore:` (or `build:` for dev container and release tooling).

If a chore turns out to require design, stop and reroute.

### Pre-Merge Checklist

Minimal: no senior-engineer code review pass for docs-only changes; remove the entry from `planned-work.md`.

## 7 — Session Discipline

These rules apply to every session regardless of which flow it serves.

### One mode per session

Discovery, Plan, and Execution are separate sessions. A session does not change modes mid-flight. Even when the inputs to the next mode are ready, the next mode starts in a new session.

The most-violated boundary is **Plan → Execution.** When the current session's deliverable is an implementation plan, stop after the plan is written, approved, or handed off. Do not write code, edit source files, or stage edits. If pushed to keep going, suggest opening a new session.

### Execution scope

One phase is one execution session. The Plan session sizes each phase to the phase budget and splits phases only at real seams: a green-build point, a module boundary, or a behavior change. A phase typically holds 2–3 commits.

The hand-off names the phase (for example, "Phase 2, Commits 3–4"). When the hand-off names no scope, the session covers one phase. Inside a multi-commit session, each commit is still its own unit: re-ground, log decisions, summarize, and wait for the commit go-ahead, then start the next commit without asking.

### Plan mode is a strong signal

When plan mode is active and the stated deliverable is a file (a discovery doc or implementation plan), **that file is the entire session output.** Exiting plan mode is not a handoff into implementation — it is the end of the session.

### Re-grounding before action

Every Plan session and every Execution session must verify its inputs against the current state of the code before acting:

- **Every session** — read the **In Plain Words** section of the doc in scope first. An Execution session also reads the **In plain words** line of each phase in scope.
- **Discovery and Plan sessions** — read `docs/architecture/overview.md` (and any subsystem page) before designing; its `Key Decisions` are binding context.
- **Plan sessions** — re-read the relevant code. The discovery doc is a snapshot; verify the plan's assumptions against the current source.
- **Execution sessions** — re-read the current code for the unit being touched. `// deliberate:` fence-signs encountered in that code are binding unless explicitly revisited with Robert.

### Model selection

Opus by default. Fable for process-redesign sessions.

### File locations

**File names start with the initiative ID.** `<ID>` is the `planned-work.md` ID exactly as written (`F.001`, `B.003`), followed by a hyphen and the initiative name in kebab-case: `F.001-degree-of-success-odds-discovery.md`.

- **Discovery docs** — `docs/initiatives/discovery/<ID>-<initiative-name>-discovery.md`
- **Implementation plans** — `docs/initiatives/implementation/<ID>-<initiative-name>-plan.md`
- **Execution hand-offs** — `docs/initiatives/implementation/<ID>-<initiative-name>-handoff.md`
- **Completed artifacts** — moved to `docs/initiatives/discovery/completed/` and `docs/initiatives/implementation/completed/` when the initiative ships

Plans never live in `~/.claude/plans/` or other harness defaults — they are repo-tracked artifacts.

### Decision records

Decisions are recorded where they are made and *read* where they cannot be skipped — push, not pull. There is no central decisions log.

**Where decisions are written:**

- Discovery decisions live in the discovery doc
- Plan decisions live in the plan's "Decisions Ratified in Planning" section
- Execution-time decisions (and reversals of planned decisions) land in the plan's **Decision Record** section

**Where decisions are read (the push surfaces):**

1. **Architecture pages (primary).** `docs/architecture/overview.md` carries a `Key Decisions` section — the durable "why the module is shaped this way." Reading it is a required re-grounding step. Split out subsystem pages (from `templates/arch-page.md`) when a subsystem's decisions outgrow the overview.
2. **Code fence-signs.** A one-line `// deliberate: X, not Y, because <reason>` at the fence itself.
3. **Completed plan docs (provenance).** Each initiative's plan ships to `completed/` carrying its Decision Record.

**Promotion.** The pre-merge checklist graduates architecturally-durable decisions from the plan's Decision Record into `Key Decisions`. Micro-decisions stay behind as plan-doc provenance or fence-signs.

**Mutability contract.** The plan Decision Record is *mutable*: append **and reconcile**. When execution overrides a planned decision, log the reversal with rationale and fix the plan body so it doesn't lie.

## 8 — Templates

- **Discovery doc** — [`templates/discovery.md`](./templates/discovery.md)
- **Implementation plan** — [`templates/implementation-plan.md`](./templates/implementation-plan.md)
- **Execution hand-off** — [`templates/execution-handoff.md`](./templates/execution-handoff.md). Never committed; the session that uses it deletes it.
- **Architecture page** — [`templates/arch-page.md`](./templates/arch-page.md). For splitting a subsystem out of `docs/architecture/overview.md`.

All templates carry inline guidance (HTML comments). Required sections are marked `REQUIRED`; everything else is included only when relevant.

Every initiative artifact opens with a required **In Plain Words** section: what, why and how it fits, in plain words, under 15 lines. Inside a plan, each phase also opens with a required **In plain words** line: one or two sentences, scoped to that phase.

Templates evolve as we learn what artifacts actually need. When a change here would also help gm-toolkit (or the reverse), note it — that drift is the signal to extract the shared process into a plugin.
