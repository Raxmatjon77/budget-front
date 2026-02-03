import { useState } from 'react';
import { incomesApi } from '@/api/incomes';
import type { Income, CreateIncomeFormData } from '@/types';
import { parseAmountToCents } from '@/utils/format';

export function useIncome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIncome = async (formData: CreateIncomeFormData): Promise<Income | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await incomesApi.createIncome({
        brotherId: formData.brotherId,
        amountCents: parseAmountToCents(formData.amount),
        description: formData.description || undefined,
      });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create income';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createIncome, loading, error };
}
