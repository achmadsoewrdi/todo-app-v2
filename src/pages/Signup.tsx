import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout, SignupForm } from '@/features/auth';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';

export function Signup() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent you a confirmation link. Please check your email to verify your account.
            </p>
            <Button variant="primary" onClick={() => navigate('/login')} isFullWidth>
              Go to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to get started"
      footer={
        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-neon-grass-600 hover:text-neon-grass-700 font-medium"
          >
            Sign in
          </button>
        </div>
      }
    >
      <SignupForm onSuccess={() => setSuccess(true)} />
    </AuthLayout>
  );
}
