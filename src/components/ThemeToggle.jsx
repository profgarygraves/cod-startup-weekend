import { useState } from "react";
import { applyTheme, getInitialTheme, persistTheme } from "../lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  const handleToggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    persistTheme(next);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark" : "Switch to light"}
    >
      {isLight ? "🌙" : "☀️"}
    </button>
  );
}
