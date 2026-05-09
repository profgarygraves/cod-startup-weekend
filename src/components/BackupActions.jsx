import { useState } from "react";
import { backupFilename, downloadBackup } from "../lib/backup";
import RestoreButton from "./RestoreButton";

export default function BackupActions({ profile, sections }) {
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

  return (
    <div className="backup-bar">
      <div className="backup-bar__info">
        <strong>💾 Save & restore your work</strong>
        <p>
          Download a backup file you can email to yourself or restore later on any device.
          You can restore from your <strong>.json backup</strong> or the <strong>.md GPT brief</strong> you downloaded — either one works.
        </p>
      </div>
      <div className="backup-bar__actions">
        <button className="backup-bar__btn" onClick={handleSave}>
          💾 Save Backup
        </button>
        <RestoreButton sections={sections} label="📂 Restore Backup" />
      </div>
      {status && (
        <div className={`backup-bar__status backup-bar__status--${status.kind}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
