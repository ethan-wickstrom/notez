import type {AppAction, AppState} from './app-state';

/**
 * The initial state for the application when it first loads.
 */
export const initialState: AppState = {
  notes: [],
  selectedNoteId: null,
  isLoading: true,
  error: null,
  searchQuery: '',
};

/** Ensure every loaded note has an order and sort ascending */
function normalizeNotes(raw: ReadonlyArray<AppState['notes'][number]>): AppState['notes'] {
  return raw
    .map((n, idx) => ({...n, order: (n as { order?: number }).order ?? idx}))
    .sort((a, b) => a.order - b.order);
}

/** Re-index contiguous order after mutations */
function renumber(notes: AppState['notes']): AppState['notes'] {
  return notes.map((n, i) => ({...n, order: i}));
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_NOTES':
      return {
        ...state,
        notes: normalizeNotes(action.payload),
        isLoading: false,
        error: null,
      };

    case 'ADD_NOTE': {
      const shifted = state.notes.map((n) => ({...n, order: n.order + 1}));
      return {
        ...state,
        notes: renumber([{...action.payload, order: 0}, ...shifted]),
      };
    }

    case 'UPDATE_NOTE': {
      const now = new Date().toISOString();
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? {...n, ...action.payload.data, updatedAt: now}
            : n,
        ),
      };
    }

    case 'DELETE_NOTE': {
      const remaining = state.notes.filter((n) => n.id !== action.payload);
      return {
        ...state,
        notes: renumber(remaining),
        selectedNoteId:
          state.selectedNoteId === action.payload ? null : state.selectedNoteId,
      };
    }

    case 'REORDER_NOTES': {
      const lookup = new Map(action.payload.map((id, i) => [id, i]));
      return {
        ...state,
        notes: renumber(
          state.notes
            .map((n) => ({...n, order: lookup.get(n.id) ?? n.order}))
            .sort((a, b) => a.order - b.order),
        ),
      };
    }

    case 'SELECT_NOTE':
      return {...state, selectedNoteId: action.payload};

    case 'SET_LOADING':
      return {...state, isLoading: action.payload};

    case 'SET_ERROR':
      return {...state, error: action.payload, isLoading: false};

    case 'SET_SEARCH_QUERY':
      return {...state, searchQuery: action.payload};

    default:
      return state;
  }
}
