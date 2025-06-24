import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import RegisterPage from '../../components/RegisterPage';
import React from 'react';

export const Route = createFileRoute('/auth/register')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (!loading && user) {
      navigate({ to: '/' });
    }
  }, [user, loading, navigate]);

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleSwitchToLogin = () => {
    navigate({ to: '/auth/login' });
  };

  const handleRegisterSuccess = () => {
    navigate({ to: '/' });
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  // Don't render if already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <RegisterPage
        onBack={handleBack}
        onSwitchToLogin={handleSwitchToLogin}
        onRegisterSuccess={handleRegisterSuccess}
        signUp={signUp}
      />
    </div>
  );
}