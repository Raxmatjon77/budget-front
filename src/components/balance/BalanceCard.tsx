import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/format';
import type { Balance } from '@/types';

interface BalanceCardProps {
  balance: Balance | null;
  loading?: boolean;
}

export function BalanceCard({ balance, loading }: BalanceCardProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-24 mb-2" />
          <div className="h-8 bg-neutral-200 rounded w-48" />
        </div>
      </Card>
    );
  }

  const isPositive = balance && balance.balanceCents >= 0;

  return (
    <Card className={isPositive ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-none text-white' : 'bg-gradient-to-br from-outcome-500 to-outcome-600 border-none text-white'}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">
              Shared Balance
            </p>
            <p className="text-3xl font-bold">
              {balance ? formatCurrency(balance.balanceCents) : '$0.00'}
            </p>
          </div>
          <div className="p-3 bg-white/20 rounded-xl">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>

        {balance && (
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>
              {isPositive ? 'Funds available for purchases' : 'Insufficient funds'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
