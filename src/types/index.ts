// Types matching the backend interfaces
export interface Brother {
  id: number;
  name: string;
  email?: string;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Income {
  id: number;
  brotherId: number;
  brotherName: string;
  amountCents: number;
  description: string | null;
  createdAt: string;
}

export interface OutcomeSplit {
  brotherId: number;
  brotherName: string;
  percentage: number;
  amountCents: number;
}

export interface Outcome {
  id: number;
  description: string;
  totalAmountCents: number;
  createdBy: number;
  createdByName: string;
  createdAt: string;
  splits: OutcomeSplit[];
}

export type TransactionType = 'income' | 'outcome';

export interface Transaction {
  id: number;
  type: TransactionType;
  amountCents: number;
  balanceAfterCents: number;
  createdAt: string;
  brotherId?: number;
  brotherName?: string;
  description?: string;
  splits?: OutcomeSplit[];
}

export interface Balance {
  balanceCents: number;
  formatted: string;
  lastUpdated: string;
}

export interface BrotherStats {
  brotherId: number;
  name: string;
  percentage: number;
  totalContributed: number;
  totalShareOfOutcomes: number;
  netContribution: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  outcome: number;
  net: number;
}

export interface LargestOutcome {
  id: number;
  description: string;
  amountCents: number;
  createdAt: string;
}

export interface Statistics {
  totalIncome: number;
  totalOutcome: number;
  currentBalance: number;
  perBrother: BrotherStats[];
  largestOutcome: LargestOutcome | null;
  monthlySummary: MonthlySummary[];
  outcomeCount: number;
  incomeCount: number;
}

// Form types
export interface CreateIncomeFormData {
  brotherId: number;
  amount: string; // Will be converted to cents
  description: string;
}

export interface CreateOutcomeFormData {
  description: string;
  totalAmount: string; // Will be converted to cents
  createdBy: number;
  splits: Array<{
    brotherId: number;
    percentage: number;
  }>;
}

// Filter types
export interface TransactionFilters {
  type?: TransactionType | 'all';
  brotherId?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}
