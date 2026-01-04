import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/helper/cn';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 pt-4 border-t border-gray-200', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
