import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import PendingOrderPage from '../../components/PendingOrderPage';

export const Route = createFileRoute('/orders/pending')({
  beforeLoad: ({ context }) => {
    // Redirect to login if not authenticated
    if (!context.auth?.user) {
      throw redirect({ to: '/auth/login', search: { redirect: '/orders/pending' } });
    }
  },
  component: PendingOrderComponent,
});

function PendingOrderComponent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return (
    <PendingOrderPage onBack={handleBack} />
  );
}