import { useState, useEffect } from 'react';
import {
  Box,
  LoadingOverlay,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';
import type { JSX } from 'react';
import { init, mdToHtml } from 'md4w';

// Import the WASM file URL using a relative path
import wasmUrl from '../../node_modules/md4w/js/md4w-fast.wasm?url';

/**
 * Displays the content of the selected note, parsing Markdown to HTML.
 */
export function NoteViewer(): JSX.Element {
  const { state } = useAppContext();
  const { notes, selectedNoteId } = state;
  const [htmlContent, setHtmlContent] = useState<string>('');
  // State to track if md4w WASM is initializing
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const selectedNote: Note | undefined = notes.find(
    (note) => note.id === selectedNoteId,
  );

  // Initialize md4w parser on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Initialize md4w with the explicitly imported WASM file URL
        await init(wasmUrl);
        if (isMounted) {
          setIsInitializing(false); // Initialization complete
        }
      } catch (error: unknown) {
        console.error('Failed to initialize md4w parser:', error);
        if (isMounted) {
          setIsInitializing(false); // Still set to false on error
          notifications.show({
            title: 'Error',
            message: 'Failed to initialize Markdown parser.',
            color: 'red',
          });
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []); // Run only once on mount

  // Parse markdown when selected note changes and parser is initialized
  useEffect(() => {
    // Only parse if initialization is done and a note is selected
    if (!isInitializing && selectedNote) {
      try {
        // mdToHtml is synchronous after init()
        const html: string = mdToHtml(selectedNote.content, {
          // Add desired parse flags here if needed, e.g., GFM features
          parseFlags: [
            'DEFAULT',
            "COLLAPSE_WHITESPACE",
            "LATEX_MATH_SPANS",
            "NO_HTML"
          ],
        });
        setHtmlContent(html);
      } catch (error: unknown) {
        console.error('Failed to parse markdown:', error);
        setHtmlContent('<p>Error parsing Markdown content.</p>');
        notifications.show({
          title: 'Error',
          message: 'Failed to parse Markdown content.',
          color: 'red',
        });
      }
    } else if (!selectedNote) {
      setHtmlContent(''); // Clear content if no note is selected
    }
  }, [selectedNote, isInitializing]); // Depend on note selection and initialization state

  if (!selectedNoteId || !selectedNote) {
    return (
      <Box p="md">
        <Text c="dimmed">Select a note to view its content.</Text>
      </Box>
    );
  }

  // Content is loading only during the initial WASM load
  const isContentLoading: boolean = isInitializing;

  return (
    <Box pos="relative" p="md">
      <LoadingOverlay
        visible={isContentLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Title order={2} mb="md">
        {selectedNote.title || 'Untitled Note'}
      </Title>
      <TypographyStylesProvider>
        {/* Render the parsed HTML */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </TypographyStylesProvider>
      <Text size="xs" c="dimmed" mt="xl">
        Created: {new Date(selectedNote.createdAt).toLocaleString()} | Updated:{' '}
        {new Date(selectedNote.updatedAt).toLocaleString()}
      </Text>
    </Box>
  );
}