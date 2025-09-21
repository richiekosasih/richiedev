import { createContext, useContext, useState, useMemo } from 'react';
import PreloaderSequence from '@/components/ui/PreloaderSequence';

// Context state: Refreshing the preloader
const PreloaderCtx = createContext(null);

export function PreloaderProvider({ children }) {
  const [ready, setReady] = useState(false);

  const value = useMemo(
    () => ({
      ready,
      restart: () => setReady(false),
      _done: () => setReady(true),
    }),
    [ready]
  );

  return (
    <PreloaderCtx.Provider value={value}>
      {!ready && <PreloaderSequence onDone={value._done} />}
      {children}
    </PreloaderCtx.Provider>
  );
}

export function usePreloader() {
  const ctx = useContext(PreloaderCtx);
  if (!ctx)
    throw new Error('usePreloader must be used within <PreloaderProvider>');
  return ctx;
}
