# [Subsystem Name]

<!--
COPY THIS FILE TO: docs/architecture/<subsystem>.md
  Use it when a subsystem's decisions outgrow docs/architecture/overview.md.

An architecture page is the durable home for one subsystem's "what it is" and
"why it's shaped this way." It is the primary read surface of the push-not-pull
decision system (session-modes.md section 7): Discovery and Plan sessions open
the relevant page during re-grounding, and pre-merge promotion appends durable
decisions to Key Decisions here.

Routing rule: anything about a single subsystem lives on that subsystem's page;
only narrative that spans subsystems stays in overview.md.

Prose-first. Reach for a small code signature only where it carries more than
the sentence would. No status line, no last-verified line — the page is current
because we keep it current.

Delete these comments before writing.
-->

> **Code:** `scripts/<path>` (`, scripts/<path>`…)

<!--
REQUIRED. The code-map header: the package(s) this page describes, as inline
backticked paths. A reader following the page to source starts here.
-->

## Purpose

<!--
REQUIRED. 2–5 sentences: what this subsystem is for and the one-line version of
how it does it. A Discovery reader should know after this section whether this
is the page they need.
-->

## Shape

<!--
REQUIRED. The structural story: the package's key types/interfaces, the data
flow through them, and the boundaries with neighbours. Prose-first; small code
signatures only where they carry more than prose. This is the longest section.

Leave a `<!-- diagram: ... -->` breadcrumb where a diagram is wanted.
-->

## Key Decisions

<!--
REQUIRED. The durable "why this subsystem is shaped this way," topic-organized.
One bold lead-in per decision + rationale. This is the surface pre-merge
promotion appends to. Provenance links (plan docs) welcome but optional.
-->

- **<Decision>** — <rationale>.

## Dependencies

<!--
REQUIRED. Both axes, briefly: what this subsystem depends on and what depends
on it (code axis), each named subsystem linked to its page where one exists
(doc axis). A short prose paragraph or two split lists ("Depends on" / "Depended
on by") — whichever reads cleaner for the subsystem.
-->
