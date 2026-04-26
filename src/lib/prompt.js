// Maps the various bracket placeholders used across prompts to fields on
// the venture profile. Order matters — longer/more-specific patterns first
// so we don't half-substitute (e.g. "[business name]" before "[business]").
const SUBSTITUTIONS = [
  { pattern: /\[business name\]/gi, field: "ideaName" },
  { pattern: /\[business idea\]/gi, field: "ideaDescription" },
  { pattern: /\[describe business\]/gi, field: "ideaDescription" },
  { pattern: /\[describe product\]/gi, field: "ideaDescription" },
  { pattern: /\[insert idea\]/gi, field: "ideaDescription" },
  { pattern: /\[insert concept\]/gi, field: "ideaDescription" },
  { pattern: /\[product\/service\]/gi, field: "ideaName" },
  { pattern: /\[business\]/gi, field: "ideaName" },
  { pattern: /\[customer persona\]/gi, field: "audience" },
  { pattern: /\[describe audience\]/gi, field: "audience" },
  { pattern: /\[audience\]/gi, field: "audience" },
  { pattern: /\[core value proposition\]/gi, field: "offer" },
];

function resolveField(profile, field) {
  if (!profile) return null;
  if (field === "ideaDescription") {
    const name = (profile.ideaName || "").trim();
    const desc = (profile.description || "").trim();
    if (name && desc) return `${name} — ${desc}`;
    return name || desc || null;
  }
  const value = profile[field];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export function fillPrompt(prompt, profile) {
  if (!prompt) return "";
  let out = prompt;
  for (const { pattern, field } of SUBSTITUTIONS) {
    const value = resolveField(profile, field);
    if (value) out = out.replace(pattern, value);
  }
  return out;
}

export function chatGPTUrl(prompt) {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

export function claudeUrl(prompt) {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}
