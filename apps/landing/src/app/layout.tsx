// All Mantine packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  MantineColorsTuple,
  createTheme,
} from '@mantine/core';

export const metadata = {
  title: 'SubControl',
  description: 'Manage your spending on subscriptions',
};

const brandColors: MantineColorsTuple = [
  '#e3f6ff',
  '#cce8ff',
  '#9acdff',
  '#64b1ff',
  '#399afe',
  '#1f8bfe',
  '#0984ff',
  '#0071e4',
  '#0064cd',
  '#0056b6',
];

// TODO remove redundant styles
const theme = createTheme({
  colors: {
    brand: brandColors,
  },
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  headings: {
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.5rem', lineHeight: '1.4' },
    },
  },
  components: {
    Button: {
      defaultProps: {
        color: 'brand',
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: 'transform 0.2s ease',
          ':hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    Container: {
      defaultProps: {
        size: 'lg',
        px: { base: 20, sm: 40, lg: 80 },
      },
    },
    Title: {
      styles: {
        root: {
          letterSpacing: '-0.01em',
        },
      },
    },
    Text: {
      styles: {
        root: {
          lineHeight: 1.6,
        },
      },
    },
  },
  other: {
    boxShadow:
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    transition: 'all 0.2s ease',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
