import './globals.css';
// All Mantine packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import {
  ColorSchemeScript,
  MantineProvider,
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

export const defaultTextColor =
  'light-dark(var(--text-color-light-theme), var(--text-color-dark-theme))';

// TODO remove redundant styles
const theme = createTheme({
  colors: {
    brand: brandColors,
  },
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  components: {
    Title: {
      styles: {
        root: {
          color: defaultTextColor,
        },
      },
    },
    Text: {
      styles: {
        root: {
          lineHeight: 1.6,
          color: defaultTextColor,
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
