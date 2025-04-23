import { NavLink, Text, Box, Group, rgba } from '@mantine/core';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';
import type { JSX } from 'react';

/**
 * Extracts a short content preview from note, removing markdown formatting
 */
function getContentPreview(content: string, maxLength: number = 60): string {
  // Remove markdown formatting for preview
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove heading markers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]+?```/g, '[Code Block]') // Replace code blocks
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Replace links with just text
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return `${plainText.slice(0, maxLength)}...`;
}

/**
 * Formats a date to a friendly string
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Today - show time
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit'
    });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    // Older notes - show date
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    });
  }
}

type NoteListItemProps = {
  note: Note;
};

/**
 * Renders a single item in the note list.
 * Displays the note title, a content preview, and last updated time.
 * Handles selection with enhanced visual states.
 */
export function NoteListItem({ note }: NoteListItemProps): JSX.Element {
  const { state, dispatch } = useAppContext();
  const isActive: boolean = state.selectedNoteId === note.id;

  const handleSelect = (): void => {
    dispatch({ type: 'SELECT_NOTE', payload: note.id });
  };
  
  const preview = getContentPreview(note.content);
  const updateTime = formatDate(note.updatedAt);

  return (
    <NavLink
      label={
        <Text fw={500} truncate>
          {note.title || 'Untitled Note'}
        </Text>
      }
      description={
        <Box mt={2}>
          <Text size="xs" c="dimmed" lineClamp={2}>
            {preview}
          </Text>
          <Group justify="flex-end" mt={4}>
            <Text size="xs" c="dimmed">
              {updateTime}
            </Text>
          </Group>
        </Box>
      }
      active={isActive}
      onClick={handleSelect}
      variant="subtle" // Use subtle variant for less visual noise
      styles={(theme) => ({
        root: {
          borderRadius: theme.radius.sm,
          padding: theme.spacing.xs,
          transition: 'all 150ms ease', // Add smooth transition
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