import { NavLink, Text, rgba } from '@mantine/core';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';
import type { JSX } from 'react';

type NoteListItemProps = {
  note: Note;
};

/**
 * Renders a single item in the note list.
 * Displays the note title and last updated time. Handles selection.
 * Uses subtle variant and enhanced active/hover states for better UX.
 */
export function NoteListItem({ note }: NoteListItemProps): JSX.Element {
  const { state, dispatch } = useAppContext();
  const isActive: boolean = state.selectedNoteId === note.id;

  const handleSelect = (): void => {
    dispatch({ type: 'SELECT_NOTE', payload: note.id });
  };

  // Format timestamp concisely
  const formattedTimestamp = new Date(note.updatedAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <NavLink
      label={note.title || 'Untitled Note'} // Display title or placeholder
      description={
        <Text span size="xs" c="dimmed">
          {formattedTimestamp}
        </Text>
      }
      active={isActive}
      onClick={handleSelect}
      variant="subtle" // Use subtle variant for less visual noise
      styles={(theme) => ({
        root: {
          borderRadius: theme.radius.sm,
          transition: 'background-color 150ms ease', // Add smooth transition
          '&:hover': {
            backgroundColor: isActive
              ? theme.colors[theme.primaryColor][8] // Slightly darker on hover when active
              : rgba(theme.colors[theme.primaryColor][9], 0.15), // Use imported rgba
          },
        },
        // Enhance active state for better figure/ground distinction
        label: {
          fontWeight: isActive ? 500 : 400, // Slightly bolder text when active
          color: isActive
            ? theme.colors[theme.primaryColor][1] // Lighter text color when active
            : theme.white, // Default text color
        },
        body: {
          // Ensure description color also contrasts well when active
          color: isActive
            ? theme.colors[theme.primaryColor][2] // Slightly dimmer description when active
            : undefined, // Use default dimmed color otherwise
        },
        // Apply a solid, slightly lighter background when active
        ...(isActive && {
          root: {
            backgroundColor: rgba(theme.colors[theme.primaryColor][8], 0.35), // Use imported rgba
            borderRadius: theme.radius.sm,
            '&:hover': {
              backgroundColor: rgba(theme.colors[theme.primaryColor][8], 0.45), // Use imported rgba
            },
          },
        }),
      })}
    />
  );
}
