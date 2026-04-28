// Maps the various bracket placeholders used across prompts to fields on
// the venture profile. Order matters — longer/more-specific patterns first
// so we don't half-substitute (e.g. "[business name]" before "[business]").
const VENTURE_TYPE_PHRASE = {
  service: "service business",
  product: "physical product",
  digital: "digital product",
  combination: "business",
};

const MARKET_AREA_PHRASE = {
  online: "online / global market",
  hyperlocal: "hyperlocal market — single neighborhood or campus",
  city: "city / town market",
  regional: "regional market (county or metro area)",
  state: "statewide market",
  national: "national market",
  international: "international market",
};

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
  { pattern: /\[venture type\]/gi, field: "venturePhrase" },
  { pattern: /\[market area\]/gi, field: "marketAreaPhrase" },
];

function resolveField(profile, field) {
  if (!profile) return null;
  if (field === "ideaDescription") {
    const name = (profile.ideaName || "").trim();
    const desc = (profile.description || "").trim();
    if (name && desc) return `${name} — ${desc}`;
    return name || desc || null;
  }
  if (field === "venturePhrase") {
    return VENTURE_TYPE_PHRASE[profile.ventureType] || null;
  }
  if (field === "marketAreaPhrase") {
    const scopePhrase = MARKET_AREA_PHRASE[profile.marketAreaScope];
    const specific = (profile.marketArea || "").trim();
    if (specific && scopePhrase) return `${specific} (${scopePhrase})`;
    return specific || scopePhrase || null;
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

// Returns an array of { text, filled } segments so callers can render
// auto-filled text with a highlight. `filled === true` means the segment
// came from the venture profile (substituted). `filled === false` means it
// was static prompt text or an unfilled bracket placeholder.
export function fillPromptSegments(prompt, profile) {
  if (!prompt) return [{ text: "", filled: false }];

  const replacements = [];
  for (const { pattern, field } of SUBSTITUTIONS) {
    const value = resolveField(profile, field);
    if (!value) continue;
    pattern.lastIndex = 0;
    let m;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((m = re.exec(prompt)) !== null) {
      replacements.push({ start: m.index, end: m.index + m[0].length, value });
      if (m[0].length === 0) re.lastIndex++;
    }
  }
  replacements.sort((a, b) => a.start - b.start);
  // Drop overlapping replacements (longer/earlier wins because SUBSTITUTIONS
  // order them most-specific first).
  const filtered = [];
  let cursor = -1;
  for (const r of replacements) {
    if (r.start >= cursor) {
      filtered.push(r);
      cursor = r.end;
    }
  }

  const segments = [];
  let i = 0;
  for (const r of filtered) {
    if (r.start > i) segments.push({ text: prompt.slice(i, r.start), filled: false });
    segments.push({ text: r.value, filled: true });
    i = r.end;
  }
  if (i < prompt.length) segments.push({ text: prompt.slice(i), filled: false });
  return segments;
}

export function chatGPTUrl(prompt) {
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

export function claudeUrl(prompt) {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}
