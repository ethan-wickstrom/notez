# Notes DB (IndexedDB Persistence)

## Overview
The **Notes DB** module provides a thin, type-safe wrapper around the browser’s IndexedDB API, enabling offline-first persistence for all `Note` objects. It exposes simple functions to retrieve and save the complete notes collection.

## Installation
No separate installation is required. Import the functions directly:

```typescript
import { getAllNotes, saveNotes } from '../db/notes-db';
```

## Core Concepts
- **IndexedDB**: A transactional, async key-value store available in modern browsers, ideal for offline PWAs.
- **Single Object Store**: `notes` object store uses `id` as its `keyPath`.
- **Bulk Replace Strategy**: `saveNotes` clears the store then reinserts the current array—fast for small datasets and guarantees consistency.
- **Error Propagation**: Low-level errors surface as `Error` objects, allowing the caller to decide UX.

## API Reference
### getAllNotes()
Fetch every persisted note.
Returns:
- `Promise<Note[]>`: Resolves to an array of notes (empty if none).

Example:
```typescript
const notes = await getAllNotes();
```

### saveNotes(notes)
Persist the provided array as the authoritative source.
Parameters:
- `notes` (`readonly Note[]`): The complete note list.

Returns:
- `Promise<void>`: Resolves when the transaction commits.

Example:
```typescript
await saveNotes(state.notes);
```

## Usage Examples
```typescript
import { getAllNotes, saveNotes } from '../db/notes-db';

// Load on startup
const initialNotes = await getAllNotes();

// Persist after mutation
await saveNotes(updatedNotes);
```

## Best Practices
- Call `getAllNotes` once during app bootstrap to hydrate state.
- Persist **after** reducer updates – never inside the reducer.
- Because Notez uses small Markdown documents, the bulk-replace strategy is simpler than per-note sync and keeps code maintainable.

## Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| "IndexedDB open error” | Browser privacy mode blocks storage | Advise user to enable storage access |
| Notes disappear after refresh | `saveNotes` not called or failed silently | Check console for persistence errors |

## Related Modules
- [`src/state/app-provider.tsx`](../state/app-provider.md) – loads and saves notes using this module.
- [`src/types.ts`](../types.md) – defines the `Note` type persisted here.

## Changelog
- **2025-04-22**: Initial implementation.