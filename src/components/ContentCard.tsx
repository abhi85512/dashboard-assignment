'use client';

import { ContentItem } from '@/services/mockApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/preferencesSlice';
import { Heart, ExternalLink, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

interface Props {
  item: ContentItem;
}

export default function ContentCard({ item }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.preferences.favorites);
  const isFavorite = favorites.includes(item.id);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'news': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'social': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'recommendation': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-md transition-all cursor-grab active:cursor-grabbing flex flex-col"
    >
      {item.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold capitalize backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm ${getTypeColor(item.type).split(' ')[0]}`}>
              {item.type}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-5 flex-1 flex flex-col">
        {!item.imageUrl && (
           <div className="mb-3">
             <span className={`px-2 py-1 rounded-md text-xs font-semibold capitalize ${getTypeColor(item.type)}`}>
               {item.type}
             </span>
           </div>
        )}
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {item.author && <span className="font-medium text-gray-700 dark:text-gray-300">{item.author}</span>}
            {item.author && <span>•</span>}
            <span>{formatDistanceToNow(new Date(item.date), { addSuffix: true })}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => { e.preventDefault(); dispatch(toggleFavorite(item.id)); }}
              className={`p-1.5 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'}`}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
