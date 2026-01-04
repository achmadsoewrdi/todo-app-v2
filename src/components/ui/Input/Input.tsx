import { forwardRef, InputHTMLAttributes, useState, useId } from 'react';
import { cn } from '@/utils/helper/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  isFullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerClassName,
      isFullWidth = true,
      disabled,
      className,
      type = 'text',
      id,
      ...rest
    },
    ref
  ) => {
    // Generate stable ID menggunakan useId (React 18+)
    const generatedId = useId();
    const inputId = id || generatedId;
    
    // State untuk show/hide password
    const [showPassword, setShowPassword] = useState(false);
    
    // Determine input type (untuk password toggle)
    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Base styles untuk input
    const baseInputStyles = 
      'w-full px-3 py-2 text-base border rounded-lg transition-all duration-200 ' +
      'focus:outline-none focus:ring-2 focus:ring-offset-0 ' +
      'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500';

    // Conditional styles berdasarkan state
    const stateStyles = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-neon-grass-600 focus:ring-neon-grass-500';

    // Styles untuk icon padding
    const iconPaddingStyles = cn(
      leftIcon && 'pl-10',
      (rightIcon || type === 'password') && 'pr-10'
    );

    // Container width
    const containerWidth = isFullWidth ? 'w-full' : '';

    return (
      <div className={cn(containerWidth, containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium mb-1.5 text-left',
              error ? 'text-red-700' : 'text-gray-700',
              disabled && 'text-gray-500'
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={cn(
              baseInputStyles,
              stateStyles,
              iconPaddingStyles,
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...rest}
          />

          {/* Right Icon atau Password Toggle */}
          {type === 'password' ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                // Eye Slash Icon (Hide)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                // Eye Icon (Show)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
