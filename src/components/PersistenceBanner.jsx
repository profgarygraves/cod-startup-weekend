import { useState } from "react";
import { isStorageAvailable } from "../lib/backup";

const DISMISS_KEY = "cod-sw-banner-dismissed";

export default function PersistenceBanner() {
  const storageOk = isStorageAvailable();

  const [dismissed, setDismissed] = useState(() => {
    if (!storageOk) return false;
    try {
      return window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });

  if (!storageOk) {
    return (
      <div className="banner banner--warning" role="alert">
        <div className="banner__body">
          <strong>⚠️ Your browser isn't saving your work.</strong>
          <p>
            This usually means private/incognito mode or blocked site storage.
            Switch to a regular browser window — otherwise everything you enter
            will disappear when you refresh or close the tab.
          </p>
        </div>
      </div>
    );
  }

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="banner banner--info">
      <div className="banner__body">
        <strong>💡 Your work auto-saves in this browser.</strong>
        <p>
          Use the same browser and device throughout the weekend. To be safe,
          click <strong>💾 Save Backup</strong> below — you'll get a small file
          you can email to yourself or restore on any device.
        </p>
      </div>
      <button className="banner__dismiss" onClick={handleDismiss}>
        Got it
      </button>
    </div>
  );
}
