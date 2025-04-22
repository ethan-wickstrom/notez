import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications'; // Keep Notifications accessible globally

// Example: Define a simple type for Note (replace with actual type later)
type Note = {
  id: string;
  title: string;
  // Add other note properties here
};

// Main application component
function App() {
  // State for controlling the mobile navigation drawer
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // State for controlling the desktop navigation visibility (optional, can be always visible)
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  // Placeholder for notes state (replace with Context/Reducer later)
  const notes: Note[] = []; // Example: Initialize with an empty array

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
            />
            {/* Burger for desktop navigation toggle (optional) */}
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm" // Show only on screens 'sm' and larger
              size="sm"
            />
            <Text size="xl" fw={700}>
              Notez
            </Text>
            {/* Add other header elements like search or user menu here */}
            <div /> {/* Placeholder to balance justify-content */}
          </Group>
        </AppShell.Header>

        {/* App Navigation (Sidebar) */}
        <AppShell.Navbar p="md">
          <Text mb="md" fw={500}>
            Notes
          </Text>
          {/* Placeholder for Note List - Replace with actual NoteList component */}
          {notes.length === 0 ? (
            <Text c="dimmed" size="sm">
              No notes yet.
            </Text>
          ) : (
            notes.map((note) => (
              <Skeleton key={note.id} h={28} mt="sm" animate={false} />
            ))
          )}
          {/* Add "New Note" button here */}
        </AppShell.Navbar>

        {/* Main Content Area */}
        <AppShell.Main>
          {/* Placeholder for Note Editor/Viewer */}
          <Text>Select a note or create a new one.</Text>
          {/* Example: Render NoteEditor or NoteViewer based on selected note state */}
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;