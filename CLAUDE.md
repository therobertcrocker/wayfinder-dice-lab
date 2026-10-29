# Wayfinder Dice Lab — Claude Instructions

<!-- Lean port of gm-toolkit's CLAUDE.md (therobertcrocker/gm-toolkit). Shared rules are kept close to the original; repo-specific parts are rewritten. -->

## Collaboration

1. Design is always collaborative. Implementation first pass is usually Claude's.
2. Don't jump ahead — if no question or directive has been given, reflect back what was said and ask where to go next.
3. Role: mentor or co-pilot. Robert is designing, Claude is advising.
4. Always follow Robert's decisions exactly. When he specifies order, structure, or behavior, implement it precisely — do not substitute own judgement.
5. Always use the LSP tools available to search through the existing codebase - don't use grep. (The TypeScript LSP plugin covers `.js` files; see `.claude/settings.json`.)
6. Always create a to-do list for any series of tasks. Check in with Robert for design calls and scope changes. Do not stop to ask permission to start the next task of an approved plan or hand-off.
7. Always use asd-ste100 simplified technical english
8. Before making a commit, do the following:
   1. Log any execution-time decisions (or reversals of planned decisions) in the initiative plan's **Decision Record** section. Append and reconcile: when execution overrides a planned decision, record the reversal with rationale and fix the plan body so it doesn't lie. (There is no central decisions log; see `session-modes.md` section 7, Decision records.)
   2. All file changes must be staged and committed, even if they aren't directly related to the feature at hand. Lost work is unacceptable. If you are unsure whether a change should be committed, ask.
9. Before merging a branch, do the following (step-by-step, in order):
   1. A code-review as if you were a senior engineer reviewing a junior's PR. Use /code-review skill. Be critical, but constructive. Don't just point out issues — suggest specific improvements.
   2. Promote durable decisions: graduate architecturally-significant entries from the plan's Decision Record into the `Key Decisions` section of `docs/architecture/overview.md` (or a subsystem page, once one exists). Micro-decisions stay in the plan as provenance.
   3. Update `docs/planned-work.md` with any new features or deferred items that arose during the work. If a feature was completed, remove it.
   4. Move the initiative's discovery and plan docs to their `completed/` subdirectories.
10. After every branch merge, assess whether the work warrants a patch/minor/major bump. Check current version with `git describe --tags --abbrev=0`. **In this repo a release ships:** publishing a GitHub Release tagged `vX.Y.Z` builds the module and offers it to the live game server as an update. Propose the bump; Robert publishes the release.
11. Use conventional commits: `type: description` (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`). Concise, imperative mood.
12. Three Principles of Code:
    1. **Clarity:** Code should be easy to read and understand. Prioritize readability over cleverness or brevity.
    2. **Correctness:** Code should do what it's supposed to do, and handle edge cases gracefully. Don't just solve the happy path.
    3. **Maintainability:** Code should be organized and structured in a way that makes it easy to modify and extend in the future. Avoid unnecessary complexity.

## Documentation Discipline

Before any feature discussion or implementation, read the doc(s) relevant to the work at hand:

| If you're working on…                | Read first                                  |
|--------------------------------------|---------------------------------------------|
| What the module is for               | `README.md` — "What it's for"               |
| Feature Request or Deferred Decision | `docs/planned-work.md`                      |
| Before making a design choice        | `Key Decisions` in `docs/architecture/overview.md` plus the initiative plan's Decision Record |
| Architecture or system shape         | `docs/architecture/overview.md`             |
| Setup, dev container, or releasing   | `README.md` — Development and Installing sections |
| PF2e rules behavior                  | `docs/rules/` (no pages yet — create one on first need; cite the Archives of Nethys rule page) |
| Foundry API behavior                 | Foundry API docs for v13/v14 (https://foundryvtt.com/api/) — never older versions |
| Creating or editing any doc          | `docs/process/style-guide.md`               |
| When implementing a feature...       | `docs/initiatives/implementation/<ID>-<initiative-name>-plan.md` |
| Session modes, flows, or templates   | `docs/process/session-modes.md`             |

When docs conflict, flag the conflict before proceeding. When docs are silent on something the implementation must decide, ask before deciding.

## Session Modes

See `docs/process/session-modes.md` for the full description of Discovery / Plan / Execution modes, the initiative lifecycle, per-type flows (feature / bugfix / docs / chore), session discipline, and templates. Always read the session modes doc before starting a new initiative or session, and refer back to it as needed. Templates for docs are found in `docs/process/templates/`.

**Discovery:** Start with a scaffolded doc in `docs/initiatives/discovery/<ID>-<initiative-name>-discovery.md`. Every initiative doc file name starts with the initiative ID as written in `planned-work.md` (for example `F.001-degree-of-success-odds-discovery.md`). Use the template and fill in the sections as you go. The goal is to explore the problem space, gather information, and identify potential solutions. The output is a clear definition of the problem, a set of possible approaches, and a recommended next step (usually a Plan session).

**Implementation:** Read the discovery doc, then relevant code. Ask any open questions, and then determine the Phases, Commits, Tasks. Write the implementation doc in one go at `docs/initiatives/implementation/<ID>-<initiative-name>-plan.md` using the template. The goal is to create a clear, actionable plan for implementing the feature or bugfix. The output is a detailed implementation plan that can be executed in the next phase.

## Session Boundaries
| Session Type | Boundary Definition |
|--------------|---------------------|
| Discovery    | Once the discovery doc is complete and the next steps are clear, the session is over. |
| Plan         | Once the implementation plan is complete and the next steps are clear, the session is over. |
| Execution    | One phase is one session. The hand-off sets the scope (for example, "Phase 2, Commits 3–4"). If the hand-off gives no scope, the scope is one phase. Once that scope is committed, the session is over. |

## Model Selection

Opus by default. Fable for process-redesign sessions.

## Code Style

- **Parameter names:** Always full words — `attackModifier` not `mod`, `target` not `t`, `degreeOfSuccess` not `dos`.
- **YAGNI:** Solve the concrete present problem. Don't pitch stronger guarantees (extensibility hooks, future-proofing) unless there is a real, present-day consequence of not doing so. Lead with the simplest fix that addresses the actual bug.
- **No comments** unless the WHY is non-obvious. No "added for X" comments.
- **JSDoc:** open question — see `C.001` in `docs/planned-work.md`. Until Robert decides, do not add or remove JSDoc blocks or explanatory comments in existing files.
- **Fence-signs are the licensed exception:** `// deliberate: X, not Y, because <reason>` — a one-line marker at a spot a future reader would be tempted to "fix." This is exactly the non-obvious-WHY case. One line, placed at the fence; binding during re-grounding unless explicitly revisited with Robert.
- **Foundry conventions:** UI uses `ApplicationV2` (never the v1 `Application`/`FormApplication`). Import the module id from `scripts/constants.js`; never hard-code it. User-facing strings go in `lang/en.json`. CSS rules are scoped under `.wayfinder`.
- **Green before commit:** `node --check` on every changed `.js` file, and `node --test` once tests exist.
