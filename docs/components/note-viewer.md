# Note Viewer (`note-viewer.tsx`)

## Overview

The `NoteViewer` component is responsible for displaying the title and content of the currently selected note. It fetches the selected note's data from the global application state, uses the `md4w` library (a fast WebAssembly-based Markdown parser) to parse the Markdown content into HTML, and renders it within a styled container.

## Installation

This component is part of the core application structure (`src/components/`) and does not require separate installation. It depends on the `md4w` library, which should be installed as a project dependency.

```typescript
import { NoteViewer } from './note-viewer';
```

## Core Concepts

-   **State Consumption**: Uses the `useAppContext` hook to access the global application state, specifically `selectedNoteId` and the `notes` array.
-   **Note Selection**: Finds the full `Note` object corresponding to the `selectedNoteId`.
-   **Markdown Parsing**:
    -   Imports and initializes the `md4w` WebAssembly module asynchronously using `useEffect` on component mount.
    -   Manages the loading state of the parser (`isInitializing`).
    -   Parses the `content` field of the selected note into an HTML string using `md4w.mdToHtml()` once the parser is initialized and a note is selected.
    -   Manages the parsing state to show a loading overlay.
-   **HTML Rendering**: Renders the generated HTML string using `dangerouslySetInnerHTML` within Mantine's `TypographyStylesProvider` to apply appropriate typography styles.
-   **Loading/Empty States**: Displays a message if no note is selected and shows a `LoadingOverlay` while the `md4w` WASM module initializes.
-   **Metadata Display**: Shows the `createdAt` and `updatedAt` timestamps of the note.

## API Reference

### Component: `NoteViewer`

This component does not accept any props. It derives all necessary data from the `AppContext`.

### Internal State

-   `htmlContent` (string): Stores the HTML string generated from the Markdown content.
-   `isLoadingParser` (boolean): Tracks whether the `md4w` library is still loading/initializing.
-   `isParsing` (boolean): Tracks whether the Markdown content is currently being parsed.
-   `parserRef` (RefObject): Holds the initialized `md4w` parser instance.

## Usage Examples

```typescript
// Inside App.tsx
import { AppShell } from '@mantine/core';
import { NoteViewer } from './components/note-viewer';
// ... other imports

function App() {
  // ... AppShell setup ...

  return (
    <AppShell
      // ... other props
    >
      {/* ... Header ... */}
      {/* ... Navbar ... */}

      <AppShell.Main>
        <NoteViewer /> {/* Render viewer in the main area */}
      </AppShell.Main>
    </AppShell>
  );
}
```

## Best Practices

-   **Error Handling**: Implement robust error handling for both parser loading and Markdown parsing failures. Consider dispatching errors to the global state for user feedback.
-   **Security**: While `dangerouslySetInnerHTML` is used here, be mindful that the content comes from the user's own notes (assumed trusted). If content could ever come from external sources, sanitization would be crucial.
-   **Performance**: For very large notes, consider debouncing the parsing process if it were tied to real-time editing in the future. The dynamic import helps with initial load performance.
-   **Loading States**: Provide clear visual feedback during parser initialization and content parsing using `LoadingOverlay` or similar indicators.

## Troubleshooting

-   **Parser not loading**: Check the browser's developer console for errors related to WASM loading or network issues. Ensure `md4w` is correctly installed. Verify the dynamic import path.
-   **Markdown not rendering correctly**:
    -   Confirm the `md4w` parser initialized successfully (check `isLoadingParser` state and console errors).
    -   Ensure the `selectedNote.content` contains valid Markdown.
    -   Check the `htmlContent` state using React DevTools to see the output of the parser.
    -   Verify `TypographyStylesProvider` is wrapping the rendered HTML.
-   **No content shown**: Ensure a note is actually selected (`selectedNoteId` is not null) and that the corresponding `Note` object exists in the `notes` array.

## Related Modules

-   `src/App.tsx`: The parent component where `NoteViewer` is integrated.
-   `src/state/app-context.ts`: Provides the `useAppContext` hook.
-   `src/state/app-state.ts`: Defines the structure of the state consumed (`notes`, `selectedNoteId`).
-   `src/types.ts`: Defines the `Note` type.
-   `md4w`: The library used for Markdown parsing.
-   `@mantine/core/TypographyStylesProvider`: Used to style the rendered HTML.
-   `@mantine/core/LoadingOverlay`: Used for indicating loading states.

## Changelog

-   **2025-04-22**: Initial implementation of the `NoteViewer` component with Markdown parsing.
