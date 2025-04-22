import { createContext, useContext, type Dispatch } from 'react';
import type { AppAction, AppState } from './app-state';
import { initialState } from './app-reducer'; // Import initial state

/**
 * Defines the shape of the context value provided by AppProvider.
 */
export type AppContextValue = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

/**
 * Creates the React context for the application state.
 * It's initialized with a default value which includes the initial state
 * and a no-op dispatch function. This default is primarily for type safety
 * and situations where a component might consume the context without a provider higher up,
 * though that shouldn't happen in a correctly structured app.
 */
export const AppContext = createContext<AppContextValue>({
  state: initialState, // Use imported initial state
  dispatch: () => null, // No-operation function as default dispatch
});

/**
 * Custom hook to easily consume the AppContext.
 * Provides a convenient way for components to access the application state and dispatch function.
 * Throws an error if used outside of an AppProvider, ensuring proper context usage.
 *
 * @returns The current application state and dispatch function from the context.
 * @throws {Error} If the hook is used outside of an AppProvider component.
 */
export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    // This error signifies a programming mistake – using the hook without the provider.
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}