import { ArrowUpCircle, ArrowDownCircle, Receipt } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/format';
import type { Statistics } from '@/types';

interface QuickStatsProps {
  statistics: Statistics | null;
  loading?: boolean;
}

export function QuickStats({ statistics, loading }: QuickStatsProps) {
  if (loading || !statistics) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-20 mb-2" />
              <div className="h-6 bg-neutral-200 rounded w-32" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Income',
      value: formatCurrency(statistics.totalIncome),
      icon: ArrowUpCircle,
      color: 'text-income-600',
      bgColor: 'bg-income-100',
    },
    {
      label: 'Total Spent',
      value: formatCurrency(statistics.totalOutcome),
      icon: ArrowDownCircle,
      color: 'text-outcome-600',
      bgColor: 'bg-outcome-100',
    },
    {
      label: 'Total Transactions',
      value: statistics.incomeCount + statistics.outcomeCount,
      icon: Receipt,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-neutral-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
