import { useEffect } from 'react';

type ShortcutHandler = (event: KeyboardEvent) => void;

interface ShortcutMap {
  [key: string]: ShortcutHandler;
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (shortcuts[key] && !event.repeat) {
        shortcuts[key](event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}