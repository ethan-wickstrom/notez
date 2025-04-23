import { Skeleton, Stack, Text } from '@mantine/core';
import { useAppContext } from '../state/app-context';
import { NoteListItem } from './note-list-item';
import type { JSX } from 'react';

/**
 * Renders the list of notes in the sidebar.
 * Handles loading state and displays notes using NoteListItem.
 */
export function NoteList(): JSX.Element {
  const { state } = useAppContext();
  const { notes, isLoading } = state;

  if (isLoading) {
    // Consistent loading state using Skeleton
    return (
      <Stack gap="xs">
        <Skeleton h={28} animate />
        <Skeleton h={28} animate />
        <Skeleton h={28} animate />
        <Skeleton h={28} animate />
      </Stack>
    );
  }

  if (notes.length === 0) {
    // Improved empty state message
    return (
      <Text c="dimmed" size="sm" ta="center" mt="xl">
        No notes yet.
        <br />
        Click "+ New Note" to create one!
      </Text>
    );
  }

  // Render the list using NoteListItem for each note
  return (
    // ScrollArea is handled by the parent AppShell.Section now
    <Stack gap="xs">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </Stack>
  );
}
