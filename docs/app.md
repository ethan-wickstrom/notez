# App Component (`App.tsx`)

## Overview

The `App` component serves as the root layout structure for the Notez application. It utilizes Mantine's `AppShell` component to establish a common application layout including a fixed header, a navigation sidebar (navbar) containing the note list and creation button, and the main content area for the note editor. It also integrates the global `Notifications` system.

## Installation

This component is part of the core application structure and does not require separate installation. Ensure all project dependencies listed in `package.json` are installed using `bun install`.

## Core Concepts

-   **AppShell Layout**: Leverages `@mantine/core`'s `AppShell` to provide a responsive layout with a fixed header and a collapsible navbar for navigation.
-   **Responsive Navigation**: Implements toggles (`Burger` components with `aria-label`s) for showing/hiding the navbar on both mobile and desktop viewports using the `useDisclosure` hook from `@mantine/hooks`.
-   **Global Notifications**: Renders the `Notifications` component from `@mantine/notifications` to enable system-wide notifications.
-   **Navbar Structure (Gestalt: Proximity/Common Region)**: The `AppShell.Navbar` is structured with two sections:
    -   A non-scrollable top section containing the `NewNoteButton`.
    -   A scrollable main section (`AppShell.Section grow component={ScrollArea}`) containing the `NoteList`. This ensures the "New Note" action is always accessible, while the list itself can scroll independently.
-   **Note List Integration**: Renders the `NoteList` component within the scrollable section of `AppShell.Navbar`.
-   **Note Editor Integration**: Renders the `NoteEditor` component within `AppShell.Main`.
-   **State Management**: Relies on the `AppProvider` higher up to provide the context needed by its children like `NoteList` and `NoteEditor`.
-   **Header Layout**: Uses a `Group` with `justify="space-between"` and a spacer element to center the application title between the navigation toggles.

## API Reference

The `App` component does not accept any props and does not export any functions or sub-components for external use. It primarily orchestrates the main layout.

### Internal Hooks

-   `useDisclosure`: Used twice to manage the open/closed state of the navbar for mobile and desktop views independently.

## Usage Examples

The `App` component is rendered by `src/main.tsx` within the `MantineProvider` and `AppProvider`.

```typescript
// src/main.tsx (Simplified)
// ... imports ...
root.render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <AppProvider>
          <App /> {/* App component is rendered here */}
        </AppProvider>
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
);

// src/App.tsx (Structure)
import { AppShell, Burger, Group, ScrollArea, Text, rem } from '@mantine/core'; // Added rem
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { NoteList } from './components/note-list';
import { NoteEditor } from './components/note-editor';
import { NewNoteButton } from './components/new-note-button';
import type { JSX } from 'react';

function App(): JSX.Element {
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
          {/* Header Content (Burger, Title, Spacer) */}
          <Group h="100%" px="md" justify="space-between">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" aria-label="Toggle navigation" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" aria-label="Toggle navigation" />
            <Text size="xl" fw={700}>Notez</Text>
            {/* Use rem for spacer width */}
            <div style={{ width: 'var(--Burger-size, rem(30px))' }} />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          {/* Non-scrollable section for New Note button */}
          <AppShell.Section>
            <NewNoteButton />
          </AppShell.Section>
          {/* Scrollable section for the list */}
          <AppShell.Section grow component={ScrollArea} mt="md">
            <NoteList />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main style={{ height: 'calc(100vh - var(--app-shell-header-height))' }}>
          {/* Main Content Area (Note Editor) */}
          <NoteEditor />
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
-   Structure the `AppShell.Navbar` using `AppShell.Section` to separate static elements (like `NewNoteButton`) from scrollable content (`NoteList`).
-   Ensure global components like `Notifications` are rendered at a high level within the provider context.
-   Use Mantine's responsive props (`hiddenFrom`, `visibleFrom`, `breakpoint` on `AppShell.Navbar`) for handling layout changes across different screen sizes.
-   Provide `aria-label` attributes for interactive elements like `Burger` for accessibility.

## Troubleshooting

-   **Navbar not collapsing/expanding**: Verify the `collapsed` prop logic in `AppShell` and ensure the `useDisclosure` state and toggle functions are correctly linked to the `Burger` components. Check the `breakpoint` prop value.
-   **Notifications not appearing**: Ensure the `Notifications` component is rendered within the `MantineProvider` context.
-   **Layout issues/Scrolling**: Double-check `AppShell` configuration props (`header.height`, `navbar.width`, `padding`). Ensure the `AppShell.Section` structure within the Navbar is correct (static section + `grow component={ScrollArea}` section). Check for conflicting height styles.
-   **Title not centered in header**: Ensure the spacer `div` correctly balances the width of the `Burger` components.

## Related Modules

-   `src/main.tsx`: Initializes the React app and renders the `App` component within `MantineProvider` and `AppProvider`.
-   `src/theme.ts`: Provides the theme configuration used by `MantineProvider`.
-   `src/state/app-provider.tsx`: The component that provides the application context needed by child components like `NoteList` and `NoteEditor`.
-   `src/components/note-list.tsx`: Renders the list of notes in the navbar.
-   `src/components/note-editor.tsx`: Renders the editor for the selected note in the main area.
-   `src/components/new-note-button.tsx`: Renders the button to create new notes.
-   `@mantine/core/AppShell`: The core layout component used.
-   `@mantine/hooks/useDisclosure`: Hook used for managing toggle states.
-   `@mantine/notifications`: Provides the `Notifications` component.
-   `@mantine/core/ScrollArea`: Used within the Navbar section.

## Changelog

-   **2025-04-23**: Restructured `AppShell.Navbar` to place `NewNoteButton` above a scrollable `NoteList` section. Added spacer in header for better title centering. Added `aria-label` to `Burger` components. Ensured consistent padding/margins.
-   **2025-04-22**: Replaced placeholder text in `AppShell.Main` with the `NoteEditor` component (previously `NoteViewer`).
-   **2025-04-22**: Replaced placeholder note list logic with the dedicated `NoteList` component. Removed direct consumption of `notes` and `isLoading` state from `App.tsx`. Added `ScrollArea` to `AppShell.Navbar` section.
-   **Previous**: Integrated `useAppContext` to consume global state (notes, isLoading). Removed placeholder notes array. Updated Navbar to show loading skeletons.
-   **Previous**: Initial refactoring. Replaced placeholder content with a structured `AppShell` layout including Header, Navbar, and Main sections. Added responsive navigation toggles. Integrated `Notifications`.
```