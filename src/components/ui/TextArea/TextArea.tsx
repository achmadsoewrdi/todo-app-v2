import { forwardRef, TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/utils/helper/cn';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  isFullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  showCharCount?: boolean;
  maxLength?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      isFullWidth = true,
      resize = 'vertical',
      showCharCount = false,
      maxLength,
      disabled,
      className,
      id,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    // Generate stable ID
    const generatedId = useId();
    const textareaId = id || generatedId;

    // Get current character count
    const currentValue = (value || defaultValue || '') as string;
    const charCount = currentValue.length;
    const isOverLimit = maxLength ? charCount > maxLength : false;

    // Base styles untuk textarea
    const baseTextAreaStyles =
      'w-full px-3 py-2 text-base border rounded-lg transition-all duration-200 ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-0 ' +
      'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500';

    // Conditional styles berdasarkan state
    const stateStyles = error || isOverLimit
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-neon-grass-600 focus:ring-neon-grass-200';

    // Resize styles
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    // Container width
    const containerWidth = isFullWidth ? 'w-full' : '';

    return (
      <div className={cn(containerWidth, containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium mb-1.5 text-left',
              error || isOverLimit ? 'text-red-700' : 'text-gray-700',
              disabled && 'text-gray-500'
            )}
          >
            {label}
          </label>
        )}

        {/* TextArea */}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            baseTextAreaStyles,
            stateStyles,
            resizeStyles[resize],
            className
          )}
          aria-invalid={error || isOverLimit ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          {...rest}
        />

        {/* Character Count */}
        {showCharCount && maxLength && (
          <div className="mt-1.5 flex justify-end">
            <p
              className={cn(
                'text-xs',
                isOverLimit ? 'text-red-600 font-medium' : 'text-gray-500'
              )}
            >
              {charCount}/{maxLength}
            </p>
          </div>
        )}

        {/* Error Message */}
        {(error || isOverLimit) && (
          <p
            id={`${textareaId}-error`}
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
            {error || (isOverLimit ? 'Character limit exceeded' : '')}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && !isOverLimit && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
