import { useRef, useState } from "react";
import { restoreBackupFromFile } from "../lib/backup";

// Reusable restore-from-file button. Renders its own hidden file input,
// handles JSON/.md auto-detect, confirm dialog, status flash, and reload.
//
// Used in two places:
//   1. BackupActions (in the "Save & restore" card)
//   2. VentureProfile (a "Returning?" callout when the profile is empty)
export default function RestoreButton({ sections, label = "📂 Restore from file", className = "backup-bar__btn backup-bar__btn--secondary" }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState(null);

  // Success messages auto-dismiss; errors stick around so the user can read
  // and copy them.
  const flash = (message, kind = "ok") => {
    setStatus({ message, kind });
    if (kind === "ok") {
      setTimeout(() => setStatus(null), 4500);
    }
  };

  const dismiss = () => setStatus(null);

  const handleClick = () => {
    dismiss();
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const ok = window.confirm(
      "Restoring will replace your current profile, section work, and website wizard data. Continue?"
    );
    if (!ok) return;

    try {
      const result = await restoreBackupFromFile(file, sections);
      const ts = result.exportedAt ? ` (saved ${new Date(result.exportedAt).toLocaleString()})` : "";
      const fmt = result.format === "md" ? "GPT brief (.md)" : "backup (.json)";
      const sec = result.sectionsRestored
        ? ` · ${result.sectionsRestored} section${result.sectionsRestored === 1 ? "" : "s"} of work`
        : "";
      flash(`✓ Restored from ${fmt}${ts}${sec}. Reloading…`);
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      flash(`Couldn't restore: ${err.message}`, "error");
      // Also log to console so the user can copy from devtools
      console.error("[COD restore] failed for file:", file?.name, err);
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {label}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        // Extensions only — MIME-type accepts are flaky across browsers
        // (some block .md when the OS doesn't have a registered MIME for it).
        // Content-sniffing in lib/backup.js does the real validation.
        accept=".json,.md,.markdown,.txt"
        onChange={handleFileSelected}
        style={{ display: "none" }}
      />
      {status && (
        <div className={`backup-bar__status backup-bar__status--${status.kind}`}>
          {status.message}
          {status.kind === "error" && (
            <button
              type="button"
              onClick={dismiss}
              style={{
                marginLeft: "0.5rem",
                background: "transparent",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                fontSize: "0.85rem",
                opacity: 0.7,
              }}
              aria-label="Dismiss error"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </>
  );
}
