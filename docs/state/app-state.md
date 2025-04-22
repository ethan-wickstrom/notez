# App State & Actions (`app-state.ts`)

## Overview

This module defines the structure of the global application state (`AppState`) and the set of possible actions (`AppAction`) that can modify this state. It serves as the single source of truth for application-wide data like the list of notes, the currently selected note, loading status, and error information.

## Installation

These types are part of the core application state management and are used internally. No separate installation is needed. Import them from `src/state/app-state.ts`.

```typescript
import type { AppState, AppAction } from './app-state';
```

## Core Concepts

-   **Centralized State (`AppState`)**: Consolidates application-wide data into a single, predictable structure. This makes it easier to manage and debug state changes.
-   **Discriminated Unions (`AppAction`)**: Uses TypeScript's discriminated union pattern for actions. Each action has a unique `type` property, allowing the reducer to safely determine how to handle the action based on its type and associated `payload`. This improves type safety and reducer logic clarity.
-   **State Properties**:
    -   `notes`: Stores the primary data of the application.
    -   `selectedNoteId`: Tracks UI state related to note selection.
    -   `isLoading`: Manages the loading status, useful for showing loading indicators in the UI.
    -   `error`: Holds error information for display or debugging.

## API Reference

### Type: `AppState`

Defines the overall shape of the application's state.

Properties:

-   `notes` (`Note[]`): An array holding all the notes currently loaded. See `docs/types.md`.
-   `selectedNoteId` (`string | null`): The ID of the currently selected note, or `null` if none is selected.
-   `isLoading` (`boolean`): `true` if the application is currently fetching or saving data, `false` otherwise.
-   `error` (`string | null`): An error message string if an operation failed, or `null` if there's no error.

### Type: `AppAction`

A discriminated union representing all possible state update operations.

Actions:

-   `{ type: 'SET_NOTES'; payload: Note[] }`: Replaces the entire `notes` array with the provided payload. Typically used for initializing the state after loading data.
-   `{ type: 'ADD_NOTE'; payload: Note }`: Adds a single new note to the state.
-   `{ type: 'UPDATE_NOTE'; payload: { id: string; data: Partial<Note> } }`: Updates an existing note identified by `id` with the provided partial data.
-   `{ type: 'DELETE_NOTE'; payload: string }`: Removes the note with the matching `id` from the state.
-   `{ type: 'SELECT_NOTE'; payload: string | null }`: Sets the `selectedNoteId` state property.
-   `{ type: 'SET_LOADING'; payload: boolean }`: Sets the `isLoading` state property.
-   `{ type: 'SET_ERROR'; payload: string | null }`: Sets or clears the `error` state property.

## Usage Examples

These types are primarily used by the `appReducer` and the `AppProvider`. Components interact with the state and dispatch actions via the `useAppContext` hook.

```typescript
// Example of dispatching an action from a component
import { useAppContext } from './app-context';
import type { Note } from '../types';

function SomeComponent() {
  const { dispatch } = useAppContext();

  const handleAddNote = (newNote: Note) => {
    dispatch({ type: 'ADD_NOTE', payload: newNote });
  };

  const handleSelectNote = (noteId: string | null) => {
    dispatch({ type: 'SELECT_NOTE', payload: noteId });
  };

  // ... other component logic
}
```

## Best Practices

-   Keep `AppState` as minimal as possible, only including truly global state. Component-local state should remain within components.
-   Define clear and specific action types. Avoid overly generic actions.
-   Ensure payloads for actions contain all necessary information for the reducer to perform the update.

## Troubleshooting

-   **Incorrect State Updates**: Verify that the correct action `type` and `payload` are being dispatched. Check the logic within the corresponding case in `appReducer.ts`.
-   **Type Errors**: Ensure the `payload` structure matches the expected type for the dispatched `AppAction`.

## Related Modules

-   `src/state/app-reducer.ts`: Implements the logic for handling `AppAction`s and updating `AppState`.
-   `src/state/app-context.ts`: Defines the context that provides `AppState` and the dispatch function.
-   `src/state/app-provider.tsx`: Uses `AppState` and `AppAction` with `useReducer` to manage state.
-   `src/types.ts`: Defines the `Note` type used within `AppState`.

## Changelog

-   **2025-04-22**: Initial definition of `AppState` and `AppAction`.