import { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Todo<span className="text-neon-grass-600">App</span>
          </h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
