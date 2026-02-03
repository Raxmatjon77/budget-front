import { useState, useEffect } from 'react';
import { brothersApi } from '@/api/brothers';
import type { Brother } from '@/types';

export function useBrothers() {
  const [brothers, setBrothers] = useState<Brother[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrothers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await brothersApi.getBrothers();
      setBrothers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch brothers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrothers();
  }, []);

  return { brothers, loading, error, refetch: fetchBrothers };
}
