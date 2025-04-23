import { Button, Text } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import type { JSX } from 'react';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';

/**
 * Button that creates a new, empty note and selects it.
 * Supports keyboard shortcut: ⌘N
 */
export function NewNoteButton(): JSX.Element {
  const { dispatch } = useAppContext();

  const createNewNote = (): void => {
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

  // Register the keyboard shortcut
  useHotkeys([
    ['mod+n', (event) => {
      event.preventDefault();
      createNewNote();
    }],
  ]);

  return (
    <Button
      fullWidth
      variant="light"
      onClick={createNewNote}
      rightSection={<Text size="xs" c="dimmed">⌘N</Text>}
    >
      + New Note
    </Button>
  );
}
