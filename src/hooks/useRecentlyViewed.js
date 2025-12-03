import { useState, useEffect } from 'react';

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const addToRecentlyViewed = (property) => {
    // Remove if already exists
    const filtered = recentlyViewed.filter(p => p.id !== property.id);
    
    // Add to beginning, keep only last 10
    const updated = [property, ...filtered].slice(0, 10);
    
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  return { recentlyViewed, addToRecentlyViewed };
};
