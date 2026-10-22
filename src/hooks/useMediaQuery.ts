import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True only for a real mouse/trackpad: enables cursor light, parallax, tilt and magnetic effects. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

export function useReducedMotionPref(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Pointer effects run only with a fine pointer and no reduced-motion preference. */
export function usePointerEffects(): boolean {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  return fine && !reduced;
}
