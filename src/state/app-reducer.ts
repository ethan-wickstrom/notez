import type { AppAction, AppState } from './app-state';

/**
 * The initial state for the application when it first loads.
 */
export const initialState: AppState = {
  notes: [],
  selectedNoteId: null,
  isLoading: true, // Assume loading initially until data is fetched
  error: null,
};

/**
 * The main reducer function for managing the application's state.
 * It takes the current state and an action, and returns the new state.
 *
 * @param state - The current application state.
 * @param action - The action dispatched to update the state.
 * @returns The new application state after applying the action.
 */
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_NOTES':
      // Replace the entire notes array. Often used after initial load.
      return {
        ...state,
        notes: action.payload,
        isLoading: false, // Assume loading is finished when notes are set
        error: null, // Clear any previous errors
      };

    case 'ADD_NOTE':
      // Add a new note to the beginning of the array for visibility.
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };

    case 'UPDATE_NOTE':
      // Find the note by ID and update its properties.
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, ...action.payload.data }
            : note,
        ),
      };

    case 'DELETE_NOTE':
      // Filter out the note with the specified ID.
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        // If the deleted note was selected, deselect it.
        selectedNoteId:
          state.selectedNoteId === action.payload
            ? null
            : state.selectedNoteId,
      };

    case 'SELECT_NOTE':
      // Set the ID of the currently selected note.
      return {
        ...state,
        selectedNoteId: action.payload,
      };

    case 'SET_LOADING':
      // Update the loading status.
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      // Set or clear the error message.
      return {
        ...state,
        error: action.payload,
        isLoading: false, // Assume loading stops if an error occurs
      };

    default:
      // For unhandled actions, return the current state unchanged.
      // This satisfies TypeScript's exhaustiveness check if AppAction is a discriminated union.
      return state;
  }
}