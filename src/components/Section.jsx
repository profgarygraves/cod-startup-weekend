import { useState } from "react";
import { fillPrompt, fillPromptSegments, chatGPTUrl, claudeUrl } from "../lib/prompt";

const STATUS_OPTIONS = ["not-started", "in-progress", "complete"];
const STATUS_LABELS = {
  "not-started": "⭕ Not Started",
  "in-progress": "🔄 In Progress",
  complete: "✅ Complete",
};

function resolveTaskPrompts(taskBlock, profile) {
  if (taskBlock.byStartingPoint && profile?.startingPoint) {
    const variant = taskBlock.byStartingPoint[profile.startingPoint];
    if (variant) return variant;
  }
  if (taskBlock.byVentureType && profile?.ventureType) {
    const variant = taskBlock.byVentureType[profile.ventureType];
    if (variant) return variant;
  }
  return taskBlock.prompts || [];
}

export default function Section({ section, status, onStatusChange, profile, defaultOpen, extra }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const [copied, setCopied] = useState(null);

  const copyPrompt = (prompt, key) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(key);
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
  const taskPrompts = section.taskPrompts || [];

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

          {/* AI Tools */}
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

          {/* Tasks with embedded prompts */}
          {taskPrompts.length > 0 && (
            <div className="section-block section-block--tasks">
              <div className="section-block__label">✅ Tasks (with AI prompts to help)</div>
              <ol className="task-prompt-list">
                {taskPrompts.map((tp, ti) => {
                  const prompts = resolveTaskPrompts(tp, profile);
                  return (
                    <li key={ti} className="task-prompt">
                      <div className="task-prompt__header">
                        <span className="task-prompt__num">{ti + 1}</span>
                        <span className="task-prompt__label">{tp.task}</span>
                      </div>
                      {prompts.length > 0 && (
                        <div className="task-prompt__prompts">
                          {prompts.map((rawPrompt, pi) => {
                            const filled = fillPrompt(rawPrompt, profile);
                            const segments = fillPromptSegments(rawPrompt, profile);
                            const hasUnfilled = /\[[^\]]+\]/.test(filled);
                            const key = `${ti}-${pi}`;
                            return (
                              <div key={pi} className="prompt-item">
                                <p className="prompt-item__text">
                                  "{segments.map((seg, si) => seg.filled ? (
                                    <mark key={si} className="prompt-fill">{seg.text}</mark>
                                  ) : (
                                    <span key={si}>{seg.text}</span>
                                  ))}"
                                </p>
                                {hasUnfilled && (
                                  <p className="prompt-item__hint">
                                    ⚠️ Replace [bracketed text] before sending — or fill in your Venture Profile up top to auto-fill it.
                                  </p>
                                )}
                                <div className="prompt-item__actions">
                                  <button
                                    className={`copy-btn ${copied === key ? "copy-btn--copied" : ""}`}
                                    onClick={() => copyPrompt(filled, key)}
                                  >
                                    {copied === key ? "✓ Copied!" : "📋 Copy"}
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
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Deliverables */}
          {section.deliverables?.length > 0 && (
            <div className="section-block section-block--deliverables">
              <div className="section-block__label">📦 Deliverables (what you should have when done)</div>
              <ul className="deliverable-list">
                {section.deliverables.map((d, i) => (
                  <li key={i}>
                    <span>→</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
