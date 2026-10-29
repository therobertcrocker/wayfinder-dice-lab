# Vision

> The north star for Wayfinder Dice Lab. Read it before you start any initiative. When an initiative and this doc disagree, flag it and decide with Robert: change the initiative or change this doc.

<br/>

## In Plain Words

Wayfinder Dice Lab answers dice-probability questions for a GM at the table, quickly and with no setup.

- **What** — an exact dice-probability engine, a layer that turns common GM questions into engine calls, and a Foundry VTT integration that fills in the numbers from PF2e actors and items
- **Why** — AnyDice can do the math, but each question needs a lot of custom setup and only answers one narrow question
- **Example** — "For this monster's Strike, what is the chance of each degree of success against each PC?"
- **How it is built** — three layers, built in order: engine, then questions, then Foundry integration. Each layer uses only the layers below it.

<br/>

## The Problem

AnyDice calculates exact distributions, but the GM must write the question as a program. This program asks "does each PC succeed against DC 38?":

```
DC: 38
K: 24
T: 22
A: 24
K_MAX: 20+K
T_MAX: 20+T
A_MAX: 20+A

output [count {DC..K_MAX} in 1d20+K] named "Kas succeeds"
output [count {DC..T_MAX} in 1d20+T] named "Tavish succeeds"
output [count {DC..A_MAX} in 1d20+A] named "Arabesque succeeds"
```

Result: Kas 0.35, Tavish 0.25, Arabesque 0.35.

Its limits:

- **One degree only** — it gives "success or not," not the four degrees of success
- **No game rules** — no ±10 rule and no natural 20/1 step shift
- **Data is inside the formula** — a new PC or DC means you edit the program
- **Hidden tricks** — the mean of a 0/1 count is the probability; you must know this to read the result
- **Fragile edges** — if the DC is above the maximum roll, the range `{DC..MAX}` runs backwards

<br/>

## Layers

```
  Foundry integration   (reads PF2e actors and items, shows results)
          │
    Question layer      (vs. the party, damage per turn)
          │
    Core engine         (dice, distributions, outcome functions, presets)

  Core engine and question layer: plain JS, no Foundry globals, node --test
```

### Core Engine

**Purpose** — take a dice formula and give its exact probability distribution.

**Input**

- A JavaScript API first (for example `d(20).plus(24)`)
- Foundry-style formula strings next (`2d20kh+15`, `2d6+4`), which turn into API calls

**Mechanics (v1)**

- **Sums and modifiers** — `NdX + N`, several dice groups added together
- **Keep highest / lowest** — for example `2d20kh` (fortune), `2d20kl` (misfortune), `4d6` drop lowest
- **Rerolls and exploding dice**
- **General outcome functions** — these are general TTRPG patterns; PF2e only sets the numbers:

| Function | Pattern | PF2e use |
|----------|---------|----------|
| Tiered outcome | Compare a total to a target, with bands | Four degrees of success, ±10 bands |
| Natural-face rule | A die face moves the result up or down one tier | Natural 20 / natural 1 |
| Branch on outcome | Each tier picks its own formula | Crit doubles damage; deadly and fatal |

- **Presets** — named settings for the outcome functions and turn rules, with no code of their own. The first is `pf2e`. A preset for another system is only more settings.

**Output**

- The full distribution: every value → its probability, in order
- Stats: mean, deviation, minimum, maximum, at-least, at-most

**Non-goals**

- **A full AnyDice-style language** — a parser, interpreter and error messages is a large build for a small gain. Revisit when a real question cannot be expressed with the API and formula strings.
- **Drawing charts** — that is a UI concern. The full distribution is the chart data.
- **A separate package or web page** — the engine can be split out later if a need appears

### Question Layer

**Purpose** — turn a GM's question into engine calls, and give the answer for each target.

**Input** — plain data only: names, modifiers, DCs and AC, damage formulas. The Foundry integration turns PF2e actors into this data, so this layer stays testable without Foundry.

