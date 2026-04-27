export const STORAGE_KEYS = ["cod-sw-profile", "cod-sw-statuses", "cod-sw-website"];
const APP_TAG = "cod-startup-weekend";

export function isStorageAvailable() {
  try {
    const k = "__cod_storage_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function buildBackup() {
  const data = {};
  for (const key of STORAGE_KEYS) {
    const raw = window.localStorage.getItem(key);
    if (raw == null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = null;
    }
  }
  return {
    app: APP_TAG,
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function backupFilename(profile) {
  const base = slugify(profile?.teamName) || slugify(profile?.ideaName) || "team";
  const today = new Date().toISOString().slice(0, 10);
  return `cod-sw-backup-${base}-${today}.json`;
}

export function downloadBackup(filename) {
  const json = JSON.stringify(buildBackup(), null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function restoreBackupFromFile(file) {
  const text = await file.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("That file isn't valid JSON. Make sure you picked a .json backup file.");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("That doesn't look like a COD backup file.");
  }
  if (parsed.app !== APP_TAG) {
    throw new Error(`Wrong app tag: expected "${APP_TAG}", got "${parsed.app || "missing"}".`);
  }
  if (!parsed.data || typeof parsed.data !== "object") {
    throw new Error("Backup file is missing its data section.");
  }
  let restoredKeys = 0;
  for (const key of STORAGE_KEYS) {
    if (key in parsed.data) {
      window.localStorage.setItem(key, JSON.stringify(parsed.data[key]));
      restoredKeys++;
    }
  }
  return {
    restoredKeys,
    exportedAt: parsed.exportedAt,
  };
}
