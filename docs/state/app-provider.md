# App Provider (`app-provider.tsx`)

## Overview

The `AppProvider` component is the central piece for managing and distributing the global application state using React's Context API and `useReducer` hook. It wraps the application (or relevant parts) and makes the `AppState` and the `dispatch` function available to all descendant components via the `AppContext`.

## Installation

This component is part of the core application state management. No separate installation is needed. Import it into your main application file (e.g., `src/main.tsx`).

```typescript
import { AppProvider } from './state/app-provider';
```

## Core Concepts

-   **State Initialization**: Uses the `useReducer` hook with the `appReducer` and `initialState` imported from `app-reducer.ts` to create the state management logic.
-   **Context Provision**: Utilizes `AppContext.Provider` to pass down the current `state` and the `dispatch` function to consuming components.
-   **Memoization**: Employs `useMemo` to memoize the context value (`{ state, dispatch }`). This prevents unnecessary re-renders of components consuming the context if the `AppProvider` itself re-renders but the state and dispatch references haven't changed.

## API Reference

### Component: `AppProvider`

The main provider component.

Props:

-   `children` (`ReactNode`): The child components that will be wrapped by the provider and gain access to the application context.

## Usage Examples

Typically, `AppProvider` wraps the main `App` component within `src/main.tsx`.

```typescript
// src/main.tsx (Simplified)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';
import { theme } from './theme.ts';
import { AppProvider } from './state/app-provider'; // Import the provider

// Import global styles...
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {/* AppProvider wraps the main App component */}
      <AppProvider>
        <App />
      </AppProvider>
    </MantineProvider>
  </StrictMode>,
);
```

## Best Practices

-   Place `AppProvider` high up in the component tree, typically wrapping the entire application or the parts that require access to the global state.
-   Ensure `AppProvider` itself is rendered within other necessary providers, like `MantineProvider`.
-   The use of `useMemo` for the context value is a standard optimization for context providers.

## Troubleshooting

-   **Components not receiving context updates**:
    -   Verify that the component consuming the context (using `useAppContext`) is indeed a descendant of `AppProvider`.
    -   Check if the `appReducer` is correctly updating the state immutably. Mutations to the state object might not trigger re-renders in consumers.
    -   Ensure there isn't another `AppContext.Provider` nested deeper in the tree overriding the intended context value.
-   **Performance issues**: While `useMemo` helps, if the global state becomes very large or updates extremely frequently, consider splitting the context or optimizing the reducer/actions.

## Related Modules

-   `src/state/app-context.ts`: Defines the `AppContext` that this component provides.
-   `src/state/app-reducer.ts`: Provides the `appReducer` and `initialState` used by `useReducer` within this component.
-   `src/state/app-state.ts`: Defines the `AppState` and `AppAction` types.
-   `src/main.tsx`: Where `AppProvider` is typically used to wrap the application.

## Changelog

-   **2025-04-22**: Initial implementation of the `AppProvider` component.