import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import CheckoutPage from '../components/CheckoutPage';

export const Route = createFileRoute('/checkout')({
  beforeLoad: ({ context }) => {
    // Redirect to login if not authenticated
    if (!context.auth?.user) {
      throw redirect({ to: '/auth/login', search: { redirect: '/checkout' } });
    }
  },
  component: CheckoutComponent,
});

function CheckoutComponent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/cart' });
  };

  const handleSuccess = () => {
    navigate({ to: '/checkout/success' });
  };

  return (
    <CheckoutPage
      onBack={handleBack}
      onSuccess={handleSuccess}
    />
  );
}