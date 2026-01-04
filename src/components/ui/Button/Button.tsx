import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/helper/cn';

// Interface untuk props Button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

// Component dengan forwardRef untuk ref forwarding (best practice)
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    // Base styles yang selalu ada
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:outline-none active:ring-2 active:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles
    const variantStyles = {
      primary: 'bg-neon-grass-500 text-white hover:bg-neon-grass-600 focus:ring-neon-grass-500 active:bg-neon-grass-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
      outline: 'border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
      md: 'px-4 py-2 text-base rounded-lg gap-2',
      lg: 'px-6 py-3 text-lg rounded-lg gap-2.5',
    };

    // Full width style
    const widthStyle = isFullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyle,
          className
        )}
        {...rest}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Left Icon */}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}

        {/* Button Text */}
        <span>{children}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
