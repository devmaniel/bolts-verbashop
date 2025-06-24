import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import PendingOrderPage from '../../components/PendingOrderPage';
import React from 'react';

export const Route = createFileRoute('/orders/pending')({
  component: PendingOrderComponent,
});

function PendingOrderComponent() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Handle auth check in component
  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/auth/login', search: { redirect: '/orders/pending' } });
    }
  }, [user, loading, navigate]);

  const handleBack = () => {
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

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <PendingOrderPage onBack={handleBack} />
  );
}