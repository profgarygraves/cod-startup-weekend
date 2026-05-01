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

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHTML(profile, values) {
  const headline = escapeHtml(values.headline);
  const subheadline = escapeHtml(values.subheadline);
  const ctaText = escapeHtml(values.ctaText);
  const offerHeadline = escapeHtml(values.offerHeadline);
  const founderName = escapeHtml(values.founderName);
  const founderBio = escapeHtml(values.founderBio || `I'm building ${values.headline} because I believe it should exist. I'd love your feedback.`);
  const price = escapeHtml(profile?.price || "");
  const audience = escapeHtml(profile?.audience || "");

  const bullets = (values.offerBullets || "")
    .split("\n")
    .map((b) => b.replace(/^[•\-]\s*/, "").trim())
    .filter(Boolean);
  const bulletHTML = bullets.length
    ? bullets.map((b) => `      <li>${escapeHtml(b)}</li>`).join("\n")
    : `      <li>(add 3 benefits)</li>`;

  const formIntro = values.formType === "reservation"
    ? "Reserve your spot — first come, first served."
    : values.formType === "message"
    ? "Have a question? Drop it below."
    : "Get on the early-access list — no spam, just launch updates.";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${headline}</title>
<meta name="description" content="${subheadline}">
<style>
  :root {
    --ink: #1a1a1a;
    --muted: #5a5a5a;
    --accent: #c8102e;
    --bg: #fdfcfa;
    --card: #ffffff;
    --border: #e8e2dc;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif;
    background: var(--bg);
    color: var(--ink);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 720px; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
  section { margin-bottom: 4rem; }
  h1 { font-size: clamp(2rem, 6vw, 3.25rem); line-height: 1.1; margin: 0 0 1rem; letter-spacing: -0.02em; }
  h2 { font-size: 1.5rem; margin: 0 0 1rem; }
  p { margin: 0 0 1rem; color: var(--muted); }
  .lead { font-size: 1.2rem; color: var(--ink); }
  .cta {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    padding: 0.875rem 1.75rem;
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    font-size: 1rem;
    transition: transform 0.15s, opacity 0.15s;
  }
  .cta:hover { transform: translateY(-1px); opacity: 0.95; }
  ul.benefits { padding: 0; list-style: none; }
  ul.benefits li {
    padding: 0.625rem 0 0.625rem 1.5rem;
    position: relative;
    color: var(--ink);
    border-bottom: 1px solid var(--border);
  }
  ul.benefits li:last-child { border-bottom: none; }
  ul.benefits li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: 700;
  }
  .price-tag {
    display: inline-block;
    background: #fff5e6;
    color: #8a4a00;
    padding: 0.25rem 0.625rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  .founder { background: var(--card); border: 1px solid var(--border); padding: 1.5rem 1.625rem; border-radius: 12px; }
  .founder strong { color: var(--ink); }
  form {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  form label { font-size: 0.85rem; font-weight: 600; color: var(--ink); }
  form input, form textarea {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.625rem 0.875rem;
    font-size: 1rem;
    font-family: inherit;
  }
  form input:focus, form textarea:focus { outline: 2px solid var(--accent); outline-offset: -1px; }
  form button {
    background: var(--accent);
    color: #fff;
    border: 0;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
  footer { color: var(--muted); font-size: 0.85rem; text-align: center; padding-top: 2rem; border-top: 1px solid var(--border); }
</style>
</head>
<body>
<main>

  <section class="hero">
    <h1>${headline}</h1>
    <p class="lead">${subheadline}</p>
    <a href="#signup" class="cta">${ctaText}</a>
  </section>

  <section class="offer">
    <h2>${offerHeadline}</h2>
    ${price ? `<span class="price-tag">${price}</span>` : ""}
    <ul class="benefits">
${bulletHTML}
    </ul>
  </section>

  <section class="founder-section">
    <h2>About the founder</h2>
    <div class="founder">
      <p><strong>${founderName}</strong></p>
      <p>${founderBio}</p>
    </div>
  </section>

  <section id="signup">
    <h2>${ctaText}</h2>
    <p>${formIntro}</p>
    <form method="post" action="">
      <label for="email">Email address</label>
      <input id="email" type="email" name="email" placeholder="you@example.com" required>
      ${values.formType === "message" ? `
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="3" placeholder="What's your question?"></textarea>` : ""}
      <button type="submit">${ctaText}</button>
    </form>
  </section>

  <footer>
    ${audience ? `<p>Built for ${audience}.</p>` : ""}
    <p>© ${new Date().getFullYear()} ${escapeHtml(values.headline)}</p>
  </footer>

</main>
</body>
</html>`;
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
  const html = useMemo(() => buildHTML(profile, values), [profile, values]);

  const setField = (key) => (e) => {
    setWizard({ ...wizard, [key]: e.target.value });
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleHTMLPreview = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
  };

  const handleHTMLDownload = () => {
    const slug = (values.headline || "site")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "site";
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
            Auto-fills from your Venture Profile. Two paths: <strong>fast test</strong> via our COD-built <a href="https://31is.com" target="_blank" rel="noopener noreferrer">31is.com</a> (paste HTML, live in 5 minutes), or <strong>polish for the long run</strong> via Framer / Carrd / Wix.
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

            <div className="wizard__output-block wizard__output-block--html">
              <div className="wizard__output-header">
                <strong>📄 Ready-to-paste HTML (for 31is.com — fastest path to live)</strong>
                <div className="prompt-item__actions">
                  <button
                    className={`copy-btn ${copied === "html" ? "copy-btn--copied" : ""}`}
                    onClick={() => handleCopy(html, "html")}
                  >
                    {copied === "html" ? "✓ Copied!" : "📋 Copy HTML"}
                  </button>
                  <button className="open-ai-btn" onClick={handleHTMLPreview}>
                    👁️ Preview
                  </button>
                  <button className="open-ai-btn" onClick={handleHTMLDownload}>
                    ⬇ Download .html
                  </button>
                </div>
              </div>
              <p className="wizard__hint">
                Click <strong>Preview</strong> to see what the page will look like — no build step. Then sign in to <a href="https://31is.com" target="_blank" rel="noopener noreferrer">31is.com</a>, pick a subdomain like <code>yourname.31is.com</code>, paste this HTML, and you're live with form-capture wired up.
              </p>
              <details className="wizard__details">
                <summary>Show generated HTML</summary>
                <pre className="wizard__pre">{html}</pre>
              </details>
            </div>

            <div className="wizard__output-block">
              <div className="wizard__output-header">
                <strong>🚀 Build options</strong>
              </div>
              <div className="wizard__build-links">
                <a className="open-ai-btn open-ai-btn--featured" href="https://31is.com" target="_blank" rel="noopener noreferrer">
                  🚀 Open 31is.com (COD) ↗
                </a>
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
                <strong>Want fast?</strong> Use 31is.com — paste the HTML above and you're live in 5 minutes with lead capture.<br/>
                <strong>Want polish?</strong> Use Framer or Carrd — paste the Spec above when the AI builder asks "what do you want to build?"
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
