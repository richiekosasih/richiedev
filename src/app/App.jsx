import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { PreloaderProvider } from './providers/PreloaderProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <PreloaderProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      <Analytics />
      <SpeedInsights />
    </PreloaderProvider>
  );
}

export default App;
