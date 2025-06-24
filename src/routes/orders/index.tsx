import React from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import OrdersPage from '../../components/OrdersPage';

export const Route = createFileRoute('/orders/')({
  beforeLoad: () => {
    // We'll handle auth check in the component since context might not be available here
  },
  component: OrdersComponent,
});

function OrdersComponent() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Handle auth check in component
  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/auth/login', search: { redirect: '/orders' } });
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
    <OrdersPage onBack={handleBack} />
  );
}