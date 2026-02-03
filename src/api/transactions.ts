import api from './client';
import type { Transaction } from '@/types';

export const transactionsApi = {
  /**
   * Get transaction history with filters
   */
  getTransactions: async (params?: {
    type?: 'income' | 'outcome' | 'all';
    limit?: number;
    offset?: number;
    brotherId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<{ transactions: Transaction[]; total: number }> => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  /**
   * Get balance history
   */
  getBalanceHistory: async (limit: number = 30): Promise<
    Array<{ date: string; balance: number }>
  > => {
    const response = await api.get('/transactions/balance-history', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Export transactions to Excel
   */
  exportTransactions: async (params?: {
    type?: 'income' | 'outcome' | 'all';
    brotherId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> => {
    const response = await api.get('/transactions/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
