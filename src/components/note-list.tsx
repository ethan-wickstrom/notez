import {Skeleton, Stack, Text} from '@mantine/core';
import {DragDropContext, Draggable, Droppable, DropResult,} from '@hello-pangea/dnd';
import {useAppContext} from '../state/app-context';
import {NoteListItem} from './note-list-item';
import type {JSX} from 'react';
import type {Note} from '../types';

function filterNotes(notes: readonly Note[], query: string): readonly Note[] {
  if (!query.trim()) return notes;
  const q = query.toLowerCase();
  return notes.filter(
    (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q),
  );
}

function reorder<T>(list: readonly T[], from: number, to: number): T[] {
  const result = Array.from(list);
  const [moved] = result.splice(from, 1);
  result.splice(to, 0, moved);
  return result;
}

export function NoteList(): JSX.Element {
  const {state, dispatch} = useAppContext();
  const { notes, isLoading, searchQuery } = state;

  if (isLoading) {
    return (
      <Stack gap="xs">
        {Array.from({length: 4}).map((_, i) => (
          <Skeleton key={i} h={28} animate/>
        ))}
      </Stack>
    );
  }

  if (notes.length === 0) {
    return (
      <Text c="dimmed" size="sm" ta="center" mt="xl">
        No notes yet.
        <br />
        Click "+ New Note" to create one!
      </Text>
    );
  }

  const filtered = filterNotes(notes, searchQuery).toSorted((a, b) => a.order - b.order);

  if (filtered.length === 0) {
    return (
      <Text c="dimmed" size="sm" ta="center" mt="xl">
        No notes matching "{searchQuery}".
        <br />
        Try a different search term.
      </Text>
    );
  }

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    const reordered = reorder(filtered, result.source.index, result.destination.index);
    dispatch({type: 'REORDER_NOTES', payload: reordered.map((n) => n.id)});
  };

  // Disable DnD while searching to avoid confusion
  if (searchQuery.trim()) {
    return (
      <Stack gap="xs">
        {filtered.map((n) => (
          <NoteListItem key={n.id} note={n}/>
        ))}
      </Stack>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="notes">
        {(dropProvided) => (
          <Stack
            gap="xs"
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {filtered.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                  >
                    <NoteListItem note={note}/>
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
