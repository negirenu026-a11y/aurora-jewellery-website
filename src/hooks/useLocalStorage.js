import { useState, useCallback, useRef } from 'react';

const NAMESPACE = 'aurea';
const VERSION = 1;

/** Build namespaced key: "aurea:v1:keyName" */
const nsKey = (key) => `${NAMESPACE}:v${VERSION}:${key}`;

/**
 * Reusable localStorage hook with JSON serialisation.
 * Falls back to in-memory state if storage is unavailable or corrupt.
 * Every read/write is wrapped in try/catch.
 */
export default function useLocalStorage(key, initialValue) {
  const storageKey = nsKey(key);
  const memoryFallback = useRef(null);

  const readStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) return JSON.parse(raw);
    } catch {
      /* storage unavailable or parse error — fall through */
    }
    return memoryFallback.current ?? initialValue;
  }, [storageKey, initialValue]);

  const [value, setValue] = useState(readStorage);

  const set = useCallback(
    (updater) => {
      setValue((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        memoryFallback.current = next;
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* quota exceeded or private browsing — value lives in state/memory only */
        }
        return next;
      });
    },
    [storageKey],
  );

  /** Remove the key from storage entirely */
  const remove = useCallback(() => {
    try { localStorage.removeItem(storageKey); } catch { /* noop */ }
    memoryFallback.current = initialValue;
    setValue(initialValue);
  }, [storageKey, initialValue]);

  return [value, set, remove];
}

/** Directly read a namespaced key (outside React) */
export function readStorageKey(key) {
  try {
    const raw = localStorage.getItem(nsKey(key));
    return raw !== null ? JSON.parse(raw) : null;
  } catch { return null; }
}

/** Directly write a namespaced key (outside React) */
export function writeStorageKey(key, value) {
  try { localStorage.setItem(nsKey(key), JSON.stringify(value)); } catch { /* noop */ }
}

/** Remove a namespaced key (outside React) */
export function removeStorageKey(key) {
  try { localStorage.removeItem(nsKey(key)); } catch { /* noop */ }
}
