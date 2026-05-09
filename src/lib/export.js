const VENTURE_TYPE_LABEL = {
  service: "Service business",
  product: "Physical product",
  digital: "Digital product / app / SaaS",
  combination: "Combination",
};

const STARTING_POINT_LABEL = {
  "no-idea": "No idea yet — brainstorming",
  "rough-idea": "Rough idea — sharpening",
  "clear-idea": "Clear idea — validating and building",
};

const MARKET_AREA_SCOPE_LABEL = {
  online: "Online-only / global",
  hyperlocal: "Hyperlocal (single neighborhood or campus)",
  city: "City / town",
  regional: "Regional (county or metro area)",
  state: "Statewide",
  national: "National",
  international: "International",
};

function trimOrNull(value) {
  if (typeof value !== "string") return null;
  const t = value.trim();
  return t || null;
}

// Indent each line of a multi-line string by 2 spaces so it nests cleanly
// under a Markdown bullet without breaking the list.
function indentBlock(text, prefix = "  ") {
  return text
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

// Notes were once a flat string per section. They're now { final, notes }.
// Treat any legacy string value as freeform notes so older saves still export.
function readNote(value) {
  if (typeof value === "string") return { final: "", notes: value };
  if (value && typeof value === "object") {
    return { final: value.final || "", notes: value.notes || "" };
  }
  return { final: "", notes: "" };
}

function pushKeyValue(lines, label, value) {
  const v = trimOrNull(value);
  if (!v) return;
  if (v.includes("\n")) {
    lines.push(`- **${label}:**`);
    lines.push(indentBlock(v));
  } else {
    lines.push(`- **${label}:** ${v}`);
  }
}

export function buildWorkbook({ profile, website, notes, sections }) {
  const today = new Date().toISOString().slice(0, 10);
  const businessName = trimOrNull(profile.ideaName) || trimOrNull(profile.teamName) || "My Business";

  const lines = [];

  // Version marker for the .md restore parser. Hidden in rendered Markdown
  // but readable when the file is fed back into the app to rehydrate state.
  lines.push(`<!-- cod-sw-md-version: 1 -->`);
  lines.push("");
  lines.push(`# ${businessName} — Custom GPT Brief`);
  lines.push("");
  lines.push(
    `This document is a complete brief about my business. Use it as the system instructions for a custom GPT (or as a knowledge file in a Project). The GPT should treat every fact below as authoritative.`
  );
  lines.push("");
  lines.push(
    `**Returning to the COD Startup Weekend tool?** Drop this file into the **📂 Restore Backup** button to refill your venture profile and section work — no need to re-type Day 1.`
  );
  lines.push("");
  lines.push(`_Exported ${today} from the COD AI Startup Weekend tool._`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // === About the business ===
  lines.push(`## About the Business`);
  lines.push("");
  pushKeyValue(lines, "Business name", profile.ideaName);
  pushKeyValue(lines, "What it is", profile.description);
  if (profile.ventureType) {
    pushKeyValue(lines, "Venture type", VENTURE_TYPE_LABEL[profile.ventureType]);
  }
  const scopeLabel = MARKET_AREA_SCOPE_LABEL[profile.marketAreaScope];
  const areaText = trimOrNull(profile.marketArea);
  const market = scopeLabel && areaText ? `${areaText} — ${scopeLabel}` : areaText || scopeLabel;
  pushKeyValue(lines, "Market", market);
  pushKeyValue(lines, "Problem we solve", profile.problem);
  pushKeyValue(lines, "Target customer", profile.audience);
  pushKeyValue(lines, "Core offer / value proposition", profile.offer);
  pushKeyValue(lines, "Pricing options", profile.price);
  pushKeyValue(lines, "Visual prototype notes", profile.visualPrototypeNotes);
  if (profile.startingPoint) {
    pushKeyValue(lines, "Starting point", STARTING_POINT_LABEL[profile.startingPoint]);
  }
  pushKeyValue(lines, "Team", profile.teamName);
  pushKeyValue(lines, "Members", profile.members);
  lines.push("");
  lines.push("---");
  lines.push("");

  // === FINAL outputs from each section ===
  let anySection = false;
  for (const s of sections) {
    const note = readNote(notes && notes[s.id]);
    const final = trimOrNull(note.final);
    const freeform = trimOrNull(note.notes);
    if (!final && !freeform) continue;
    anySection = true;
    lines.push(`## ${s.title}`);
    lines.push("");
    if (final) {
      lines.push(final);
      lines.push("");
    }
    if (freeform) {
      lines.push(`_Founder's notes:_`);
      lines.push("");
      lines.push(freeform);
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }
  if (!anySection) {
    lines.push(
      `_(No section work captured yet. Run the "📋 Create your FINAL ..." prompt at the bottom of each section, then paste the AI's reply into that section's Final output box. Re-export to fill in this brief.)_`
    );
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // === Website wizard output (only if filled) ===
  if (website && (website.headline || website.subheadline || website.publishedUrl || website.offerHeadline)) {
    lines.push(`## Website`);
    lines.push("");
    pushKeyValue(lines, "Headline", website.headline);
    pushKeyValue(lines, "Subheadline", website.subheadline);
    pushKeyValue(lines, "Hero visual idea", website.heroVisual);
    pushKeyValue(lines, "Primary CTA", website.ctaText);
    pushKeyValue(lines, "Offer headline", website.offerHeadline);
    pushKeyValue(lines, "Offer benefits", website.offerBullets);
    pushKeyValue(lines, "Founder name", website.founderName);
    pushKeyValue(lines, "Founder bio", website.founderBio);
    pushKeyValue(lines, "Form type", website.formType);
    pushKeyValue(lines, "Published at", website.publishedUrl);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // === Operating instructions for the GPT ===
  lines.push(`## Operating Instructions for the GPT`);
  lines.push("");
  lines.push(`You are an AI co-founder for the business described above. Follow these rules in every response:`);
  lines.push("");
  lines.push(`1. **Ground answers in this brief.** Treat the facts above as authoritative. Do not invent details about the business, customer, pricing, or offer.`);
  lines.push(`2. **Ask when something is missing.** If a question requires information that isn't in this brief, ask me to provide it instead of guessing.`);
  lines.push(`3. **Stay on-brand.** When generating copy, posts, scripts, or pitches, match the brand voice, positioning, and pricing options exactly as specified.`);
  lines.push(`4. **Be specific.** Reference the actual customer, problem, and offer described — generic startup advice is not useful here.`);
  lines.push(`5. **Push back when needed.** If I ask for something that contradicts the strategy above (e.g. a different price, a different customer), flag the conflict before just complying.`);
  lines.push("");
  lines.push(`When in doubt, re-read the sections above. They are the canonical record of this business.`);
  lines.push("");
  lines.push(`_End of brief._`);
  lines.push("");

  return lines.join("\n");
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function suggestedFilename(profile) {
  const today = new Date().toISOString().slice(0, 10);
  const base = slugify(profile.ideaName) || slugify(profile.teamName) || "team";
  return `${base}-gpt-brief-${today}.md`;
}

export function downloadWorkbook(content, filename) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
