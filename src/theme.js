export const theme = {
  config: {
    initialColorModeName: 'light',
    useColorSchemeMediaQuery: false,
    useCustomProperties: false,
    useLocalStorage: true,
  },
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#2D2D2D', // Softer black for text
    background: '#F9FAFB', // Light grey for a gentle background
    primary: '#1F74C8', // Slightly darker blue for better contrast
    disabled: '#A8A8A8', // Subdued grey for disabled elements
    modes: {
      dark: {
        primary: '#4AA8FF', // Softer blue for dark mode
        text: '#EDEDED', // Light grey for text in dark mode
        background: '#121212', // Very dark grey, less harsh than pure black
        disabled: '#3A3B3C', // Dim grey for disabled elements in dark mode
      },
    },
  },

  // Light mode button states
  buttons: {
    primary: {
      backgroundColor: 'transparent',
      color: 'text',
      cursor: 'pointer',
      transition: 'none',
      '&:hover': {
        color: 'primary',
      },

      '&:disabled': {
        backgroundColor: 'muted',
        color: 'disabled',
        cursor: 'not-allowed',
      },
    },
    active: {
      color: 'primary',
      transform: 'scale(0.98)',
      backgroundColor: 'transparent',
      border: '2px solid',
      borderColor: 'primary',
      outline: '1px solid',
      outlineColor: 'disabled',
      outlineOffset: '-5px',

      '&:disabled': {
        backgroundColor: 'muted',
        color: 'disabled',
        cursor: 'not-allowed',
        border: 'none',
        outline: 'none',
        transform: 'none',
      },
    },
  },

  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
}
