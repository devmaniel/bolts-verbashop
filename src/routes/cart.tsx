import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import CartPage from '../components/CartPage';

export const Route = createFileRoute('/cart')({
  component: CartComponent,
});

function CartComponent() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleCheckout = () => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate({ to: '/auth/login', search: { redirect: '/checkout' } });
      return;
    }
    
    navigate({ to: '/checkout' });
  };

  return (
    <CartPage
      onBack={handleBack}
      onCheckout={handleCheckout}
    />
  );
}