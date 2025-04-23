import { AppShell, Burger, Group, Text, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications'; // Keep Notifications accessible globally
import { NoteList } from './components/note-list'; // Import the NoteList component
import { NoteEditor } from './components/note-editor'; // Import the NoteEditor component
import { NewNoteButton } from './components/new-note-button'; // Import the NewNoteButton component
import type { JSX } from 'react'; // Import JSX type

// Main application component
function App(): JSX.Element {
  // State for controlling the mobile navigation drawer
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // State for controlling the desktop navigation visibility
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
          <Group h="100%" px="md" justify="space-between">
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
            {/* Empty div for spacing, ensuring title is centered */}
            <div style={{ width: 'var(--Burger-size, rem(30px))' }} />
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