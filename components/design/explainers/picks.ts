'use client';

import { useSyncExternalStore } from 'react';

export const FREE_MAX = 15;
export const MIN_PICKS = 3;

const KEY = 'nudgeable-explainer-picks';
const listeners = new Set<() => void>();

function read() {
  try {
    return localStorage.getItem(KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) listener();
  };
  addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    removeEventListener('storage', onStorage);
  };
}

let lastRaw = '';
let lastValue: string[] = [];

function parse(raw: string) {
  if (raw === lastRaw) return lastValue;
  lastRaw = raw;
  try {
    const value: unknown = JSON.parse(raw);
    lastValue = Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    lastValue = [];
  }
  return lastValue;
}

export function savePicks(next: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Blocked storage just means the picks aren't remembered.
  }
  listeners.forEach(listener => listener());
}

// Picks shared by every explainer section on the page, remembered in this browser
export function usePicks() {
  return parse(useSyncExternalStore(subscribe, read, () => '[]'));
}
