export const STORAGE_KEYS = ["cod-sw-profile", "cod-sw-statuses", "cod-sw-website", "cod-sw-notes"];
const APP_TAG = "cod-startup-weekend";
const MD_VERSION = 1;

export function isStorageAvailable() {
  try {
    const k = "__cod_storage_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function buildBackup() {
  const data = {};
  for (const key of STORAGE_KEYS) {
    const raw = window.localStorage.getItem(key);
    if (raw == null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = null;
    }
  }
  return {
    app: APP_TAG,
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function backupFilename(profile) {
  const base = slugify(profile?.teamName) || slugify(profile?.ideaName) || "team";
  const today = new Date().toISOString().slice(0, 10);
  return `cod-sw-backup-${base}-${today}.json`;
}

export function downloadBackup(filename) {
  const json = JSON.stringify(buildBackup(), null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Normalize file contents: strip BOM, unify line endings to \n. Run on every
// upload so Windows-saved files, files round-tripped through Word/Docs, etc.
// don't trip up our regexes.
function normalizeText(text) {
  return String(text || "")
    .replace(/^\uFEFF/, "") // strip BOM
    .replace(/\r\n?/g, "\n"); // CRLF / CR → LF
}

export async function restoreBackupFromFile(file, sections) {
  const raw = await file.text();
  const text = normalizeText(raw);
  // Auto-detect format. We're generous: if the FILE NAME ends in .md OR the
  // CONTENT looks Markdown-y in any of several ways, we route to the .md
  // parser. JSON parse only kicks in if neither is true OR if .md parsing
  // fails and the file is parseable as JSON.
  const filenameLower = (file.name || "").toLowerCase();
  const isMdName = filenameLower.endsWith(".md") || filenameLower.endsWith(".markdown");
  const isJsonName = filenameLower.endsWith(".json");
  const head = text.trimStart().slice(0, 400);
  const looksLikeMd =
    isMdName ||
    head.startsWith("<!--") ||
    /^#\s.*Custom GPT Brief/m.test(head) ||
    /##\s+About the Business/m.test(text);

  // Prefer JSON only when the filename clearly says so, or when content
  // starts with `{` and looks JSON-ish.
  const looksLikeJson =
    isJsonName ||
    (head.startsWith("{") && /"app"\s*:\s*"cod-startup-weekend"/.test(head));

  // Explicit JSON path
  if (looksLikeJson && !looksLikeMd) {
    return restoreFromJson(text);
  }
  // Explicit MD path
  if (looksLikeMd) {
    try {
      return restoreFromMarkdown(text, sections);
    } catch (mdErr) {
      // Last-ditch: maybe it's actually JSON renamed .md
      if (head.startsWith("{")) {
        try {
          return restoreFromJson(text);
        } catch {
          /* fall through to throw the MD error */
        }
      }
      throw mdErr;
    }
  }
  // Ambiguous — try JSON, fall back to MD with diagnostic
  try {
    return restoreFromJson(text);
  } catch {
    throw new Error(
      `Couldn't tell what kind of file that is. Expected a .json backup or .md GPT brief from the COD Startup Weekend tool. (First 80 chars: ${JSON.stringify(head.slice(0, 80))})`
    );
  }
}

function restoreFromJson(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("That file isn't valid JSON. Make sure you picked a .json backup file or a .md GPT brief.");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("That doesn't look like a COD backup file.");
  }
  if (parsed.app !== APP_TAG) {
    throw new Error(`Wrong app tag: expected "${APP_TAG}", got "${parsed.app || "missing"}".`);
  }
  if (!parsed.data || typeof parsed.data !== "object") {
    throw new Error("Backup file is missing its data section.");
  }
  let restoredKeys = 0;
  for (const key of STORAGE_KEYS) {
    if (key in parsed.data) {
      window.localStorage.setItem(key, JSON.stringify(parsed.data[key]));
      restoredKeys++;
    }
  }
  return {
    restoredKeys,
    exportedAt: parsed.exportedAt,
    format: "json",
  };
}

// === MD restore ============================================================
// Parses the .md GPT brief produced by lib/export.js back into the same
// shape that lives in localStorage. Lossy on section status (intentionally
// not in the export), but covers profile, per-section Final + Notes, and
// the Website Wizard fields.

const PROFILE_FIELD_MAP = {
  "Business name": "ideaName",
  "What it is": "description",
  "Problem we solve": "problem",
  "Target customer": "audience",
  "Core offer / value proposition": "offer",
  "Pricing options": "price",
  "Visual prototype notes": "visualPrototypeNotes",
  Team: "teamName",
  Members: "members",
};

const VENTURE_TYPE_REVERSE = {
  "Service business": "service",
  "Physical product": "product",
  "Digital product / app / SaaS": "digital",
  Combination: "combination",
};

const STARTING_POINT_REVERSE = {
  "No idea yet — brainstorming": "no-idea",
  "Rough idea — sharpening": "rough-idea",
  "Clear idea — validating and building": "clear-idea",
};

const MARKET_SCOPE_REVERSE = {
  "Online-only / global": "online",
  "Hyperlocal (single neighborhood or campus)": "hyperlocal",
  "City / town": "city",
  "Regional (county or metro area)": "regional",
  Statewide: "state",
  National: "national",
  International: "international",
};

const WEBSITE_FIELD_MAP = {
  Headline: "headline",
  Subheadline: "subheadline",
  "Hero visual idea": "heroVisual",
  "Primary CTA": "ctaText",
  "Offer headline": "offerHeadline",
  "Offer benefits": "offerBullets",
  "Founder name": "founderName",
  "Founder bio": "founderBio",
  "Form type": "formType",
  "Published at": "publishedUrl",
};

// Headings to skip when looking for section content
const NON_SECTION_HEADINGS = new Set([
  "About the Business",
  "Website",
  "Operating Instructions for the GPT",
]);

// Split the markdown into `## Heading` blocks. Returns [{heading, body}].
function splitTopLevelSections(md) {
  const lines = md.split("\n");
  const blocks = [];
  let current = null;
  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      if (current) blocks.push(current);
      current = { heading: m[1].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) blocks.push(current);
  return blocks.map((b) => ({ heading: b.heading, body: b.body.join("\n") }));
}

// Parse a block of `- **Label:** value` bullets, supporting multi-line
// values where continuation lines are indented by ≥ 2 spaces.
function parseBulletKeyValues(body) {
  const lines = body.split("\n");
  const result = {};
  let currentKey = null;
  let currentLines = [];
  const flush = () => {
    if (!currentKey) return;
    result[currentKey] = currentLines.join("\n").trim();
    currentKey = null;
    currentLines = [];
  };
  for (const raw of lines) {
    const bulletMatch = /^-\s+\*\*(.+?):\*\*\s*(.*)$/.exec(raw);
    if (bulletMatch) {
      flush();
      currentKey = bulletMatch[1].trim();
      const inlineVal = bulletMatch[2];
      if (inlineVal) currentLines.push(inlineVal);
      continue;
    }
    // Indented continuation under a label-only bullet.
    if (currentKey && /^\s{2,}\S/.test(raw)) {
      currentLines.push(raw.replace(/^\s{2,}/, ""));
      continue;
    }
    // Blank line inside a multi-line value: keep going (preserves blank lines).
    if (currentKey && raw.trim() === "" && currentLines.length > 0) {
      currentLines.push("");
      continue;
    }
    // Anything else (---, blank pre-bullet, prose) ends the current bullet.
    flush();
  }
  flush();
  // Trim trailing blank lines accumulated inside multi-line values.
  for (const k of Object.keys(result)) {
    result[k] = result[k].replace(/\n+$/, "");
  }
  return result;
}

function reverseMatch(map, value) {
  if (!value) return "";
  const direct = map[value.trim()];
  if (direct) return direct;
  // Loose match: case-insensitive
  const v = value.trim().toLowerCase();
  for (const [label, key] of Object.entries(map)) {
    if (label.toLowerCase() === v) return key;
  }
  return "";
}

function parseAboutBlock(body) {
  const fields = parseBulletKeyValues(body);
  const profile = {
    ventureType: "",
    startingPoint: "",
    marketAreaScope: "",
    marketArea: "",
    teamName: "",
    members: "",
    ideaName: "",
    description: "",
    problem: "",
    audience: "",
    offer: "",
    price: "",
    visualPrototypeNotes: "",
  };
  for (const [label, key] of Object.entries(PROFILE_FIELD_MAP)) {
    if (fields[label]) profile[key] = fields[label];
  }
  if (fields["Venture type"]) {
    profile.ventureType = reverseMatch(VENTURE_TYPE_REVERSE, fields["Venture type"]);
  }
  if (fields["Starting point"]) {
    profile.startingPoint = reverseMatch(STARTING_POINT_REVERSE, fields["Starting point"]);
  }
  if (fields.Market) {
    // Format from export: "<area> — <scope label>" OR just one of them.
    const market = fields.Market;
    const splitIdx = market.lastIndexOf(" — ");
    if (splitIdx > 0) {
      const left = market.slice(0, splitIdx).trim();
      const right = market.slice(splitIdx + 3).trim();
      const scope = reverseMatch(MARKET_SCOPE_REVERSE, right);
      if (scope) {
        profile.marketAreaScope = scope;
        profile.marketArea = left;
      } else {
        // No scope match — treat the whole string as area
        profile.marketArea = market;
      }
    } else {
      // Try matching the whole thing as a scope label first
      const scope = reverseMatch(MARKET_SCOPE_REVERSE, market);
      if (scope) profile.marketAreaScope = scope;
      else profile.marketArea = market;
    }
  }
  return profile;
}

function parseWebsiteBlock(body) {
  const fields = parseBulletKeyValues(body);
  const website = {
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
  for (const [label, key] of Object.entries(WEBSITE_FIELD_MAP)) {
    if (fields[label]) website[key] = fields[label];
  }
  return website;
}

// Strip leading/trailing horizontal-rule lines (`---`) and surrounding blank
// lines that separate top-level sections in the export.
function trimRules(text) {
  const lines = text.split("\n");
  while (lines.length && /^(\s*|---\s*)$/.test(lines[0])) lines.shift();
  while (lines.length && /^(\s*|---\s*)$/.test(lines[lines.length - 1])) lines.pop();
  return lines.join("\n");
}

// Split a section's body into final output + founder's notes.
// Format produced by export.js:
//   <final content>
//
//   _Founder's notes:_
//
//   <notes content>
function parseSectionBody(body) {
  const NOTES_MARKER = /^\s*_Founder's notes:_\s*$/m;
  const m = NOTES_MARKER.exec(body);
  const final = trimRules(m ? body.slice(0, m.index) : body);
  const notes = m ? trimRules(body.slice(m.index + m[0].length)) : "";
  return { final, notes };
}

// Build a title → id map from a sections array (titles are stable enough
// that we trust them as the join key).
function buildTitleIndex(sections) {
  const idx = new Map();
  for (const s of sections || []) {
    if (s?.title) idx.set(s.title.trim().toLowerCase(), s.id);
  }
  return idx;
}

export function parseMarkdownBrief(text, sections) {
  if (!text || typeof text !== "string") {
    throw new Error("Empty file — nothing to restore.");
  }
  // Normalize line endings + strip BOM in case the caller didn't.
  const normalized = normalizeText(text);

  // Forgiving format check: must have at least ONE recognizable signal —
  // the version marker, an "About the Business" heading, or a "Custom GPT
  // Brief" title. Any one of these is enough.
  const hasMarker = /cod-sw-md-version/.test(normalized);
  const hasAbout = /##\s+About the Business/m.test(normalized);
  const hasTitle = /^#\s.*Custom GPT Brief/m.test(normalized);
  if (!hasMarker && !hasAbout && !hasTitle) {
    const preview = normalized.trim().slice(0, 80).replace(/\n/g, " ");
    throw new Error(
      `That doesn't look like a COD GPT brief. The file should start with "# <Business> — Custom GPT Brief" and have an "## About the Business" section. (Got: "${preview}…")`
    );
  }

  const blocks = splitTopLevelSections(normalized);
  let profile = null;
  let website = null;
  const notes = {};
  const titleIndex = buildTitleIndex(sections);

  for (const block of blocks) {
    const heading = block.heading.trim();
    if (heading === "About the Business") {
      profile = parseAboutBlock(block.body);
      continue;
    }
    if (heading === "Website") {
      website = parseWebsiteBlock(block.body);
      continue;
    }
    if (NON_SECTION_HEADINGS.has(heading)) continue;
    const sectionId = titleIndex.get(heading.toLowerCase());
    if (!sectionId) continue;
    const { final, notes: freeform } = parseSectionBody(block.body);
    if (final || freeform) {
      notes[sectionId] = { final, notes: freeform };
    }
  }
  return { profile, website, notes };
}

function restoreFromMarkdown(text, sections) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    throw new Error("Restore is missing the section index. (This is a bug — please report it.)");
  }
  const parsed = parseMarkdownBrief(text, sections);
  if (!parsed.profile && Object.keys(parsed.notes).length === 0) {
    throw new Error("Couldn't find any restorable content in that file.");
  }
  let restoredKeys = 0;
  if (parsed.profile) {
    window.localStorage.setItem("cod-sw-profile", JSON.stringify(parsed.profile));
    restoredKeys++;
  }
  if (parsed.website) {
    window.localStorage.setItem("cod-sw-website", JSON.stringify(parsed.website));
    restoredKeys++;
  }
  if (Object.keys(parsed.notes).length > 0) {
    window.localStorage.setItem("cod-sw-notes", JSON.stringify(parsed.notes));
    restoredKeys++;
  }
  return {
    restoredKeys,
    exportedAt: null,
    format: "md",
    sectionsRestored: Object.keys(parsed.notes).length,
  };
}
