import { useMemo, useState } from "react";
import { usePersistentState } from "../lib/storage";
import { chatGPTUrl, claudeUrl } from "../lib/prompt";

const INITIAL = {
  headline: "",
  subheadline: "",
  heroVisual: "",
  offerHeadline: "",
  offerBullets: "",
  ctaText: "",
  founderName: "",
  founderBio: "",
  formType: "email",
  publishedUrl: "",
};

const FORM_TYPE_LABELS = {
  email: "Email signup (collect interest)",
  reservation: "Reservation / waitlist",
  message: "Open contact form",
};

function suggested(profile, wizard) {
  const name = (profile.ideaName || "").trim();
  const desc = (profile.description || "").trim();
  const audience = (profile.audience || "").trim();
  const problem = (profile.problem || "").trim();
  const offer = (profile.offer || "").trim();

  return {
    headline: wizard.headline || name || "Your Business Name",
    subheadline:
      wizard.subheadline ||
      (desc && audience ? `${desc} — built for ${audience}.` : desc || "What you do, in one sentence."),
    heroVisual: wizard.heroVisual || "",
    offerHeadline: wizard.offerHeadline || (offer ? `What you get with ${name || "us"}` : "What you get"),
    offerBullets: wizard.offerBullets || (offer ? `• ${offer}` : ""),
    ctaText: wizard.ctaText || "Get early access",
    founderName: wizard.founderName || (profile.members || "").split(",")[0]?.trim() || "Your name",
    founderBio:
      wizard.founderBio ||
      (problem ? `I started this because ${problem.toLowerCase().replace(/\.$/, "")}.` : ""),
    formType: wizard.formType || "email",
  };
}

function buildSpec(profile, values) {
  const lines = [];
  lines.push(`# ${values.headline} — Website Spec`);
  lines.push("");
  if (profile.audience) lines.push(`**Target audience:** ${profile.audience}`);
  if (profile.problem) lines.push(`**Problem we solve:** ${profile.problem}`);
  lines.push("");
  lines.push("## 1. Hero Section");
  lines.push(`- **Headline:** ${values.headline}`);
  lines.push(`- **Subheadline:** ${values.subheadline}`);
  lines.push(`- **Hero visual:** ${values.heroVisual || "(student to add — describe an AI-generated image or upload a photo)"}`);
  lines.push(`- **Primary CTA button:** ${values.ctaText}`);
  lines.push("");
  lines.push("## 2. Offer Section");
  lines.push(`- **Section headline:** ${values.offerHeadline}`);
  lines.push(`- **Bullets / benefits:**`);
  lines.push(values.offerBullets ? values.offerBullets.split("\n").map((b) => `  ${b.startsWith("•") || b.startsWith("-") ? b : "• " + b}`).join("\n") : "  • (add 3 benefits)");
  if (profile.price) lines.push(`- **Price:** ${profile.price}`);
  lines.push("");
  lines.push("## 3. About the Founder");
  lines.push(`- **Name:** ${values.founderName}`);
  lines.push(`- **Bio:** ${values.founderBio || "(2–3 sentences on who you are and why you're building this)"}`);
  lines.push("");
  lines.push("## 4. Validation Form");
  lines.push(`- **Type:** ${FORM_TYPE_LABELS[values.formType] || values.formType}`);
  lines.push(`- **Goal:** Capture at least 10 interested people before the pitch`);
  return lines.join("\n");
}

function buildCopyPrompt(profile, values, spec) {
  return [
    `You are a senior copywriter. Using this spec, write polished, conversion-focused homepage copy for "${values.headline}".`,
    ``,
    `Audience: ${profile.audience || "(not specified)"}.`,
    `Tone: clear, confident, friendly — not salesy.`,
    ``,
    `Return:`,
    `1. A sharper hero headline (under 10 words) and subheadline (under 25 words).`,
    `2. 3 benefit bullets for the offer section.`,
    `3. A short founder bio (2–3 sentences, first-person).`,
    `4. CTA button text options (3 variations).`,
    `5. A 2-sentence "About" paragraph.`,
    ``,
    `Here is the spec:`,
    ``,
    spec,
  ].join("\n");
}

