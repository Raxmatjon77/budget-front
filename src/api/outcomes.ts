import api from './client';
import type { Outcome } from '@/types';

interface CreateOutcomeRequest {
  description: string;
  totalAmountCents: number;
  createdBy: number;
  splits: Array<{
    brotherId: number;
    percentage: number;
  }>;
}

export const outcomesApi = {
  /**
   * Create a new outcome transaction
   */
  createOutcome: async (data: CreateOutcomeRequest): Promise<Outcome> => {
    const response = await api.post<Outcome>('/outcomes', data);
    return response.data;
  },

  /**
   * Get all outcomes with optional filters
   */
  getOutcomes: async (params?: {
    limit?: number;
    offset?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Outcome[]> => {
    const response = await api.get<Outcome[]>('/outcomes', { params });
    return response.data;
  },

  /**
   * Get outcome by ID
   */
  getOutcome: async (id: number): Promise<Outcome> => {
    const response = await api.get<Outcome>(`/outcomes/${id}`);
    return response.data;
  },

  /**
   * Get outcome statistics
   */
  getStats: async (): Promise<{
    totalAmountCents: number;
    count: number;
    largestOutcome: { id: number; description: string; amountCents: number } | null;
  }> => {
    const response = await api.get('/outcomes/stats');
    return response.data;
  },
};
