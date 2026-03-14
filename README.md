# Skill Evolver

A tool for iteratively improving Claude skills (SKILL.md files) through web research, blind A/B evaluation, and accumulated human feedback.

**[Live App →](https://mjsilverman19.github.io/skill-evolver/)**

## What it does

Skill Evolver takes a Claude skill file and helps you improve it through a structured loop:

1. **Research** — Searches the web for current trends relevant to your skill domain (typography, CSS, animation, design systems, etc.) and synthesizes findings into a proposed skill update
2. **Eval** — Generates outputs from both the current and proposed skill using the same test prompts, then presents them to you blind (Output X / Output Y) so you can judge without bias
3. **Feedback** — Your eval judgments and notes accumulate as structured feedback that feeds into the next research cycle
4. **Iterate** — Each round incorporates everything learned so far, progressively refining the skill

## Features

- **Blind A/B evaluation** — Outputs are randomly assigned to X/Y so you judge on quality, not which skill produced them. Labels reveal after you submit.
- **Live HTML preview** — Eval outputs render in full-width iframes so you can see the actual visual result, not just code
- **One test at a time** — Each eval prompt generates on demand. Review, judge, then decide whether to continue or stop.
- **Feedback loop** — Eval judgments auto-populate the Feedback tab, which gets incorporated into the next research synthesis
- **Persistent state** — All config, feedback, history, and eval results persist across sessions via localStorage
- **Retry with backoff** — API calls handle 429 rate limits with exponential backoff
- **Config-driven** — Works with any skill, not just frontend-design. Set up with any SKILL.md content.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, enter your Anthropic API key, and paste your SKILL.md content to get started.

## Architecture

Single-file React app (`src/SkillEvolver.jsx`) running on Vite. No backend — all API calls go directly to `api.anthropic.com` from the browser. State persists via `window.storage` (polyfilled to localStorage in `main.jsx`).

## Requirements

- Anthropic API key with access to `claude-sonnet-4-20250514`
- Node.js 18+
