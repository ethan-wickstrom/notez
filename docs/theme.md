# Theme (`theme.ts`)

## Overview

This module defines the custom Mantine theme configuration for the Notez application. It overrides default Mantine theme values like colors, primary color/shade, and potentially component default styles to ensure a consistent visual identity, specifically tailored for the required dark theme.

## Installation

This module is part of the core application structure (`src/`) and does not require separate installation. It's imported and used by `MantineProvider` in `src/main.tsx`.

```typescript
// src/main.tsx
import { theme } from './theme';
import { MantineProvider } from '@mantine/core';

// ...
root.render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    {/* ... */}
  </MantineProvider>
);
```

## Core Concepts

-   **Theme Overriding**: Uses Mantine's `createTheme` function to define overrides that are merged with the `DEFAULT_THEME`.
-   **Custom Colors**: Defines a custom color tuple (`notezBlue`) to be used within the application.
-   **Primary Color/Shade**: Sets the application's primary color (`primaryColor`) and the specific shade (`primaryShade`) to be used by default in components like `Button`, `NavLink`, etc., optimized for the dark theme.
-   **Dark Theme Focus**: While `defaultColorScheme` is set in `MantineProvider`, the theme configuration itself (e.g., `primaryShade`) is chosen with the dark theme in mind.

## API Reference

### Function: `createTheme(override)`

Mantine function used to define a theme override object.

Parameters:

-   `override` (`MantineThemeOverride`): An object containing properties to override in the default Mantine theme.

Returns:

-   (`MantineThemeOverride`): The theme override object.

### Constant: `theme`

The exported theme override object created by `createTheme`.

Properties (Example):

-   `colors`: An object containing custom color definitions (e.g., `notezBlue`). Each color must be a `MantineColorsTuple` (an array of 10 color strings).
-   `primaryColor`: A string key referencing a color defined in `theme.colors` (e.g., `'notezBlue'`).
-   `primaryShade`: A number (0-9) or an object (`{ light: number; dark: number }`) indicating the default shade index to use for the `primaryColor`.

## Usage Examples

The `theme` object is passed to the `MantineProvider` in `src/main.tsx`. Components throughout the application automatically consume this theme via context.

```typescript
// src/theme.ts
import { createTheme, MantineColorsTuple } from '@mantine/core';

// Enhanced blue color palette with improved contrast
const notezBlue: MantineColorsTuple = [
  '#e6f7ff', '#ccedff', '#99daff', '#66c7ff', '#40baff',
  '#26b0ff', '#09a9ff', '#1a90ff', '#0082cc', '#006bb3',
];

// Rich purple accent for highlights
const notezPurple: MantineColorsTuple = [
  '#f5e8ff', '#e5d1ff', '#d2b0ff', '#bc8aff', '#a66cff',
  '#9955ff', '#8c3eff', '#7a28ff', '#6600ff', '#5500d4',
];

// Subtle gray palette for backgrounds and borders
const notezGray: MantineColorsTuple = [
  '#f9f9fb', '#f0f0f5', '#e6e6ef', '#dbdbe8', '#c4c4d5',
  '#acacc0', '#8d8da8', '#73738c', '#55556d', '#2a2a3c',
];

export const theme = createTheme({
  colors: {
    notezBlue,
    notezPurple,
    notezGray,
  },
  primaryColor: 'notezBlue',
  primaryShade: 7, // Optimized for dark theme
  defaultRadius: 'sm',
  
  components: {
    Button: {
      defaultProps: {
        tt: 'capitalize',
      },
      styles: (theme) => ({
        root: {
          transition: 'all 150ms ease',
        },
      }),
    },
    // ...other component overrides
  },
});

// src/components/some-component.tsx
import { Button, NavLink, Badge, useMantineTheme } from '@mantine/core';

function SomeComponent() {
  const currentTheme = useMantineTheme(); // Access the merged theme
  
  return (
    <>
      {/* Button uses theme.primaryColor ('notezBlue') and theme.primaryShade (7) by default */}
      <Button>Primary Action</Button>
      
      {/* NavLink inherits the 'subtle' variant from theme */}
      <NavLink label="Navigation Item" />
      
      {/* Use accent color for important UI elements */}
      <Badge color="notezPurple">New</Badge>
      
      {/* Access theme properties programmatically */}
      <div style={{
        backgroundColor: currentTheme.colors.notezGray[8],
        padding: currentTheme.spacing.md,
        borderRadius: currentTheme.radius.sm
      }}>
        Themed container
      </div>
    </>
  );
}
```
    // Button uses theme.primaryColor ('notezBlue') and theme.primaryShade (7) by default
    <Button>Primary Action</Button>
  );
}
```

## Best Practices

-   Define custom colors and primary settings here to maintain consistency.
-   Keep the theme focused on design tokens (colors, spacing, fonts, radius). Component-specific style overrides can also go here under `theme.components`, but use sparingly.
-   Ensure custom color tuples have exactly 10 shades. Use the [Mantine Colors Generator tool](https://mantine.dev/colors-generator/) if needed.
-   Choose `primaryShade` carefully for good contrast and visual appeal, especially considering the enforced dark theme.

## Troubleshooting

-   **Theme not applying**: Ensure `MantineProvider` is wrapping the application in `main.tsx` and the `theme` object is correctly passed to it. Check for typos in theme property names.
-   **Incorrect colors**: Verify the color definitions in `theme.colors` and the `primaryColor`/`primaryShade` settings. Ensure CSS variables are being generated correctly (inspect `:root` or the `cssVariablesSelector` element in DevTools).
-   **TypeScript errors**: If adding custom colors or sizes, ensure you augment the Mantine theme types via module declaration (`*.d.ts` file) as described in Mantine's documentation.

## Related Modules

-   `src/main.tsx`: Imports and applies the theme using `MantineProvider`.
-   `@mantine/core`: Provides `createTheme` and the default theme structure.
-   All components that consume theme values (implicitly or explicitly).

## Changelog

-   **2025-04-23**: Adjusted `primaryShade` to 7 for potentially better dark mode contrast. Added comments.
-   **2025-04-22**: Initial definition of the custom theme with `notezBlue`.
```