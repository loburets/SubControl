import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SubControl',
  description: 'Manage your spending on subscriptions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
