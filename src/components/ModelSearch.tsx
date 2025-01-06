import React, { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useModelSearch } from '../hooks/useModelSearch';
import { useMindmapStore } from '../store/mindmapStore';
import { ModelCard } from './ModelCard';
import { Model } from '../types/model';
import { useDebounce } from '../hooks/useDebounce';

export const ModelSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const { models, loading, searchForModels } = useModelSearch();
  const addNode = useMindmapStore((state) => state.addNode);
  const debouncedSearch = useDebounce(searchForModels, 300);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim()) {
      debouncedSearch(value);
    }
  }, [debouncedSearch]);

  const handleAddModel = (model: Model) => {
    const newNode = {
      id: `node-${Math.random()}`,
      type: 'default',
      position: { x: 400, y: 400 },
      data: {
        label: model.name,
        description: model.description,
        category: 'leaf'
      }
    };
    addNode(newNode);
  };

  return (
    <div className="absolute bottom-4 left-4 z-10 w-80">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search AI models..."
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>
      </div>

      {models.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onSelect={handleAddModel}
            />
          ))}
        </div>
      )}
    </div>
  );
};