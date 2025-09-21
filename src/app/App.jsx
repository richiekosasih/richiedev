import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { PreloaderProvider } from './providers/PreloaderProvider';

function App() {
  return (
    <PreloaderProvider>
      <RouterProvider router={router} />
    </PreloaderProvider>
  );
}

export default App;
