# Human-in-the-Loop Skill Optimization: Iterative Refinement of LLM Prompts Through Blind Evaluation and Web-Augmented Research

> Most prompt optimization research focuses on automated metrics and LLM-as-judge approaches. But for subjective, creative domains—where "better" is a matter of taste—automated evaluation falls short. Skill Evolver takes a different approach: it keeps the human in the loop, structures their feedback into a compounding signal, and augments each iteration with live web research. The result is a lightweight, zero-infrastructure system for systematically improving LLM skill files through blind A/B evaluation.

## Background

Prompting is the primary interface between humans and large language models. A well-crafted prompt—or *skill file*—can dramatically shift the quality, style, and reliability of an LLM's outputs. Yet the process of improving prompts remains, for most practitioners, an ad hoc exercise: tweak a word, eyeball the result, repeat.

This matters because prompts are increasingly treated as *artifacts*—versioned, shared, and deployed like code. Claude's skill system (SKILL.md files), OpenAI's custom instructions, and the broader ecosystem of system prompts all reflect a shift toward prompts as durable, reusable assets. When a prompt governs thousands of interactions, the difference between a good prompt and a great one compounds.

The research community has responded with a growing body of work on **automatic prompt optimization (APO)**. These methods use data-driven techniques to search for better prompts algorithmically, reducing the manual effort required and sometimes discovering prompts that outperform those written by humans. Before introducing Skill Evolver, it's worth understanding the landscape it sits within.

## The Automatic Prompt Optimization Landscape

Several families of techniques have emerged for optimizing prompts without (or with minimal) human intervention. Each makes different tradeoffs between search breadth, computational cost, and the type of signal used to guide optimization.

### Automatic Prompt Engineer (APE)

APE [Zhou et al., 2023] takes a generate-and-select approach. An LLM proposes a pool of candidate prompts (typically 32–64), each is evaluated against a scoring function using zero-shot inference, and the best-performing prompt is selected. Despite its simplicity, APE finds prompts that match or surpass human-written ones on many benchmarks.

**The key insight:** the LLM itself is a surprisingly good source of prompt variations, and brute-force search over a modest pool can surface strong candidates.

### Gradient-Free Instructional Prompt Search (GrIPS)

GrIPS [Prasad et al., 2023] uses heuristic edit operations—deletion, swap, paraphrase, addition—applied at the phrase level. Starting from an initial prompt, it generates variants through local edits and selects those with improved performance. Think of it as hill-climbing in prompt space using a predefined set of mutations.

**The key insight:** you don't need an LLM to generate variations. Simple, structured edits can systematically explore the neighborhood of a working prompt.

### Automatic Prompt Optimization (APO)

APO [Pryzant et al., 2023] introduces a more directed search. Rather than generating candidates blindly, it collects batches of errors from the current prompt, summarizes them into natural language "gradients"—text-based critiques describing what went wrong—and uses these gradients to guide edits. This creates a feedback loop:

```
Current Prompt → Generate Outputs → Collect Errors → Summarize "Gradient" → Edit Prompt → Repeat
```

**The key insight:** error analysis, expressed in natural language, can serve the same role as numerical gradients in traditional optimization. The "gradient" tells you *what* to fix and *why*.

### Optimization by Prompting (OPRO)

OPRO [Yang et al., 2023] frames prompt optimization as a generic optimization problem described in natural language. An "optimizer" LLM receives a meta-prompt containing prior solutions and their objective values, then proposes new candidates. The meta-prompt is updated over time with the best-performing prompts, creating a form of in-context learning over the optimization trajectory.

**The key insight:** LLMs can perform optimization directly when given the right framing—a history of attempts and their scores is often sufficient context for an LLM to infer improvements.

### PromptWizard

PromptWizard [Microsoft Research, 2025] combines several of these ideas into a unified framework where the LLM generates, critiques, and refines its own prompts in an iterative loop. Each cycle produces a prompt that is evaluated, critiqued, and then improved based on the critique. This self-evolving approach achieves strong results across diverse tasks.

## The Problem with Automated Evaluation

