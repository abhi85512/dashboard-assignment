'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContent, reorderContent } from '@/store/slices/contentSlice';
import ContentCard from './ContentCard';
import { Reorder, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Feed() {
  const dispatch = useAppDispatch();
  const { items, status, hasMore, page, searchQuery } = useAppSelector(state => state.content);
  const categories = useAppSelector(state => state.preferences.categories);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial fetch when categories or query changes
    dispatch(fetchContent({ query: searchQuery, categories, page: 1 }));
  }, [categories, searchQuery, dispatch]);

  const loadMore = useCallback(() => {
    if (status === 'loading' || !hasMore) return;
    dispatch(fetchContent({ query: searchQuery, categories, page: page + 1 }));
  }, [status, hasMore, searchQuery, categories, page, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
         // eslint-disable-next-line react-hooks/exhaustive-deps
         observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore]);

  if (status === 'idle' || (status === 'loading' && items.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={32} />
        <p className="text-gray-500 dark:text-gray-400">Curating your personalized feed...</p>
      </div>
    );
  }

  if (items.length === 0) {
     return (
       <div className="flex flex-col items-center justify-center h-64 text-center">
         <div className="text-6xl mb-4">📭</div>
         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No content found</h3>
         <p className="text-gray-500 dark:text-gray-400 max-w-md">
           We couldn&apos;t find anything matching your preferences. Try adjusting your selected categories or search query.
         </p>
       </div>
     )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Feed</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Personalized based on your preferences. Drag cards to reorder.</p>
      </div>

      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={(newOrder) => dispatch(reorderContent(newOrder))}
        className="flex flex-col gap-6"
        style={{ listStyleType: 'none' }}
      >
        <AnimatePresence>
          {items.map((item) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              style={{ listStyleType: 'none', position: 'relative' }}
            >
              <ContentCard item={item} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {hasMore && (
        <div ref={observerTarget} className="py-10 flex justify-center">
          {status === 'loading' && <Loader2 className="animate-spin text-blue-500" size={32} />}
        </div>
      )}
    </div>
  );
}
