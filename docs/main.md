# Main Module (`main.tsx`)

## Overview

This module serves as the main entry point for the Notez application. It is responsible for initializing the React application, setting up the root Mantine provider with the application theme and global settings (like dark mode), importing global styles, and rendering the main `App` component into the DOM.

## Installation

This module is part of the core application structure and does not require separate installation. Ensure all project dependencies listed in `package.json` are installed using `bun install`.

## Core Concepts

-   **React Root Initialization**: Uses `react-dom/client`'s `createRoot` to render the application into the HTML element with the ID `root`.
-   **Strict Mode**: Wraps the application in `React.StrictMode` to highlight potential problems during development.
-   **Mantine Provider**: Wraps the entire application with `MantineProvider` from `@mantine/core`. This provides the theme context (including CSS variables and color scheme management) to all descendant components, including the main `App` component.
-   **Theme Configuration**: Imports a custom theme configuration from `src/theme.ts` and applies it globally via `MantineProvider`.
-   **Default Color Scheme**: Sets the `defaultColorScheme` prop on `MantineProvider` to `'dark'`, enforcing the dark theme requirement.
-   **Global Styles**: Imports necessary global CSS files (`@mantine/core/styles.css`, `@mantine/notifications/styles.css`) required for Mantine components to function correctly. These styles are imported here to ensure they are loaded before any application components.

## API Reference

This module primarily executes setup logic and does not export any functions or components for external use.

## Usage Examples

The module is executed when the application starts.

```typescript
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'; // Import the main App component
import { theme } from './theme.ts'; // Import the custom theme

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
    {/* MantineProvider wraps the entire App */}
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App /> {/* Render the main App layout */}
    </MantineProvider>
  </StrictMode>,
);
```

## Best Practices

-   Keep `main.tsx` focused solely on application initialization, global provider setup (like `MantineProvider`), and global style imports.
-   Import global styles required by libraries (like Mantine) here, ensuring they load before component styles.
-   Define the application theme in a separate file (`src/theme.ts`) for better organization and maintainability.
-   Ensure the root HTML element (`<div id="root"></div>` in `index.html`) exists.

## Troubleshooting

-   **"Could not find root element with id 'root'"**: Ensure your `index.html` file contains an element with `id="root"`.
-   **Mantine components appear unstyled**: Verify that `@mantine/core/styles.css` (and other necessary library styles like `@mantine/notifications/styles.css`) are imported in `main.tsx`.
-   **Theme overrides not working**: Check that the `theme` object is correctly passed to the `MantineProvider` and that the theme definition in `src/theme.ts` is correct.
-   **Color scheme issues (flickering/wrong default)**: Ensure `defaultColorScheme="dark"` is set on `MantineProvider`. Also, verify the pre-hydration script in `index.html` correctly sets the initial `data-mantine-color-scheme` attribute.

## Related Modules

-   `src/App.tsx`: The root component containing the application's layout structure (`AppShell`).
-   `src/theme.ts`: Contains the Mantine theme configuration.
-   `index.html`: The main HTML file where the React application is mounted and the initial color scheme script resides.

## Changelog

-   **2025-04-22**: Documentation updated to reflect the refactored `App.tsx` structure and clarify the role of `main.tsx` in global setup.
-   **Previous**: Refactored to centralize `MantineProvider` and theme setup. Moved global style imports here. Introduced `theme.ts`.