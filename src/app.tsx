import { useState } from 'react'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { AppShell, Button, Card, Code, MantineProvider, Text, DEFAULT_THEME, Center } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider theme={DEFAULT_THEME}>
      <Notifications />
      <AppShell
        header={{
          height: 60,
        }}
        padding="md"
      >
        <AppShell.Header px="md">
          <Center h="100%" w="max-content">
            <Text variant='h1'>Vite + React</Text>
          </Center>
        </AppShell.Header>
        <AppShell.Main>
          <Card>
            <Button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
            <Text variant='body'>
              Edit <Code>src/App.tsx</Code> and save to test HMR
            </Text>
            <Text variant='body'>
              Click on the Vite and React logos to learn more
            </Text>
          </Card>
        </AppShell.Main>
      </AppShell>
    </MantineProvider >
  )
}

export default App
