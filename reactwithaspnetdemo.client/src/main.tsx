import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { HeroUIProvider, ToastProvider } from '@heroui/react';

import './index.css';
import { router } from './routes';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement='top-center' />
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>,
);