```
{
  roll: { name: "Claw", modifier: 24 },
  targets: [
    { name: "Kas",       defense: 38 },
    { name: "Tavish",    defense: 36 },
    { name: "Arabesque", defense: 37 }
  ]
}
```

**Direction** — both: monster vs party, and party vs monster. A question says who rolls and who defends. For a save, the target rolls against the attacker's DC.

**Turns** — a turn is a list of actions (for example Strike, Strike, Strike). The multiple attack penalty is applied in order. It is a turn rule in the `pf2e` preset (−5/−10, agile −4/−8), not hard-coded.

**Question types (v1)**

| Question | Gives, for each target |
|----------|------------------------|
| Degree of success vs targets (`F.001`) | Chance of critical success, success, failure and critical failure |
| Damage per turn (`F.002`) | Damage distribution and mean for one action or a full turn, with crits counted |

Basic saves (half, full or double damage) use **branch on outcome**. They need no new mechanic.

**Later**

- **Compare options** (planned) — side by side, for example "Strike twice" vs "cast a spell," or "which save should I target?"
- **Encounter-level odds** (planned) — for example "chance this monster drops a PC in one round," using HP and repeated turns

### Foundry Integration

**Purpose** — read PF2e actors and items, turn them into plain data for the question layer, and show the results.

**Entry points** — all are wanted:

- A button on a Strike or spell
- Selected and targeted tokens
- A standalone window
- A chat card button

**Display** — probably a window. Decided in Discovery.

**Access** — GM only.

**Read-only** — it never changes actors, items or rolls.

<br/>

## How the Layers Connect

```
 PF2e actors/items ──► Foundry integration ──plain data──► Question layer ──► Core engine
                              ▲                                  │                │
                              └──────── results per target ◄─────┴─ distributions ┘
```

- Each layer uses only the layers below it
- The Foundry integration is the only layer that knows the Foundry API or the PF2e data model

<br/>

## Principles

- **Exact math, not simulation** — dice distributions are small and finite, so results are exact, fast and testable
- **Standalone engine** — plain JS modules with no Foundry globals, in this repo, tested with `node --test`
- **Always expose the full distribution** — not only summary stats, so charts and new stats stay easy later
- **System-neutral engine, PF2e-only module** — the engine has general functions and presets; the module still targets PF2e only (Key Decision in `docs/architecture/overview.md`)
- **Data stays out of formulas** — modifiers, DCs and party members are inputs, not text inside a formula

<br/>

## Non-Goals

- **A full AnyDice-style language** — see the core engine non-goals
- **Player access in v1** — the tool is GM only
- **A dice roller** — it calculates odds; it does not roll or replace PF2e rolls
- **An encounter builder** — XP budgets and creature choice stay with PF2e and other tools
- **Other game systems in the module** — the engine is system-neutral, but the module targets PF2e

<br/>

## Open Questions

| Question | Layer | Where it is decided |
|----------|-------|---------------------|
| Exploding dice can go on forever: what depth cap, and how do we report the cut-off probability? | Core engine | Engine Discovery |
| Exact API shape and naming | Core engine | Engine Discovery |
| Resistances, weaknesses and immunities: v1 or later? | Question layer | Question layer Discovery |
| Persistent damage: count it in damage per turn, or keep it separate? | Question layer | Question layer Discovery |
| Who is "the party" by default? It depends on context | Foundry integration | Foundry integration Discovery |
| How are results shown? | Foundry integration | Foundry integration Discovery |
| In what order do the entry points ship? | Foundry integration | Foundry integration Plan |

<br/>

## Initiative Order (Planned)

1. **Core engine** (planned) — `F.005` (JS API and mechanics), then `F.006` (formula strings)
2. **Question layer** (planned) — `F.001` (degree-of-success odds) and `F.002` (damage per turn) are its v1 question types; `F.003` and `F.004` come later
3. **Foundry integration** (planned)
