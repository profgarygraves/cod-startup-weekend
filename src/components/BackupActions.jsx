import { useRef, useState } from "react";
import { backupFilename, downloadBackup, restoreBackupFromFile } from "../lib/backup";

export default function BackupActions({ profile }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState(null);

  const flash = (message, kind = "ok") => {
    setStatus({ message, kind });
    setTimeout(() => setStatus(null), 4000);
  };

  const handleSave = () => {
    try {
      downloadBackup(backupFilename(profile));
      flash("✓ Backup downloaded — keep that file safe!");
    } catch (err) {
      flash(`Couldn't save backup: ${err.message}`, "error");
    }
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file later
    if (!file) return;

    const ok = window.confirm(
      "Restoring from a backup will replace your current profile, progress, and website wizard data. Continue?"
    );
    if (!ok) return;

    try {
      const result = await restoreBackupFromFile(file);
      const ts = result.exportedAt ? ` (saved ${new Date(result.exportedAt).toLocaleString()})` : "";
      flash(`✓ Restored ${result.restoredKeys} section${result.restoredKeys === 1 ? "" : "s"}${ts}. Reloading…`);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      flash(`Couldn't restore: ${err.message}`, "error");
    }
  };

  return (
    <div className="backup-bar">
      <div className="backup-bar__info">
        <strong>💾 Save & restore your work</strong>
        <p>
          Download a backup file you can email to yourself or restore later on any device.
          Use this if you're worried about losing your work between sessions.
        </p>
      </div>
      <div className="backup-bar__actions">
        <button className="backup-bar__btn" onClick={handleSave}>
          💾 Save Backup
        </button>
        <button className="backup-bar__btn backup-bar__btn--secondary" onClick={handleRestoreClick}>
          📂 Restore Backup
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFileSelected}
          style={{ display: "none" }}
        />
      </div>
      {status && (
        <div className={`backup-bar__status backup-bar__status--${status.kind}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
