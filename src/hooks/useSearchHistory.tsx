import { useEffect, useState } from 'react';

const STORAGE_KEY = 'weather_search_history';

const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addToHistory = (city: string) => {
    setHistory((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)].slice(0, 20); // unique + max 20
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (city: string) => {
    setHistory((prev) => {
      const updated = prev.filter((c) => c !== city);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addToHistory, removeFromHistory };
};

export default useSearchHistory;