All of the methods above share a common assumption: **there exists a reliable automated scoring function**. For factual QA, code generation, or classification tasks, this assumption holds—you can check answers against ground truth or measure pass rates. Automated evaluation works.

But consider a different class of tasks:

- *Design a landing page for a ceramics studio*
- *Create a dashboard with a distinctive visual identity*
- *Build a settings panel that feels like a premium desktop app*

These are **subjective, creative tasks** where the output is visual, aesthetic, and taste-dependent. What makes one landing page "better" than another? It's not something you can reduce to a single metric. LLM-as-judge approaches—where one model evaluates another's output—have gained popularity here, but they introduce their own biases:

1. **Self-preference bias.** LLMs tend to prefer outputs that match their own generation patterns, creating a closed loop that optimizes for "typical LLM output" rather than genuinely distinctive work.
2. **Anchoring on surface features.** LLM judges often anchor on easily verifiable features (code compiles, has responsive breakpoints) while missing holistic qualities (does this *feel* like something a human designer would build?).
3. **Inability to render.** For visual outputs like HTML/CSS, an LLM judge evaluates *code* but cannot see the *rendered result*. A human can.

This is the gap that motivated Skill Evolver.

## Skill Evolver: The Core Idea

Skill Evolver is a system for iteratively improving Claude skill files (SKILL.md) through a structured loop that keeps a human evaluator at the center while augmenting each iteration with live web research. The system operates in four phases:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Research    │────▶│  Evaluate    │────▶│  Feedback    │────▶│  Iterate     │
│             │     │             │     │             │     │             │
│ Web search  │     │ Blind A/B   │     │ Structured  │     │ Synthesize  │
│ for current │     │ human eval  │     │ judgment +  │     │ research +  │
│ trends      │     │ of rendered │     │ notes       │     │ feedback    │
│             │     │ outputs     │     │ accumulate  │     │ into update │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       ▲                                                           │
       └───────────────────────────────────────────────────────────┘
