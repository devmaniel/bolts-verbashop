import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import OrdersPage from '../../components/OrdersPage';

export const Route = createFileRoute('/orders/')({
  beforeLoad: ({ context }) => {
    // Redirect to login if not authenticated
    if (!context.auth?.user) {
      throw redirect({ to: '/auth/login', search: { redirect: '/orders' } });
    }
  },
  component: OrdersComponent,
});

function OrdersComponent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return (
    <OrdersPage onBack={handleBack} />
  );
}