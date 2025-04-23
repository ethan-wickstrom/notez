import { NavLink } from '@mantine/core';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';
import type { JSX } from 'react';

type NoteListItemProps = {
  note: Note;
};

/**
 * Renders a single item in the note list.
 * Displays the note title and handles selection.
 */
export function NoteListItem({ note }: NoteListItemProps): JSX.Element {
  const { state, dispatch } = useAppContext();
  const isActive: boolean = state.selectedNoteId === note.id;

  const handleSelect = (): void => {
    dispatch({ type: 'SELECT_NOTE', payload: note.id });
  };

  return (
    <NavLink
      label={note.title || 'Untitled Note'} // Display title or placeholder
      // description={`Updated: ${new Date(note.updatedAt).toLocaleString()}`} // Add timestamps later
      active={isActive}
      onClick={handleSelect}
      variant="subtle" // Use subtle variant for less visual noise
      styles={{
        // Example: Add subtle hover effect if needed
        // root: {
        //   '&:hover': {
        //     backgroundColor: 'var(--mantine-color-dark-6)',
        //   },
        // },
      }}
    />
  );
}
