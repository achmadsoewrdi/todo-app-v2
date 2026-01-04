import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/helper/cn';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      title,
      subtitle,
      action,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between mb-4', className)}
        {...rest}
      >
        {children || (
          <>
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {action && (
              <div className="ml-4">
                {action}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';
