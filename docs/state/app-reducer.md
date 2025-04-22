# App Reducer (`app-reducer.ts`)

## Overview

This module contains the core state management logic for the Notez application. It defines the `initialState` and the `appReducer` function, which is responsible for handling state transitions based on dispatched actions (`AppAction`). This follows the standard Reducer pattern commonly used with React's `useReducer` hook and Context API.

## Installation

This module is part of the core application state management and is used internally by `AppProvider`. No separate installation is needed.

## Core Concepts

-   **Reducer Pattern**: Implements a pure function (`appReducer`) that takes the current state and an action, and returns a new state object without mutating the original state.
-   **Initial State**: Defines the `initialState` object, representing the application's state before any data is loaded or actions are dispatched.
-   **Action Handling**: Uses a `switch` statement to handle different action types defined in `AppAction`. Each case implements the logic for updating the state based on the action's payload.
-   **Immutability**: State updates are performed immutably by creating new objects or arrays instead of modifying existing ones (e.g., using spread syntax `{...state}` or array methods like `map` and `filter`).

## API Reference

### Constant: `initialState`

The starting state object for the application reducer.

```typescript
export const initialState: AppState = {
  notes: [],
  selectedNoteId: null,
  isLoading: true, // Start in loading state
  error: null,
};
```

### Function: `appReducer(state, action)`

The main reducer function.

Parameters:

-   `state` (`AppState`): The current state of the application.
-   `action` (`AppAction`): The action object dispatched to trigger a state update.

Returns:

-   (`AppState`): The new state object after applying the action logic.

## Usage Examples

The `appReducer` is intended to be used with the `useReducer` hook, typically within the `AppProvider`.

```typescript
// src/state/app-provider.tsx (Simplified)
import { useReducer } from 'react';
import { appReducer, initialState } from './app-reducer';
import { AppContext } from './app-context';

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // The state and dispatch are provided via context
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

## Reducer Logic Details

-   **`SET_NOTES`**: Replaces the `notes` array entirely. Sets `isLoading` to `false` and clears `error`.
-   **`ADD_NOTE`**: Prepends the new note to the `notes` array.
-   **`UPDATE_NOTE`**: Maps over the `notes` array, finds the note by `id`, and merges the `action.payload.data` into it, creating a new note object.
-   **`DELETE_NOTE`**: Filters the `notes` array to exclude the note with the specified `id`. Also resets `selectedNoteId` if the deleted note was selected.
-   **`SELECT_NOTE`**: Updates `selectedNoteId` with the provided `id` or `null`.
-   **`SET_LOADING`**: Updates the `isLoading` flag.
-   **`SET_ERROR`**: Updates the `error` message and sets `isLoading` to `false`.

## Best Practices

-   Keep the reducer pure: It should not have side effects (e.g., API calls, direct DOM manipulation). Side effects should be handled elsewhere (e.g., in components using `useEffect` or dedicated service modules).
-   Ensure all state transitions are immutable.
-   Handle all possible action types defined in `AppAction`. The `default` case in the `switch` statement helps catch unhandled actions.

## Troubleshooting

-   **State not updating as expected**: Debug the specific `case` within the reducer corresponding to the dispatched action. Check the payload and the logic for creating the new state object. Ensure immutability.
-   **Infinite loops**: Ensure that actions dispatched within `useEffect` hooks have proper dependency arrays to prevent unnecessary re-dispatches that could trigger reducer updates repeatedly.

## Related Modules

-   `src/state/app-state.ts`: Defines the `AppState` and `AppAction` types used by the reducer.
-   `src/state/app-provider.tsx`: Uses `appReducer` and `initialState` with the `useReducer` hook.
-   `src/state/app-context.ts`: Defines the context through which components access the state managed by this reducer.

## Changelog

-   **2025-04-22**: Initial implementation of `appReducer` and `initialState`.