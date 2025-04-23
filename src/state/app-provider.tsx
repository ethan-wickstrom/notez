import {
  type JSX,
  type ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { AppContext } from './app-context';
import { appReducer, initialState } from './app-reducer';
import { getAllNotes, saveNotes } from '../db/notes-db';
import { notifications } from '@mantine/notifications';

/**
 * Props for the AppProvider component.
 */
type AppProviderProps = {
  /**
   * The child components that will have access to the application state context.
   */
  children: ReactNode;
};

/**
 * The AppProvider component wraps the application (or parts of it)
 * to provide the application state and dispatch function via context.
 * It initialises the state using the `appReducer` and `initialState`.
 *
 * It also hydrates state from IndexedDB on mount and persistently stores
 * every subsequent change. Asynchronous side-effects live here rather than
 * inside the reducer to keep the reducer pure.
 */
export function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialState);

  /**
   * Hydrate state from IndexedDB on initial mount.
   */
  useEffect(() => {
    void (async () => {
      try {
        const persisted = await getAllNotes();
        dispatch({ type: 'SET_NOTES', payload: persisted });
      } catch (error: unknown) {
        if (error instanceof Error) {
          notifications.show({
            title: 'Error',
            message: 'Failed to load notes',
            color: 'red',
          });
          dispatch({
            type: 'SET_ERROR',
            payload: error.message,
          });
        } else {
          notifications.show({
            title: 'Error',
            message: 'Failed to load notes',
            color: 'red',
          });
          dispatch({
            type: 'SET_ERROR',
            payload: 'Failed to load notes',
          });
        }
      }
    })();
    // Empty dependency array → only run once
  }, []);

  /**
   * Persist notes whenever they change (after the initial load completes).
   */
  useEffect(() => {
    if (state.isLoading) return; // Avoid saving placeholder/loading state
    void saveNotes(state.notes).catch((error: unknown) => {
      if (error instanceof Error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to persist notes',
          color: 'red',
        });
        dispatch({
          type: 'SET_ERROR',
          payload: error.message,
        });
      } else {
        notifications.show({
          title: 'Error',
          message: 'Failed to persist notes',
          color: 'red',
        });
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to persist notes',
        });
      }
    });
  }, [state.notes, state.isLoading]);

  const contextValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch],
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}