```

Each phase addresses a specific limitation of existing approaches.

### Phase 1: Web-Augmented Research

Before proposing any changes to a skill, the system conducts targeted web research to ground its recommendations in current best practices rather than the LLM's training data (which has a knowledge cutoff).

This happens in three steps:

1. **Adaptive query generation.** The system examines the current skill content, accumulated user feedback, and previous research summaries, then generates 5 targeted search queries. If the user has logged 8 typography complaints and 1 animation complaint, the queries will skew toward typography. Previous research summaries are provided to avoid re-covering known ground.

2. **Web search execution.** Each query is sent to Claude with web search enabled (the `web_search_20250305` tool), with staggered timing (3-second delays) to manage rate limits. The raw findings from all 5 searches are collected.

3. **Synthesis.** The combined research findings, accumulated feedback, and current skill content are fed into a synthesis prompt that produces both a summary of proposed changes and a complete updated skill file.

**Why this matters:** Most prompt optimization operates in a closed loop—the LLM optimizes against its own knowledge. Web-augmented research breaks this loop by injecting *external, current information*. If CSS container queries just reached 96% browser support, or if a font that was trendy last year is now considered overused, the system learns this from the web rather than relying on potentially stale training data.

The system also maintains a **rolling summary of previous research** (last 3 sessions), stored in localStorage, which serves as a deduplication mechanism. Each new research cycle is prompted to focus on what is *new or changed* since the last summary, preventing the system from repeatedly discovering the same information.

### Phase 2: Blind A/B Evaluation

The evaluation phase is where Skill Evolver diverges most sharply from the automated optimization literature. Instead of scoring outputs with metrics or an LLM judge, the system presents outputs to a human evaluator in a blind format.

The process works as follows:

1. **One prompt at a time.** The system takes a test prompt (e.g., "Build a dashboard for tracking daily reading habits") and generates an output from both the current skill (A) and the proposed skill (B).

2. **Random assignment.** Output A is randomly assigned to be either "Output X" or "Output Y". The human evaluator has no way to know which skill produced which output.

3. **Live HTML rendering.** Both outputs are rendered in full-width iframes (sandboxed with `allow-scripts allow-same-origin`), so the evaluator sees the *actual visual result*—not just the code. This is critical for design-oriented skills where the rendered output is what matters.

4. **Judgment.** The evaluator selects a winner (X, Y, or tie) and optionally writes notes explaining their reasoning.

5. **Reveal.** After submitting judgment, the labels are revealed (which was A and which was B). The evaluator can then choose to continue to the next test prompt or stop.

**Why blind evaluation matters.** Knowing which output came from the "new and improved" skill introduces confirmation bias—you *want* it to be better, so you see it as better. Blind evaluation forces you to judge on the output alone. The commit history of Skill Evolver actually shows a deliberate move *away* from AI-judged evaluation toward this human-blind approach, reflecting a practical lesson: for visual, subjective outputs, human judgment with bias controls outperforms automated scoring.

### Phase 3: Structured Feedback Accumulation

Every judgment and note from the evaluation phase is automatically formatted and added to a persistent feedback store. But feedback also comes from direct observation during regular usage of the skill—the user can log specific issues at any time through a categorized feedback interface.

Feedback is organized by category:

- **typography** — font choices, pairing, scale
- **color** — palette, theme, contrast
- **layout** — spatial composition, grid usage
- **animation** — motion, transitions, micro-interactions
- **framework** — component patterns, library usage
- **accessibility** — a11y issues
- **general** — anything else

This categorical structure serves two purposes:

1. **Weighted research queries.** When generating adaptive research queries, the system counts feedback by category. A category with many complaints gets more research attention in the next cycle.

2. **Targeted synthesis.** During skill synthesis, the full feedback log is provided with category labels, allowing the LLM to prioritize specific aspects of the skill for revision.

**The compounding effect.** Because feedback persists across sessions (via localStorage), each iteration of the loop has access to the full history of observations. Early feedback about typography issues that hasn't been fully addressed will continue to appear in the context, applying persistent pressure toward resolution. This is analogous to how a growing test suite provides increasing coverage—each observation is a "test case" that the skill must satisfy.

### Phase 4: Iteration and Version History

When the user approves a proposed skill update, the system:

1. Records the previous skill version with its summary in a version history
2. Updates the current skill to the approved version
3. Makes the new version available as the baseline for the next research cycle

The version history supports full-content rollback (any previous version can be restored) and side-by-side diff comparison using an LCS-based algorithm. This mirrors version control in software development—you can always see what changed, when, and why, and revert if a change made things worse.

## Architecture: Zero Infrastructure by Design

A notable architectural decision in Skill Evolver is its commitment to **zero infrastructure**. The entire system runs as a single-page React application in the browser:

- **No backend server.** API calls go directly from the browser to `api.anthropic.com` using the `anthropic-dangerous-direct-browser-access` header.
- **No database.** All state persists via `window.storage` (polyfilled to localStorage).
- **No accounts.** The user provides their own Anthropic API key.
- **Single file.** The entire application logic lives in one React component file (~2,350 lines).

This is a deliberate tradeoff. Established prompt evaluation platforms (PromptLayer, Braintrust, Langfuse, Agenta) offer team collaboration, production monitoring, automated pipelines, and integrations. Skill Evolver sacrifices all of that in exchange for:

- **Zero friction.** Open a URL, paste an API key, paste a skill—you're running evaluations in under a minute.
- **Full ownership.** No data leaves your browser except to the Anthropic API. No telemetry, no accounts, no vendor lock-in.
- **Individual focus.** The tool is designed for a single practitioner iterating on their own skill, not a team managing a prompt pipeline.

The system also handles API reliability concerns at the client level: exponential backoff for rate limits (429 responses), 120-second request timeouts, and retry logic with configurable maximum attempts.

## Comparison with Existing Approaches

| Dimension | APE / GrIPS / APO / OPRO | PromptLayer / Braintrust / Langfuse | Skill Evolver |
|-----------|--------------------------|--------------------------------------|---------------|
| **Evaluation** | Automated metrics | Automated + optional human review | Blind human eval (primary) |
| **Search strategy** | Generate-and-select or gradient-guided | Manual iteration with A/B tracking | Research-augmented synthesis |
| **Knowledge source** | LLM training data only | LLM + production logs | LLM + live web research |
| **Infrastructure** | Research code / notebooks | SaaS platform with accounts | Zero — browser only |
| **Target user** | ML researchers | Engineering teams | Individual skill authors |
| **Feedback persistence** | Per-experiment | Platform-managed | localStorage across sessions |
| **Best for** | Objective, measurable tasks | Production prompt management | Subjective, creative tasks |

The key differentiators are:

1. **Blind human evaluation as the primary signal.** Not as an optional add-on, but as the central mechanism. The entire UX is designed around making human judgment efficient and bias-resistant.

2. **Web research injection.** No other tool in the prompt optimization space augments each iteration cycle with live web search to ground recommendations in current practices.

3. **Feedback as a compounding asset.** Rather than treating each evaluation as independent, feedback accumulates and applies pressure across cycles. This is closer to how human expertise develops—through accumulated observation—than to how automated optimization typically works.

## Limitations and Future Directions

Skill Evolver's approach has clear limitations that are worth acknowledging:

**Scalability.** Human evaluation doesn't scale. If you need to evaluate 1,000 prompt variants across 50 test cases, automated methods are the only practical option. Skill Evolver is designed for a different regime: small numbers of iterations (5–15) where each iteration is high-signal.

**Single evaluator bias.** While blind evaluation removes knowledge-of-source bias, it doesn't address the fundamental limitation of a single evaluator's taste. Disagreements between evaluators are a well-studied problem in human evaluation research, and Skill Evolver currently has no mechanism for aggregating multiple evaluators' judgments.

**Domain specificity.** The system's value is highest for visual, creative, and subjective tasks where automated evaluation is weakest. For tasks with clear ground truth (factual QA, code correctness, classification), automated methods will be more efficient.

**Lack of automated baselines.** The system doesn't track quantitative metrics over time—no accuracy scores, no automated regression detection. Adding lightweight automated checks alongside human evaluation could provide a useful safety net.

Several directions seem promising for future work:

- **Multi-evaluator support** with inter-rater reliability metrics
- **Hybrid evaluation** combining automated checks (does the code render without errors?) with human judgment (is the design distinctive?)
- **Skill decomposition**—breaking a monolithic skill file into independent sections that can be optimized separately
- **Transfer learning across skills**—insights from optimizing one skill (e.g., "avoid Space Grotesk") might apply to related skills
- **Integration with CI/CD**—running automated evaluations on skill changes as part of a development pipeline, with human review reserved for ambiguous cases

## Conclusion

The prompt optimization landscape has largely moved toward automated, scalable techniques—and for good reason. Automated methods are efficient, reproducible, and necessary for production systems at scale.

But there is a class of tasks where the human eye remains the most reliable evaluator: visual design, creative writing, aesthetic judgment, brand voice. For these tasks, the question isn't "how do we remove the human?" but "how do we structure human judgment so it compounds efficiently?"

Skill Evolver offers one answer: blind evaluation to control bias, structured feedback to accumulate signal, web research to inject current knowledge, and version history to enable informed iteration. It's not a replacement for automated prompt optimization—it's a complement, filling the gap where automated metrics run out and human taste takes over.

The tool is available as an open-source, browser-based application at [https://mjsilverman19.github.io/skill-evolver/](https://mjsilverman19.github.io/skill-evolver/).

## References

- Zhou, Y., et al. (2023). *Large Language Models Are Human-Level Prompt Engineers.* ICLR 2023.
- Prasad, A., et al. (2023). *GrIPS: Gradient-free, Edit-based Instruction Search for Prompting Large Language Models.* EACL 2023.
- Pryzant, R., et al. (2023). *Automatic Prompt Optimization with "Gradient Descent" and Beam Search.* EMNLP 2023.
- Yang, C., et al. (2023). *Large Language Models as Optimizers.* NeurIPS 2023.
- Madaan, A., et al. (2023). *Self-Refine: Iterative Refinement with Self-Feedback.* NeurIPS 2023.
- Microsoft Research. (2025). *PromptWizard: Task-Aware Agent-Driven Prompt Optimization Framework.*
