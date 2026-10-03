'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleDarkMode } from '@/store/slices/preferencesSlice';
import { setSearchQuery } from '@/store/slices/contentSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { Search, Moon, Sun, Bell, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(state => state.preferences.darkMode);
  
  const [localQuery, setLocalQuery] = useState('');
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 md:px-6">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Search news, recommendations..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button 
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white cursor-pointer shadow-md">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
