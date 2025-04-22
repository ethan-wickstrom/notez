import { createTheme, MantineColorsTuple } from '@mantine/core';

// Example custom color - replace or extend as needed
const notezBlue: MantineColorsTuple = [
  '#e0f7ff',
  '#ccedff',
  '#99daff',
  '#66c7ff',
  '#40baff',
  '#26b0ff',
  '#09a9ff', // Primary shade
  '#0093e6',
  '#0082cc',
  '#0070b3',
];

export const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    notezBlue,
  },
  primaryColor: 'notezBlue',
  primaryShade: 6, // Corresponds to the primary shade index in notezBlue
  // Enforce dark theme as per requirements
  // defaultColorScheme: 'dark', // This is set in MantineProvider/ColorSchemeScript
});