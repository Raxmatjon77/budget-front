import { useState, FormEvent, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useOutcome } from '@/hooks/useOutcome';
import { useBrothers } from '@/hooks/useBrothers';
import { formatCurrency, cn } from '@/utils/format';
import type { Brother } from '@/types';

interface AddOutcomeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Split {
  brotherId: number;
  percentage: number;
}

export function AddOutcomeForm({ isOpen, onClose, onSuccess }: AddOutcomeFormProps) {
  const { brothers, loading: brothersLoading } = useBrothers();
  const { createOutcome, loading: submitting, error } = useOutcome();

  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [createdBy, setCreatedBy] = useState<number | ''>('');
  const [splits, setSplits] = useState<Split[]>([]);

  // Initialize splits with brothers' default percentages
  useEffect(() => {
    if (brothers.length > 0 && isOpen) {
      setSplits(
        brothers.map((b: Brother) => ({
          brotherId: b.id,
          percentage: Number(b.percentage),
        }))
      );
      // Auto-select first brother if none selected
      if (createdBy === '') {
        setCreatedBy(brothers[0].id);
      }
    }
  }, [brothers, isOpen, createdBy]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const totalPercentage = splits.reduce((sum, s) => sum + Number(s.percentage), 0);

    if (Math.abs(totalPercentage - 100) > 0.01) {
      alert('Percentages must sum to 100%');
      return;
    }

    if (!description || !totalAmount || createdBy === '') return;

    const result = await createOutcome({
      description,
      totalAmount,
      createdBy: Number(createdBy),
      splits,
    });

    if (result) {
      // Reset form
      setDescription('');
      setTotalAmount('');
      setCreatedBy('');
      onClose();
      onSuccess();
    }
  };

  const updateSplitPercentage = (brotherId: number, percentage: number) => {
    setSplits((prev) =>
      prev.map((s) =>
        s.brotherId === brotherId ? { ...s, percentage } : s
      )
    );
  };

  const totalPercentage = splits.reduce((sum, s) => sum + Number(s.percentage), 0);
  const isValidPercentage = Math.abs(totalPercentage - 100) < 0.01;
  const totalAmountCents = parseFloat(totalAmount) * 100 || 0;

  const brotherOptions = brothers.map((b: Brother) => ({
    value: b.id,
    label: b.name,
  }));

  const createdByOptions = [
    { value: '', label: 'Select Payer' },
    ...brothers.map((b: Brother) => ({
      value: b.id,
      label: b.name,
    })),
  ];

  const getBrotherName = (id: number) => {
    return brothers.find((b: Brother) => b.id === id)?.name || 'Unknown';
  };

  const loading = brothersLoading || submitting;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Outcome" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-outcome-50 border border-outcome-200 rounded-lg">
            <p className="text-sm text-outcome-700">{error}</p>
          </div>
        )}

        {brothersLoading && (
          <div className="text-center py-2 text-neutral-500 text-sm">Loading brothers...</div>
        )}

        <Input
          label="Description"
          type="text"
          placeholder="Car purchase, equipment, etc."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={loading}
        />

        <Input
          label="Total Amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="1000.00"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          required
          disabled={loading}
        />

        <Select
          label="Created By"
          value={createdBy}
          onChange={(e) => setCreatedBy(Number(e.target.value))}
          options={createdByOptions}
          required
          disabled={loading}
        />

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-neutral-700">
              Cost Distribution
            </label>
            <span className={cn(
              "text-xs font-mono px-2 py-0.5 rounded",
              isValidPercentage ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              Total: {totalPercentage.toFixed(1)}%
            </span>
          </div>

          <div className="space-y-2">
            {splits.map((split) => (
              <div
                key={split.brotherId}
                className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
              >
                <span className="flex-1 font-medium text-neutral-700">
                  {getBrotherName(split.brotherId)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateSplitPercentage(
                        split.brotherId,
                        Math.max(0, split.percentage - 5)
                      )
                    }
                    className="p-1 rounded hover:bg-neutral-200 transition-colors"
                    disabled={loading}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-mono">
                    {split.percentage.toFixed(1)}%
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateSplitPercentage(
                        split.brotherId,
                        Math.min(100, split.percentage + 5)
                      )
                    }
                    className="p-1 rounded hover:bg-neutral-200 transition-colors"
                    disabled={loading}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {totalAmountCents > 0 && (
                  <span className="w-24 text-right text-sm text-neutral-500">
                    {formatCurrency(
                      Math.round((totalAmountCents * split.percentage) / 100)
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>
          {!isValidPercentage && (
            <p className="text-xs text-red-600 mt-1 text-center">
              Percentages must sum to exactly 100%
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            fullWidth
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outcome"
            disabled={!description || !totalAmount || createdBy === '' || !isValidPercentage || loading}
            fullWidth
          >
            {submitting ? 'Adding...' : 'Add Outcome'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
