const STATUS_GLYPH = {
  "not-started": "⭕",
  "in-progress": "🔄",
  complete: "✅",
};

const STATUS_LABEL = {
  "not-started": "Not started",
  "in-progress": "In progress",
  complete: "Complete",
};

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

function blank(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "_(blank)_";
}

function asList(text) {
  if (!text || !text.trim()) return "_(blank)_";
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith("•") || l.startsWith("-") ? l : `• ${l}`))
    .join("\n");
}

export function buildWorkbook({ profile, statuses, website, notes, sections }) {
  const today = new Date().toISOString().slice(0, 10);
  const teamLine = profile.teamName ? `**Team:** ${profile.teamName}` : "";
  const memberLine = profile.members ? `**Members:** ${profile.members}` : "";

  const completed = sections.filter((s) => statuses[s.id] === "complete").length;
  const inProgress = sections.filter((s) => statuses[s.id] === "in-progress").length;

  const lines = [];
  lines.push(`# COD AI Startup Weekend — Team Workbook`);
  lines.push("");
  if (teamLine) lines.push(teamLine);
  if (memberLine) lines.push(memberLine);
  lines.push(`**Exported:** ${today}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push(`## Venture Profile`);
  lines.push("");
  lines.push(`- **Venture type:** ${VENTURE_TYPE_LABEL[profile.ventureType] || "_(not selected)_"}`);
  lines.push(`- **Starting point:** ${STARTING_POINT_LABEL[profile.startingPoint] || "_(not selected)_"}`);
  const scopeLabel = MARKET_AREA_SCOPE_LABEL[profile.marketAreaScope];
  const areaText = (profile.marketArea || "").trim();
  const marketAreaLine = scopeLabel && areaText
    ? `${areaText} — ${scopeLabel}`
    : areaText || scopeLabel || "_(not selected)_";
  lines.push(`- **Market area:** ${marketAreaLine}`);
  lines.push(`- **Idea name:** ${blank(profile.ideaName)}`);
  lines.push(`- **What it is:** ${blank(profile.description)}`);
  lines.push(`- **Problem we solve:** ${blank(profile.problem)}`);
  lines.push(`- **Target customer:** ${blank(profile.audience)}`);
  lines.push(`- **Core offer:** ${blank(profile.offer)}`);
  lines.push(`- **Price:** ${blank(profile.price)}`);
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push(`## Progress`);
  lines.push("");
  lines.push(`**${completed} of ${sections.length} sections complete** · ${inProgress} in progress`);
  lines.push("");
  for (const s of sections) {
    const status = statuses[s.id] || "not-started";
    lines.push(`- ${STATUS_GLYPH[status]} **Section ${s.number}** — ${s.title} _(${STATUS_LABEL[status]})_`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  lines.push(`## Section Detail`);
  lines.push("");
  for (const s of sections) {
    const status = statuses[s.id] || "not-started";
    lines.push(`### Section ${s.number} — ${s.title}`);
    lines.push("");
    lines.push(`- **Status:** ${STATUS_GLYPH[status]} ${STATUS_LABEL[status]}`);
    if (s.suggestedTime) lines.push(`- **Suggested timing:** ${s.suggestedTime}`);
    if (s.whatWereDoing) lines.push(`- **What we're doing:** ${s.whatWereDoing}`);
    if (s.whyItMatters) lines.push(`- **Why it matters:** ${s.whyItMatters}`);
    lines.push("");
    lines.push(`**Tasks**`);
    const taskLabels = (s.taskPrompts || []).map((tp) => tp.task);
    if (taskLabels.length === 0 && Array.isArray(s.tasks)) {
      s.tasks.forEach((t) => lines.push(`- [${status === "complete" ? "x" : " "}] ${t}`));
    } else {
      taskLabels.forEach((t) => lines.push(`- [${status === "complete" ? "x" : " "}] ${t}`));
    }
    lines.push("");
    lines.push(`**Deliverables**`);
    s.deliverables.forEach((d) => lines.push(`- ${d}`));
    lines.push("");

    const sectionNote = (notes && notes[s.id] && notes[s.id].trim()) || "";
    lines.push(`**Notebook**`);
    if (sectionNote) {
      sectionNote.split("\n").forEach((line) => lines.push(`> ${line}`));
    } else {
      lines.push(`> _(empty — capture decisions, AI output, or links here next time)_`);
    }
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  lines.push(`## Website (Section 6)`);
  lines.push("");
  if (website && (website.headline || website.subheadline || website.publishedUrl)) {
    lines.push(`- **Headline:** ${blank(website.headline)}`);
    lines.push(`- **Subheadline:** ${blank(website.subheadline)}`);
    lines.push(`- **Hero visual idea:** ${blank(website.heroVisual)}`);
    lines.push(`- **Primary CTA:** ${blank(website.ctaText)}`);
    lines.push(`- **Offer headline:** ${blank(website.offerHeadline)}`);
    lines.push(`- **Offer benefits:**`);
    lines.push(asList(website.offerBullets));
    lines.push(`- **Founder name:** ${blank(website.founderName)}`);
    lines.push(`- **Founder bio:** ${blank(website.founderBio)}`);
    lines.push(`- **Form type:** ${blank(website.formType)}`);
    if (website.publishedUrl) {
      lines.push("");
      lines.push(`🟢 **Published at:** ${website.publishedUrl}`);
    }
  } else {
    lines.push(`_Website Builder Wizard not started yet. Open Section 6 to begin._`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`_Generated by the COD AI Startup Weekend tool. Re-export anytime to capture your latest progress._`);
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
  const base = slugify(profile.teamName) || slugify(profile.ideaName) || "team";
  return `cod-startup-workbook-${base}-${today}.md`;
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
