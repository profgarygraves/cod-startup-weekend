import { useState } from "react";
import { broadcastStorageRefresh } from "../lib/storage";

export default function RefreshPromptsButton() {
  const [flashing, setFlashing] = useState(false);

  const handleClick = () => {
    broadcastStorageRefresh();
    setFlashing(true);
    setTimeout(() => setFlashing(false), 1500);
  };

  return (
    <button
      type="button"
      className={`refresh-prompts-btn ${flashing ? "refresh-prompts-btn--flashing" : ""}`}
      onClick={handleClick}
      title="Re-read your saved profile and update every prompt on the page"
    >
      {flashing ? "✓ Prompts updated" : "🔄 Refresh prompts"}
    </button>
  );
}
