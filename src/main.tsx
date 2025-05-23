import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';
import { theme } from './theme';
import { AppProvider } from './state/app-provider'; // Import the AppProvider
import { ModalsProvider } from '@mantine/modals'; // Import ModalsProvider

// Import Mantine core styles - should be imported once at the root
import '@mantine/core/styles.css';
// Import other global styles if needed (e.g., notifications)
import '@mantine/notifications/styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element with id 'root'");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
);