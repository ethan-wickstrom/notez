import { createTheme, MantineColorsTuple } from '@mantine/core';

// Using a slightly brighter blue shade for better visibility in dark theme
const notezBlue: MantineColorsTuple = [
  '#e0f7ff', // 0
  '#ccedff', // 1
  '#99daff', // 2
  '#66c7ff', // 3
  '#40baff', // 4
  '#26b0ff', // 5 - Lighter primary shade for dark mode might be better
  '#09a9ff', // 6
  '#0093e6', // 7 - Chosen primary shade for dark mode
  '#0082cc', // 8
  '#0070b3', // 9
];

export const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    notezBlue,
  },
  primaryColor: 'notezBlue',
  // Use a specific shade suitable for dark mode contrast
  // Mantine's default dark shade is often 8, but 7 might offer better vibrancy here.
  primaryShade: 7,
  // defaultColorScheme is set in MantineProvider, no need to set here.
  // Add component default overrides if needed for consistency
  // components: {
  //   Button: {
  //     defaultProps: {
  //       variant: 'light', // Example: Make all buttons light by default
  //     },
  //   },
  // },
});
