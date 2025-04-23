import { ScrollArea, Skeleton, Stack, Text } from '@mantine/core';
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
    return (
      <Text c="dimmed" size="sm" ta="center" mt="md">
        No notes yet. Create one!
      </Text>
    );
  }

  return (
    <ScrollArea h="100%" type="auto" offsetScrollbars="y">
      <Stack gap="xs">
        {notes.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </Stack>
    </ScrollArea>
  );
}