# App Component (`App.tsx`)

## Overview

The `App` component serves as the root layout structure for the Notez application. It utilizes Mantine's `AppShell` component to establish a common application layout including a header, a navigation sidebar (navbar), and the main content area. It also integrates the global `Notifications` system.

## Installation

This component is part of the core application structure and does not require separate installation. Ensure all project dependencies listed in `package.json` are installed using `bun install`.

## Core Concepts

-   **AppShell Layout**: Leverages `@mantine/core`'s `AppShell` to provide a responsive layout with a fixed header and a collapsible navbar for navigation.
-   **Responsive Navigation**: Implements toggles (`Burger` components) for showing/hiding the navbar on both mobile and desktop viewports using the `useDisclosure` hook from `@mantine/hooks`.
-   **Global Notifications**: Renders the `Notifications` component from `@mantine/notifications` to enable system-wide notifications.
-   **Note List Integration**: Renders the `NoteList` component within the `AppShell.Navbar` to display the user's notes.
-   **Note Editor Integration**: Renders the `NoteEditor` component within `AppShell.Main` to edit the content of the selected note.
-   **State Management**: Relies on the `AppProvider` higher up to provide the context needed by its children like `NoteList` and `NoteViewer`.

## API Reference

The `App` component does not accept any props and does not export any functions or sub-components for external use. It primarily orchestrates the main layout.

### Internal Hooks

-   `useDisclosure`: Used twice to manage the open/closed state of the navbar for mobile and desktop views independently.

## Usage Examples

The `App` component is rendered by `src/main.tsx` within the `MantineProvider`.

```typescript
// src/main.tsx (Simplified)
import { MantineProvider } from '@mantine/core';
import App from './App.tsx';
import { theme } from './theme.ts';

// ... root rendering logic ...
root.render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App /> {/* App component is rendered here */}
    </MantineProvider>
  </StrictMode>,
);

// src/App.tsx (Structure)
import { AppShell, Burger, Group, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { NoteList } from './components/note-list'; // Import NoteList

function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <Notifications />
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          {/* Header Content (Burger, Title) */}
          <Group h="100%" px="md" justify="space-between">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" aria-label="Toggle navigation" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" aria-label="Toggle navigation" />
            <Text size="xl" fw={700}>Notez</Text>
            <div />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          {/* Navbar Content (Note List) */}
           <AppShell.Section grow component={ScrollArea}>
             <NoteList />
           </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
          {/* Main Content Area (Note Viewer) */}
          <NoteViewer />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;
```

## Best Practices

-   Keep the `App` component focused on the overall layout structure.
-   Delegate specific functionalities (like note listing, editing) to child components rendered within `AppShell.Navbar` and `AppShell.Main`.
-   Ensure global components like `Notifications` are rendered at a high level within the provider context but typically outside the main `AppShell` structure if they shouldn't be part of the shell's layout constraints (though placing inside is also fine if desired).
-   Use Mantine's responsive props (`hiddenFrom`, `visibleFrom`, `breakpoint` on `AppShell.Navbar`) for handling layout changes across different screen sizes.

## Troubleshooting

-   **Navbar not collapsing/expanding**: Verify the `collapsed` prop logic in `AppShell` and ensure the `useDisclosure` state and toggle functions are correctly linked to the `Burger` components. Check the `breakpoint` prop value.
-   **Notifications not appearing**: Ensure the `Notifications` component is rendered within the `MantineProvider` context.
-   **Layout issues**: Double-check `AppShell` configuration props (`header.height`, `navbar.width`, `padding`). Ensure CSS Modules or other styling methods aren't conflicting with `AppShell`'s internal styles.

## Related Modules

-   `src/main.tsx`: Initializes the React app and renders the `App` component within `MantineProvider` and `AppProvider`.
-   `src/theme.ts`: Provides the theme configuration used by `MantineProvider`.
-   `src/state/app-provider.tsx`: The component that provides the application context needed by child components like `NoteList` and `NoteViewer`.
-   `src/components/note-list.tsx`: Renders the list of notes in the navbar.
-   `src/components/note-viewer.tsx`: Renders the content of the selected note in the main area.
-   `@mantine/core/AppShell`: The core layout component used.
-   `@mantine/hooks/useDisclosure`: Hook used for managing toggle states.
-   `@mantine/notifications`: Provides the `Notifications` component.
-   `@mantine/core/ScrollArea`: Used within the Navbar section.

## Changelog
-   **2025-04-22**: Replaced placeholder text in `AppShell.Main` with the `NoteViewer` component.
-   **2025-04-22**: Replaced placeholder note list logic with the dedicated `NoteList` component. Removed direct consumption of `notes` and `isLoading` state from `App.tsx`. Added `ScrollArea` to `AppShell.Navbar` section.
-   **Previous**: Integrated `useAppContext` to consume global state (notes, isLoading). Removed placeholder notes array. Updated Navbar to show loading skeletons.
-   **Previous**: Initial refactoring. Replaced placeholder content with a structured `AppShell` layout including Header, Navbar, and Main sections. Added responsive navigation toggles. Integrated `Notifications`.