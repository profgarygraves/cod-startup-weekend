import { useState } from "react";
import { buildWorkbook, suggestedFilename, downloadWorkbook } from "../lib/export";

export default function ExportWorkbook({ profile, website, notes, plan, sections }) {
  const [justDownloaded, setJustDownloaded] = useState(false);

  const handleDownload = () => {
    const content = buildWorkbook({ profile, website, notes, plan, sections });
    downloadWorkbook(content, suggestedFilename(profile));
    setJustDownloaded(true);
    setTimeout(() => setJustDownloaded(false), 2500);
  };

  const handlePreview = () => {
    const content = buildWorkbook({ profile, website, notes, plan, sections });
    const win = window.open("", "_blank");
    if (!win) return;
    const safe = content.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
    win.document.write(
      `<!doctype html><meta charset="utf-8"><title>Workbook preview</title>` +
        `<style>body{font:14px ui-monospace,Menlo,monospace;background:#0f0a0a;color:#f5f0f0;padding:2rem;max-width:800px;margin:0 auto;line-height:1.55}</style>` +
        `<pre>${safe}</pre>`
    );
    win.document.close();
  };

  const sectionsWithFinal = sections.filter((s) => {
    const v = notes && notes[s.id];
    if (!v) return false;
    if (typeof v === "string") return v.trim().length > 0;
    return typeof v.final === "string" && v.final.trim().length > 0;
  }).length;

  return (
    <div className="export-bar">
      <div className="export-bar__info">
        <strong>📥 Download your Custom GPT brief</strong>
        <p>
          A single markdown file with your business facts and FINAL outputs ({sectionsWithFinal}/{sections.length} sections captured). Paste it as the system instructions for a Custom GPT or as a knowledge file in a Project — the GPT will then know everything about your business.
        </p>
      </div>
      <div className="export-bar__actions">
        <button className="export-bar__btn export-bar__btn--secondary" onClick={handlePreview}>
          👁️ Preview
        </button>
        <button className="export-bar__btn" onClick={handleDownload}>
          {justDownloaded ? "✓ Downloaded!" : "⬇ Download .md"}
        </button>
      </div>
    </div>
  );
}
