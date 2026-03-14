import { useState, useEffect, useCallback, useMemo } from "react";

const REVISED_SKILL = `---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity. After years of AI experimentation and template fatigue, prioritize authenticity and human-centered approaches over algorithmic sameness.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Embrace trending categories like film-inspired serifs (wide apertures, soft bracketed serifs), funky curvy serifs, quiet sans-serifs, and kinetic typography that reflects emotion and personality. Pair expressive display fonts with practical, readable body fonts. Examples: Playfair Display + Lato, Bebas Neue + Open Sans, or Poppins + DM Serif Display. Avoid overused choices and prioritize contrast between personality and readability.

- **Color & Theme**: Commit to a cohesive aesthetic using CSS variables with data attributes for maximum flexibility. Use \`data-theme="light|dark"\` patterns for user-controlled toggles. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Move beyond ultra-minimal white space aesthetics toward designs that feel alive and intentional.

- **Motion**: Leverage production-ready CSS features: native scroll-driven animations, view transitions API for same-document transitions, and the :has() selector for state-based animations. For React, use Motion (formerly Framer Motion) for UI animations and component transitions, or GSAP for complex timeline-based work. Focus on meaningful motion over dramatic effects: scroll-triggered interactions, subtle micro-interactions, and kinetic typography. Prioritize one well-orchestrated experience with staggered reveals over scattered effects.

- **Spatial Composition**: Create layouts that feel handmade and human rather than algorithmically generated. Avoid "Frankenstein layouts" that feel randomly pieced together. Use intentional asymmetry, overlap, diagonal flow, and grid-breaking elements. Balance negative space with controlled density, ensuring every element serves the overall aesthetic vision.

- **Backgrounds & Visual Details**: Create atmosphere through organic textures and intentional imperfection. Use gradient meshes, noise textures, layered transparencies, and subtle grain overlays that feel crafted rather than template-based. Implement CSS container queries for responsive visual effects and anchor positioning for sophisticated layouts.

## Modern CSS & Component Patterns

Utilize production-ready 2026 features:
- **Native CSS nesting** (96% browser support) - eliminate preprocessor dependency
- **Container queries** for truly responsive components
- **:has() selector** for parent-based styling and reduced JavaScript
- **View Transitions API** for smooth page transitions in supported browsers
- **CSS anchor positioning** for sophisticated floating elements

For React projects:
- Use **shadcn/ui** with Radix primitives for headless, accessible components you own entirely
- Consider **React Server Components** with Next.js for performance benefits
- Leverage **Radix UI** or **Ark UI** for cross-framework headless component foundations
- Implement theming with CSS variables rather than runtime styling systems

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts, Space Grotesk), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, ultra-minimal designs with excessive white space that lack personality, polished stock imagery or AI-generated visuals with uncanny smoothness, and cookie-cutter design that lacks context-specific character.

Instead, draw inspiration from leading design systems: Linear's precisely calibrated minimalism with subtle animations, Stripe's flowing gradient animations that convey technical sophistication, and Vercel's streamlined navigation patterns that prioritize user workflow.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. Create designs that feel intentional, human-centered, and alive rather than template-based or algorithmically generated.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well, not from following generic patterns.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision that feels authentically human and purposefully crafted.`;

const CURRENT_SKILL = `---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.`;

const getStorageKeys = (skillId) => ({
  FEEDBACK: `skill-evolver:${skillId}:feedback`,
  SKILL_HISTORY: `skill-evolver:${skillId}:history`,
  LATEST_SKILL: `skill-evolver:${skillId}:latest`,
  CONFIG: `skill-evolver:${skillId}:config`,
  EVAL_CONFIG: `skill-evolver:${skillId}:eval-config`,
  EVAL_RESULTS: `skill-evolver:${skillId}:eval-results`,
});

const DEFAULT_CONFIG = {
  id: "frontend-design",
  currentContent: CURRENT_SKILL,
  researchDomains: [
    { label: "Typography & fonts", prompt: "Search the web for current web typography trends in 2025-2026. What fonts are designers actually using? What type pairings and scales are popular? What fonts are now considered overused or dated? Be specific with font names." },
    { label: "CSS & layout", prompt: "Search the web for new CSS features that have reached broad browser support in 2025-2026. Include container queries, :has(), view transitions API, anchor positioning, scroll-driven animations, CSS nesting. Which are production-ready now?" },
    { label: "Animation & motion", prompt: "Search the web for current frontend animation and motion design trends in 2025-2026. Is Framer Motion still the standard for React? What about GSAP, Motion One, or newer alternatives? What motion patterns are trending in web design?" },
    { label: "Components & architecture", prompt: "Search the web for current React component patterns and popular UI component libraries in 2025-2026. Cover Server Components maturity, new shadcn/ui patterns, Radix, Ark UI, or any newer libraries gaining traction. Also cover current color and theming approaches." },
    { label: "Design systems & anti-patterns", prompt: "Search the web for what leading design systems (Linear, Vercel, Stripe, Raycast) are doing in 2025-2026 that is new or notable. Also search for what web design patterns are now considered dated, generic, or 'AI-generated looking' and should be avoided." },
  ],
  evalPrompts: [
    "Build a dashboard for tracking daily reading habits with a focus on streaks and genre breakdown",
    "Create a landing page for a small-batch ceramics studio that sells online",
    "Design a settings panel for a desktop music production app",
  ],
  evalCriteria: [
    "Visual distinctiveness and memorability",
    "Typography choices (avoids generic fonts, good pairing)",
    "Code quality and production-readiness",
    "Avoidance of generic AI aesthetic patterns",
    "Layout creativity and spatial composition",
  ],
};

const GLOBAL_CONFIG_KEY = "skill-evolver:active-config";

// Simple ID generator
let _idCounter = 0;
const makeId = () => `${Date.now()}-${++_idCounter}`;

async function storageGet(key) {
  try {
    const result = await window.storage.get(key);
    return result ? JSON.parse(result.value) : null;
  } catch {
    return null;
  }
}

async function storageSet(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

async function callClaude(messages, useSearch = false, apiKey = "", systemPrompt = "") {
  if (!apiKey) throw new Error("API key is required. Enter your Anthropic API key above.");

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages,
  };
  if (systemPrompt) {
    body.system = systemPrompt;
  }
  if (useSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search" }];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout

  let response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      throw new Error("Request timed out after 2 minutes. Try again.");
    }
    throw new Error(`Network error: ${err.message}`);
  }
  clearTimeout(timeout);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`API returned ${response.status}: ${text.substring(0, 200)}`);
  }

  const data = await response.json();
  if (data.error) throw new Error(data.error.message || "API error");

  const textBlocks = data.content?.filter((b) => b.type === "text") || [];
  if (textBlocks.length === 0) {
    throw new Error("API returned no text content. This can happen when web search takes too long. Try again.");
  }
  return textBlocks.map((b) => b.text).join("\n");
}

