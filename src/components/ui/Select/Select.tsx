import { forwardRef, SelectHTMLAttributes, useId } from 'react';
import { cn } from '@/utils/helper/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[] | string[];
  placeholder?: string;
  containerClassName?: string;
  isFullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      containerClassName,
      isFullWidth = true,
      disabled,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    // Generate stable ID
    const generatedId = useId();
    const selectId = id || generatedId;

    // Normalize options to SelectOption format
    const normalizedOptions: SelectOption[] = options.map((option) => {
      if (typeof option === 'string') {
        return { value: option, label: option };
      }
      return option;
    });

    // Base styles untuk select
    const baseSelectStyles =
      'w-full px-3 py-2 pr-10 text-base border rounded-lg transition-all duration-200 ' +
      'appearance-none bg-white ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-0 ' +
      'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500';

    // Conditional styles berdasarkan state
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-neon-grass-600 focus:ring-neon-grass-200';

    // Container width
    const containerWidth = isFullWidth ? 'w-full' : '';

    return (
      <div className={cn(containerWidth, containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'block text-sm font-medium mb-1.5 text-left',
              error ? 'text-red-700' : 'text-gray-700',
              disabled && 'text-gray-500'
            )}
          >
            {label}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Select Element */}
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(baseSelectStyles, stateStyles, className)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
            {...rest}
          >
            {/* Placeholder option */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {/* Options */}
            {normalizedOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Down Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
