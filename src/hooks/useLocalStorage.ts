import { useEffect, useState } from "react";
import type { ZodSchema } from "zod";

export function useLocalStorage<T>(
  key: string,
  schema: ZodSchema<T>,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return initialValue;
    }

    try {
      const parsed = JSON.parse(raw);
      return schema.parse(parsed);
    } catch (error) {
      console.error(`Failed to parse localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}