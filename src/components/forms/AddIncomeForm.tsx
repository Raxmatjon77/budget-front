import { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useIncome } from '@/hooks/useIncome';
import { useBrothers } from '@/hooks/useBrothers';
import type { Brother } from '@/types';

interface AddIncomeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddIncomeForm({ isOpen, onClose, onSuccess }: AddIncomeFormProps) {
  const { brothers } = useBrothers();
  const { createIncome, loading, error } = useIncome();

  const [brotherId, setBrotherId] = useState<number>('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!brotherId || !amount) return;

    const result = await createIncome({
      brotherId: Number(brotherId),
      amount,
      description,
    });

    if (result) {
      // Reset form
      setBrotherId(Number(''));
      setAmount('');
      setDescription('');
      onClose();
      onSuccess();
    }
  };

  const brotherOptions = brothers.map((b: Brother) => ({
    value: b.id,
    label: b.name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Income" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-outcome-50 border border-outcome-200 rounded-lg">
            <p className="text-sm text-outcome-700">{error}</p>
          </div>
        )}

        <Select
          label="Brother"
          value={brotherId}
          onChange={(e) => setBrotherId(Number(e.target.value))}
          options={brotherOptions}
          required
        />

        <Input
          label="Amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="100.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <Input
          label="Description (optional)"
          type="text"
          placeholder="Monthly savings, bonus, etc."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="income"
            disabled={!brotherId || !amount || loading}
            fullWidth
          >
            {loading ? 'Adding...' : (
              <>
                <Plus className="w-4 h-4" />
                Add Income
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
