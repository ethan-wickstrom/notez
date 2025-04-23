import { createTheme, MantineColorsTuple, rgba } from '@mantine/core';

// Enhanced blue color palette with improved contrast
const notezBlue: MantineColorsTuple = [
  '#e6f7ff', // 0
  '#ccedff', // 1
  '#99daff', // 2
  '#66c7ff', // 3
  '#40baff', // 4
  '#26b0ff', // 5
  '#09a9ff', // 6
  '#1a90ff', // 7 - Enhanced primary shade
  '#0082cc', // 8
  '#006bb3', // 9
];

// Rich purple accent for highlights
const notezPurple: MantineColorsTuple = [
  '#f5e8ff', // 0
  '#e5d1ff', // 1
  '#d2b0ff', // 2
  '#bc8aff', // 3
  '#a66cff', // 4
  '#9955ff', // 5
  '#8c3eff', // 6
  '#7a28ff', // 7
  '#6600ff', // 8
  '#5500d4', // 9
];

// Subtle gray palette for backgrounds and borders
const notezGray: MantineColorsTuple = [
  '#f9f9fb', // 0
  '#f0f0f5', // 1
  '#e6e6ef', // 2
  '#dbdbe8', // 3
  '#c4c4d5', // 4
  '#acacc0', // 5
  '#8d8da8', // 6
  '#73738c', // 7
  '#55556d', // 8
  '#2a2a3c', // 9
];

export const theme = createTheme({
  /** Enhanced Mantine theme with better colors and defaults */
  colors: {
    notezBlue,
    notezPurple,
    notezGray,
  },
  primaryColor: 'notezBlue',
  // Use a specific shade suitable for dark mode contrast
  primaryShade: 7,

  // Consistent component styling
  components: {
    Button: {
      defaultProps: {
        tt: 'capitalize',
      },
      styles: () => ({
        root: {
          transition: 'all 150ms ease',
        },
      }),
    },
    NavLink: {
      defaultProps: {
        variant: 'subtle',
      },
    },
    TextInput: {
      styles: (theme: { colors: { [x: string]: string[]; }; primaryColor: string | number; fn: { rgba: (arg0: string, arg1: number) => string; }; }) => ({
        input: {
          transition: 'all 150ms ease',
          '&:focus': {
            borderColor: theme.colors[theme.primaryColor][5],
            boxShadow: `0 0 0 2px ${rgba(
              theme.colors[theme.primaryColor][5],
              0.35
            )}`,
          },
        },
      }),
    },
    RichTextEditor: {
      styles: (theme: { spacing: { md: number; lg: number; xs: number; sm: number; }; radius: { sm: number; }; colors: { [x: string]: string[]; }; primaryColor: string | number; }) => ({
        content: {
          '.ProseMirror': {
            padding: theme.spacing.md,
            minHeight: '300px',
            lineHeight: 1.6,
          },
          'h1, h2, h3, h4, h5, h6': {
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.xs,
          },
          'p': {
            marginBottom: theme.spacing.sm,
          },
          'pre': {
            borderRadius: theme.radius.sm,
            padding: theme.spacing.xs,
          },
          'blockquote': {
            borderLeftColor: theme.colors[theme.primaryColor][7],
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          },
          'a': {
            color: theme.colors[theme.primaryColor][4],
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      }),
    },
  },

  // Default radius for consistency
  defaultRadius: 'sm',
});