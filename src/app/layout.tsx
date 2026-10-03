import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personalized Content Dashboard',
  description: 'A dynamic, user-centric content dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ClientLayout>
             {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
