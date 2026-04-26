import { useState } from "react";

const FIELDS = [
  {
    key: "teamName",
    label: "Team name",
    placeholder: "e.g. Desert Dynamos",
    type: "input",
  },
  {
    key: "members",
    label: "Team members",
    placeholder: "Comma-separated names",
    type: "input",
  },
  {
    key: "ideaName",
    label: "Business / idea name",
    placeholder: "Working name is fine — you can change it later",
    type: "input",
  },
  {
    key: "description",
    label: "What it is (one sentence)",
    placeholder: "e.g. A weekly meal-prep service for busy nursing students",
    type: "textarea",
  },
  {
    key: "problem",
    label: "Problem you're solving",
    placeholder: "What pain or frustration does this fix?",
    type: "textarea",
  },
  {
    key: "audience",
    label: "Who it's for (target customer)",
    placeholder: "Be specific — age, role, situation, where they hang out",
    type: "textarea",
  },
  {
    key: "offer",
    label: "Core offer / value proposition",
    placeholder: "What exactly does the customer get?",
    type: "textarea",
  },
  {
    key: "price",
    label: "Price (optional for now)",
    placeholder: "e.g. $25/month or $99 one-time",
    type: "input",
  },
];

const REQUIRED_FOR_COMPLETE = ["ideaName", "description", "audience"];

function isComplete(profile) {
  return REQUIRED_FOR_COMPLETE.every(
    (k) => typeof profile[k] === "string" && profile[k].trim().length > 0
  );
}

export default function VentureProfile({ profile, onChange }) {
  const complete = isComplete(profile);
  const [open, setOpen] = useState(!complete);

  const handleField = (key) => (e) => {
    onChange({ ...profile, [key]: e.target.value });
  };

  const handleClear = () => {
    if (!window.confirm("Clear your venture profile? This will erase all the fields.")) return;
    const empty = Object.fromEntries(FIELDS.map((f) => [f.key, ""]));
    onChange(empty);
  };

  return (
    <div className={`venture-profile ${open ? "venture-profile--open" : ""} ${complete ? "venture-profile--complete" : ""}`}>
      <div className="venture-profile__header" onClick={() => setOpen(!open)}>
        <div className="venture-profile__header-left">
          <span className="venture-profile__badge">
            {complete ? "✅ Profile saved" : "👋 Start here"}
          </span>
          <h3 className="venture-profile__title">
            {complete && profile.ideaName
              ? profile.ideaName
              : "Your Venture Profile"}
          </h3>
          <p className="venture-profile__sub">
            {complete
              ? "Your answers auto-fill every AI prompt below. Click to edit."
              : "Fill this in first — your answers auto-fill every AI prompt below."}
          </p>
        </div>
        <span className={`chevron ${open ? "chevron--up" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="venture-profile__body">
          <div className="venture-profile__grid">
            {FIELDS.map((field) => (
              <label key={field.key} className={`venture-profile__field venture-profile__field--${field.type}`}>
                <span className="venture-profile__label">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    className="venture-profile__input"
                    rows={2}
                    value={profile[field.key] || ""}
                    onChange={handleField(field.key)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    className="venture-profile__input"
                    type="text"
                    value={profile[field.key] || ""}
                    onChange={handleField(field.key)}
                    placeholder={field.placeholder}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="venture-profile__footer">
            <span className="venture-profile__help">
              💾 Saved automatically in your browser. No accounts, no servers.
            </span>
            <button className="venture-profile__clear" onClick={handleClear}>
              Clear all fields
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
