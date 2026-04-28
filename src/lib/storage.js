import { useEffect, useRef, useState } from "react";

function readFromStorage(key, initial) {
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
}

export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => readFromStorage(key, initial));
  const lastWrittenRef = useRef();

  useEffect(() => {
    try {
      const serialized = JSON.stringify(value);
      lastWrittenRef.current = serialized;
      window.localStorage.setItem(key, serialized);
    } catch {
      // quota exceeded or storage disabled — silently ignore
    }
  }, [key, value]);

  // Cross-tab sync: when another tab writes the same key, pull the change
  // into this tab. Also responds to the custom "cod-sw-storage-sync" event
  // dispatched by the Refresh Prompts button so we re-pull manually.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key && e.key !== key) return;
      // Skip if our own write (storage events don't fire for the writer,
      // but defensive guard for edge cases).
      const next = readFromStorage(key, initial);
      const serialized = (() => {
        try { return JSON.stringify(next); } catch { return null; }
      })();
      if (serialized && serialized === lastWrittenRef.current) return;
      setValue(next);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("cod-sw-storage-sync", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cod-sw-storage-sync", onStorage);
    };
    // We intentionally only register once per key; the initial fallback is
    // captured at mount and doesn't need to be a dep.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}

export function broadcastStorageRefresh() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("cod-sw-storage-sync"));
}
