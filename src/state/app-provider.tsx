import { type ReactNode, useReducer, useMemo, type JSX } from 'react';
import { AppContext } from './app-context';
import { appReducer, initialState } from './app-reducer';

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
 * It initializes the state using the `appReducer` and `initialState`.
 *
 * @param props - The component props.
 * @param props.children - The child components to render within the provider.
 * @returns A context provider wrapping the children components.
 */
export function AppProvider({ children }: AppProviderProps): JSX.Element {
  // Initialize the state and dispatch function using the reducer
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  // when the provider itself re-renders without state/dispatch changing.
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}