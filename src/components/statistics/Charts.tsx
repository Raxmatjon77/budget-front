import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatMonth, formatCurrency } from '@/utils/format';
import type { MonthlySummary, BrotherStats } from '@/types';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

interface ChartsProps {
  monthlySummary: MonthlySummary[];
  perBrother: BrotherStats[];
}

export function Charts({ monthlySummary, perBrother }: ChartsProps) {
  // Transform monthly data for chart
  const monthlyData = [...monthlySummary].reverse().map((m) => ({
    month: formatMonth(m.month),
    income: m.income / 100,
    outcome: m.outcome / 100,
    net: m.net / 100,
  }));

  // Transform brother data for contribution chart
  const contributionData = perBrother.map((b) => ({
    name: b.name,
    contributed: b.totalContributed / 100,
    share: b.totalShareOfOutcomes / 100,
    net: b.netContribution / 100,
  }));

  // Transform brother data for outcome share pie chart
  const outcomeShareData = perBrother.map((b) => ({
    name: b.name,
    value: b.totalShareOfOutcomes,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Income vs Outcome */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Income vs Outcome</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value * 100)}
                labelStyle={{ color: '#1f2937' }}
              />
              <Legend />
              <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outcome" fill="#EF4444" name="Outcome" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Balance Over Time */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Net Balance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value * 100)}
                labelStyle={{ color: '#1f2937' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Net Balance"
                dot={{ fill: '#3B82F6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Per Brother Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Brother Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contributionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value * 100)}
                labelStyle={{ color: '#1f2937' }}
              />
              <Legend />
              <Bar dataKey="contributed" fill="#10B981" name="Contributed" />
              <Bar dataKey="share" fill="#EF4444" name="Share of Outcomes" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Outcome Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Outcome Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={outcomeShareData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={80}
                dataKey="value"
              >
                {outcomeShareData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
