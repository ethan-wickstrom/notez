import { useState } from 'react';
import { AppShell, Button, Card, Code, Text, Center } from '@mantine/core';
import { Notifications } from '@mantine/notifications'; // Keep Notifications here as it's part of the layout

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      {/* Notifications need to be within MantineProvider context, but rendered outside AppShell usually */}
      <Notifications />
      <AppShell
        header={{
          height: 60,
        }}
        padding="md"
      >
        <AppShell.Header px="md">
          <Center h="100%" w="max-content">
            {/* Use Text component for semantic headings if needed, or adjust as per design */}
            <Text size="xl" fw={700}>
              Notez
            </Text>
          </Center>
        </AppShell.Header>
        <AppShell.Main>
          <Card>
            <Button onClick={() => setCount((currentCount) => currentCount + 1)}>
              count is {count}
            </Button>
            <Text mt="sm">
              Edit <Code>src/App.tsx</Code> and save to test HMR
            </Text>
            <Text mt="xs">
              Click on the Vite and React logos to learn more
            </Text>
          </Card>
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;