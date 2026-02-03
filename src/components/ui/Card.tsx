import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/format';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'income' | 'outcome' | 'neutral';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-white border border-neutral-200 shadow-sm',
      income: 'bg-income-50 border border-income-200',
      outcome: 'bg-outcome-50 border border-outcome-200',
      neutral: 'bg-neutral-50 border border-neutral-200',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-xl', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  ),
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold text-lg leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  ),
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-500', className)}
      {...props}
    >
      {children}
    </p>
  ),
);

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  ),
);

CardContent.displayName = 'CardContent';
