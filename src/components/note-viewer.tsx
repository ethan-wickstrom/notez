import { useState, useEffect, useRef } from 'react';
import {
  Box,
  LoadingOverlay,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import type { Note } from '../types';
import { useAppContext } from '../state/app-context';
import type { JSX } from 'react';
import type * as MarkdownWasm from 'markdown-wasm';
import { notifications } from '@mantine/notifications';

// Dynamically import markdown-wasm
const loadMarkdownParser = async (): Promise<typeof MarkdownWasm> => {
  return await import('markdown-wasm');
};

/**
 * Displays the content of the selected note, parsing Markdown to HTML.
 */
export function NoteViewer(): JSX.Element {
  const { state } = useAppContext();
  const { notes, selectedNoteId } = state;
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoadingParser, setIsLoadingParser] = useState<boolean>(true);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const parserRef = useRef<typeof MarkdownWasm | null>(null);

  const selectedNote: Note | undefined = notes.find(
    (note) => note.id === selectedNoteId,
  );

  // Initialize markdown-wasm parser on mount
  useEffect(() => {
    let isMounted = true;
    void (async () => {
      try {
        const md = await loadMarkdownParser();
        if (isMounted) {
          parserRef.current = md;
          setIsLoadingParser(false);
        }
      } catch (error: unknown) {
        console.error('Failed to load markdown parser:', error);
        if (isMounted) {
          setIsLoadingParser(false); // Stop loading even on error
          notifications.show({
            title: 'Error',
            message: 'Failed to load markdown parser',
            color: 'red',
          });
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Parse markdown when selected note changes or parser is ready
  useEffect(() => {
    if (selectedNote && parserRef.current && !isLoadingParser) {
      setIsParsing(true);
      try {
        const html: string = parserRef.current.parse(selectedNote.content);
        setHtmlContent(html);
      } catch (error: unknown) {
        console.error('Failed to parse markdown:', error);
        setHtmlContent('<p>Error parsing Markdown content.</p>');
        notifications.show({
          title: 'Error',
          message: 'Failed to parse markdown',
          color: 'red',
        });
      } finally {
        setIsParsing(false);
      }
    } else if (!selectedNote) {
      setHtmlContent(''); // Clear content if no note is selected
    }
  }, [selectedNote, isLoadingParser]);

  if (!selectedNoteId || !selectedNote) {
    return (
      <Box p="md">
        <Text c="dimmed">Select a note to view its content.</Text>
      </Box>
    );
  }

  const isContentLoading: boolean = isLoadingParser || isParsing;

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
        {/* Using dangerouslySetInnerHTML as markdown-wasm outputs HTML string */}
        {/* Ensure content is trusted (user's own notes) */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </TypographyStylesProvider>
      <Text size="xs" c="dimmed" mt="xl">
        Created: {new Date(selectedNote.createdAt).toLocaleString()} | Updated:{' '}
        {new Date(selectedNote.updatedAt).toLocaleString()}
      </Text>
    </Box>
  );
}
