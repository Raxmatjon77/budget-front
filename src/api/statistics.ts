import api from './client';
import type { Statistics, BrotherStats, MonthlySummary } from '@/types';

export const statisticsApi = {
  /**
   * Get all statistics
   */
  getStatistics: async (): Promise<Statistics> => {
    const response = await api.get<Statistics>('/statistics');
    return response.data;
  },

  /**
   * Get monthly summary
   */
  getMonthlySummary: async (months: number = 12): Promise<MonthlySummary[]> => {
    const response = await api.get<MonthlySummary[]>('/statistics/monthly', {
      params: { months },
    });
    return response.data;
  },

  /**
   * Get per-brother statistics
   */
  getPerBrotherStatistics: async (): Promise<BrotherStats[]> => {
    const response = await api.get<BrotherStats[]>('/statistics/per-brother');
    return response.data;
  },
};
