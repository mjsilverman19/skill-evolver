import { useState, useEffect, useCallback } from "react";

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

const STORAGE_KEYS = {
  FEEDBACK: "skill-evolver:frontend-design:feedback",
  SKILL_HISTORY: "skill-evolver:frontend-design:history",
  LATEST_SKILL: "skill-evolver:frontend-design:latest",
};

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

async function callClaude(messages, useSearch = false, apiKey = "") {
  if (!apiKey) throw new Error("API key is required. Enter your Anthropic API key above.");

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages,
  };
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

function ResearchPanel({ onResearchComplete, feedback, apiKey }) {
  const [status, setStatus] = useState("idle"); // idle | researching | synthesizing | done | error
  const [findings, setFindings] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState("");

  const runResearch = useCallback(async () => {
    setStatus("researching");
    setError(null);
    setFindings(null);

    const searches = [
      {
        label: "Searching typography and font trends...",
        prompt: "Search the web for current web typography trends in 2025-2026. What fonts are designers actually using? What type pairings and scales are popular? What fonts are now considered overused or dated? Be specific with font names.",
      },
      {
        label: "Searching CSS and layout patterns...",
        prompt: "Search the web for new CSS features that have reached broad browser support in 2025-2026. Include container queries, :has(), view transitions API, anchor positioning, scroll-driven animations, CSS nesting. Which are production-ready now?",
      },
      {
        label: "Searching animation libraries and motion design...",
        prompt: "Search the web for current frontend animation and motion design trends in 2025-2026. Is Framer Motion still the standard for React? What about GSAP, Motion One, or newer alternatives? What motion patterns are trending in web design?",
      },
      {
        label: "Searching component architecture and UI libraries...",
        prompt: "Search the web for current React component patterns and popular UI component libraries in 2025-2026. Cover Server Components maturity, new shadcn/ui patterns, Radix, Ark UI, or any newer libraries gaining traction. Also cover current color and theming approaches.",
      },
      {
        label: "Searching design system trends and anti-patterns...",
        prompt: "Search the web for what leading design systems (Linear, Vercel, Stripe, Raycast) are doing in 2025-2026 that is new or notable. Also search for what web design patterns are now considered dated, generic, or 'AI-generated looking' and should be avoided.",
      },
    ];

    const results = [];

    try {
      for (const search of searches) {
        setProgress(search.label);
        const result = await callClaude(
          [{ role: "user", content: search.prompt }],
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

      const synthesisPrompt = `You are updating a Claude skill called "frontend-design" that guides Claude in creating production-grade frontend interfaces.

Here is the CURRENT skill content:
<current_skill>
${CURRENT_SKILL}
</current_skill>

Here are research findings about current frontend trends:
<research>
${combinedResearch}
</research>
${feedbackContext}

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

      setFindings({
        summary: summaryMatch[1].trim(),
        updatedSkill: skillMatch[1].trim(),
        researchRaw: combinedResearch,
        timestamp: new Date().toISOString(),
      });
      setStatus("done");
      setProgress("");

      if (onResearchComplete) {
        onResearchComplete({
          summary: summaryMatch[1].trim(),
          updatedSkill: skillMatch[1].trim(),
        });
      }
    } catch (err) {
      setError(err.message);
      setStatus("error");
      setProgress("");
    }
  }, [feedback, onResearchComplete, apiKey]);

  return (
    <div>
      {status === "idle" && (
        <div>
          <p style={{ color: "#999", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
            This will search the web for current frontend development trends, design patterns,
            and tooling updates, then synthesize those findings into an updated SKILL.md.
            {feedback.length > 0 &&
              ` Your ${feedback.length} logged feedback item${feedback.length > 1 ? "s" : ""} will also be incorporated.`}
          </p>
          <button
            onClick={runResearch}
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
            Research & Update Skill
          </button>
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

function HistoryPanel({ history }) {
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
          <p style={{ color: "#999", fontSize: 12, lineHeight: 1.5, margin: 0 }}>
            {entry.summary?.substring(0, 200)}
            {entry.summary?.length > 200 ? "..." : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────

export default function SkillEvolver() {
  const [tab, setTab] = useState("research");
  const [feedback, setFeedback] = useState([]);
  const [history, setHistory] = useState([]);
  const [updatedSkill, setUpdatedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("skill-evolver:api-key") || "");

  useEffect(() => {
    (async () => {
      const savedFeedback = await storageGet(STORAGE_KEYS.FEEDBACK);
      if (savedFeedback) setFeedback(savedFeedback);
      const savedHistory = await storageGet(STORAGE_KEYS.SKILL_HISTORY);
      if (savedHistory) setHistory(savedHistory);
      setLoading(false);
    })();
  }, []);

  const saveFeedback = async (updated) => {
    setFeedback(updated);
    await storageSet(STORAGE_KEYS.FEEDBACK, updated);
  };

  const handleAddFeedback = (entry) => saveFeedback([...feedback, entry]);
  const handleDeleteFeedback = (id) => saveFeedback(feedback.filter((f) => f.id !== id));

  const handleResearchComplete = ({ summary, updatedSkill: skill }) => {
    setUpdatedSkill(skill);
  };

  const handleApprove = async (finalSkill) => {
    // Save to history
    const entry = {
      ts: new Date().toISOString(),
      summary: updatedSkill ? "Updated via research + feedback" : "Manual update",
      feedbackCount: feedback.length,
    };
    const newHistory = [entry, ...history];
    setHistory(newHistory);
    await storageSet(STORAGE_KEYS.SKILL_HISTORY, newHistory);

    // Save latest skill
    await storageSet(STORAGE_KEYS.LATEST_SKILL, finalSkill);

    // Archive feedback
    await storageSet(STORAGE_KEYS.FEEDBACK, []);
    setFeedback([]);

    // Trigger download as .md
    const blob = new Blob([finalSkill], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SKILL.md";
    a.click();
    URL.revokeObjectURL(url);

    setDownloadStatus("Downloaded. Replace the SKILL.md in your frontend-design skill folder, then reinstall.");
    setTimeout(() => setDownloadStatus(null), 8000);
  };

  const tabs = [
    { id: "research", label: "Research & Update" },
    { id: "feedback", label: `Feedback${feedback.length > 0 ? ` (${feedback.length})` : ""}` },
    { id: "history", label: "History" },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "#888",
        }}
      >
        Loading...
      </div>
    );
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
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#4f8fff",
              marginBottom: 6,
            }}
          >
            Skill Evolver
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px 0", color: "#fff" }}>
            frontend-design
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
            <ResearchPanel onResearchComplete={handleResearchComplete} feedback={feedback} apiKey={apiKey} />
            {updatedSkill && (
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

        {tab === "history" && <HistoryPanel history={history} />}
      </div>
    </div>
  );
}
