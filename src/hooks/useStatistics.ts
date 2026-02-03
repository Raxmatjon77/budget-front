import { useState, useEffect } from 'react';
import { statisticsApi } from '@/api/statistics';
import type { Statistics, MonthlySummary, BrotherStats } from '@/types';

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getStatistics();
      setStatistics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return { statistics, loading, error, refetch: fetchStatistics };
}

export function useMonthlySummary(months: number = 12) {
  const [summary, setSummary] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await statisticsApi.getMonthlySummary(months);
        setSummary(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [months]);

  return { summary, loading };
}

export function usePerBrotherStatistics() {
  const [stats, setStats] = useState<BrotherStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await statisticsApi.getPerBrotherStatistics();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { stats, loading };
}
