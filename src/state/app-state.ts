import type {Note} from '../types';

/**
 * Defines the overall shape of the application's state.
 */
export type AppState = {
  /**
   * An array holding all the notes currently loaded in the application.
   */
  notes: Note[];
  /**
   * The ID of the currently selected note for viewing or editing.
   * `null` if no note is selected.
   */
  selectedNoteId: string | null;
  /**
   * Indicates if the application is currently loading notes from storage.
   */
  isLoading: boolean;
  /**
   * Stores any error that occurred during data loading or saving.
   * `null` if there is no error.
   */
  error: string | null;
  /**
   * Current search query for filtering notes.
   * Empty string when not searching.
   */
  searchQuery: string;
};

/**
 * Represents the possible actions that can be dispatched to update the application state.
 * Uses a discriminated union pattern based on the `type` property.
 */
export type AppAction =
  | { type: 'SET_NOTES'; payload: Note[] } // Replace the entire notes array
  | { type: 'ADD_NOTE'; payload: Note } // Add a single new note
  | { type: 'UPDATE_NOTE'; payload: { id: string; data: Partial<Note> } } // Update an existing note
  | { type: 'DELETE_NOTE'; payload: string } // Delete a note by its ID
  | { type: 'SELECT_NOTE'; payload: string | null } // Set the currently selected note ID
  | { type: 'SET_LOADING'; payload: boolean } // Set the loading state
  | { type: 'SET_ERROR'; payload: string | null } // Set or clear the error state
  | { type: 'SET_SEARCH_QUERY'; payload: string } // Set the current search query
  | { type: 'REORDER_NOTES'; payload: string[] }; // Reorder notes by array of ids
