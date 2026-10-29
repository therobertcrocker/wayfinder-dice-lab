# Hand-off — [Initiative ID] execution ([Phase N]: [phase name])

<!--
COPY THIS FILE TO: docs/initiatives/implementation/<ID>-<initiative-name>-handoff.md

A hand-off starts the next Execution session. Write it at the end of a session,
after its last commit lands. Never commit it; the session that uses it deletes it.

Sections marked FIXED hold the same rules in every hand-off; edit only the
bracketed slots. The other sections change each time: write them from the current
source, not from the plan text. Re-check each line number and anchor you cite.

Delete these comments before writing.
-->

**Mode:** Execution. **Branch:** `[branch]` ([previous phase] landed at `[short sha]`).
**Scope:** [plan name], **[Phase N], Commits [a]–[b]**:
  [a]. `[commit message title]`
  [b]. `[commit message title]`
The session ends when Commit [b] lands. Do not start Commit [b+1].

## Read first
<!-- The plan sections in scope and the architecture Key Decisions that bind this phase. -->
1. `[plan path]` — In Plain Words, the In plain words line of [Phase N],
   Decisions Ratified in Planning (esp. [numbers]),
   Decision Record — Execution (entries 1–[n]), Shared Context, then the tasks for the
   commit at hand. The tasks are the edits: literal Find/Replace and full files.
2. `docs/architecture/overview.md` — Key Decisions.

## How to run each commit
<!-- FIXED. Edit only the next Decision Record number. -->
- **Delete this hand-off file during this session.** Hand-offs are never committed.
- **Re-ground first.** Re-read the current source for every file the commit touches,
  and check each Find anchor against it. If an anchor no longer matches, find the same
  code and log the drift in the plan's Decision Record.
- `// deliberate:` fence-signs in touched code are binding.
- Green before each commit: `node --check` on each changed `.js` file, and `node --test` once tests exist.
- Log any execution-time decision or reversal in the plan's **Decision Record —
  Execution** (next entry is [n+1]) before the commit that carries it. Fix the plan
  body so it stays true.
- Change files only with Edit/Write. No heredoc or sed edits.
- Before each commit: ask Robert, then give a plain-language summary and a short
  review. Do not commit until Robert says so. Stage with `git add -A`. Use the plan's
  commit message.
- After each commit, start the next one in scope without asking.

## What [previous phase] left in place
<!-- Code the earlier phases added that this scope builds on or must not break: new types, fence-signs, test helpers, an anchor that moved. One bullet each, with file:line. -->
- [item]

## Watch-outs for this scope
<!-- Per commit and task: anchors that drifted, find strings that wrap across lines, caller counts that changed, tests that match on text, generate steps, path drift already in the Decision Record. -->
- **Commit [a], Task [n]:** [watch-out]

## Possible rules questions (ask Robert; do not decide)
<!-- OPTIONAL. Delete the section when there are none. Give the case and both readings. -->
- **[case]** — [what the plan's code does, and the other reading]

## Decisions that are Robert's rules calls — do not re-open
<!-- FIXED heading and closing line. List every rules call ratified so far in this plan. -->
- Decision [n]: [one-line ruling]
If execution surfaces a rules question the plan does not answer, ask Robert
(AskUserQuestion, both readings with their table effect). Do not decide it.

## Ahead (not this session)
<!-- One or two lines: the next phase, or the pre-merge checklist. -->
[next scope]
