# App Context (`app-context.ts`)

## Overview

This module defines the React Context (`AppContext`) used to provide the global application state (`AppState`) and the `dispatch` function (from the `useReducer` hook) to any component within the application tree. It also exports a custom hook, `useAppContext`, for convenient and type-safe consumption of this context.

## Installation

This module is part of the core application state management. No separate installation is needed. Import the context or hook as needed.

```typescript
// To access the context value directly (less common)
import { AppContext } from './app-context';

// To consume the context value within components (recommended)
import { useAppContext } from './app-context';
```

## Core Concepts

-   **React Context API**: Leverages `createContext` to create a context object (`AppContext`) that holds the application state and dispatch function.
-   **Context Value**: Defines the `AppContextValue` type, specifying the shape of the object passed to the context provider (`{ state: AppState; dispatch: Dispatch<AppAction> }`).
-   **Custom Hook (`useAppContext`)**: Provides a simple and reusable way for components to access the context value. It includes a check to ensure the hook is used within an `AppProvider`, preventing runtime errors.
-   **Default Context Value**: `AppContext` is initialized with a default value (`initialState` and a no-op `dispatch`). This is primarily for type safety and scenarios where the context might be consumed without a Provider (which should be avoided in practice).

## API Reference

### Type: `AppContextValue`

The shape of the value provided by `AppContext.Provider`.

Properties:

-   `state` (`AppState`): The current global application state.
-   `dispatch` (`Dispatch<AppAction>`): The dispatch function obtained from the `useReducer` hook managing the application state.

### Context: `AppContext`

The React context object created using `createContext<AppContextValue>(...)`. Components can consume this context directly using `useContext(AppContext)`, but using the `useAppContext` hook is preferred.

### Hook: `useAppContext()`

A custom hook for consuming `AppContext`.

Returns:

-   (`AppContextValue`): An object containing the current `state` and `dispatch` function.

Throws:

-   `Error`: If called outside of an `AppProvider` component tree.

## Usage Examples

```typescript
// Inside a component that needs access to global state or needs to dispatch actions:
import React from 'react';
import { useAppContext } from './app-context';
import { Button } from '@mantine/core';

function NoteSelector() {
  const { state, dispatch } = useAppContext();

  const handleSelectFirstNote = () => {
    if (state.notes.length > 0) {
      dispatch({ type: 'SELECT_NOTE', payload: state.notes[0].id });
    }
  };

  return (
    <div>
      <p>Selected Note ID: {state.selectedNoteId || 'None'}</p>
      <Button onClick={handleSelectFirstNote} disabled={state.notes.length === 0}>
        Select First Note
      </Button>
    </div>
  );
}

export default NoteSelector;
```

## Best Practices

-   Always use the `useAppContext` hook to consume the context within components instead of `useContext(AppContext)` directly. The hook provides better encapsulation and includes the provider check.
-   Ensure that any component calling `useAppContext` is a descendant of the `AppProvider` component.
-   Avoid putting excessively large or frequently changing data in the global state if it's only needed by a small subset of components. Consider component-local state or more localized context providers for such cases.

## Troubleshooting

-   **"useAppContext must be used within an AppProvider" Error**: This means a component calling `useAppContext` is not rendered inside the `AppProvider` tree. Check your component hierarchy in `main.tsx` or wherever `AppProvider` is used.
-   **Context value is undefined or stale**: Ensure the `AppProvider` is correctly set up and wrapping the necessary parts of your application. Verify that the `value` prop passed to `AppContext.Provider` in `AppProvider` is updating correctly (the `useMemo` hook helps optimize this).

## Related Modules

-   `src/state/app-provider.tsx`: The component that provides the `AppContext`.
-   `src/state/app-state.ts`: Defines the `AppState` and `AppAction` types used in the context value.
-   `src/state/app-reducer.ts`: Provides the `initialState` used as the default context value.

## Changelog

-   **2025-04-22**: Initial definition of `AppContext` and `useAppContext`.