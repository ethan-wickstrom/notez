/**
 * Entry point for the React application.
 * Responsible for setting up the root element and rendering the App to the DOM.
 * Included in `src/index.html`.
 */

// React core imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Application imports
import { App } from "@/app";
import { theme } from "@/providers/theme";

// Mantine UI imports
import { MantineProvider } from "@mantine/core";

// Mantine styles
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";

/**
 * Finds and returns the root DOM element, throws if not found
 */
const getRootElement = (): HTMLElement => {
  const element = document.getElementById("root");

  if (!element) {
    throw new Error("Root element #root not found");
  }

  return element;
};

/**
 * Creates the React application with all required providers
 */
const createApp = () => (
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);

/**
 * Renders the application to the DOM
 */
const renderApp = () => {
  const rootElement = getRootElement();
  const app = createApp();

  // Handle hot module reloading in development
  if (import.meta.hot) {
    // Reuse existing root if available from hot data
    if (!import.meta.hot.data.root) {
      import.meta.hot.data.root = createRoot(rootElement);
    }
    import.meta.hot.data.root.render(app);
  } else {
    // Standard rendering for production
    createRoot(rootElement).render(app);
  }
};

// Initialize the application
renderApp();
