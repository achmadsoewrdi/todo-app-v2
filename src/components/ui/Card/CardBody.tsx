import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/helper/cn';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
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
        className={cn('text-gray-700', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';
