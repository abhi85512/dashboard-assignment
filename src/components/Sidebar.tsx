'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategories } from '@/store/slices/preferencesSlice';
import { LayoutDashboard, TrendingUp, Heart, Settings, Rss, Film, MonitorPlay, Activity } from 'lucide-react';
import { useState } from 'react';

const allCategories = [
  { id: 'technology', label: 'Technology', icon: MonitorPlay },
  { id: 'sports', label: 'Sports', icon: Activity },
  { id: 'entertainment', label: 'Entertainment', icon: Film },
  { id: 'finance', label: 'Finance', icon: TrendingUp },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector((state) => state.preferences.categories);
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      dispatch(setCategories(selectedCategories.filter(c => c !== categoryId)));
    } else {
      dispatch(setCategories([...selectedCategories, categoryId]));
    }
  };

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-10`}>
      <div className="p-4 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700">
        {isOpen && <span className="font-bold text-xl text-blue-600 dark:text-blue-400">Dashify</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
          <LayoutDashboard size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        <div>
          {isOpen && <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <Rss size={20} />
              {isOpen && <span>My Feed</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <TrendingUp size={20} />
              {isOpen && <span>Trending</span>}
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Heart size={20} />
              {isOpen && <span>Favorites</span>}
            </a>
          </nav>
        </div>

        <div>
          {isOpen && <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Preferences</p>}
          <div className="space-y-1">
             {allCategories.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${isSelected ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={isSelected ? 'text-blue-500' : ''} />
                      {isOpen && <span>{cat.label}</span>}
                    </div>
                    {isOpen && (
                       <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                       </div>
                    )}
                  </button>
                )
             })}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
           <Settings size={20} />
           {isOpen && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
