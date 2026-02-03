import { User, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency, formatPercentage } from '@/utils/format';
import type { BrotherStats } from '@/types';

interface BrotherStatsProps {
  stats: BrotherStats[];
}

export function BrotherStatsCard({ stats }: BrotherStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const isPositive = stat.netContribution >= 0;

        return (
          <Card key={stat.brotherId}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">{stat.name}</p>
                  <p className="text-sm text-neutral-500">
                    Default share: {formatPercentage(stat.percentage)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Contributed</span>
                  <span className="font-medium text-income-600">
                    {formatCurrency(stat.totalContributed)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Share Spent</span>
                  <span className="font-medium text-outcome-600">
                    {formatCurrency(stat.totalShareOfOutcomes)}
                  </span>
                </div>
                <div className="pt-3 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700">
                      Net Contribution
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isPositive ? 'text-income-600' : 'text-outcome-600'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowDown className="w-4 h-4" />
                      ) : (
                        <ArrowUp className="w-4 h-4" />
                      )}
                      {formatCurrency(Math.abs(stat.netContribution))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
