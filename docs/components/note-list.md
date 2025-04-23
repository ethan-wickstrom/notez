# Note List (`note-list.tsx`)

## Overview

The `NoteList` component is responsible for displaying the collection of notes within the application's sidebar (`AppShell.Navbar`). It fetches the notes from the global application state, handles the loading and empty states, and renders individual notes using the `NoteListItem` component.

## Installation

This component is part of the core application structure (`src/components/`) and does not require separate installation. Import it into `App.tsx`.

```typescript
import { NoteList } from './components/note-list';
```

## Core Concepts

-   **State Consumption**: Uses the `useAppContext` hook to access the global application state, specifically the `notes` array and the `isLoading` flag.
-   **Loading State**: Displays `Skeleton` components as placeholders while the notes are being loaded initially (when `isLoading` is true).
-   **Empty State**: Shows a message ("No notes yet.") if the `notes` array is empty after loading.
-   **Rendering List**: Maps over the `notes` array and renders a `NoteListItem` component for each note, passing the `note` object as a prop.
-   **Scrolling**: Wraps the list of notes in Mantine's `ScrollArea` component to ensure the list is scrollable if it exceeds the available vertical space in the navbar.

## API Reference

### Component: `NoteList`

This component does not accept any props. It derives all necessary data from the `AppContext`.

## Usage Examples

```typescript
// Inside App.tsx
import { AppShell, ScrollArea } from '@mantine/core';
import { NoteList } from './components/note-list';

function App() {
  // ... AppShell setup ...

  return (
    <AppShell
      // ... other props
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { /* ... */ } }}
    >
      {/* ... Header ... */}

      <AppShell.Navbar p="md">
         {/* Use AppShell.Section for proper layout within Navbar */}
         <AppShell.Section grow component={ScrollArea}>
            <NoteList />
         </AppShell.Section>
         {/* Potentially add "New Note" button below */}
      </AppShell.Navbar>

      {/* ... Main ... */}
    </AppShell>
  );
}
```

## Best Practices

-   Use `AppShell.Section` with the `grow` prop and `component={ScrollArea}` to ensure the `NoteList` correctly fills the available space and becomes scrollable within the `AppShell.Navbar`.
-   Clearly handle the `isLoading` and empty states to provide good user feedback.
-   Delegate the rendering and interaction logic for individual notes to the `NoteListItem` component (Separation of Concerns).

## Troubleshooting

-   **Notes not displaying**:
    -   Verify that the `AppProvider` is correctly wrapping the `App` component and that the initial data loading logic (in `AppProvider`'s `useEffect`) is fetching and dispatching notes correctly.
    -   Check the `notes` array in the global state using React DevTools.
-   **Loading state persists indefinitely**: Ensure the `isLoading` flag in the global state is set to `false` after notes are loaded (or if an error occurs) in the `AppProvider` or relevant reducer logic.
-   **Scrolling issues**: Confirm that the `NoteList` is wrapped in `AppShell.Section` with `grow` and `component={ScrollArea}` as shown in the usage example. Check for conflicting height styles.

## Related Modules

-   `src/components/note-list-item.tsx`: The component used to render each item in the list.
-   `src/App.tsx`: The parent component where `NoteList` is integrated into the layout.
-   `src/state/app-context.ts`: Provides the `useAppContext` hook.
-   `src/state/app-state.ts`: Defines the structure of the state consumed (`notes`, `isLoading`).
-   `@mantine/core/ScrollArea`: Used for making the list scrollable.
-   `@mantine/core/Skeleton`: Used for the loading state placeholder.

## Changelog

-   **2025-04-22**: Initial implementation of the `NoteList` component.
