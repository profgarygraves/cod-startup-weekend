import { useEffect, useState } from "react";

export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initial;
      const parsed = JSON.parse(raw);
      if (
        initial &&
        typeof initial === "object" &&
        !Array.isArray(initial) &&
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return { ...initial, ...parsed };
      }
      return parsed;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded or storage disabled — silently ignore
    }
  }, [key, value]);

  return [value, setValue];
}
