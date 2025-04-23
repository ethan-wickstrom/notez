# New Note Button (`new-note-button.tsx`)
## Overview
Provides a concise action for users to create a fresh, empty note and immediately select it in the UI.

## Installation
No extra installation—import from the components directory:
```typescript
import { NewNoteButton } from './components/new-note-button';
```

## Core Concepts
- **State Dispatch** – Adds and selects the note via `ADD_NOTE` and `SELECT_NOTE` actions.
- **Unique IDs & Timestamps** – Utilises `crypto.randomUUID()` and ISO strings to guarantee uniqueness.
- **UX Simplicity** – Full-width button placed in the navbar for easy access.

## API Reference
### Function: `createNewNote()`
Creates a new empty note and selects it in the UI.

Parameters:
*None*

Returns:
*void*

### Component: `NewNoteButton()`
Button component that creates and selects a new note, with keyboard shortcut support.

Parameters:
*None*

Returns:
- `JSX.Element`: Rendered Mantine `Button` with keyboard shortcut indicator.

Example:
```typescript
<NewNoteButton />
```
```

## Usage Examples
```typescript
// Inside AppShell.Navbar
<AppShell.Section mt="md">
  <NewNoteButton />
</AppShell.Section>
```

## Best Practices
- Place below scrollable note list to keep it visible.
- Display keyboard shortcut hint (`⌘N`) in the button to improve discoverability.
- Use `useHotkeys` from `@mantine/hooks` to implement keyboard shortcuts consistently.

## Troubleshooting
| Symptom | Cause | Fix |
|---------|-------|-----|
| No new note appears | Reducer not handling `ADD_NOTE` | Verify reducer imports and case handling |
| Keyboard shortcut doesn't work | Event conflict or missing hooks | Ensure `useHotkeys` is properly configured and no other component is capturing `mod+n` |
| Multiple notes created with one keystroke | Event not being prevented | Add `event.preventDefault()` in shortcut handler |

## Related Modules
- `note-list.tsx` – displays newly created note.
- `app-reducer.ts` – processes `ADD_NOTE`, `SELECT_NOTE`.

## Changelog
- **2025-04-23** Added keyboard shortcut (⌘N) support using `useHotkeys` and visual hint in button.
- **2025-04-22** Initial implementation.