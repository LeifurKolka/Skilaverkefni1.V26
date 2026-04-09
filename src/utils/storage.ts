import type { ZodSchema } from "zod";

export function loadFromStorage<T>(
  key: string,
  schema: ZodSchema<T>,
  fallback: T
): T {
  const raw = localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw);
    return schema.parse(parsed);
  } catch (error) {
    console.error(`Failed to load "${key}" from localStorage:`, error);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}