import { useState, useEffect, useCallback } from 'react';
import { transactionsApi } from '@/api/transactions';
import type { Transaction, TransactionFilters } from '@/types';

export function useTransactions(filters?: TransactionFilters) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { type, brotherId, startDate, endDate, limit, offset } = filters || {};

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        type,
        brotherId,
        startDate,
        endDate,
        limit: limit || 100,
        offset: offset || 0,
      };
      const data = await transactionsApi.getTransactions(params);
      setTransactions(data.transactions);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [type, brotherId, startDate, endDate, limit, offset]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, total, loading, error, refetch: fetchTransactions };
}
