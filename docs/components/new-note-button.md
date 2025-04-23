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
### NewNoteButton()
Creates and selects a new note.
Parameters:
*None*
Returns:
- `JSX.Element`: Rendered Mantine `Button`.

Example:
```typescript
<NewNoteButton />
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
- Consider keyboard shortcut (`⌘N`) in future using `useHotkeys`.

## Troubleshooting
| Symptom | Cause | Fix |
|---------|-------|-----|
| No new note appears | Reducer not handling `ADD_NOTE` | Verify reducer imports and case handling |

## Related Modules
- `note-list.tsx` – displays newly created note.
- `app-reducer.ts` – processes `ADD_NOTE`, `SELECT_NOTE`.

## Changelog
- **2025-04-22** Initial implementation.