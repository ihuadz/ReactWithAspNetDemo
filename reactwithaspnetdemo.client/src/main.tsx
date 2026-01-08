import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { HeroUIProvider, ToastProvider, cn } from '@heroui/react';

import '@fontsource-variable/inter';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import DifyChatbot from './components/DifyChatbot';
import './index.css';
import { router } from './routes';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
  <StrictMode>
    <div className='font-inter min-h-screen'>
      <HeroUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='light'>
          <ToastProvider
            placement='top-center'
            toastProps={{ classNames: { base: cn('z-[10000]') } }}
          />
          <RouterProvider router={router} />
        </NextThemesProvider>
      </HeroUIProvider>
      <DifyChatbot />
    </div>
  </StrictMode>,
);
