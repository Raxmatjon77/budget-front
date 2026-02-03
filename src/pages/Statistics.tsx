import { TrendingUp, TrendingDown, Receipt } from 'lucide-react';
import { Charts } from '@/components/statistics/Charts';
import { BrotherStatsCard } from '@/components/statistics/BrotherStatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/format';
import { useStatistics, useMonthlySummary } from '@/hooks/useStatistics';

export function StatisticsPage() {
  const { statistics, loading } = useStatistics();
  const { summary: monthlyData } = useMonthlySummary(12);

  if (loading || !statistics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Statistics</h1>
          <p className="text-neutral-500">Financial insights and analytics</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-neutral-200 rounded w-24 mb-2" />
                  <div className="h-8 bg-neutral-200 rounded w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const largestOutcome = statistics.largestOutcome;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Statistics</h1>
        <p className="text-neutral-500">Financial insights and analytics</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-income-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-income-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Income</p>
                <p className="text-lg font-semibold text-income-600">
                  {formatCurrency(statistics.totalIncome)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-outcome-100 rounded-lg">
                <TrendingDown className="w-5 h-5 text-outcome-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Outcome</p>
                <p className="text-lg font-semibold text-outcome-600">
                  {formatCurrency(statistics.totalOutcome)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Receipt className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Transactions</p>
                <p className="text-lg font-semibold text-blue-600">
                  {statistics.incomeCount + statistics.outcomeCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-100 rounded-lg">
                <Receipt className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Current Balance</p>
                <p className="text-lg font-semibold text-neutral-700">
                  {formatCurrency(statistics.currentBalance)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Largest Outcome */}
      {largestOutcome && (
        <Card>
          <CardHeader>
            <CardTitle>Largest Outcome</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900">{largestOutcome.description}</p>
                <p className="text-sm text-neutral-500">
                  {new Date(largestOutcome.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-2xl font-semibold text-outcome-600">
                {formatCurrency(largestOutcome.amountCents)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brother Statistics */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Per-Brother Statistics
        </h2>
        <BrotherStatsCard stats={statistics.perBrother} />
      </div>

      {/* Charts */}
      {monthlyData.length > 0 && (
        <Charts
          monthlySummary={monthlyData}
          perBrother={statistics.perBrother}
        />
      )}
    </div>
  );
}
