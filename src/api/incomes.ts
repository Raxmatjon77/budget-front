import api from './client';
import type { Income } from '@/types';

interface CreateIncomeRequest {
  brotherId: number;
  amountCents: number;
  description?: string;
}

export const incomesApi = {
  /**
   * Create a new income transaction
   */
  createIncome: async (data: CreateIncomeRequest): Promise<Income> => {
    const response = await api.post<Income>('/incomes', data);
    return response.data;
  },

  /**
   * Get all incomes with optional filters
   */
  getIncomes: async (params?: {
    limit?: number;
    offset?: number;
    brotherId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Income[]> => {
    const response = await api.get<Income[]>('/incomes', { params });
    return response.data;
  },

  /**
   * Get income by ID
   */
  getIncome: async (id: number): Promise<Income> => {
    const response = await api.get<Income>(`/incomes/${id}`);
    return response.data;
  },

  /**
   * Get income statistics
   */
  getStats: async (): Promise<{ totalAmountCents: number; count: number }> => {
    const response = await api.get('/incomes/stats');
    return response.data;
  },
};
