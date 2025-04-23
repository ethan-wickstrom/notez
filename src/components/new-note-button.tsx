import { Button } from '@mantine/core';
import type { JSX } from 'react';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';

/**
 * Button that creates a new, empty note and selects it.
 */
export function NewNoteButton(): JSX.Element {
  const { dispatch } = useAppContext();

  const handleClick = (): void => {
    const now: string = new Date().toISOString();
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '# New Note\n\n',
      createdAt: now,
      updatedAt: now,
    };

    dispatch({ type: 'ADD_NOTE', payload: newNote });
    dispatch({ type: 'SELECT_NOTE', payload: newNote.id });
  };

  return (
    <Button fullWidth variant="light" onClick={handleClick}>
      + New Note
    </Button>
  );
}