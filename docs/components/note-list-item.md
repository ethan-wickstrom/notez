# Note List Item (`note-list-item.tsx`)

## Overview

The `NoteListItem` component renders a single, selectable item within the `NoteList`. It displays the note's title and last updated time, handling user interaction to select the note. It uses a subtle visual style with enhanced active and hover states for improved clarity and user experience in the dark theme.

## Installation

This component is part of the core application structure (`src/components/`) and does not require separate installation. Import it where needed, typically within `NoteList`.

```typescript
import { NoteListItem } from './note-list-item';
```

## Core Concepts

-   **Display**: Uses Mantine's `NavLink` component with `variant="subtle"` for a cleaner appearance. Displays the `note.title` (or "Untitled Note") and a concisely formatted `note.updatedAt` timestamp in the `description` area.
-   **Selection**: On click, it dispatches the `SELECT_NOTE` action with the note's ID using the `dispatch` function obtained from `useAppContext`.
-   **Active State (Gestalt: Figure/Ground)**: Determines if it's the currently selected note by comparing its `note.id` with the `selectedNoteId` from the global state. Applies distinct background and text styles (using theme primary color with alpha) to the active `NavLink` for clear visual indication.
-   **Hover State**: Provides subtle background feedback on hover for both active and non-active items, enhancing interactivity.
-   **Transitions**: Includes a smooth background color transition for hover/active states.

## API Reference

### Component: `NoteListItem`

Props:

-   `note` (`Note`): The note object containing the data to display (id, title, updatedAt, etc.). See `docs/types.md`.

## Usage Examples

```typescript
// Inside NoteList.tsx
import { NoteListItem } from './note-list-item';
import type { Note } from '../types';
import { Stack } from '@mantine/core';

function NoteList() {
  // ... (get notes from context) ...

  return (
    <Stack gap="xs">
      {notes.map((note: Note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </Stack>
  );
}
```

## Best Practices

-   Keep the `NoteListItem` focused solely on rendering and handling the selection of a single note.
-   Utilize the enhanced `active` and `hover` state styling for clear visual feedback.
-   Provide a fallback label (e.g., "Untitled Note") if a note's title might be empty.
-   Format timestamps concisely to avoid cluttering the list item.

## Troubleshooting

-   **Note not selecting**: Verify that the `onClick` handler correctly calls `dispatch` with the `SELECT_NOTE` action and the correct `note.id`. Ensure the `AppProvider` is correctly set up.
-   **Active state incorrect**: Check if `state.selectedNoteId` is being updated correctly in the reducer and that the comparison `state.selectedNoteId === note.id` is accurate. Inspect the styles being applied via `styles` prop in DevTools. Ensure theme primary color is defined correctly.
-   **Timestamp formatting issues**: Check the `toLocaleTimeString` options or consider using `dayjs` (if added later) for more complex formatting needs.

## Related Modules

-   `src/components/note-list.tsx`: The parent component that renders a list of `NoteListItem`s.
-   `src/state/app-context.ts`: Provides the `useAppContext` hook used to access state (`selectedNoteId`) and `dispatch`.
-   `src/state/app-reducer.ts`: Handles the `SELECT_NOTE` action dispatched by this component.
-   `src/types.ts`: Defines the `Note` type.
-   `@mantine/core/NavLink`: The Mantine component used for rendering the list item.
-   `src/theme.ts`: Provides the theme colors used for styling.

## Changelog

-   **2025-04-23**: Changed `NavLink` variant to `subtle`. Enhanced active/hover state styling using the `styles` prop for better visual distinction and added transitions. Added formatted `updatedAt` timestamp to the description.
-   **2025-04-22**: Initial implementation of the `NoteListItem` component.
```