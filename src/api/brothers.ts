import api from './client';
import type { Brother } from '@/types';

export const brothersApi = {
  /**
   * Get all brothers
   */
  getBrothers: async (): Promise<Brother[]> => {
    const response = await api.get<Brother[]>('/brothers');
    return response.data;
  },

  /**
   * Get brother with contributions
   */
  getBrothersWithContributions: async (): Promise<
    Array<Brother & { totalContributed: number }>
  > => {
    const response = await api.get('/brothers/with-contributions');
    return response.data;
  },

  /**
   * Get brother by ID
   */
  getBrother: async (id: number): Promise<Brother> => {
    const response = await api.get<Brother>(`/brothers/${id}`);
    return response.data;
  },
};