export default function WebsiteWizard({ profile }) {
  const [wizard, setWizard] = usePersistentState("cod-sw-website", INITIAL);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(null);

  const values = useMemo(() => suggested(profile, wizard), [profile, wizard]);
  const spec = useMemo(() => buildSpec(profile, values), [profile, values]);
  const copyPrompt = useMemo(() => buildCopyPrompt(profile, values, spec), [profile, values, spec]);

  const setField = (key) => (e) => {
    setWizard({ ...wizard, [key]: e.target.value });
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const isComplete = !!wizard.publishedUrl;

  return (
    <div className={`wizard ${open ? "wizard--open" : ""} ${isComplete ? "wizard--complete" : ""}`}>
      <div className="wizard__header" onClick={() => setOpen(!open)}>
        <div className="wizard__header-left">
          <span className="wizard__badge">
            {isComplete ? "✅ Site published" : "🛠️ Website Builder Wizard"}
          </span>
          <h4 className="wizard__title">Plan, brief, and publish your landing page</h4>
          <p className="wizard__sub">
            Auto-fills from your Venture Profile. Outputs a clean spec you can paste into Framer.ai, Carrd, Wix, or any AI website builder.
          </p>
        </div>
        <span className={`chevron ${open ? "chevron--up" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="wizard__body">
          {/* Step 1: Hero */}
          <div className="wizard__step">
            <div className="wizard__step-label">Step 1 · Hero section</div>
            <label className="wizard__field">
              <span>Headline (under 10 words)</span>
              <input
                type="text"
                value={wizard.headline}
                onChange={setField("headline")}
                placeholder={values.headline}
              />
            </label>
            <label className="wizard__field">
              <span>Subheadline (1 sentence)</span>
              <textarea
                rows={2}
                value={wizard.subheadline}
                onChange={setField("subheadline")}
                placeholder={values.subheadline}
              />
            </label>
            <label className="wizard__field">
              <span>Hero visual (describe an image — you'll generate it with Canva AI / DALL·E)</span>
              <input
                type="text"
                value={wizard.heroVisual}
                onChange={setField("heroVisual")}
                placeholder="e.g. A nursing student reading a textbook with a meal-prep container open"
              />
            </label>
            <label className="wizard__field">
              <span>Primary CTA button text</span>
              <input
                type="text"
                value={wizard.ctaText}
                onChange={setField("ctaText")}
                placeholder={values.ctaText}
              />
            </label>
          </div>

          {/* Step 2: Offer */}
          <div className="wizard__step">
            <div className="wizard__step-label">Step 2 · Offer section</div>
            <label className="wizard__field">
              <span>Offer section headline</span>
              <input
                type="text"
                value={wizard.offerHeadline}
                onChange={setField("offerHeadline")}
                placeholder={values.offerHeadline}
              />
            </label>
            <label className="wizard__field">
              <span>Benefits / what they get (one per line)</span>
              <textarea
                rows={3}
                value={wizard.offerBullets}
                onChange={setField("offerBullets")}
                placeholder={values.offerBullets || "• Save 5 hours a week\n• Hit your macros without thinking\n• Cancel anytime"}
              />
            </label>
          </div>

          {/* Step 3: Founder */}
          <div className="wizard__step">
            <div className="wizard__step-label">Step 3 · About the founder</div>
            <label className="wizard__field">
              <span>Founder name</span>
              <input
                type="text"
                value={wizard.founderName}
                onChange={setField("founderName")}
                placeholder={values.founderName}
              />
            </label>
            <label className="wizard__field">
              <span>Short bio (2–3 sentences, first-person)</span>
              <textarea
                rows={3}
                value={wizard.founderBio}
                onChange={setField("founderBio")}
                placeholder={values.founderBio || "I'm a sophomore at COD and I started this because..."}
              />
            </label>
          </div>

          {/* Step 4: Validation form */}
          <div className="wizard__step">
            <div className="wizard__step-label">Step 4 · Validation form</div>
            <label className="wizard__field">
              <span>What does the form do?</span>
              <select value={wizard.formType} onChange={setField("formType")}>
                {Object.entries(FORM_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Step 5: Output */}
          <div className="wizard__output">
            <div className="wizard__step-label">Step 5 · Build it</div>

            <div className="wizard__output-block">
              <div className="wizard__output-header">
                <strong>📄 Website Spec (copy → paste into Framer.ai or your AI builder)</strong>
                <button
                  className={`copy-btn ${copied === "spec" ? "copy-btn--copied" : ""}`}
                  onClick={() => handleCopy(spec, "spec")}
                >
                  {copied === "spec" ? "✓ Copied!" : "📋 Copy spec"}
                </button>
              </div>
              <pre className="wizard__pre">{spec}</pre>
            </div>

            <div className="wizard__output-block">
              <div className="wizard__output-header">
                <strong>🤖 AI Copy Prompt (refine the words before you build)</strong>
                <div className="prompt-item__actions">
                  <button
                    className={`copy-btn ${copied === "prompt" ? "copy-btn--copied" : ""}`}
                    onClick={() => handleCopy(copyPrompt, "prompt")}
                  >
                    {copied === "prompt" ? "✓ Copied!" : "📋 Copy"}
                  </button>
                  <a
                    className="open-ai-btn open-ai-btn--chatgpt"
                    href={chatGPTUrl(copyPrompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in ChatGPT ↗
                  </a>
                  <a
                    className="open-ai-btn open-ai-btn--claude"
                    href={claudeUrl(copyPrompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Claude ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="wizard__output-block">
              <div className="wizard__output-header">
                <strong>🚀 Build options</strong>
              </div>
              <div className="wizard__build-links">
                <a className="open-ai-btn" href="https://framer.com/projects/new" target="_blank" rel="noopener noreferrer">
                  Open Framer ↗
                </a>
                <a className="open-ai-btn" href="https://carrd.co" target="_blank" rel="noopener noreferrer">
                  Open Carrd ↗
                </a>
                <a className="open-ai-btn" href="https://www.wix.com/wixadi" target="_blank" rel="noopener noreferrer">
                  Open Wix ADI ↗
                </a>
                <a className="open-ai-btn" href="https://canva.com" target="_blank" rel="noopener noreferrer">
                  Open Canva ↗
                </a>
              </div>
              <p className="wizard__hint">
                Pick one. Paste the spec above into the AI builder when prompted (or use the AI Copy Prompt to draft polished words first, then drop into the builder).
              </p>
            </div>
          </div>

          {/* Paste-back */}
          <div className="wizard__step wizard__step--published">
            <div className="wizard__step-label">When you're live · Paste your URL</div>
            <label className="wizard__field">
              <span>Your published site URL</span>
              <input
                type="url"
                value={wizard.publishedUrl}
                onChange={setField("publishedUrl")}
                placeholder="https://deserteats.framer.website"
              />
            </label>
            {wizard.publishedUrl && (
              <p className="wizard__live">
                🟢 Live at{" "}
                <a href={wizard.publishedUrl} target="_blank" rel="noopener noreferrer">
                  {wizard.publishedUrl}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
