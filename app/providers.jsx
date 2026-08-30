'use client';
import { ThemeProvider } from 'next-themes';

/**
 * @param {any} props
 */
export function Providers(props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {props.children}
    </ThemeProvider>
  );
}
