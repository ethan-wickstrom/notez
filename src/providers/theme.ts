import {
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
  type MantineColorsTuple,
} from "@mantine/core";

// --- 1. Define Custom Colors ---
// Keep your custom color tuple. Consider a more descriptive name if 'myColor'
// isn't specific enough for its purpose (e.g., 'brandPrimary', 'accentPurple').
const brandPurple: MantineColorsTuple = [
  "#f6eeff", // 0: Lightest shade
  "#e7d9f7", // 1
  "#cab1ea", // 2
  "#ad86dd", // 3
  "#9462d2", // 4
  "#854bcb", // 5
  "#7d3fc9", // 6: Typical primary shade for light mode
  "#6b31b2", // 7
  "#5f2ba0", // 8: Typical primary shade for dark mode
  "#52238d", // 9: Darkest shade
];

// --- 2. Create the Theme using createTheme ---
// `createTheme` merges your overrides with the default Mantine theme.
// You don't need to redefine everything, just what you want to change or add.
export const coreTheme = createTheme({
  // --- Core Branding ---
  /**
   * Adds our custom color palette. `createTheme` automatically includes
   * Mantine's default colors (blue, red, etc.) unless you explicitly overwrite them.
   * It's generally best to add your custom colors alongside the defaults.
   */
  colors: {
    brandPurple,
  },

  /**
   * Sets the primary color for the application. This key MUST exist in `theme.colors`.
   * Components like Button, Badge, etc., will use this color by default.
   */
  primaryColor: "brandPurple",

  /**
   * Specifies which shade of the `primaryColor` to use.
   * You can define different shades for light and dark color schemes.
   * Using indices 6 (light) and 8 (dark) is a common practice that often
   * provides good contrast. Adjust as needed based on your `brandPurple` shades.
   */
  primaryShade: { light: 6, dark: 8 },

  // --- Typography ---
  /**
   * Define the default font family for the entire application.
   * Using a system font stack is a safe and performant default.
   * Replace with your custom font if you have one configured (e.g., 'Inter, sans-serif').
   */
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',

  /**
   * Define the monospace font family, used in components like `<Code />` or `<Kbd />`.
   */
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  /**
   * Customize heading styles (h1-h6).
   */
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"', // Can be same as default or different
    fontWeight: "700", // Example: Make headings bolder
    // Sizes can also be customized, e.g.:
    // sizes: {
    //   h1: { fontSize: '3.5rem', lineHeight: '1.2' },
    // },
  },

  // --- Layout & Spacing ---
  /**
   * Set the default border-radius used by most components.
   * Options: 'xs', 'sm', 'md', 'lg', 'xl' or a number (in px).
   */
  defaultRadius: "lg",

  // --- Behavior & Accessibility ---
  /**
   * Controls focus ring visibility. 'auto' (default) shows only on keyboard nav.
   * 'always' shows on mouse/keyboard. 'never' hides (not recommended).
   */
  focusRing: "auto",

  /**
   * Changes cursor to `pointer` for interactive elements that don't have it by default (like Checkbox).
   * 'default' uses the browser/element default cursor.
   */
  cursorType: "pointer",

  // --- Component Overrides (Optional but powerful) ---
  /**
   * Define default props, styles, or classNames for specific Mantine components.
   * This helps maintain consistency across your application.
   */
  components: {
    // Example: Set default props for all Buttons
    // Button: {
    //   defaultProps: {
    //     size: 'sm',
    //     radius: 'xl', // Override defaultRadius specifically for Buttons
    //   },
    // },
    // Example: Set default props for Notifications (if used)
    // Notifications: {
    //   defaultProps: {
    //     position: 'top-right',
    //     zIndex: 1000,
    //   },
    // },
    // Example: Add base styles to Card
    // Card: {
    //   styles: {
    //      root: { borderColor: 'var(--mantine-color-gray-3)' }
    //   }
    // }
  },

  // --- Other Custom Properties (Advanced) ---
  /**
   * Add any custom properties you want accessible via the theme object.
   */
  // other: {
  //   customSpacing: '100px',
  //   myAppConfig: { setting: true },
  // },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, coreTheme);
