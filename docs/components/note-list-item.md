# Note List Item (`note-list-item.tsx`)

## Overview

The `NoteListItem` component renders a single, selectable item within the `NoteList`. It displays the note's title and handles user interaction to select the note, updating the global application state.

## Installation

This component is part of the core application structure (`src/components/`) and does not require separate installation. Import it where needed, typically within `NoteList`.

```typescript
import { NoteListItem } from './note-list-item';
```

## Core Concepts

-   **Display**: Uses Mantine's `NavLink` component for consistent styling and interaction patterns within the sidebar. Displays the `note.title` or a placeholder if the title is empty.
-   **Selection**: On click, it dispatches the `SELECT_NOTE` action with the note's ID using the `dispatch` function obtained from `useAppContext`.
-   **Active State**: Determines if it's the currently selected note by comparing its `note.id` with the `selectedNoteId` from the global state. Passes the `active` prop to the underlying `NavLink`.

## API Reference

### Component: `NoteListItem`

Props:

-   `note` (`Note`): The note object containing the data to display (id, title, etc.). See `docs/types.md`.

## Usage Examples

```typescript
// Inside NoteList.tsx
import { NoteListItem } from './note-list-item';
import type { Note } from '../types';

function NoteList() {
  // ... (get notes from context) ...

  return (
    <ScrollArea>
      <Stack>
        {notes.map((note: Note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </Stack>
    </ScrollArea>
  );
}
```

## Best Practices

-   Keep the `NoteListItem` focused solely on rendering and handling the selection of a single note.
-   Use `NavLink`'s `active` prop for clear visual indication of the selected item.
-   Provide a fallback label (e.g., "Untitled Note") if a note's title might be empty.
-   Consider adding timestamps (`note.updatedAt`) to the `NavLink`'s `description` prop in the future for better context.

## Troubleshooting

-   **Note not selecting**: Verify that the `onClick` handler correctly calls `dispatch` with the `SELECT_NOTE` action and the correct `note.id`. Ensure the `AppProvider` is correctly set up.
-   **Active state incorrect**: Check if `state.selectedNoteId` is being updated correctly in the reducer and that the comparison `state.selectedNoteId === note.id` is accurate.

## Related Modules

-   `src/components/note-list.tsx`: The parent component that renders a list of `NoteListItem`s.
-   `src/state/app-context.ts`: Provides the `useAppContext` hook used to access state (`selectedNoteId`) and `dispatch`.
-   `src/state/app-reducer.ts`: Handles the `SELECT_NOTE` action dispatched by this component.
-   `src/types.ts`: Defines the `Note` type.
-   `@mantine/core/NavLink`: The Mantine component used for rendering the list item.

## Changelog

-   **2025-04-22**: Initial implementation of the `NoteListItem` component.
