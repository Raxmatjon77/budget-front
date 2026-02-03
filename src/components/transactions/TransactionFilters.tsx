import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import type { TransactionFilters } from '@/types';

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onChange: (filters: TransactionFilters) => void;
}

export function TransactionFilters({
  filters,
  onChange,
}: TransactionFiltersProps) {
  const typeOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'income', label: 'Income Only' },
    { value: 'outcome', label: 'Outcome Only' },
  ];

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.brotherId !== undefined ||
    filters.startDate !== undefined ||
    filters.endDate !== undefined;

  const clearFilters = () => {
    onChange({ type: 'all' });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <Select
          label="Type"
          value={filters.type || 'all'}
          onChange={(e) =>
            onChange({ ...filters, type: e.target.value as any })
          }
          options={typeOptions}
        />
      </div>

      <div className="flex-1 min-w-[160px]">
        <Input
          label="Start Date"
          type="date"
          value={filters.startDate || ''}
          onChange={(e) =>
            onChange({
              ...filters,
              startDate: e.target.value || undefined,
            })
          }
        />
      </div>

      <div className="flex-1 min-w-[160px]">
        <Input
          label="End Date"
          type="date"
          value={filters.endDate || ''}
          onChange={(e) =>
            onChange({
              ...filters,
              endDate: e.target.value || undefined,
            })
          }
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="mb-0.5"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
