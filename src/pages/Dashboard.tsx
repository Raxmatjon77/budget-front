import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { BalanceCard } from '@/components/balance/BalanceCard';
import { QuickStats } from '@/components/balance/QuickStats';
import { BrotherStatsCard } from '@/components/statistics/BrotherStatsCard';
import { TransactionList } from '@/components/transactions/TransactionList';
import { AddIncomeForm } from '@/components/forms/AddIncomeForm';
import { AddOutcomeForm } from '@/components/forms/AddOutcomeForm';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useBalance } from '@/hooks/useBalance';
import { useStatistics } from '@/hooks/useStatistics';
import { useTransactions } from '@/hooks/useTransactions';
import { useBrothers } from '@/hooks/useBrothers';

export function Dashboard() {
  const { balance, loading: balanceLoading, refetch: refetchBalance } = useBalance();
  const { statistics, loading: statsLoading, refetch: refetchStats } = useStatistics();
  const { transactions, loading: transactionsLoading, refetch: refetchTransactions } = useTransactions({
    limit: 10,
  });
  const { brothers } = useBrothers();

  const [incomeFormOpen, setIncomeFormOpen] = useState(false);
  const [outcomeFormOpen, setOutcomeFormOpen] = useState(false);

  const handleSuccess = () => {
    refetchBalance();
    refetchStats();
    refetchTransactions();
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500">Overview of your family finances</p>
        </div>
        <div className="flex gap-3">
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

      {/* Balance Card */}
      <BalanceCard balance={balance} loading={balanceLoading} />

      {/* Quick Stats */}
      <QuickStats statistics={statistics} loading={statsLoading} />

      {/* Brother Statistics */}
      {statistics && statistics.perBrother.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Per-Brother Contributions
          </h2>
          <BrotherStatsCard stats={statistics.perBrother} />
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Recent Transactions
        </h2>
        <TransactionList
          transactions={recentTransactions}
          loading={transactionsLoading}
        />
      </div>

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
