# Note Editor (`note-editor.tsx`)

## Overview

`NoteEditor` provides a full-featured **rich-text editing experience** using Mantine's `RichTextEditor` component, which wraps Tiptap. It allows users to edit the title and content of the selected note with formatting options, keyboard shortcuts, debounced autosaving, and a safe delete mechanism. It also displays note metadata (timestamps) and features an improved placeholder when no note is selected.

## Installation

This component is part of the core application structure (`src/components/`) and does not require separate installation. It relies on `@mantine/core`, `@mantine/hooks`, `@mantine/tiptap`, `@mantine/notifications`, `@mantine/modals`, and various `@tiptap/*` extensions which should be project dependencies.

```typescript
// Import into App.tsx or similar layout component
import { NoteEditor } from './components/note-editor';
```

## Core Concepts

-   **Rich Text Editing**: Utilizes `@mantine/tiptap`'s `RichTextEditor` for a WYSIWYG editing experience, powered by Tiptap.
-   **Comprehensive Toolbar**: Includes controls for common formatting (bold, italic, underline, strikethrough, code), headings (H1-H4), lists (bullet, ordered), blockquotes, code blocks, horizontal rules, links, and undo/redo functionality.
-   **Debounced Autosave**: Both the note title (`TextInput`) and the content (`RichTextEditor`) automatically save changes to the global state (via `UPDATE_NOTE` dispatch) after a short period of inactivity (400ms), preventing excessive updates during typing.
-   **State Synchronization**: The editor's local title state and Tiptap's content are reset and synchronized whenever the `selectedNoteId` changes in the global state, ensuring the correct note is displayed and edited.
-   **Delete Confirmation**: Implements a confirmation modal (`@mantine/modals`) before deleting a note to prevent accidental data loss. Upon confirmation, it dispatches `DELETE_NOTE`, deselects the note (`SELECT_NOTE`), and shows a success notification.
-   **Metadata Display (Gestalt: Proximity)**: Shows the `createdAt` and `updatedAt` timestamps clearly associated with the currently edited note, positioned logically below the editor using `Stack`.
-   **Placeholder Text**: Provides helpful placeholder text in the title input and the main content area when they are empty. Features an improved, centered placeholder when no note is selected.
-   **Layout (Gestalt: Proximity & Order)**: Uses Mantine's `Stack` for overall vertical layout and `Group` for the title/delete row, ensuring consistent spacing (`gap`, `mt`, `mb`).
-   **Consistent Styling (Gestalt: Similarity)**: Uses `variant="light"` for the delete button, consistent with other secondary actions like the "New Note" button.
-   **Hook Safety Architecture**: The exported `NoteEditor` component acts as a wrapper. It checks if a note is selected and conditionally renders the `NoteEditorInner` component (which contains all the hooks and logic). This ensures that React hooks (`useState`, `useEffect`, `useEditor`, etc.) are always called unconditionally within `NoteEditorInner` when it's rendered, adhering to the Rules of Hooks.
-   **Keyboard Shortcuts**: Leverages Tiptap's default shortcuts for common actions (e.g., Cmd/Ctrl+B for Bold, Cmd/Ctrl+I for Italic, Cmd/Ctrl+U for Underline).

## API Reference

### Component: `NoteEditor`

The main wrapper component rendered in the application layout.

Props: *None*

### Component: `NoteEditorInner` (Internal)

The internal component containing the editor UI and logic. Rendered by `NoteEditor` when a note is selected.

Props:

-   `note` (`Note`): The currently selected note object to be edited.

## Usage Examples

```typescript
// Inside App.tsx's main content area
import { AppShell } from '@mantine/core';
import { NoteEditor } from './components/note-editor';

function App() {
  // ... AppShell setup ...

  return (
    <AppShell
      // ... other props
    >
      {/* ... Header ... */}
      {/* ... Navbar ... */}

      <AppShell.Main style={{ height: 'calc(100vh - var(--app-shell-header-height))' }}>
        {/* NoteEditor fills the main area */}
        <NoteEditor />
      </AppShell.Main>
    </AppShell>
  );
}
```

## Best Practices

