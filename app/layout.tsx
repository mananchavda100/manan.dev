import { Providers } from './providers';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manan Chavda | Full-Stack Software Engineer',
  description: 'Full-Stack architecture portfolio ecosystem engineered with Next.js, Laravel, and advanced GSAP motion tracking tracks.',
  icons: {
    icon: '/favicon.ico', // Replace with your standard favicon token path
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="no-scrollbar">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

