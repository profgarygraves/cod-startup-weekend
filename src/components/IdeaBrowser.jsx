import { useMemo, useState } from "react";
import sideHustles from "../data/sideHustles.json";

const INVESTMENT_LABEL = {
  low: "Low ($0–$500)",
  medium: "Medium ($500–$2k)",
  high: "High ($2k+)",
};

const INVESTMENT_GLYPH = {
  low: "🟢",
  medium: "🟡",
  high: "🔴",
};

const CATEGORY_GLYPH = {
  "Business Services": "💼",
  "Creative Services": "🎨",
  "E-Commerce and Sales": "🛒",
  "Education and Tutoring": "📚",
  "Home and Lifestyle Services": "🏡",
  "Miscellaneous": "✨",
};

const CATEGORY_SKILLS = {
  "Business Services": "Communication, organization, problem-solving — and tools like ChatGPT to scale your output.",
  "Creative Services": "Strong design eye, attention to detail. Canva AI / Adobe Firefly / Midjourney now do most of the heavy lifting.",
  "E-Commerce and Sales": "Marketing basics, customer service, sourcing. Shopify and AI tools cut setup time massively.",
  "Education and Tutoring": "Real subject knowledge + patience. AI tutoring tools are now your collaborators, not competition.",
  "Home and Lifestyle Services": "Reliability, time management, in-person service skills. AI helps with scheduling, marketing, and admin.",
  "Miscellaneous": "Varies — read the description for a hint at what the work actually involves.",
};

const ALL_CATEGORIES = Array.from(new Set(sideHustles.map((s) => s.category))).sort();

export default function IdeaBrowser({ profile, onAdoptIdea }) {
  const [open, setOpen] = useState(profile?.startingPoint === "no-idea");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeInvestment, setActiveInvestment] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sideHustles.filter((s) => {
      if (activeCategory && s.category !== activeCategory) return false;
      if (activeInvestment && s.investment !== activeInvestment) return false;
      if (q) {
        const hay = `${s.name} ${s.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, activeCategory, activeInvestment]);

  const handleAdopt = (idea) => {
    const hasExisting = (profile?.ideaName || "").trim() || (profile?.description || "").trim();
    if (hasExisting) {
      const ok = window.confirm(
        `This will overwrite your current idea ("${profile.ideaName || "your idea"}") with "${idea.name}". Continue?`
      );
      if (!ok) return;
    }
    const firstSentence = idea.description.split(/(?<=[.!?])\s+/)[0] || idea.description;
    onAdoptIdea({
      ideaName: idea.name,
      description: firstSentence,
      startingPoint: "rough-idea",
    });
    document
      .querySelector(".venture-profile")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const recommended = profile?.startingPoint === "no-idea";

  return (
    <div className={`idea-browser ${open ? "idea-browser--open" : ""} ${recommended ? "idea-browser--recommended" : ""}`}>
      <div className="idea-browser__header" onClick={() => setOpen(!open)}>
        <div className="idea-browser__header-left">
          <span className="idea-browser__badge">
            {recommended ? "💡 Recommended for you" : "📚 Idea Library"}
          </span>
          <h4 className="idea-browser__title">Browse 99 starter ideas</h4>
          <p className="idea-browser__sub">
            Filter by category, investment, or search by interest. Click <strong>Use This Idea</strong> to drop one into your venture profile and start refining.
          </p>
        </div>
        <span className={`chevron ${open ? "chevron--up" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="idea-browser__body">
          <div className="idea-browser__notice">
            ⚠️ The investment estimates here predate today's AI tools — many of these can now be started for far less than tagged. Treat them as relative, not absolute.
          </div>

          <div className="idea-browser__filters">
            <input
              type="search"
              className="idea-browser__search"
              placeholder="🔍 Search by interest (e.g. design, writing, fitness, food)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="idea-browser__chips">
              <span className="idea-browser__chip-label">Category:</span>
              <button
                className={`idea-browser__chip ${activeCategory === "" ? "idea-browser__chip--active" : ""}`}
                onClick={() => setActiveCategory("")}
              >
                All
              </button>
              {ALL_CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`idea-browser__chip ${activeCategory === c ? "idea-browser__chip--active" : ""}`}
                  onClick={() => setActiveCategory(c === activeCategory ? "" : c)}
                  title={CATEGORY_SKILLS[c]}
                >
                  {CATEGORY_GLYPH[c] || ""} {c}
                </button>
              ))}
            </div>
            <div className="idea-browser__chips">
              <span className="idea-browser__chip-label">Investment:</span>
              <button
                className={`idea-browser__chip ${activeInvestment === "" ? "idea-browser__chip--active" : ""}`}
                onClick={() => setActiveInvestment("")}
              >
                All
              </button>
              {["low", "medium", "high"].map((inv) => (
                <button
                  key={inv}
                  className={`idea-browser__chip ${activeInvestment === inv ? "idea-browser__chip--active" : ""}`}
                  onClick={() => setActiveInvestment(inv === activeInvestment ? "" : inv)}
                >
                  {INVESTMENT_GLYPH[inv]} {INVESTMENT_LABEL[inv]}
                </button>
              ))}
            </div>
          </div>

          <div className="idea-browser__results-meta">
            Showing <strong>{filtered.length}</strong> of {sideHustles.length} ideas
            {activeCategory && (
              <span className="idea-browser__meta-skills">
                · Typical skills for {activeCategory}: {CATEGORY_SKILLS[activeCategory]}
              </span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="idea-browser__empty">
              No ideas match those filters. Try clearing one or searching for a different keyword.
            </div>
          ) : (
            <div className="idea-browser__grid">
              {filtered.map((idea) => (
                <div key={idea.name} className="idea-card">
                  <div className="idea-card__head">
                    <h5 className="idea-card__name">{idea.name}</h5>
                    <span className="idea-card__investment" title={INVESTMENT_LABEL[idea.investment]}>
                      {INVESTMENT_GLYPH[idea.investment]} {INVESTMENT_LABEL[idea.investment]}
                    </span>
                  </div>
                  <p className="idea-card__desc">{idea.description}</p>
                  <div className="idea-card__foot">
                    <span className="idea-card__category">
                      {CATEGORY_GLYPH[idea.category] || ""} {idea.category}
                    </span>
                    <button
                      className="idea-card__adopt"
                      onClick={() => handleAdopt(idea)}
                    >
                      Use This Idea →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
