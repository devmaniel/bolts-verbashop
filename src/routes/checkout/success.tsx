import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import SuccessCheckoutPage from '../../components/SuccessCheckoutPage';

export const Route = createFileRoute('/checkout/success')({
  beforeLoad: ({ context }) => {
    // Redirect to login if not authenticated
    if (!context.auth?.user) {
      throw redirect({ to: '/auth/login' });
    }
  },
  component: SuccessCheckoutComponent,
});

function SuccessCheckoutComponent() {
  const navigate = useNavigate();

  const handleNavigateToPendingOrder = () => {
    navigate({ to: '/orders/pending' });
  };

  return (
    <SuccessCheckoutPage
      onNavigateToPendingOrder={handleNavigateToPendingOrder}
    />
  );
}