// ─── Components ──────────────────────────────────────────────

function FeedbackPanel({ feedback, onAdd, onDelete }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("general");

  const categories = [
    "typography",
    "color",
    "layout",
    "animation",
    "framework",
    "accessibility",
    "general",
  ];

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd({ id: makeId(), text: text.trim(), category, ts: new Date().toISOString() });
    setText("");
  };

  const grouped = {};
  feedback.forEach((f) => {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "#e0e0e0",
              fontSize: 13,
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="What went wrong? e.g. 'Still defaults to Space Grotesk'"
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 6,
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "#e0e0e0",
              fontSize: 14,
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              borderRadius: 6,
              border: "none",
              background: "#4f8fff",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Log
          </button>
        </div>
      </div>

      {feedback.length === 0 ? (
        <p style={{ color: "#666", fontSize: 13 }}>
          No feedback logged yet. Issues you log here accumulate across sessions and feed into the next skill update.
        </p>
      ) : (
        Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#888",
                marginBottom: 6,
              }}
            >
              {cat} ({items.length})
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "8px 12px",
                  background: "#1a1a1a",
                  borderRadius: 6,
                  marginBottom: 4,
                  fontSize: 13,
                }}
              >
                <div>
                  <span style={{ color: "#e0e0e0" }}>{item.text}</span>
                  <span style={{ color: "#555", marginLeft: 8, fontSize: 11 }}>
                    {new Date(item.ts).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => onDelete(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#555",
                    cursor: "pointer",
                    fontSize: 16,
                    lineHeight: 1,
                    padding: "0 4px",
                    flexShrink: 0,
                  }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

function ResearchPanel({ onResearchComplete, feedback, apiKey, currentSkill, researchDomains, skillId }) {
  // idle -> generating_queries -> reviewing_queries -> researching -> synthesizing -> done | error
  const [status, setStatus] = useState("idle");
  const [findings, setFindings] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState("");
  const [queries, setQueries] = useState(null); // editable queries for review

  const generateQueries = useCallback(async () => {
    setStatus("generating_queries");
    setError(null);
    setFindings(null);

    try {
      const skillContent = currentSkill || CURRENT_SKILL;

      // Load previous research summary
      const prevSummaryKey = `skill-evolver:${skillId}:last-research-summary`;
      const previousResearchSummary = await storageGet(prevSummaryKey);

      // Category counts from feedback
      const categoryCounts = {};
      feedback.forEach((f) => {
        categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
      });

      const queryGenerationPrompt = `You are optimizing research queries for updating a Claude skill file.

Current skill content:
<skill>${skillContent}</skill>

${feedback.length > 0 ? `User feedback log (${feedback.length} items):
${feedback.map((f) => `- [${f.category}] ${f.text}`).join("\n")}

Feedback category distribution:
${Object.entries(categoryCounts).map(([cat, count]) => `  ${cat}: ${count}`).join("\n")}` : "No user feedback logged yet."}

${previousResearchSummary ? `Previous research summary (avoid repeating these findings):
${previousResearchSummary}` : ""}

Generate exactly 5 web search research prompts. Each should:
- Target a specific aspect of frontend development relevant to this skill
- Be weighted toward areas with the most user feedback
- Avoid re-covering ground from previous research summaries
- Be specific enough to return actionable, current results

Respond with ONLY valid JSON, no markdown fences:
[
  { "label": "Short label for UI", "prompt": "The full search prompt to send to Claude with web search" },
  { "label": "...", "prompt": "..." },
  { "label": "...", "prompt": "..." },
  { "label": "...", "prompt": "..." },
  { "label": "...", "prompt": "..." }
]`;

      const raw = await callClaude(
        [{ role: "user", content: queryGenerationPrompt }],
        false,
        apiKey
      );

      let parsed;
      try {
        const cleaned = raw.replace(/```(?:json)?\s*/g, "").replace(/```\s*/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        // Fall back to default domains
        parsed = (researchDomains || DEFAULT_CONFIG.researchDomains);
      }

      setQueries(parsed);
      setStatus("reviewing_queries");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, [feedback, apiKey, currentSkill, researchDomains, skillId]);

  const useDefaultQueries = () => {
    const defaults = (researchDomains || DEFAULT_CONFIG.researchDomains);
    setQueries(defaults);
    setStatus("reviewing_queries");
  };

  const runResearch = useCallback(async () => {
    if (!queries) return;
    setStatus("researching");
    setError(null);
    setFindings(null);

    const results = [];

    try {
      for (let i = 0; i < queries.length; i++) {
        const q = queries[i];
        setProgress(`Searching ${q.label.toLowerCase()}... (${i + 1}/${queries.length})`);
        const result = await callClaude(
          [{ role: "user", content: q.prompt }],
          true,
          apiKey
        );
        results.push(result);
      }

      setProgress("Synthesizing findings into skill recommendations...");
      setStatus("synthesizing");

      const combinedResearch = results.join("\n\n---\n\n");

      const feedbackContext =
        feedback.length > 0
          ? `\n\nThe user has also logged these specific issues with the current skill:\n${feedback.map((f) => `- [${f.category}] ${f.text}`).join("\n")}`
          : "";

      // Load previous research summaries for deduplication
      const summariesKey = `skill-evolver:${skillId}:research-summaries`;
      const previousSummaries = (await storageGet(summariesKey)) || [];

      const previousSummariesContext = previousSummaries.length > 0
        ? `\n\nPrevious research summaries (focus on what is NEW or CHANGED since these were written):\n${previousSummaries.map((s) => `--- Summary from ${s.ts} ---\n${s.summary}`).join("\n\n")}`
        : "";

      const skillContent = currentSkill || CURRENT_SKILL;
      const synthesisPrompt = `You are updating a Claude skill. Here is the CURRENT skill content:
<current_skill>
${skillContent}
</current_skill>

Here are research findings about current frontend trends:
<research>
${combinedResearch}
</research>
${feedbackContext}${previousSummariesContext}

Based on the research and user feedback, produce:

1. **CHANGES_SUMMARY**: A concise bullet list of what should change in the skill and why. Group by section (Typography, Color, Motion, Layout, etc.). Be specific about what's being added, removed, or modified.

2. **UPDATED_SKILL**: The complete, updated SKILL.md content. Preserve the overall structure and philosophy of the original (bold design, avoid AI slop, be distinctive) while updating specific guidance to reflect current best practices. Do not water down the skill's opinionated stance. Keep frontmatter identical except update specific technical recommendations.

Format your response exactly like this:

===CHANGES_SUMMARY===
(your summary here)
===UPDATED_SKILL===
(complete SKILL.md content here)`;

      const synthesisResult = await callClaude(
        [{ role: "user", content: synthesisPrompt }],
        false,
        apiKey
      );

      const summaryMatch = synthesisResult.match(
        /===CHANGES_SUMMARY===([\s\S]*?)===UPDATED_SKILL===/
      );
      const skillMatch = synthesisResult.match(/===UPDATED_SKILL===([\s\S]*?)$/);

      if (!summaryMatch || !skillMatch) {
        throw new Error("Could not parse synthesis response. Try again.");
      }

      const summary = summaryMatch[1].trim();

      // Store research summary in rolling array (keep last 3)
      const summariesKeyStore = `skill-evolver:${skillId}:research-summaries`;
      const existingSummaries = (await storageGet(summariesKeyStore)) || [];
      const updatedSummaries = [{ ts: new Date().toISOString(), summary }, ...existingSummaries].slice(0, 3);
      await storageSet(summariesKeyStore, updatedSummaries);

      // Also store as single key for adaptive query generation
      const prevSummaryKey = `skill-evolver:${skillId}:last-research-summary`;
      await storageSet(prevSummaryKey, summary);

      setFindings({
        summary,
        updatedSkill: skillMatch[1].trim(),
        researchRaw: combinedResearch,
        timestamp: new Date().toISOString(),
      });
      setStatus("done");
      setProgress("");

      if (onResearchComplete) {
        onResearchComplete({
          summary,
          updatedSkill: skillMatch[1].trim(),
        });
      }
    } catch (err) {
      setError(err.message);
      setStatus("error");
      setProgress("");
    }
  }, [queries, feedback, onResearchComplete, apiKey, currentSkill, skillId]);

  return (
    <div>
      {status === "idle" && (
        <div>
          <p style={{ color: "#999", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
            This will generate adaptive research queries based on your skill and feedback,
            then search the web and synthesize findings into an updated SKILL.md.
            {feedback.length > 0 &&
              ` Your ${feedback.length} logged feedback item${feedback.length > 1 ? "s" : ""} will be incorporated.`}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={generateQueries}
              style={{
                padding: "12px 28px",
                borderRadius: 8,
                border: "none",
                background: "#4f8fff",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Generate Research Queries
            </button>
            <button
              onClick={useDefaultQueries}
              style={{
                padding: "12px 28px",
                borderRadius: 8,
                border: "1px solid #333",
                background: "transparent",
                color: "#888",
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Use Defaults
            </button>
          </div>
        </div>
      )}

      {status === "generating_queries" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 16, height: 16, border: "2px solid #4f8fff",
                borderTopColor: "transparent", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span style={{ color: "#e0e0e0", fontSize: 14 }}>Generating adaptive queries...</span>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {status === "reviewing_queries" && queries && (
        <div>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 12 }}>
            Review & Edit Research Queries
          </div>
          {queries.map((q, i) => (
            <div key={i} style={{ marginBottom: 10, padding: 12, background: "#1a1a1a", borderRadius: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <input
                  value={q.label}
                  onChange={(e) => {
                    const updated = [...queries];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setQueries(updated);
                  }}
                  style={{
                    flex: 1, padding: "6px 10px", borderRadius: 4, border: "1px solid #333",
                    background: "#111", color: "#e0e0e0", fontSize: 13, fontWeight: 600,
                  }}
                />
                <button
                  onClick={() => setQueries(queries.filter((_, j) => j !== i))}
                  style={{
                    background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16,
                  }}
                >
                  x
                </button>
              </div>
              <textarea
                value={q.prompt}
                onChange={(e) => {
                  const updated = [...queries];
                  updated[i] = { ...updated[i], prompt: e.target.value };
                  setQueries(updated);
                }}
                rows={2}
                style={{
                  width: "100%", padding: "6px 10px", borderRadius: 4, border: "1px solid #333",
                  background: "#111", color: "#ccc", fontSize: 12, fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={runResearch}
              style={{
                padding: "12px 28px", borderRadius: 8, border: "none",
                background: "#4f8fff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 15,
              }}
            >
              Run Research
            </button>
            <button
              onClick={() => setQueries([...queries, { label: "", prompt: "" }])}
              style={{
                padding: "12px 20px", borderRadius: 8, border: "1px solid #333",
                background: "transparent", color: "#888", cursor: "pointer", fontSize: 13,
              }}
            >
              + Add Query
            </button>
            <button
              onClick={() => { setQueries(null); setStatus("idle"); }}
              style={{
                padding: "12px 20px", borderRadius: 8, border: "1px solid #333",
                background: "transparent", color: "#666", cursor: "pointer", fontSize: 13,
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {(status === "researching" || status === "synthesizing") && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 16,
                height: 16,
                border: "2px solid #4f8fff",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span style={{ color: "#e0e0e0", fontSize: 14 }}>
              {status === "researching" ? "Researching..." : "Synthesizing..."}
            </span>
          </div>
          <p style={{ color: "#888", fontSize: 13 }}>{progress}</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {status === "error" && (
        <div>
          <p style={{ color: "#ff6b6b", fontSize: 14, marginBottom: 12 }}>{error}</p>
          <button
            onClick={runResearch}
            style={{
              padding: "10px 20px",
              borderRadius: 6,
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "#e0e0e0",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Retry
          </button>
        </div>
      )}

      {status === "done" && findings && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "#4fdf8f", fontSize: 14, fontWeight: 600 }}>
              Research complete
            </span>
            <button
              onClick={runResearch}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #333",
                background: "transparent",
                color: "#888",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Run again
            </button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#888",
                marginBottom: 8,
              }}
            >
              Proposed Changes
            </div>
            <div
              style={{
                padding: 16,
                background: "#1a1a1a",
                borderRadius: 8,
                fontSize: 13,
                color: "#ccc",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                maxHeight: 400,
                overflow: "auto",
              }}
            >
              {findings.summary}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillPreview({ skill, onApprove, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editedSkill, setEditedSkill] = useState(skill);

  useEffect(() => {
    setEditedSkill(skill);
  }, [skill]);

  if (!skill) return null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#888" }}>
          Updated SKILL.md Preview
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => {
              if (editing) {
                onEdit(editedSkill);
              }
              setEditing(!editing);
            }}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "1px solid #333",
              background: "transparent",
              color: "#aaa",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            {editing ? "Save edits" : "Edit"}
          </button>
          <button
            onClick={() => onApprove(editing ? editedSkill : skill)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "none",
              background: "#4fdf8f",
              color: "#111",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Approve & Download
          </button>
        </div>
      </div>
      {editing ? (
        <textarea
          value={editedSkill}
          onChange={(e) => setEditedSkill(e.target.value)}
          style={{
            width: "100%",
            minHeight: 500,
            padding: 16,
            background: "#1a1a1a",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#e0e0e0",
            fontSize: 13,
            fontFamily: "monospace",
            lineHeight: 1.6,
            resize: "vertical",
          }}
        />
      ) : (
        <div
          style={{
            padding: 16,
            background: "#1a1a1a",
            borderRadius: 8,
            fontSize: 13,
            color: "#ccc",
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            maxHeight: 500,
            overflow: "auto",
          }}
        >
          {skill}
        </div>
      )}
    </div>
  );
}

function SimpleDiff({ textA, textB, labelA, labelB }) {
  const linesA = textA.split("\n");
  const linesB = textB.split("\n");

  // Simple LCS-based diff
  const lcs = [];
  const m = linesA.length, n = linesB.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = linesA[i - 1] === linesB[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  // Backtrack
  const diffLines = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      diffLines.unshift({ type: "same", text: linesA[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diffLines.unshift({ type: "add", text: linesB[j - 1] });
      j--;
    } else {
      diffLines.unshift({ type: "del", text: linesA[i - 1] });
      i--;
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 8, fontSize: 12 }}>
        <span style={{ color: "#ff6b6b" }}>- {labelA || "Old"}</span>
        <span style={{ color: "#4fdf8f" }}>+ {labelB || "New"}</span>
      </div>
      <div
        style={{
          padding: 12, background: "#111", borderRadius: 8, fontSize: 12,
          fontFamily: "monospace", lineHeight: 1.6, maxHeight: 500, overflow: "auto",
        }}
      >
        {diffLines.map((line, idx) => (
          <div
            key={idx}
            style={{
              padding: "1px 8px",
              background: line.type === "add" ? "rgba(79,223,143,0.1)" :
                          line.type === "del" ? "rgba(255,107,107,0.1)" : "transparent",
              color: line.type === "add" ? "#4fdf8f" :
                     line.type === "del" ? "#ff6b6b" : "#888",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {line.type === "add" ? "+ " : line.type === "del" ? "- " : "  "}
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryPanel({ history, currentSkill, onRestore }) {
  const [expandedView, setExpandedView] = useState(null);
  const [compareIdx, setCompareIdx] = useState(null);

  if (!history || history.length === 0) {
    return <p style={{ color: "#666", fontSize: 13 }}>No previous updates recorded.</p>;
  }

  return (
    <div>
      {history.map((entry, i) => (
        <div
          key={i}
          style={{
            padding: 14,
            background: "#1a1a1a",
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "#4f8fff", fontSize: 13, fontWeight: 600 }}>
              v{history.length - i}
            </span>
            <span style={{ color: "#555", fontSize: 11 }}>
              {new Date(entry.ts).toLocaleDateString()}
            </span>
          </div>
          <p style={{ color: "#999", fontSize: 12, lineHeight: 1.5, margin: "0 0 8px 0" }}>
            {entry.summary?.substring(0, 200)}
            {entry.summary?.length > 200 ? "..." : ""}
          </p>
          {entry.skillContent && (
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setExpandedView(expandedView === i ? null : i)}
                style={{
                  padding: "4px 10px", borderRadius: 4, border: "1px solid #333",
                  background: "transparent", color: "#888", cursor: "pointer", fontSize: 11,
                }}
              >
                {expandedView === i ? "Hide" : "View"}
              </button>
              <button
                onClick={() => onRestore(entry.skillContent)}
                style={{
                  padding: "4px 10px", borderRadius: 4, border: "1px solid #333",
                  background: "transparent", color: "#4fdf8f", cursor: "pointer", fontSize: 11,
                }}
              >
                Restore
              </button>
              <button
                onClick={() => setCompareIdx(compareIdx === i ? null : i)}
                style={{
                  padding: "4px 10px", borderRadius: 4, border: "1px solid #333",
                  background: "transparent", color: "#4f8fff", cursor: "pointer", fontSize: 11,
                }}
              >
                {compareIdx === i ? "Hide Diff" : "Compare"}
              </button>
            </div>
          )}
          {expandedView === i && entry.skillContent && (
            <div
              style={{
                marginTop: 10, padding: 12, background: "#111", borderRadius: 6,
                fontSize: 12, fontFamily: "monospace", color: "#ccc", lineHeight: 1.6,
                whiteSpace: "pre-wrap", maxHeight: 400, overflow: "auto",
              }}
            >
              {entry.skillContent}
            </div>
          )}
          {compareIdx === i && entry.skillContent && currentSkill && (
            <div style={{ marginTop: 10 }}>
              <SimpleDiff
                textA={entry.skillContent}
                textB={currentSkill}
                labelA={`v${history.length - i}`}
                labelB="Current"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const DEFAULT_EVAL_CONFIG = {
  skillA: CURRENT_SKILL,
  skillB: REVISED_SKILL,
  labelA: "Original",
  labelB: "Revised",
  testPrompts: [
    "Build a dashboard for tracking daily reading habits with a focus on streaks and genre breakdown",
    "Create a landing page for a small-batch ceramics studio that sells online",
    "Design a settings panel for a desktop music production app",
  ],
  criteria: [
    "Visual distinctiveness and memorability",
    "Typography choices (avoids generic fonts, good pairing)",
    "Code quality and production-readiness",
    "Avoidance of generic AI aesthetic patterns",
    "Layout creativity and spatial composition",
  ],
};

function EvalPanel({ apiKey, skillId, currentSkill, proposedSkill, onSkipToPreview }) {
  const storageKeyConfig = `skill-evolver:${skillId}:eval-config`;
  const storageKeyResults = `skill-evolver:${skillId}:eval-results`;

  const [config, setConfig] = useState(null);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | running | done | error
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [expandedPrompts, setExpandedPrompts] = useState({});
  const [editingConfig, setEditingConfig] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load config and results from storage
  useEffect(() => {
    (async () => {
      let savedConfig = await storageGet(storageKeyConfig);
      if (!savedConfig) {
        savedConfig = { ...DEFAULT_EVAL_CONFIG };
        // If we have a proposed skill, use it as B
        if (proposedSkill) {
          savedConfig.skillB = proposedSkill;
          savedConfig.labelB = "Proposed";
        }
      }
      // Always update skillA to current if provided
      if (currentSkill) {
        savedConfig.skillA = currentSkill;
        savedConfig.labelA = "Current";
      }
      if (proposedSkill) {
        savedConfig.skillB = proposedSkill;
        savedConfig.labelB = "Proposed";
      }
      setConfig(savedConfig);
      await storageSet(storageKeyConfig, savedConfig);

      const savedResults = await storageGet(storageKeyResults);
      if (savedResults) {
        setResults(savedResults);
        setStatus("done");
      }
      setLoading(false);
    })();
  }, [storageKeyConfig, storageKeyResults, currentSkill, proposedSkill]);

  const saveConfig = async (updated) => {
    setConfig(updated);
    await storageSet(storageKeyConfig, updated);
  };

  const runEval = useCallback(async () => {
    if (!config) return;
    setStatus("running");
    setError(null);
    setResults(null);

    const promptResults = [];

    try {
      for (let i = 0; i < config.testPrompts.length; i++) {
        const testPrompt = config.testPrompts[i];
        setProgress(`Running prompt ${i + 1}/${config.testPrompts.length}: generating output A...`);

        // Generate output A
        const outputA = await callClaude(
          [{ role: "user", content: testPrompt }],
          false,
          apiKey,
          config.skillA
        );

        setProgress(`Running prompt ${i + 1}/${config.testPrompts.length}: generating output B...`);

        // Generate output B
        const outputB = await callClaude(
          [{ role: "user", content: testPrompt }],
          false,
          apiKey,
          config.skillB
        );

        // Randomly assign to X/Y
        const aIsX = Math.random() < 0.5;
        const outputX = aIsX ? outputA : outputB;
        const outputY = aIsX ? outputB : outputA;

        setProgress(`Running prompt ${i + 1}/${config.testPrompts.length}: judging outputs...`);

        // Judge
        const judgePrompt = `You are evaluating two frontend code outputs for the same design prompt. You do not know which system produced which output. Evaluate strictly on quality.

Design prompt: "${testPrompt}"

=== Output X ===
${outputX}

=== Output Y ===
${outputY}

Evaluate on these criteria: ${config.criteria.join(", ")}

Respond with ONLY valid JSON, no markdown fences, no preamble:
{
  "preferred": "X" or "Y",
  "rationale": "2-3 sentence explanation of why the preferred output is stronger",
  "scores": {
    ${config.criteria.map((c) => `"${c}": {"X": "<1-10>", "Y": "<1-10>"}`).join(",\n    ")}
  }
}`;

        const judgeRaw = await callClaude(
          [{ role: "user", content: judgePrompt }],
          false,
          apiKey
        );

        let judgeResult;
        try {
          // Strip markdown fences if present
          const cleaned = judgeRaw.replace(/```(?:json)?\s*/g, "").replace(/```\s*/g, "").trim();
          judgeResult = JSON.parse(cleaned);
        } catch {
          judgeResult = { parseError: true, raw: judgeRaw };
        }

        // Map back from X/Y to A/B
        let winner = null;
        if (judgeResult.preferred === "X") winner = aIsX ? "A" : "B";
        else if (judgeResult.preferred === "Y") winner = aIsX ? "B" : "A";

        // Convert scores from X/Y to A/B
        let scoresAB = null;
        if (judgeResult.scores && !judgeResult.parseError) {
          scoresAB = {};
          for (const criterion of config.criteria) {
            const s = judgeResult.scores[criterion];
            if (s) {
              scoresAB[criterion] = {
                A: aIsX ? Number(s.X) : Number(s.Y),
                B: aIsX ? Number(s.Y) : Number(s.X),
              };
            }
          }
        }

        promptResults.push({
          testPrompt,
          winner,
          rationale: judgeResult.rationale || null,
          scores: scoresAB,
          parseError: judgeResult.parseError || false,
          rawJudge: judgeResult.parseError ? judgeResult.raw : null,
          outputA,
          outputB,
        });
      }

      const evalResults = {
        ts: new Date().toISOString(),
        labelA: config.labelA,
        labelB: config.labelB,
        promptResults,
        skillASnippet: config.skillA.substring(0, 100),
        skillBSnippet: config.skillB.substring(0, 100),
      };

      setResults(evalResults);
      await storageSet(storageKeyResults, evalResults);
      setStatus("done");
      setProgress("");
    } catch (err) {
      setError(err.message);
      setStatus("error");
      setProgress("");
    }
  }, [config, apiKey, storageKeyResults]);

  const aggregateResults = useMemo(() => {
    if (!results || !results.promptResults) return null;
    const { promptResults: pr } = results;
    const winsA = pr.filter((r) => r.winner === "A").length;
    const winsB = pr.filter((r) => r.winner === "B").length;
    const ties = pr.length - winsA - winsB;

    // Average scores per criterion
    const avgScores = {};
    const validResults = pr.filter((r) => r.scores);
    if (validResults.length > 0 && config) {
      for (const criterion of config.criteria) {
        let sumA = 0, sumB = 0, count = 0;
        for (const r of validResults) {
          if (r.scores[criterion]) {
            sumA += r.scores[criterion].A;
            sumB += r.scores[criterion].B;
            count++;
          }
        }
        if (count > 0) {
          avgScores[criterion] = {
            A: (sumA / count).toFixed(1),
            B: (sumB / count).toFixed(1),
          };
        }
      }
    }

    return { winsA, winsB, ties, avgScores };
  }, [results, config]);

  if (loading) {
    return <p style={{ color: "#888", fontSize: 13 }}>Loading eval config...</p>;
  }

  if (!config) return null;

  const toggleExpand = (i) =>
    setExpandedPrompts((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div>
      {/* Config section */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#888" }}>
            Eval Configuration
          </span>
          <button
            onClick={() => setEditingConfig(!editingConfig)}
            style={{
              padding: "4px 12px", borderRadius: 6, border: "1px solid #333",
              background: "transparent", color: "#888", cursor: "pointer", fontSize: 12,
            }}
          >
            {editingConfig ? "Collapse" : "Edit Config"}
          </button>
        </div>

        {!editingConfig && (
          <div style={{ fontSize: 13, color: "#999" }}>
            {config.testPrompts.length} test prompts, {config.criteria.length} criteria.
            Comparing <span style={{ color: "#4f8fff" }}>{config.labelA}</span> vs{" "}
            <span style={{ color: "#4fdf8f" }}>{config.labelB}</span>.
          </div>
        )}

        {editingConfig && (
          <div style={{ padding: 16, background: "#1a1a1a", borderRadius: 8 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Test Prompts
              </div>
              {config.testPrompts.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <textarea
                    value={p}
                    onChange={(e) => {
                      const updated = { ...config, testPrompts: [...config.testPrompts] };
                      updated.testPrompts[i] = e.target.value;
                      saveConfig(updated);
                    }}
                    rows={2}
                    style={{
                      flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #333",
                      background: "#111", color: "#e0e0e0", fontSize: 13, fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                  <button
                    onClick={() => {
                      const updated = { ...config, testPrompts: config.testPrompts.filter((_, j) => j !== i) };
                      saveConfig(updated);
                    }}
                    style={{
                      background: "none", border: "none", color: "#555", cursor: "pointer",
                      fontSize: 16, padding: "0 4px", alignSelf: "flex-start",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = { ...config, testPrompts: [...config.testPrompts, ""] };
                  saveConfig(updated);
                }}
                style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid #333",
                  background: "transparent", color: "#888", cursor: "pointer", fontSize: 12,
                }}
              >
                + Add Prompt
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Evaluation Criteria
              </div>
              {config.criteria.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <input
                    value={c}
                    onChange={(e) => {
                      const updated = { ...config, criteria: [...config.criteria] };
                      updated.criteria[i] = e.target.value;
                      saveConfig(updated);
                    }}
                    style={{
                      flex: 1, padding: "6px 10px", borderRadius: 6, border: "1px solid #333",
                      background: "#111", color: "#e0e0e0", fontSize: 13,
                    }}
                  />
                  <button
                    onClick={() => {
                      const updated = { ...config, criteria: config.criteria.filter((_, j) => j !== i) };
                      saveConfig(updated);
                    }}
                    style={{
                      background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16, padding: "0 4px",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = { ...config, criteria: [...config.criteria, ""] };
                  saveConfig(updated);
                }}
                style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid #333",
                  background: "transparent", color: "#888", cursor: "pointer", fontSize: 12, marginTop: 4,
                }}
              >
                + Add Criterion
              </button>
            </div>

            <div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Skill A ({config.labelA})
              </div>
              <textarea
                value={config.skillA}
                onChange={(e) => saveConfig({ ...config, skillA: e.target.value })}
                rows={4}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #333",
                  background: "#111", color: "#e0e0e0", fontSize: 12, fontFamily: "monospace",
                  resize: "vertical", marginBottom: 12,
                }}
              />
              <div style={{ fontSize: 11, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Skill B ({config.labelB})
              </div>
              <textarea
                value={config.skillB}
                onChange={(e) => saveConfig({ ...config, skillB: e.target.value })}
                rows={4}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #333",
                  background: "#111", color: "#e0e0e0", fontSize: 12, fontFamily: "monospace",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {status === "idle" && (
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={runEval}
            style={{
              padding: "12px 28px", borderRadius: 8, border: "none",
              background: "#4f8fff", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 15,
            }}
          >
            Run Eval
          </button>
          {onSkipToPreview && (
            <button
              onClick={onSkipToPreview}
              style={{
                padding: "12px 28px", borderRadius: 8, border: "1px solid #333",
                background: "transparent", color: "#888", cursor: "pointer", fontSize: 15,
              }}
            >
              Skip Eval
            </button>
          )}
        </div>
      )}

      {/* Running state */}
      {status === "running" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 16, height: 16, border: "2px solid #4f8fff",
                borderTopColor: "transparent", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span style={{ color: "#e0e0e0", fontSize: 14 }}>Running evaluation...</span>
          </div>
          <p style={{ color: "#888", fontSize: 13 }}>{progress}</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div>
          <p style={{ color: "#ff6b6b", fontSize: 14, marginBottom: 12 }}>{error}</p>
          <button
            onClick={runEval}
            style={{
              padding: "10px 20px", borderRadius: 6, border: "1px solid #333",
              background: "#1a1a1a", color: "#e0e0e0", cursor: "pointer", fontSize: 14,
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Results */}
      {status === "done" && results && aggregateResults && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ color: "#4fdf8f", fontSize: 14, fontWeight: 600 }}>Eval complete</span>
            <div style={{ display: "flex", gap: 8 }}>
              {onSkipToPreview && (
                <button
                  onClick={onSkipToPreview}
                  style={{
                    padding: "6px 14px", borderRadius: 6, border: "1px solid #333",
                    background: "transparent", color: "#888", cursor: "pointer", fontSize: 12,
                  }}
                >
                  Go to Preview
                </button>
              )}
              <button
                onClick={runEval}
                style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid #333",
                  background: "transparent", color: "#888", cursor: "pointer", fontSize: 12,
                }}
              >
                Run again
              </button>
            </div>
          </div>

          {/* Summary bar */}
          <div
            style={{
              padding: "14px 18px", background: "#1a1a1a", borderRadius: 8,
              marginBottom: 16, fontSize: 15, fontWeight: 600, textAlign: "center",
            }}
          >
            {aggregateResults.winsA === aggregateResults.winsB ? (
              <span style={{ color: "#888" }}>
                Tie: {aggregateResults.winsA}-{aggregateResults.winsB}
                {aggregateResults.ties > 0 ? `-${aggregateResults.ties}` : ""}
              </span>
            ) : aggregateResults.winsA > aggregateResults.winsB ? (
              <span>
                <span style={{ color: "#4f8fff" }}>{results.labelA}</span>
                <span style={{ color: "#888" }}> won {aggregateResults.winsA}/{results.promptResults.length}</span>
              </span>
            ) : (
              <span>
                <span style={{ color: "#4fdf8f" }}>{results.labelB}</span>
                <span style={{ color: "#888" }}> won {aggregateResults.winsB}/{results.promptResults.length}</span>
              </span>
            )}
          </div>

          {/* Aggregate scores table */}
          {Object.keys(aggregateResults.avgScores).length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 8 }}>
                Average Scores by Criterion
              </div>
              <div style={{ background: "#1a1a1a", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #333" }}>
                      <th style={{ padding: "10px 14px", textAlign: "left", color: "#888", fontWeight: 500 }}>Criterion</th>
                      <th style={{ padding: "10px 14px", textAlign: "center", color: "#4f8fff", fontWeight: 600, width: 80 }}>{results.labelA}</th>
                      <th style={{ padding: "10px 14px", textAlign: "center", color: "#4fdf8f", fontWeight: 600, width: 80 }}>{results.labelB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(aggregateResults.avgScores).map(([criterion, scores]) => (
                      <tr key={criterion} style={{ borderBottom: "1px solid #222" }}>
                        <td style={{ padding: "8px 14px", color: "#ccc" }}>{criterion}</td>
                        <td style={{
                          padding: "8px 14px", textAlign: "center", fontWeight: 600,
                          color: Number(scores.A) >= Number(scores.B) ? "#4f8fff" : "#888",
                        }}>
                          {scores.A}
                        </td>
                        <td style={{
                          padding: "8px 14px", textAlign: "center", fontWeight: 600,
                          color: Number(scores.B) >= Number(scores.A) ? "#4fdf8f" : "#888",
                        }}>
                          {scores.B}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Per-prompt cards */}
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 8 }}>
            Per-Prompt Results
          </div>
          {results.promptResults.map((r, i) => (
            <div
              key={i}
              style={{ padding: 14, background: "#1a1a1a", borderRadius: 8, marginBottom: 8 }}
            >
              <div style={{ fontSize: 13, color: "#e0e0e0", marginBottom: 8, lineHeight: 1.5 }}>
                {r.testPrompt}
              </div>
              {r.parseError ? (
                <div>
                  <p style={{ color: "#ff6b6b", fontSize: 12 }}>Judge response could not be parsed.</p>
                  <pre style={{
                    padding: 10, background: "#111", borderRadius: 6, fontSize: 11,
                    color: "#999", whiteSpace: "pre-wrap", maxHeight: 200, overflow: "auto",
                  }}>
                    {r.rawJudge}
                  </pre>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: r.winner === "A" ? "#4f8fff" : r.winner === "B" ? "#4fdf8f" : "#888",
                    }}>
                      Winner: {r.winner === "A" ? results.labelA : r.winner === "B" ? results.labelB : "Unknown"}
                    </span>
                  </div>
                  {r.rationale && (
                    <p style={{ fontSize: 12, color: "#999", lineHeight: 1.5, margin: "0 0 8px 0" }}>
                      {r.rationale}
                    </p>
                  )}
                  {r.scores && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {Object.entries(r.scores).map(([criterion, s]) => (
                        <div
                          key={criterion}
                          style={{
                            fontSize: 11, padding: "3px 8px", background: "#111",
                            borderRadius: 4, color: "#888",
                          }}
                        >
                          {criterion.substring(0, 20)}{criterion.length > 20 ? "..." : ""}:{" "}
                          <span style={{ color: "#4f8fff" }}>{s.A}</span>
                          {" / "}
                          <span style={{ color: "#4fdf8f" }}>{s.B}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Expandable outputs */}
              <button
                onClick={() => toggleExpand(i)}
                style={{
                  marginTop: 8, padding: "4px 10px", borderRadius: 4,
                  border: "1px solid #333", background: "transparent",
                  color: "#666", cursor: "pointer", fontSize: 11,
                }}
              >
                {expandedPrompts[i] ? "Hide outputs" : "Show full outputs"}
              </button>
              {expandedPrompts[i] && (
                <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#4f8fff", marginBottom: 4, fontWeight: 600 }}>
                      {results.labelA}
                    </div>
                    <pre style={{
                      padding: 10, background: "#111", borderRadius: 6, fontSize: 11,
                      color: "#ccc", whiteSpace: "pre-wrap", maxHeight: 300, overflow: "auto",
                      lineHeight: 1.5,
                    }}>
                      {r.outputA}
                    </pre>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#4fdf8f", marginBottom: 4, fontWeight: 600 }}>
                      {results.labelB}
                    </div>
                    <pre style={{
                      padding: 10, background: "#111", borderRadius: 6, fontSize: 11,
                      color: "#ccc", whiteSpace: "pre-wrap", maxHeight: 300, overflow: "auto",
                      lineHeight: 1.5,
                    }}>
                      {r.outputB}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Timestamp */}
          <div style={{ fontSize: 11, color: "#555", marginTop: 12, textAlign: "right" }}>
            Ran {new Date(results.ts).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Setup Screen ─────────────────────────────────────────────

function SetupScreen({ onComplete }) {
  const [skillName, setSkillName] = useState("");
  const [skillContent, setSkillContent] = useState("");

  const handleInit = async () => {
    if (!skillName.trim() || !skillContent.trim()) return;
    const id = skillName.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const config = {
      ...DEFAULT_CONFIG,
      id,
      currentContent: skillContent.trim(),
    };
    const keys = getStorageKeys(id);
    await storageSet(keys.CONFIG, config);
    await storageSet(GLOBAL_CONFIG_KEY, config);
    onComplete(config);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#e0e0e0",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 20px" }}>
        <div
          style={{
            fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
            color: "#4f8fff", marginBottom: 6,
          }}
        >
          Skill Evolver
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px 0", color: "#fff" }}>
          Initialize Skill
        </h1>
        <p style={{ fontSize: 13, color: "#666", margin: "0 0 28px 0" }}>
          Paste your SKILL.md content to get started.
        </p>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Skill Name / ID</div>
          <input
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="e.g. frontend-design"
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #333",
              background: "#1a1a1a", color: "#e0e0e0", fontSize: 14,
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>SKILL.md Content</div>
          <textarea
            value={skillContent}
            onChange={(e) => setSkillContent(e.target.value)}
            placeholder="Paste the full content of your SKILL.md file here..."
            rows={16}
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 6, border: "1px solid #333",
              background: "#1a1a1a", color: "#e0e0e0", fontSize: 13, fontFamily: "monospace",
              lineHeight: 1.6, resize: "vertical",
            }}
          />
        </div>

        <button
          onClick={handleInit}
          disabled={!skillName.trim() || !skillContent.trim()}
          style={{
            padding: "12px 28px", borderRadius: 8, border: "none",
            background: skillName.trim() && skillContent.trim() ? "#4f8fff" : "#333",
            color: skillName.trim() && skillContent.trim() ? "#fff" : "#666",
            fontWeight: 600, cursor: skillName.trim() && skillContent.trim() ? "pointer" : "default",
            fontSize: 15,
          }}
        >
          Initialize Skill Evolver
        </button>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────

export default function SkillEvolver() {
  const [skillConfig, setSkillConfig] = useState(null);
  const [tab, setTab] = useState("research");
  const [feedback, setFeedback] = useState([]);
  const [history, setHistory] = useState([]);
  const [updatedSkill, setUpdatedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [evalPromptAfterResearch, setEvalPromptAfterResearch] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("skill-evolver:api-key") || "");

  const KEYS = useMemo(
    () => (skillConfig ? getStorageKeys(skillConfig.id) : null),
    [skillConfig]
  );

  // Load config on mount
  useEffect(() => {
    (async () => {
      const savedConfig = await storageGet(GLOBAL_CONFIG_KEY);
      if (savedConfig) {
        setSkillConfig(savedConfig);
      }
      setLoading(false);
    })();
  }, []);

  // Load feedback and history when config is available
  useEffect(() => {
    if (!KEYS) return;
    (async () => {
      const savedFeedback = await storageGet(KEYS.FEEDBACK);
      if (savedFeedback) setFeedback(savedFeedback);
      const savedHistory = await storageGet(KEYS.SKILL_HISTORY);
      if (savedHistory) setHistory(savedHistory);
    })();
  }, [KEYS]);

  const saveFeedback = async (updated) => {
    setFeedback(updated);
    if (KEYS) await storageSet(KEYS.FEEDBACK, updated);
  };

  const handleAddFeedback = (entry) => saveFeedback([...feedback, entry]);
  const handleDeleteFeedback = (id) => saveFeedback(feedback.filter((f) => f.id !== id));

  const handleResearchComplete = ({ summary, updatedSkill: skill }) => {
    setUpdatedSkill(skill);
    setEvalPromptAfterResearch(true);
  };

  const handleApprove = async (finalSkill) => {
    if (!KEYS) return;
    const entry = {
      ts: new Date().toISOString(),
      summary: updatedSkill ? "Updated via research + feedback" : "Manual update",
      feedbackCount: feedback.length,
      skillContent: finalSkill,
    };
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    await storageSet(KEYS.SKILL_HISTORY, newHistory);
    await storageSet(KEYS.LATEST_SKILL, finalSkill);

    // Update config with new current content
    const updatedConfig = { ...skillConfig, currentContent: finalSkill };
    setSkillConfig(updatedConfig);
    await storageSet(KEYS.CONFIG, updatedConfig);
    await storageSet(GLOBAL_CONFIG_KEY, updatedConfig);

    // Archive feedback
    await storageSet(KEYS.FEEDBACK, []);
    setFeedback([]);

    // Trigger download
    const blob = new Blob([finalSkill], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SKILL.md";
    a.click();
    URL.revokeObjectURL(url);

    setDownloadStatus(`Downloaded. Replace the SKILL.md in your ${skillConfig.id} skill folder, then reinstall.`);
    setTimeout(() => setDownloadStatus(null), 8000);
  };

  const handleSetupComplete = (config) => {
    setSkillConfig(config);
    setFeedback([]);
    setHistory([]);
    setUpdatedSkill(null);
  };

  const handleSwitchSkill = () => {
    setSkillConfig(null);
    setFeedback([]);
    setHistory([]);
    setUpdatedSkill(null);
    setTab("research");
  };

  const currentSkillContent = skillConfig?.currentContent || CURRENT_SKILL;

  const tabs = [
    { id: "research", label: "Research & Update" },
    { id: "feedback", label: `Feedback${feedback.length > 0 ? ` (${feedback.length})` : ""}` },
    { id: "eval", label: "Eval" },
    { id: "history", label: "History" },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "#888",
          background: "#111",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!skillConfig) {
    return <SetupScreen onComplete={handleSetupComplete} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#e0e0e0",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
                color: "#4f8fff", marginBottom: 6,
              }}
            >
              Skill Evolver
            </div>
            <button
              onClick={handleSwitchSkill}
              style={{
                padding: "4px 10px", borderRadius: 4, border: "1px solid #333",
                background: "transparent", color: "#666", cursor: "pointer", fontSize: 11,
              }}
            >
              Switch Skill
            </button>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px 0", color: "#fff" }}>
            {skillConfig.id}
          </h1>
          <p style={{ fontSize: 13, color: "#666", margin: 0 }}>
            Research current trends, log issues, and generate updated skill files.
          </p>
        </div>

        {/* API Key */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem("skill-evolver:api-key", e.target.value);
              }}
              placeholder="Anthropic API key (sk-ant-...)"
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #333",
                background: "#1a1a1a",
                color: "#e0e0e0",
                fontSize: 13,
                fontFamily: "monospace",
              }}
            />
            {apiKey && (
              <span style={{ color: "#4fdf8f", fontSize: 12 }}>Set</span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #222",
            marginBottom: 24,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "none",
                borderBottom: tab === t.id ? "2px solid #4f8fff" : "2px solid transparent",
                color: tab === t.id ? "#fff" : "#666",
                fontSize: 14,
                cursor: "pointer",
                fontWeight: tab === t.id ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Status bar */}
        {downloadStatus && (
          <div
            style={{
              padding: "12px 16px",
              background: "#1a2e1a",
              borderRadius: 8,
              marginBottom: 20,
              fontSize: 13,
              color: "#4fdf8f",
              border: "1px solid #2a3e2a",
            }}
          >
            {downloadStatus}
          </div>
        )}

        {/* Tab content */}
        {tab === "research" && (
          <div>
            <ResearchPanel
              onResearchComplete={handleResearchComplete}
              feedback={feedback}
              apiKey={apiKey}
              currentSkill={currentSkillContent}
              researchDomains={skillConfig.researchDomains}
              skillId={skillConfig.id}
            />
            {/* Post-research eval prompt */}
            {evalPromptAfterResearch && updatedSkill && (
              <div
                style={{
                  marginTop: 16, padding: "14px 18px", background: "#1a2e1a",
                  borderRadius: 8, border: "1px solid #2a3e2a",
                }}
              >
                <p style={{ color: "#4fdf8f", fontSize: 13, margin: "0 0 10px 0" }}>
                  New skill version ready. Run eval to compare against current version?
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => {
                      setEvalPromptAfterResearch(false);
                      setTab("eval");
                    }}
                    style={{
                      padding: "8px 18px", borderRadius: 6, border: "none",
                      background: "#4f8fff", color: "#fff", fontWeight: 600,
                      cursor: "pointer", fontSize: 13,
                    }}
                  >
                    Run Eval
                  </button>
                  <button
                    onClick={() => setEvalPromptAfterResearch(false)}
                    style={{
                      padding: "8px 18px", borderRadius: 6, border: "1px solid #333",
                      background: "transparent", color: "#888", cursor: "pointer", fontSize: 13,
                    }}
                  >
                    Skip to Preview
                  </button>
                </div>
              </div>
            )}
            {updatedSkill && !evalPromptAfterResearch && (
              <div style={{ marginTop: 24 }}>
                <SkillPreview
                  skill={updatedSkill}
                  onApprove={handleApprove}
                  onEdit={(s) => setUpdatedSkill(s)}
                />
              </div>
            )}
          </div>
        )}

        {tab === "feedback" && (
          <FeedbackPanel
            feedback={feedback}
            onAdd={handleAddFeedback}
            onDelete={handleDeleteFeedback}
          />
        )}

        {tab === "eval" && (
          <EvalPanel
            apiKey={apiKey}
            skillId={skillConfig.id}
            currentSkill={currentSkillContent}
            proposedSkill={updatedSkill || REVISED_SKILL}
            onSkipToPreview={updatedSkill ? () => {
              setTab("research");
              setEvalPromptAfterResearch(false);
            } : null}
          />
        )}

        {tab === "history" && (
          <HistoryPanel
            history={history}
            currentSkill={currentSkillContent}
            onRestore={async (content) => {
              const updatedConfig = { ...skillConfig, currentContent: content };
              setSkillConfig(updatedConfig);
              if (KEYS) {
                await storageSet(KEYS.CONFIG, updatedConfig);
                await storageSet(GLOBAL_CONFIG_KEY, updatedConfig);
              }
              setDownloadStatus("Restored. The current skill has been updated to this version.");
              setTimeout(() => setDownloadStatus(null), 5000);
            }}
          />
        )}
      </div>
    </div>
  );
}
