'use client';

import { useSyncExternalStore } from 'react';

const KEY = 'fernhill-cart';
const listeners = new Set<() => void>();
let memory = 0;

function read(): number {
  try {
    return Number(window.localStorage.getItem(KEY) ?? memory) || 0;
  } catch {
    return memory;
  }
}

export function addToCart(): void {
  memory = read() + 1;
  try {
    window.localStorage.setItem(KEY, String(memory));
  } catch {
    /* storage can be blocked; the in-memory count still works */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCartCount(): number {
  return useSyncExternalStore(subscribe, read, () => 0);
}
