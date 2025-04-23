import { AppShell, Burger, Group, Text, ScrollArea, TextInput } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications'; // Keep Notifications accessible globally
import { NoteList } from './components/note-list'; // Import the NoteList component
import { NoteEditor } from './components/note-editor'; // Import the NoteEditor component
import { NewNoteButton } from './components/new-note-button'; // Import the NewNoteButton component
import { useAppContext } from './state/app-context'; // Import useAppContext for search functionality
import type { JSX, ChangeEvent } from 'react'; // Import JSX type

// Main application component
function App(): JSX.Element {
  // Get state and dispatch from context
  const { state, dispatch } = useAppContext();
  // State for controlling the mobile navigation drawer
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // State for controlling the desktop navigation visibility
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  // Handle search input changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: event.currentTarget.value });
  };

  // Setup keyboard shortcuts
  useHotkeys([
    // Focus search box with Cmd/Ctrl+F
    ['mod+f', (event) => {
      event.preventDefault();
      const searchInput = document.querySelector('input[placeholder="Search notes..."]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }],
    // Clear search with Escape if search box is focused
    ['escape', () => {
      if (state.searchQuery && document.activeElement?.tagName === 'INPUT') {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
      }
    }],
  ]);

  return (
    <>
      {/* Notifications need to be within MantineProvider context */}
      <Notifications />
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250, // Adjust width as needed
          breakpoint: 'sm', // Breakpoint to switch between mobile/desktop views
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md" // Consistent padding for the main content area
      >
        {/* App Header */}
        <AppShell.Header>
          <Group h="100%" px="md" gap="sm">
            {/* Burger for mobile navigation toggle */}
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm" // Hide on screens larger than 'sm'
              size="sm"
              aria-label="Toggle navigation" // Accessibility label
            />
            {/* Burger for desktop navigation toggle */}
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm" // Show only on screens 'sm' and larger
              size="sm"
              aria-label="Toggle navigation" // Accessibility label
            />
            <Text size="xl" fw={700}>
              Notez
            </Text>
            {/* Search input, taking remaining space */}
            <TextInput
              placeholder="Search notes..."
              value={state.searchQuery}
              onChange={handleSearchChange}
              style={{ flex: 1 }}
              rightSection={state.searchQuery ? (
                <Text
                  size="xs"
                  c="dimmed"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}
                >
                  ESC
                </Text>
              ) : (
                <Text size="xs" c="dimmed">⌘F</Text>
              )}
            />
          </Group>
        </AppShell.Header>

        {/* App Navigation (Sidebar) */}
        <AppShell.Navbar p="md">
          {/* Section for the "New Note" button - always visible */}
          <AppShell.Section>
            <NewNoteButton />
          </AppShell.Section>

          {/* Section for the NoteList - grows and scrolls */}
          <AppShell.Section grow component={ScrollArea} mt="md">
            <NoteList />
          </AppShell.Section>
        </AppShell.Navbar>

        {/* Main Content Area */}
        <AppShell.Main>
          <NoteEditor />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;