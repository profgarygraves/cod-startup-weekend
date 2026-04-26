import { useState } from "react";
import { buildWorkbook, suggestedFilename, downloadWorkbook } from "../lib/export";

export default function ExportWorkbook({ profile, statuses, website, sections }) {
  const [justDownloaded, setJustDownloaded] = useState(false);

  const handleDownload = () => {
    const content = buildWorkbook({ profile, statuses, website, sections });
    downloadWorkbook(content, suggestedFilename(profile));
    setJustDownloaded(true);
    setTimeout(() => setJustDownloaded(false), 2500);
  };

  const handlePreview = () => {
    const content = buildWorkbook({ profile, statuses, website, sections });
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

  const completed = sections.filter((s) => statuses[s.id] === "complete").length;

  return (
    <div className="export-bar">
      <div className="export-bar__info">
        <strong>📥 Download your team workbook</strong>
        <p>
          One markdown file with your venture profile, progress ({completed}/{sections.length} sections complete), and website spec — perfect for handing in or sharing with your team.
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
