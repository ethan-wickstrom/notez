import type { Note } from '../types';

const DATABASE_NAME = 'notez';
const DATABASE_VERSION = 1;
const STORE_NAME = 'notes';

/**
 * Open (or upgrade) the IndexedDB database for Notez.
 *
 * The object store is created lazily on first run. Subsequent openings reuse
 * the existing database without blocking the main thread longer than needed.
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(
      DATABASE_NAME,
      DATABASE_VERSION,
    );

    // Ensure the object store exists
    request.onupgradeneeded = (): void => {
      const db: IDBDatabase = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (): void => {
      resolve(request.result);
    };

    request.onerror = (): void => {
      reject(
        new Error(
          `IndexedDB open error: ${request.error?.message ?? 'unknown error'}`,
        ),
      );
    };
  });
}

/**
 * Retrieve every note stored locally.
 *
 * @returns All notes sorted by IndexedDB’s insertion order.
 */
export async function getAllNotes(): Promise<Note[]> {
  const db: IDBDatabase = await openDatabase();

  return new Promise<Note[]>((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction(
      STORE_NAME,
      'readonly',
    );
    const store: IDBObjectStore = transaction.objectStore(STORE_NAME);
    const request: IDBRequest = store.getAll();

    request.onsuccess = (): void => {
      resolve(request.result as Note[]);
    };

    request.onerror = (): void => {
      reject(
        new Error(
          `IndexedDB read error: ${request.error?.message ?? 'unknown error'}`,
        ),
      );
    };
  });
}

/**
 * Overwrite the local notes store with the provided array.
 *
 * This keeps the algorithm simple: clear the store then bulk-add. The data
 * set is typically small (markdown notes), so performance is more than
 * adequate while guaranteeing consistency.
 *
 * @param notes – the complete list of current notes
 */
export async function saveNotes(notes: readonly Note[]): Promise<void> {
  const db: IDBDatabase = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction: IDBTransaction = db.transaction(
      STORE_NAME,
      'readwrite',
    );

    transaction.onerror = (): void =>
      reject(
        new Error(
          `IndexedDB write error: ${transaction.error?.message ?? 'unknown'}`,
        ),
      );
    transaction.oncomplete = (): void => resolve();

    const store: IDBObjectStore = transaction.objectStore(STORE_NAME);
    // Clear then re-insert
    store.clear();
    notes.forEach((note) => store.put(note));
  });
}