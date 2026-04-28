import { useMemo, useState } from "react";
import { buildSystemPrompt } from "../lib/playlab";

export default function PlayLabSetup({ profile }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const systemPrompt = useMemo(() => buildSystemPrompt(profile), [profile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(systemPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="playlab-section" id="playlab">
      <div className="container">
        <div className={`playlab-card ${open ? "playlab-card--open" : ""}`}>
          <div className="playlab-card__header" onClick={() => setOpen(!open)}>
            <div className="playlab-card__header-left">
              <span className="playlab-card__badge">🎓 Take it with you</span>
              <h3 className="playlab-card__title">
                Build your AI Business Consultant in PlayLab.ai
              </h3>
              <p className="playlab-card__sub">
                A custom AI chatbot that knows your business inside and out. Use it during the
                6-month cohort whenever you need a sounding board, want to pressure-test a
                decision, or get unstuck.
              </p>
            </div>
            <span className={`chevron ${open ? "chevron--up" : ""}`}>▾</span>
          </div>

          {open && (
            <div className="playlab-card__body">
              <div className="playlab-card__steps">
                <div className="playlab-step">
                  <span className="playlab-step__num">1</span>
                  <div>
                    <strong>Open PlayLab.ai</strong>
                    <p>Sign in (free for educators and students), then click "Create New Project."</p>
                  </div>
                </div>
                <div className="playlab-step">
                  <span className="playlab-step__num">2</span>
                  <div>
                    <strong>Paste the System Prompt below</strong>
                    <p>
                      Drop it into PlayLab's "Instructions" field. This tells your chatbot
                      everything about your business and how to act as your consultant.
                    </p>
                  </div>
                </div>
                <div className="playlab-step">
                  <span className="playlab-step__num">3</span>
                  <div>
                    <strong>Optionally upload your workbook</strong>
                    <p>
                      Use the <em>Download .md</em> button up top to grab your workbook, then
                      attach it as a knowledge file in PlayLab for even more context.
                    </p>
                  </div>
                </div>
              </div>

              <div className="playlab-card__output">
                <div className="playlab-card__output-header">
                  <strong>📜 Your System Prompt (auto-built from your Venture Profile)</strong>
                  <div className="playlab-card__actions">
                    <button
                      className={`copy-btn ${copied ? "copy-btn--copied" : ""}`}
                      onClick={handleCopy}
                    >
                      {copied ? "✓ Copied!" : "📋 Copy System Prompt"}
                    </button>
                    <a
                      className="open-ai-btn open-ai-btn--chatgpt"
                      href="https://www.playlab.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🚀 Open PlayLab.ai ↗
                    </a>
                  </div>
                </div>
                <pre className="playlab-card__pre">{systemPrompt}</pre>
                <p className="playlab-card__hint">
                  💡 Click <strong>🔄 Refresh prompts</strong> at the top of the page after editing
                  your Venture Profile — this prompt will update automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
