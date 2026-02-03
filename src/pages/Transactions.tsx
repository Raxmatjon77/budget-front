import { useState } from 'react';
import { Plus, Minus, Download } from 'lucide-react';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { AddIncomeForm } from '@/components/forms/AddIncomeForm';
import { AddOutcomeForm } from '@/components/forms/AddOutcomeForm';
import { Button } from '@/components/ui/Button';
import { useTransactions } from '@/hooks/useTransactions';
import { useBalance } from '@/hooks/useBalance';
import { transactionsApi } from '@/api/transactions';
import type { TransactionFilters as TFilters } from '@/types';

export function TransactionsPage() {
  const [filters, setFilters] = useState<TFilters>({ type: 'all' });
  const { transactions, loading, refetch } = useTransactions(filters);
  const { refetch: refetchBalance } = useBalance();

  const [incomeFormOpen, setIncomeFormOpen] = useState(false);
  const [outcomeFormOpen, setOutcomeFormOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleSuccess = () => {
    refetch();
    refetchBalance();
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await transactionsApi.exportTransactions({
        type: filters.type,
        brotherId: filters.brotherId,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Failed to export transactions:', error);
      alert('Failed to export transactions');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Transactions</h1>
          <p className="text-neutral-500">Complete transaction history</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={handleExport}
            disabled={exporting}
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exporting...' : 'Export to Excel'}
          </Button>
          <Button variant="income" onClick={() => setIncomeFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Income
          </Button>
          <Button variant="outcome" onClick={() => setOutcomeFormOpen(true)}>
            <Minus className="w-4 h-4" />
            Add Outcome
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters filters={filters} onChange={setFilters} />

      {/* Transaction List */}
      <TransactionList transactions={transactions} loading={loading} />

      {/* Forms */}
      <AddIncomeForm
        isOpen={incomeFormOpen}
        onClose={() => setIncomeFormOpen(false)}
        onSuccess={handleSuccess}
      />
      <AddOutcomeForm
        isOpen={outcomeFormOpen}
        onClose={() => setOutcomeFormOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
