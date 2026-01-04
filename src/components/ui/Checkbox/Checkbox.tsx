import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { cn } from '@/utils/helper/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  containerClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      containerClassName,
      disabled,
      className,
      id,
      style, // ✅ Terima style prop
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    const baseCheckboxStyles = 
      'w-5 h-5 rounded border-2 transition-all duration-300 cursor-pointer ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-grass-200 ' +
      'disabled:cursor-not-allowed disabled:opacity-50';

    const stateStyles = error
      ? 'border-red-300 text-red-600 focus:ring-red-200'
      : 'border-gray-300 text-neon-grass-600 checked:bg-neon-grass-600 checked:border-neon-grass-600 hover:border-neon-grass-400';

    return (
      <div className={cn('flex items-start gap-3', containerClassName)}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={cn(
            baseCheckboxStyles,
            stateStyles,
            className
          )}
          style={{
            accentColor: '#4ecc00', // ✅ neon-grass-600
            ...style,
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${checkboxId}-error` : description ? `${checkboxId}-description` : undefined
          }
          {...rest}
        />

        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'block text-sm font-medium cursor-pointer select-none',
                  error ? 'text-red-700' : 'text-gray-700',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}

            {description && !error && (
              <p
                id={`${checkboxId}-description`}
                className="mt-1 text-sm text-gray-500"
              >
                {description}
              </p>
            )}

            {error && (
              <p
                id={`${checkboxId}-error`}
                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                role="alert"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
