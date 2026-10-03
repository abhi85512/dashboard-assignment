export interface ContentItem {
  id: string;
  type: 'news' | 'recommendation' | 'social';
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  category: string;
  date: string;
  author?: string;
}

export const fetchMockData = async (query: string, categories: string[], page: number = 1): Promise<{ data: ContentItem[], hasMore: boolean }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const allData: ContentItem[] = [
    {
      id: 'news-1',
      type: 'news',
      title: 'Tech Giants Announce New AI Models',
      description: 'Major technology companies have unveiled their latest artificial intelligence models, promising unprecedented capabilities.',
      category: 'technology',
      date: new Date().toISOString(),
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'news-2',
      type: 'news',
      title: 'Global Markets Rally on Tech Earnings',
      description: 'Stock markets around the world saw significant gains today following better-than-expected earnings reports from the tech sector.',
      category: 'finance',
      date: new Date().toISOString(),
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'social-1',
      type: 'social',
      title: 'Just finished a great workout! 💪 #fitness',
      description: 'Feeling amazing after hitting a new PR. Consistency is key.',
      category: 'sports',
      date: new Date().toISOString(),
      author: '@fitnessfanatic',
      url: '#',
    },
    {
      id: 'rec-1',
      type: 'recommendation',
      title: 'The Future of Quantum Computing',
      description: 'A deep dive into how quantum computers will revolutionize problem solving in the next decade.',
      category: 'technology',
      date: new Date().toISOString(),
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
       id: 'rec-2',
       type: 'recommendation',
       title: 'Top 10 Movies to Watch This Weekend',
       description: 'Check out our curated list of the best movies streaming right now.',
       category: 'entertainment',
       date: new Date().toISOString(),
       url: '#',
       imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
       id: 'social-2',
       type: 'social',
       title: 'Can anyone recommend a good book on React? #reactjs',
       description: 'Looking to level up my frontend skills this month.',
       category: 'technology',
       date: new Date().toISOString(),
       author: '@dev_newbie',
       url: '#',
    }
  ];

  // filter by category
  let filtered = allData;
  if (categories.length > 0) {
      filtered = filtered.filter(item => categories.includes(item.category));
  }

  if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(q) || 
          item.description.toLowerCase().includes(q)
      );
  }

  // Generate more dummy data for infinite scroll demo
  const extendedData: ContentItem[] = [];
  for (let i = 0; i < 20; i++) {
     filtered.forEach(item => {
        extendedData.push({
           ...item,
           id: `${item.id}-${i}`,
           title: `${item.title} (Clone ${i})`,
           imageUrl: item.imageUrl ? `${item.imageUrl}?v=${i}` : undefined
        })
     });
  }

  const result = [...filtered, ...extendedData];
  
  // Pagination
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const paginatedResult = result.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedResult,
    hasMore: startIndex + pageSize < result.length
  };
};
