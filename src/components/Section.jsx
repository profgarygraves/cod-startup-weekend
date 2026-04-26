import { useState } from "react";
import { fillPrompt, chatGPTUrl, claudeUrl } from "../lib/prompt";

const STATUS_OPTIONS = ["not-started", "in-progress", "complete"];
const STATUS_LABELS = {
  "not-started": "⭕ Not Started",
  "in-progress": "🔄 In Progress",
  complete: "✅ Complete",
};

export default function Section({ section, status, onStatusChange, profile, defaultOpen, extra }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const [copied, setCopied] = useState(null);

  const copyPrompt = (prompt, idx) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const cycleStatus = () => {
    const idx = STATUS_OPTIONS.indexOf(status);
    const next = STATUS_OPTIONS[(idx + 1) % STATUS_OPTIONS.length];
    onStatusChange(section.id, next);
  };

  const whatWereDoing = section.whatWereDoing || section.objective;
  const whyItMatters = section.whyItMatters;

  return (
    <div className={`section-card ${open ? "section-card--open" : ""} section-card--status-${status}`}>
      {/* Header */}
      <div className="section-card__header" onClick={() => setOpen(!open)}>
        <div className="section-card__header-left">
          <span className="section-card__number">Section {section.number}</span>
          <h3 className="section-card__label">{section.collapsed_label}</h3>
        </div>
        <div className="section-card__header-right">
          {section.suggestedTime && (
            <span className="section-card__time" title="Suggested timing">
              🕒 {section.suggestedTime}
            </span>
          )}
          <button
            className={`status-badge status-badge--${status}`}
            onClick={(e) => { e.stopPropagation(); cycleStatus(); }}
            title="Click to change status"
          >
            {STATUS_LABELS[status]}
          </button>
          <span className={`chevron ${open ? "chevron--up" : ""}`}>▾</span>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div className="section-card__body">
          <h2 className="section-card__title">{section.title}</h2>

          {/* What we're doing / Why it matters */}
          <div className="learning-layer">
            <div className="learning-layer__row">
              <div className="learning-layer__label">What we're doing</div>
              <div className="learning-layer__text">{whatWereDoing}</div>
            </div>
            {whyItMatters && (
              <div className="learning-layer__row">
                <div className="learning-layer__label learning-layer__label--why">Why it matters</div>
                <div className="learning-layer__text">{whyItMatters}</div>
              </div>
            )}
          </div>

          <div className="section-grid">
            {/* Tasks */}
            <div className="section-block section-block--tasks">
              <div className="section-block__label">✅ Tasks to Complete</div>
              <ul className="task-list">
                {section.tasks.map((task, i) => (
                  <li key={i} className="task-item">
                    <span className="task-item__check">☐</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="section-block section-block--deliverables">
              <div className="section-block__label">📦 Deliverables</div>
              <ul className="deliverable-list">
                {section.deliverables.map((d, i) => (
                  <li key={i}>
                    <span>→</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tools */}
          <div className="section-block">
            <div className="section-block__label">🧠 AI Tools to Use</div>
            <div className="tool-cards">
              {section.tools.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-card"
                >
                  <span className="tool-card__icon">{tool.icon}</span>
                  <span className="tool-card__name">{tool.name}</span>
                  <span className="tool-card__arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Prompts */}
          <div className="section-block section-block--prompts">
            <div className="section-block__label">✍️ Sample Prompts</div>
            <div className="prompt-list">
              {section.prompts.map((rawPrompt, i) => {
                const filled = fillPrompt(rawPrompt, profile);
                const hasUnfilled = /\[[^\]]+\]/.test(filled);
                return (
                  <div key={i} className="prompt-item">
                    <p className="prompt-item__text">"{filled}"</p>
                    {hasUnfilled && (
                      <p className="prompt-item__hint">
                        ⚠️ Replace the [bracketed text] before sending — or fill in your Venture Profile at the top to auto-fill it.
                      </p>
                    )}
                    <div className="prompt-item__actions">
                      <button
                        className={`copy-btn ${copied === i ? "copy-btn--copied" : ""}`}
                        onClick={() => copyPrompt(filled, i)}
                      >
                        {copied === i ? "✓ Copied!" : "📋 Copy"}
                      </button>
                      <a
                        className="open-ai-btn open-ai-btn--chatgpt"
                        href={chatGPTUrl(filled)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in ChatGPT ↗
                      </a>
                      <a
                        className="open-ai-btn open-ai-btn--claude"
                        href={claudeUrl(filled)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Claude ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section-specific extra (e.g. Website Wizard) */}
          {extra}

          {/* Pro Tip */}
          {section.tips && (
            <div className="section-block section-block--tip">
              <div className="section-block__label">💡 Pro Tip</div>
              <p>{section.tips}</p>
            </div>
          )}

          {/* Mark Complete CTA */}
          <div className="section-card__footer">
            <button className="mark-complete-btn" onClick={cycleStatus}>
              {status === "complete" ? "✅ Marked Complete — Click to Reset" : "Mark Section Complete →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
