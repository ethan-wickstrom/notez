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
-   **Empty State**: Shows a clear, actionable message ("No notes yet. Click '+ New Note' to create one!") if the `notes` array is empty after loading.
-   **Rendering List**: Maps over the `notes` array and renders a `NoteListItem` component for each note, passing the `note` object as a prop.
- **Drag-and-Drop Reordering**: Wraps the list with `@hello-pangea/dnd`’s `DragDropContext`, `Droppable`, and
  `Draggable` components to allow users to change note order via drag-and-drop. The new order is persisted in state with
  the `REORDER_NOTES` action.
-   **Scrolling**: Relies on the parent `AppShell.Section` (configured with `component={ScrollArea}`) to handle scrolling when the list exceeds the available vertical space.

## API Reference

### Component: `NoteList`

This component does not accept any props. It derives all necessary data from the `AppContext`.

## Usage Examples

```typescript
// Inside App.tsx's Navbar section
import { AppShell, ScrollArea } from '@mantine/core';
import { NoteList } from './components/note-list';
import { NewNoteButton } from './components/new-note-button';

function App() {
  // ... AppShell setup ...

  return (
    <AppShell
      // ... other props
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { /* ... */ } }}
    >
      {/* ... Header ... */}

      <AppShell.Navbar p="md">
         {/* Static section */}
         <AppShell.Section>
           <NewNoteButton />
         </AppShell.Section>
         {/* Scrollable section */}
         <AppShell.Section grow component={ScrollArea} mt="md">
            <NoteList />
         </AppShell.Section>
      </AppShell.Navbar>

      {/* ... Main ... */}
    </AppShell>
  );
}
```

## Best Practices

-   Ensure `NoteList` is placed within a scrollable container (like `AppShell.Section` with `component={ScrollArea}`) within the `AppShell.Navbar` for proper layout and scrolling.
-   Clearly handle the `isLoading` and empty states to provide good user feedback. The empty state message should guide the user on how to proceed.
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
-   `@mantine/core/ScrollArea`: Used by the parent section for making the list scrollable.
-   `@mantine/core/Skeleton`: Used for the loading state placeholder.
-   `@mantine/core/Stack`: Used internally to layout list items.

## Changelog

- **2025-04-23**: Added drag-and-drop functionality for reordering notes. Updated the empty state message to be more
  user-friendly.
-   **2025-04-23**: Improved the empty state message for better user guidance. Removed direct `ScrollArea` usage as it's now handled by the parent `AppShell.Section`.
-   **2025-04-22**: Initial implementation of the `NoteList` component.