-   **Single Instance**: Keep only one `NoteEditor` mounted in the main content area; it dynamically updates based on the `selectedNoteId` from the context.
-   **Toolbar Customization**: Adjust the controls available in the `RichTextEditor.Toolbar` based on the desired feature set for the notes. Ensure corresponding Tiptap extensions are installed and configured.
-   **Debounce Tuning**: The `DEBOUNCE_MS` constant (400ms) can be adjusted if performance issues arise with very large notes or if faster/slower saving is desired.
-   **Styling**: Use Mantine theme variables and CSS modules for any necessary style overrides or enhancements, particularly for the `RichTextEditor.Content` area if specific visual presentation is needed beyond the default typography. Set a `minHeight` on the content area to ensure it's always usable.
-   **Error Handling**: While basic notifications are used for delete success, consider adding more robust error handling for potential `UPDATE_NOTE` failures in the `AppProvider`'s persistence logic.
-   **Placeholder Clarity**: Ensure placeholder text clearly guides the user, both when the editor is empty and when no note is selected. The centered placeholder for the "no note selected" state improves initial presentation.

## Troubleshooting

| Symptom                      | Likely Cause                                         | Solution                                                                                                                              |
| :--------------------------- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Editor not loading/blank     | `editor` instance is null or Tiptap error.           | Check browser console for Tiptap errors. Ensure `useEditor` hook dependencies (`[note.id]`) are correct. Verify extensions are valid. |
| Changes not saving           | Debounce logic issue or `UPDATE_NOTE` reducer error. | Check the `useDebouncedEffect` dependencies. Verify the `UPDATE_NOTE` case in `app-reducer.ts` works correctly. Check console errors. |
| Title/Content out of sync    | `useEffect` dependency issue for state reset.        | Ensure `useEffect` hooks in `NoteEditorInner` correctly depend on `note.id`, `note.title`, `note.content`, and `editor` instance.     |
| Delete button does nothing   | `ModalsProvider` missing or context issue.           | Ensure `ModalsProvider` wraps the application in `main.tsx`. Verify `useAppContext` is correctly providing `dispatch`.                |
| Formatting controls inactive | Missing Tiptap extensions.                           | Ensure all extensions corresponding to the toolbar controls are installed and added to the `useEditor` configuration.                 |
| Keyboard shortcuts not work  | Tiptap configuration issue.                          | Verify `StarterKit` and other relevant extensions are correctly configured. Check for conflicting browser extensions.                 |
| Layout spacing inconsistent  | Incorrect use of `Stack`, `Group`, or margin props.  | Review the layout structure in `NoteEditorInner`. Use `gap` on `Stack` and `Group` for consistent spacing. Check `mt`/`mb` usage.     |
| "No note selected" text not centered | Missing flexbox styles on the container `Box`. | Verify the `style` prop on the `Box` in the `NoteEditor` wrapper component includes `display: flex`, `alignItems: center`, etc.      |

## Related Modules

-   `src/components/note-list.tsx`: Selects the note to be edited.
-   `src/state/app-context.ts`: Provides `useAppContext` hook.
-   `src/state/app-reducer.ts`: Processes `UPDATE_NOTE` & `DELETE_NOTE` actions.
-   `src/types.ts`: Defines the `Note` type.
-   `@mantine/tiptap`: Provides the `RichTextEditor` component and Mantine-specific Tiptap integration.
-   `@mantine/modals`: Provides the `modals.openConfirmModal` function.
-   `@mantine/notifications`: Provides the `notifications.show` function.
-   `@tiptap/*`: Core Tiptap library and extensions.
-   `@mantine/core/Stack`: Used for vertical layout.
-   `@mantine/core/Group`: Used for horizontal layout (title/delete row).

## Changelog

-   **2025-04-23**: Improved placeholder text when no note is selected (centered). Adjusted layout using `Stack` and `Group` for better spacing and alignment. Set delete button variant to `light`. Increased `minHeight` of editor content.
-   **2025-04-23**: Enhanced toolbar with more controls (Code Block, Hr, Undo/Redo). Added delete confirmation modal. Added timestamp display. Configured `CodeBlockLowlight` extension. Ensured editor content resets correctly on note change. Added minimum height to content area.
-   **2025-04-23**: Initial implementation of NoteEditor component with autosave & delete. Refactored into wrapper + inner component structure.
```