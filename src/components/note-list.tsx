import { Skeleton, Stack, Text } from '@mantine/core';
import { useAppContext } from '../state/app-context';
import { NoteListItem } from './note-list-item';
import type { JSX } from 'react';
import type { Note } from '../types';

/**
 * Filters notes based on search query
 */
function filterNotes(notes: Note[], searchQuery: string): Note[] {
  if (!searchQuery.trim()) return notes;

  const query = searchQuery.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
  );
}

/**
 * Renders the list of notes in the sidebar.
 * Handles loading state and displays notes using NoteListItem.
 */
export function NoteList(): JSX.Element {
  const { state } = useAppContext();
  const { notes, isLoading, searchQuery } = state;

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

  // Filter notes based on search query
  const filteredNotes = filterNotes(notes, searchQuery);

  if (filteredNotes.length === 0) {
    // No search results message
    return (
      <Text c="dimmed" size="sm" ta="center" mt="xl">
        No notes matching "{searchQuery}".
        <br />
        Try a different search term.
      </Text>
    );
  }

  // Render the filtered list using NoteListItem for each note
  return (
    // ScrollArea is handled by the parent AppShell.Section now
    <Stack gap="xs">
      {filteredNotes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </Stack>
  );
}