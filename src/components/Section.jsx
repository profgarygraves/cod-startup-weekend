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

// Notes were once a flat string per section. They're now { final, notes }.
// Treat any legacy string value as freeform notes.
function readSectionNote(value) {
  if (typeof value === "string") return { final: "", notes: value };
  if (value && typeof value === "object") {
    return { final: value.final || "", notes: value.notes || "" };
  }
  return { final: "", notes: "" };
}

export default function Section({
  section,
  status,
  onStatusChange,
  profile,
  defaultOpen,
  extra,
  notes,
  onNotesChange,
}) {
  const [open, setOpen] = useState(defaultOpen || false);
  const [copied, setCopied] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);

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
  const sectionNote = readSectionNote(notes && notes[section.id]);

  const updateNoteField = (field, value) => {
    onNotesChange?.(section.id, { ...sectionNote, [field]: value });
  };

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
                  const taskLessonOpen = openLesson === ti;
                  return (
                    <li key={ti} className={`task-prompt ${tp.isFinal ? "task-prompt--final" : ""}`}>
                      {tp.isFinal && (
                        <div className="task-prompt__final-banner">
                          📋 FINAL OUTPUT — paste the AI's reply into your notebook below
                        </div>
                      )}
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
                                  {tp.lesson && (
                                    <button
                                      type="button"
                                      className={`lesson-btn ${taskLessonOpen ? "lesson-btn--open" : ""}`}
                                      onClick={() => setOpenLesson(taskLessonOpen ? null : ti)}
                                      aria-expanded={taskLessonOpen}
                                    >
                                      {taskLessonOpen ? "📚 Hide lesson" : "📚 Lesson"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          {tp.lesson && taskLessonOpen && (
                            <div className="lesson-panel" role="note">
                              <div className="lesson-panel__label">📚 Why this task matters</div>
                              <p className="lesson-panel__text">{tp.lesson}</p>
                            </div>
                          )}
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

          {/* Notebook (per-section notes — split into Final output + Notes) */}
          {onNotesChange && (
            <div className="section-block section-block--notebook">
              <div className="section-block__label">📓 Your notebook for this section</div>
              <p className="section-block__sub">
                Saved to your browser and included in your downloadable workbook.
              </p>

              <div className="section-notebook__field section-notebook__field--final">
                <label className="section-notebook__field-label">
                  📋 Final output (paste AI's reply to the FINAL prompt here)
                </label>
                <p className="section-notebook__field-hint">
                  This is what gets fed to your custom GPT — the canonical record of this section.
                </p>
                <textarea
                  className="section-notebook__textarea section-notebook__textarea--final"
                  value={sectionNote.final}
                  rows={6}
                  placeholder="Paste the AI's response to the FINAL prompt above…"
                  onChange={(e) => updateNoteField("final", e.target.value)}
                />
                {sectionNote.final && (
                  <div className="section-notebook__meta">
                    ✓ {sectionNote.final.length.toLocaleString()} characters in Final output
                  </div>
                )}
              </div>

              <div className="section-notebook__field">
                <label className="section-notebook__field-label">
                  📝 Notes / scratch (just for you)
                </label>
                <p className="section-notebook__field-hint">
                  Decisions, links, reminders. Not included in the GPT brief.
                </p>
                <textarea
                  className="section-notebook__textarea"
                  value={sectionNote.notes}
                  rows={3}
                  placeholder="Jot decisions, drop links, write reminders…"
                  onChange={(e) => updateNoteField("notes", e.target.value)}
                />
              </div>
            </div>
          )}

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
