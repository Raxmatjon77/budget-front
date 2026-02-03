import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/format';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'income' | 'outcome' | 'neutral' | 'info';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', children, ...props }, ref) => {
    const variantStyles = {
      income: 'bg-income-100 text-income-700 border-income-200',
      outcome: 'bg-outcome-100 text-outcome-700 border-outcome-200',
      neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      info: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border',
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
