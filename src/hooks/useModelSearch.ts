import { useState, useCallback } from 'react';
import { searchModels, ModelInfo } from '../services/huggingface';

export function useModelSearch() {
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchForModels = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchModels(query);
      setModels(results);
    } catch (err) {
      setError('Failed to fetch models');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { models, loading, error, searchForModels };
}