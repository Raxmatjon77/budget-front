
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatShortDate, formatTime, cn } from '@/utils/format';
import type { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export function TransactionList({ transactions, loading }: TransactionListProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-10 h-10 bg-neutral-200 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-neutral-200 rounded w-48 mb-2" />
                <div className="h-3 bg-neutral-200 rounded w-32" />
              </div>
              <div className="h-4 bg-neutral-200 rounded w-24" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <div className="p-12 text-center">
          <p className="text-neutral-500">No transactions yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="divide-y divide-neutral-100">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';

          return (
            <div
              key={`${tx.type}-${tx.id}`}
              onClick={() => !isIncome && navigate(`/outcomes/${tx.id}`)}
              className={cn(
                'p-4 transition-colors',
                !isIncome ? 'cursor-pointer hover:bg-neutral-50' : ''
              )}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    isIncome
                      ? 'bg-income-100 text-income-600'
                      : 'bg-outcome-100 text-outcome-600'
                  )}
                >
                  {isIncome ? (
                    <ArrowUpCircle className="w-5 h-5" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-neutral-900 truncate">
                      {isIncome
                        ? tx.description || 'Income'
                        : tx.description || 'Outcome'}
                    </p>
                    <Badge variant={isIncome ? 'income' : 'outcome'}>
                      {isIncome ? 'Income' : 'Outcome'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-neutral-500">
                      {tx.brotherName || 'Unknown'}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-sm text-neutral-500">
                      {formatShortDate(tx.createdAt)}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {formatTime(tx.createdAt)}
                    </span>
                  </div>
                  {tx.splits && tx.splits.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tx.splits.map((split) => (
                        <span
                          key={split.brotherId}
                          className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded"
                        >
                          {split.brotherName}: {split.percentage}%
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p
                    className={cn(
                      'font-semibold',
                      isIncome ? 'text-income-600' : 'text-outcome-600'
                    )}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(tx.amountCents)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Balance: {formatCurrency(tx.balanceAfterCents)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
