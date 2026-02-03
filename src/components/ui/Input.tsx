import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/format';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2 border border-neutral-300 rounded-lg',
            'text-sm placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            error && 'border-outcome-500 focus:ring-outcome-500',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-outcome-600">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
