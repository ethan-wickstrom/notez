import { AppShell, Burger, Group, Text, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications'; // Keep Notifications accessible globally
import { NoteList } from './components/note-list'; // Import the NoteList component
import { NoteViewer } from './components/note-viewer'; // Import the NoteViewer component
import { NewNoteButton } from './components/new-note-button'; // Import the NewNoteButton component

// Main application component
function App() {
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
        padding="md"
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
              aria-label="Toggle navigation"
            />
            {/* Burger for desktop navigation toggle */}
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm" // Show only on screens 'sm' and larger
              size="sm"
              aria-label="Toggle navigation"
            />
            <Text size="xl" fw={700}>
              Notez
            </Text>
          </Group>
        </AppShell.Header>

        {/* App Navigation (Sidebar) */}
        <AppShell.Navbar p="md">
          {/* Render the NoteList component */}
          <AppShell.Section grow component={ScrollArea}>
            <NewNoteButton />
            <NoteList />
          </AppShell.Section>
        </AppShell.Navbar>

        {/* Main Content Area */}
        <AppShell.Main>
          {/* Render the NoteViewer component */}
          <NoteViewer />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;