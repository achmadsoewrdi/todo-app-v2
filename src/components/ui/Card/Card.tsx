import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/helper/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-lg transition-all duration-200';

    // Variant styles
    const variantStyles = {
      default: 'bg-white border border-gray-200 shadow-sm',
      bordered: 'bg-white border-2 border-gray-300',
      elevated: 'bg-white shadow-md hover:shadow-lg',
      flat: 'bg-gray-50',
    };

    // Padding styles
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    // Interactive styles
    const interactiveStyles = cn(
      hoverable && 'hover:shadow-md hover:border-gray-300',
      clickable && 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
    );

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          interactiveStyles,
          className
        )}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
