import { useNavigate } from 'react-router-dom';
import { AuthLayout, LoginForm } from '@/features/auth';

export function Login() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-neon-grass-600 hover:text-neon-grass-700 font-medium"
          >
            Sign up
          </button>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
