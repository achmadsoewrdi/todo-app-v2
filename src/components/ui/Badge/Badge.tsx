import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/utils/helper/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  withDot?: boolean;
  dotPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      withDot = false,
      dotPosition = 'left',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-colors';

    const variantStyles = {
      default: 'bg-gray-100 text-gray-700 border border-gray-200',
      primary: 'bg-blue-100 text-blue-700 border border-blue-200',
      success: 'bg-green-100 text-green-700 border border-green-200',
      warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      danger: 'bg-red-100 text-red-700 border border-red-200',
      neon: 'bg-neon-grass-100 text-neon-grass-800 border border-neon-grass-300',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
      lg: 'px-3 py-1.5 text-base gap-2',
    };

    const dotStyles = {
      default: 'bg-gray-500',
      primary: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
      neon: 'bg-neon-grass-500',
    };

    const dotSizeStyles = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };

    const renderDot = () => (
      <span className={cn('rounded-full', dotStyles[variant], dotSizeStyles[size])} />
    );

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      >
        {withDot && dotPosition === 'left' && renderDot()}
        {children}
        {withDot && dotPosition === 'right' && renderDot()}
      </span>
    );
  }
);
