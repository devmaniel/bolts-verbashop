import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from '../../components/LoginPage';
import React from 'react';

export const Route = createFileRoute('/auth/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (!loading && user) {
      navigate({ to: '/' });
    }
  }, [user, loading, navigate]);

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleSwitchToRegister = () => {
    navigate({ to: '/auth/register' });
  };

  const handleLoginSuccess = () => {
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
      <LoginPage
        onBack={handleBack}
        onSwitchToRegister={handleSwitchToRegister}
        onLoginSuccess={handleLoginSuccess}
        signIn={signIn}
      />
    </div>
  );
}