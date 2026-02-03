import { useState } from 'react';
import { outcomesApi } from '@/api/outcomes';
import type { Outcome, CreateOutcomeFormData } from '@/types';
import { parseAmountToCents } from '@/utils/format';

export function useOutcome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOutcome = async (formData: CreateOutcomeFormData): Promise<Outcome | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await outcomesApi.createOutcome({
        description: formData.description,
        totalAmountCents: parseAmountToCents(formData.totalAmount),
        createdBy: formData.createdBy,
        splits: formData.splits,
      });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create outcome';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createOutcome, loading, error };
}
