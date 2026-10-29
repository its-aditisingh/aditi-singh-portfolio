import { useCallback, useSyncExternalStore } from 'react';
import {
  applyTheme,
  currentTheme,
  readStoredTheme,
  storeTheme,
  watchSystemTheme,
  type Theme,
} from '@/lib/theme';

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Follow the OS setting until the visitor picks a theme explicitly
  const stopWatching = watchSystemTheme((theme) => {
    if (readStoredTheme()) return;
    applyTheme(theme);
    emit();
  });
  return () => {
    listeners.delete(listener);
    stopWatching();
  };
}

const serverSnapshot = (): Theme => 'light';

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme, serverSnapshot);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    storeTheme(next);
    emit();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
