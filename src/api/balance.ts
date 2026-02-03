import api from './client';
import type { Balance } from '@/types';

export const balanceApi = {
  /**
   * Get current shared balance
   */
  getBalance: async (): Promise<Balance> => {
    const response = await api.get<Balance>('/balance');
    return response.data;
  },
};
