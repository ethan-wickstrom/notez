/**
 * Rich-text "Note Editor” (Mantine + Tiptap)
 *
 * This component provides a rich text editing experience for the selected note.
 * It features debounced autosaving, a comprehensive toolbar, keyboard shortcuts,
 * delete confirmation, and timestamp display.
 *
 * Architecture: Thin wrapper (`NoteEditor`) renders `NoteEditorInner`
 * conditionally, ensuring hooks run unconditionally.
 */
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml'; // For HTML
import { createLowlight } from 'lowlight'; // Use createLowlight factory

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from 'react';
import { useAppContext } from '../state/app-context';
import type { Note } from '../types';

// Create lowlight instance and register languages
const lowlight = createLowlight();
lowlight.register({
  ts: ts,
  js: js,
  css: css,
  html: html,
});

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const DEBOUNCE_MS: number = 400; // Debounce interval for autosave

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Custom hook for debounced effect execution.
 * Runs `callback` after `delay` ms have elapsed since the latest change to `deps`.
 * @param callback - The function to execute after the debounce period.
 * @param deps - Dependencies that trigger the debounce timer reset.
 * @param delay - The debounce delay in milliseconds.
 */
function useDebouncedEffect(
  callback: () => void,
  deps: readonly unknown[],
  delay: number,
): void {
  const timeoutId = useRef<number>(0);

  useEffect(() => {
    window.clearTimeout(timeoutId.current);
    timeoutId.current = window.setTimeout(callback, delay);

    // Cleanup function to clear timeout on unmount or dependency change
    return () => {
      window.clearTimeout(timeoutId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]); // Include delay in dependencies
}

/* -------------------------------------------------------------------------- */
/* Sub-component with all editing logic                                       */
/* -------------------------------------------------------------------------- */

type NoteEditorInnerProps = {
  note: Note;
};

/**
 * Inner component containing the actual editor logic and UI.
 * This component assumes a valid `note` prop is passed.
 */
function NoteEditorInner({ note }: NoteEditorInnerProps): JSX.Element {
  const { dispatch } = useAppContext();
  const [title, setTitle] = useState<string>(note.title);

  // --- Title State Synchronization & Debounced Save ---
  useEffect(() => {
    // Reset local title state if the selected note changes
    setTitle(note.title);
  }, [note.id, note.title]);

  useDebouncedEffect(
    () => {
      // Only dispatch update if the title has actually changed
      if (title !== note.title) {
        dispatch({
          type: 'UPDATE_NOTE',
          payload: { id: note.id, data: { title } },
        });
      }
    },
    [title, note.id, note.title, dispatch], // Include note.title and dispatch
    DEBOUNCE_MS,
  );

  // --- Tiptap Editor Setup & Debounced Content Save ---
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default CodeBlock to use CodeBlockLowlight
      }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false, // Keep false for better UX in editor
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your note here...',
      }),
      CodeBlockLowlight.configure({
        lowlight, // Pass the created instance
      }),
    ],
    content: note.content, // Initial content
    onUpdate({ editor: ed }) {
      // Trigger debounced save on content update
      debouncedPersistContent(ed.getHTML());
    },
  }, [note.id]); // Re-initialize editor only when note ID changes

  // Reset editor content when the selected note changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== note.content) {
      editor.commands.setContent(note.content, false); // Set content without emitting update event
    }
  }, [note.content, editor]);

  // Debounced content persistence logic
  const contentTimeout = useRef<number>(0);
  const debouncedPersistContent = useCallback(
    (html: string): void => {
      window.clearTimeout(contentTimeout.current);
      contentTimeout.current = window.setTimeout(() => {
        // Only dispatch if content actually changed from the persisted state
        if (html !== note.content) {
          dispatch({
            type: 'UPDATE_NOTE',
            payload: { id: note.id, data: { content: html } },
          });
        }
      }, DEBOUNCE_MS);
    },
    [dispatch, note.id, note.content], // Include note.content
  );

  // --- Delete Action with Confirmation ---
  const handleDelete = useCallback((): void => {
    modals.openConfirmModal({
      title: 'Delete Note',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the note "{note.title || 'Untitled'}"? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete note', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        dispatch({ type: 'DELETE_NOTE', payload: note.id });
        dispatch({ type: 'SELECT_NOTE', payload: null }); // Deselect after delete
        notifications.show({
          title: 'Note Deleted',
          message: `"${note.title || 'Untitled'}" was successfully removed.`,
          color: 'green', // Use green for success feedback
        });
      },
    });
  }, [dispatch, note.id, note.title]);

  // --- Render ---
  return (
    <Box p="md" pos="relative" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <LoadingOverlay visible={editor == null} />

      {/* Title & Delete Button */}
      <Group mb="sm" align="center" justify="space-between">
        <TextInput
          flex={1}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder="Note title"
          radius="sm"
          aria-label="Note Title"
          // Add some visual weight to the title input
          styles={{ input: { fontSize: rem(18), fontWeight: 500 } }}
        />
        <Button variant="light" color="red" onClick={handleDelete}>
          Delete Note
        </Button>
      </Group>

      {/* Rich-text area */}
      <RichTextEditor editor={editor} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <RichTextEditor.Toolbar sticky stickyOffset={0}>
          {/* Group common formatting */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          {/* Group headings */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          {/* Group lists and structure */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Blockquote />
            <RichTextEditor.CodeBlock />
            <RichTextEditor.Hr />
          </RichTextEditor.ControlsGroup>

          {/* Group links */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          {/* Group history */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        {/* Ensure content area grows and scrolls */}
        <RichTextEditor.Content
          style={{ flexGrow: 1, overflowY: 'auto', minHeight: rem(300) }}
        />
      </RichTextEditor>

      {/* Timestamps */}
      <Group justify="flex-end" mt="xs">
        <Text size="xs" c="dimmed">
          Created: {new Date(note.createdAt).toLocaleString()}
        </Text>
        <Text size="xs" c="dimmed">
          Updated: {new Date(note.updatedAt).toLocaleString()}
        </Text>
      </Group>
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/* Public component exported to application                                   */
/* -------------------------------------------------------------------------- */

/**
 * NoteEditor Wrapper Component
 *
 * Determines if a note is selected and renders the inner editor (`NoteEditorInner`)
 * or a placeholder message. This structure ensures hooks within the inner component
 * are called unconditionally when a note is selected.
 */
export function NoteEditor(): JSX.Element {
  const { state } = useAppContext();
  const selectedNote: Note | undefined = useMemo(
    () => state.notes.find((n) => n.id === state.selectedNoteId),
    [state.notes, state.selectedNoteId],
  );

  // Display placeholder if no note is selected
  if (selectedNote == null) {
    return (
      <Box p="md" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text c="dimmed">Select a note to start editing — or create one!</Text>
      </Box>
    );
  }

  // Render the inner editor component when a note is selected
  return <NoteEditorInner note={selectedNote} />;
}
