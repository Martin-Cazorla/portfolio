"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useState que se guarda en localStorage, así la demo recuerda lo que cargaste.
 * Arranca con el valor inicial (igual en servidor y cliente) y recién después de
 * montar lee lo guardado, para evitar errores de hidratación.
 */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* storage bloqueado: seguimos en memoria */
    }
    loaded.current = true;
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignorar */
    }
  }, [key, value]);

  return [value, setValue, ready] as const;
}
