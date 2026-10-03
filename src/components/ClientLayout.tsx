'use client';

import { useAppSelector } from '@/store/hooks';
import Sidebar from './Sidebar';
import Header from './Header';
import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 flex overflow-hidden`}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
